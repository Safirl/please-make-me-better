import { THREE } from 'expo-three';
// import type GUI from 'lil-gui';

import Experience from "../Experience";
import type Time from '../utils/Time';
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min


export default class Soul {

    private experience: Experience
    private scene: THREE.Scene
    private time: Time


    private geometry: THREE.SphereGeometry | null = null
    private material: THREE.MeshBasicMaterial | null = null
    private mesh: THREE.Mesh | null = null

    constructor(experience: Experience) {

        this.experience = experience
        this.scene = this.experience.scene
        this.time = this.experience.time


        this.createSphere()
    }

    createSphere() {

        this.geometry = new THREE.SphereGeometry(1, 32, 16);
        this.material = new THREE.MeshBasicMaterial({ color: 0xd58be6 });
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