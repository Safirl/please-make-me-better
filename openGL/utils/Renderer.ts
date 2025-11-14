import { ExpoWebGLRenderingContext } from 'expo-gl';
import Experience from "../Experience";
import Component from "../classes/Component";


export default class Renderer {
    public experience: Experience;
    public sizes: { width: number; height: number };
    public scene: Component[];
    private gl: ExpoWebGLRenderingContext;


    constructor(experience: Experience) {
        this.experience = experience;
        this.scene = this.experience.scene
        this.sizes = experience.sizes;
        this.gl = this.experience.gl

        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
        this.gl.clearColor(0, 0, 0, 1);
    }



    public update(): void {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        for (const component of this.scene) {
            component.update()
            component.draw()
        }

        this.gl.flush();
        this.gl.endFrameEXP();
    }

    public resize(): void {
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
    }
}
