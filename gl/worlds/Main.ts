// import GUI from "lil-gui";
import * as THREE from "three";

import Experience from "../Experience";
import World from "../classes/World";

const colors = {
    grey: "",
    gold: ""
}
const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e


export default class Main extends World {

    private exp: Experience;
    private scene: THREE.Scene

    public isPlaying = false

    private offset = 16
    private towerGroupCount = 0
    constructor(exp: Experience) {
        super();
        this.exp = exp;
        this.scene = exp.scene
        this.isPlaying = false


        this.createSphere()


        //CAMERA POSITION
        this.exp.camera.instance.position.z = 5


    }

    createSphere() {
        const geometry = new THREE.SphereGeometry(1, 32, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xd58be6 });
        const sphere = new THREE.Mesh(geometry, material);

        this.scene.add(sphere)

    }

    onReady() {
    }


    update() {
        if (!this.isPlaying) return


    }

}


