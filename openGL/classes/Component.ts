import { ExpoWebGLRenderingContext } from 'expo-gl';
import Experience from "../Experience";
import Time from '../utils/Time';


export default class Component {
    public id: string
    protected experience: Experience
    protected scene: Component[]
    protected gl: ExpoWebGLRenderingContext;
    protected time: Time


    constructor(experience: Experience) {
        this.id = Math.random().toString(36).substring(2, 10);
        this.experience = experience
        this.scene = this.experience.scene
        this.gl = this.experience.gl
        this.time = this.experience.time
    }

    dispose(): void {
        this.scene = this.scene.filter(component => component.id !== this.id)

    }
    addScene() {
        this.scene.push(this)
    }
    update() { }
    draw() { }
}