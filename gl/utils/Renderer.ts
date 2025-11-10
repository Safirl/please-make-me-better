import { Renderer as ExpoRenderer } from 'expo-three';
import * as THREE from "three";
import Experience from "../Experience";

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';


// const lerp = (t, i, e) => t * (1 - e) + i * e





export default class Renderer {
    public experience: Experience;
    public sizes: { width: number; height: number };
    public scene: THREE.Scene;
    public camera: { instance: THREE.Camera };
    public instance!: ExpoRenderer;
    private composer: EffectComposer | null = null;
    public strength = 0

    private params = {
        threshold: 0.07,
        strength: 2,
        radius: 0.0,
        exposure: 0.9,
        bloom: false,
        sobel: false,

        gain: 2.0,
        vRadius: .5,
        softness: .3,
    }

    constructor(experience: Experience) {
        this.experience = experience;

        this.sizes = experience.sizes;
        this.scene = experience.scene;
        this.camera = experience.camera;


        this.setInstance();
        // this.createTweaks() 
    }

    public setInstance(strength = 0, r = 0, t = 0): void {
        this.instance = new ExpoRenderer({ gl: this.experience.gl });

        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = this.params.exposure;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor(0xffffff, 1);
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
        // this.instance.physicallyCorrectLights = true

        this.experience.renderer = this




        this.composer = new EffectComposer(this.instance);


    }

    public update(): void {
        if (!this.composer) return

        this.instance.clear()
        this.instance.render(this.experience.scene, this.camera.instance);

        // console.log(this.experience.scene)
    }

    public resize(): void {
        this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height);
        this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
        this.composer && this.composer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    }
}
