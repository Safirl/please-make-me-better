import { THREE } from 'expo-three';
// import type GUI from 'lil-gui';

import { Asset } from 'expo-asset';
import Experience from "../Experience";
import Helpers from '../utils/Helpers';
import type Time from '../utils/Time';
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min


export default class Soul {
    private shadersLoaded = false;
    private vertexShader = '';
    private fragmentShader = '';

    private experience: Experience
    private scene: THREE.Scene
    private time: Time
    private helpers: Helpers

    private geometry: THREE.PlaneGeometry | null = null
    private material: THREE.ShaderMaterial | null = null
    private mesh: THREE.Mesh | null = null

    private params = {
        radius: 1
    }
    
    constructor(experience: Experience) {

        this.experience = experience
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.helpers = this.experience.helpers
        this.loadShaders();



        // this.createSphere()


        this.helpers.tweak(
            "radius",
            this.params,
            (e: number) => {
                this.dispose()
                this.createSphere()
                this.addScene()
            },
            0,
            2,
            0.1,
            "Sphere"
        )
    }

    async loadShaders() {
        try {
            const [vertexShader, fragmentShader] = await Promise.all([
                Asset.fromModule(require('@/glsl/soul.vert.glsl')).downloadAsync(),
                Asset.fromModule(require('@/glsl/soul.frag.glsl')).downloadAsync(),
            ])

            const [vert, frag] = await Promise.all([
                fetch(vertexShader.localUri || '').then(r => r.text()),
                fetch(fragmentShader.localUri || '').then(r => r.text()),
            ]);

            this.vertexShader = vert;
            this.fragmentShader = frag;
            this.shadersLoaded = true;

            this.createSphere();
            this.addScene();
        }
        catch(error) {
            console.error('Erreur chargement shaders:', error);
        }
    }

    createSphere() {
        // this.geometry = new THREE.SphereGeometry(this.params.radius, 32, 16);
        // this.material = new THREE.MeshBasicMaterial({ color: 0xd58be6 });
        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.geometry = new THREE.PlaneGeometry(32, 32);
        this.material = new THREE.ShaderMaterial(
            {
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader,
            }
        );
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    addScene() {
        if (!this.mesh) return
        this.scene.add(this.mesh)
    }

    dispose() {
        if (!this.mesh) return
        this.scene.remove(this.mesh);

        if (!this.geometry) return
        this.geometry.dispose()
    }

    update() {




    }
}