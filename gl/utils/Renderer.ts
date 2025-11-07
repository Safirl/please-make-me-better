import { Renderer as ExpoRenderer } from 'expo-three';
import * as THREE from "three";
import Experience from "../Experience";

import { PixelRatio } from 'react-native';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';

import {
    rendererPalette
} from "../common/colors";

const lerp = (t, i, e) => t * (1 - e) + i * e





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
        exposure: 1.52,
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

        const devicePixelRatio = PixelRatio.get();

        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = this.params.exposure;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
        this.instance.setClearColor(rendererPalette[0], 1);
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(devicePixelRatio, 2));
        this.instance.physicallyCorrectLights = true

        this.experience.renderer = this




        this.composer = new EffectComposer(this.instance);


    }
    
    /*
        createTweaks() {
    
    
            const folder = this.experience.helpers.GUI.addFolder('renderer');
    
            folder.add(this.params, 'threshold', 0.0, 10.0).onChange((value: number) => {
    
                this.bloomPass.threshold = Number(value);
    
            });
    
            folder.add(this.params, 'strength', 0.0, 30.0).onChange((value: number) => {
    
                this.bloomPass.strength = Number(value);
    
            });
    
            folder.add(this.params, 'radius', 0.0, 10.0).step(0.01).onChange((value: number) => {
    
                this.bloomPass.radius = Number(value);
    
            });
            folder.add(this.params, 'exposure', 0.0, 10.0).step(0.01).onChange((value: number) => {
                this.instance.toneMappingExposure = value;
            });
            folder.add(this.params, 'bloom').step(0.01).onChange((value: boolean) => {
                //this.instance.toneMappingExposure = value;
                this.bloomPass.enabled = value
                // this.setInstance()
            });
            folder.add(this.params, 'sobel').step(0.01).onChange((value: boolean) => {
                // this.instance.sobel = value;
                this.effectSobel.enabled = value
                // this.setInstance()
            });
            folder.add(this.params, 'gain', 0, 2).step(0.01).onChange((value: number) => {
                this.vignetteShader.uniforms.gain.value = value
            });
            folder.add(this.params, 'vRadius', 0, 2).step(0.01).onChange((value: number) => {
                this.vignetteShader.uniforms.radius.value = value
    
            });
            folder.add(this.params, 'softness', 0,2).step(0.01).onChange((value: number) => {
                this.vignetteShader.uniforms.softness.value = value
            });
    
    
    
            // folder.add(this.params, 'tDiffuse', 0, 10, 0.1)
            //     .onChange((value: number) => {
    
            //         this.vibrantShader.uniforms.tDiffuse.value
            //         this.setInstance()
            //     });
            // folder.add(this.params, 'satGreen', 0, 10, 0.1)
            //     .onChange((value: number) => {
    
            //         this.vibrantShader.uniforms.satGreen.value
            //         this.setInstance()
            //     });
            // folder.add(this.params, 'satOrange', 0, 10, 0.1)
            //     .onChange((value: number) => {
    
            //         this.vibrantShader.uniforms.satOrange.value
            //         this.setInstance()
            //     });
    
            // folder.close()
    
        }
    */

   public update(): void {
       if (!this.composer) return

       this.instance.toneMappingExposure = lerp(this.instance.toneMappingExposure, this.params.exposure, 0.01);
        this.composer.render();


        // TRY WITH AND WITHOUT CAUSE NOT SURE ITS NEEDED
        //
        // this.instance.clear()
        // this.instance.render(this.experience.scene, this.camera.instance);
        //
        //
    }

    public resize(): void {
        this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height);
        this.instance.setPixelRatio(Math.min(PixelRatio.get(), 2));
        this.composer && this.composer.setSize(this.experience.sizes.width, this.experience.sizes.height);
    }
}
