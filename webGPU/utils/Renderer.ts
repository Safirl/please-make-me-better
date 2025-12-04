import { RNCanvasContext } from "react-native-wgpu";
import Experience from "../Experience";
import Component from "../classes/Component";
import PerformanceChecker from "./PerformanceChecker";

export default class Renderer {
    public experience: Experience;
    public sizes: { width: number; height: number };
    public scene: Component[];
    private ctx: RNCanvasContext;
    private renderPassDescriptor: any
    private performanceChecker: PerformanceChecker
    constructor(experience: Experience) {
        this.experience = experience;
        this.scene = this.experience.scene
        this.sizes = experience.sizes;
        this.ctx = this.experience.ctx
        this.performanceChecker = new PerformanceChecker(this.experience)


        if (!this.experience.device || !this.experience.presentationFormat) {
            throw new Error(`${!this.experience.device ? "device" : "presentationFormat"} is not defined`)
        }


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
        if (!this.experience.device) return;
        this.performanceChecker.startRecordingPerformances()

        this.renderPassDescriptor.colorAttachments[0].view = this.ctx.getCurrentTexture().createView();
        const encoder = this.experience.device.createCommandEncoder({ label: 'our encoder' });
        const pass = encoder.beginRenderPass(this.renderPassDescriptor);


        for (const component of this.scene) {
            component.update()
            component.draw(pass) // <- pass
        }

        pass.end();
        this.experience.device.queue.submit([encoder.finish()]);
        this.performanceChecker.endRecodingPerformances()
    }

    public resize(): void {

    }
}
