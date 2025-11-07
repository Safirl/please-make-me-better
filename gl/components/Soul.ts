import { THREE } from 'expo-three';
// import type GUI from 'lil-gui';

import Experience from "../Experience";
import Helpers from '../utils/Helpers';
import type Time from '../utils/Time';
const getRandomBetween = (min: number, max: number) => Math.random() * (max - min) + min


export default class Soul {

    private experience: Experience
    private scene: THREE.Scene
    private time: Time
    private helpers: Helpers

    private geometry: THREE.SphereGeometry | null = null
    private material: THREE.MeshBasicMaterial | null = null
    private mesh: THREE.Mesh | null = null

    private params = {
        radius: 1
    }
    
    constructor(experience: Experience) {

        this.experience = experience
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.helpers = this.experience.helpers


        this.createSphere()


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

    createSphere() {

        this.geometry = new THREE.SphereGeometry(this.params.radius, 32, 16);
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