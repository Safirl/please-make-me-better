import { RNCanvasContext } from "react-native-wgpu";
import Experience from "../Experience";
import Component from "../classes/Component";


export default class Renderer {
    public experience: Experience;
    public sizes: { width: number; height: number };
    public scene: Component[];
    private ctx: RNCanvasContext;
    private renderPassDescriptor: any

    constructor(experience: Experience) {
        this.experience = experience;
        this.scene = this.experience.scene
        this.sizes = experience.sizes;
        this.ctx = this.experience.ctx


        this.ctx.configure({
            device: this.experience.device,
            format: this.experience.presentationFormat,
            alphaMode: "opaque",
        });

        this.renderPassDescriptor = {
            label: 'our basic canvas renderPass',
            colorAttachments: [
                {
                    view: undefined,
                    clearValue: [0, 0, 0, 1],
                    loadOp: "clear",
                    storeOp: "store",
                },
            ],
        };
    }



    public update(): void {
        this.renderPassDescriptor.colorAttachments[0].view = this.ctx.getCurrentTexture().createView();
        const encoder = this.experience.device.createCommandEncoder({ label: 'our encoder' });
        const pass = encoder.beginRenderPass(this.renderPassDescriptor);


        for (const component of this.scene) {
            component.update()
            component.draw(pass) // <- pass
        }

        pass.end();
        this.experience.device.queue.submit([encoder.finish()]);
    }

    public resize(): void {

    }
}
