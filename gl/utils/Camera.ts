import { ExpoWebGLRenderingContext } from 'expo-gl'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import preferences from "../common/preferences"
import Experience from "../Experience"
import Sizes from "../utils/Sizes"
// const lerp=(t,i,e)=>t*(1-e)+i*e
// const linear = (a, b, t) => (1 - t) * a + t * b;

export default class Camera {
    public experience: Experience;
    public scene: THREE.Scene;
    public sizes: Sizes;
    public gl: ExpoWebGLRenderingContext;
    public controls: OrbitControls | null = null;
    public instance: THREE.PerspectiveCamera;


    constructor(experience: Experience) {
        this.experience = experience

        this.sizes = experience.sizes
        this.scene = experience.scene
        this.gl = experience.gl


        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, preferences.cameraSettings.far)
        this.setInstance()


        // this.controls = new OrbitControls(this.instance, this.gl)
        // this.setControls()
    }



    public setInstance() {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, preferences.cameraSettings.far)
        this.instance.position.set(0, 0, 8.5)
        this.scene.add(this.instance)
    }

    public setControls() {
        if (!this.controls) return
        // this.controls = new OrbitControls(this.instance, this.gl) // <- EXPECT HTML ELEMENT SO WONT WORK WITH EXPO
        // this.controls.enableDamping = true
    }

    public update() {
        if (!this.controls) return

        // this.controls.update()
    }

    public resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
}