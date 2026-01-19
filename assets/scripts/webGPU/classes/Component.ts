import { RNCanvasContext } from "react-native-wgpu";
import Experience from "../Experience";
import Helpers from '../utils/Helpers';
import Time from '../utils/Time';

export default class Component {
    public id: string
    protected experience: Experience
    protected scene: Component[]
    protected ctx: RNCanvasContext;
    protected helpers: Helpers
    protected time: Time


    constructor(experience: Experience) {
        this.id = Math.random().toString(36).substring(2, 10);
        this.experience = experience
        this.scene = this.experience.scene
        this.ctx = this.experience.ctx
        this.time = this.experience.time
        this.helpers = this.experience.helpers
    }

    dispose(): void {
        this.scene = this.scene.filter(component => component.id !== this.id)

    }
    addScene() {
        this.scene.push(this)
    }
    update() { }
    draw(pass: any) { }
}