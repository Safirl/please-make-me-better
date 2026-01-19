import { RNCanvasContext } from "react-native-wgpu";

import Component from "./classes/Component";
import World from "./classes/World";

import Helpers from "./utils/Helpers";
import Renderer from "./utils/Renderer";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Main from "./worlds/Main";

export default class Experience {

    public ctx: RNCanvasContext;
    public canvas: HTMLCanvasElement;
    public isReady: boolean = false;
    public sizes: Sizes;
    public time: Time;
    public scene: Component[];
    public renderer: Renderer | undefined;
    public helpers: Helpers
    public world: World | undefined; // use the genera Page class type

    /**
     * config
     */
    public adapter: GPUAdapter | undefined
    public device: GPUDevice | undefined
    public presentationFormat: GPUTextureFormat | undefined

    constructor(ctx: RNCanvasContext, adapter: any) {

        if (!ctx) {
            throw new Error("No context");
        }




        this.ctx = ctx;
        this.canvas = this.ctx.canvas as HTMLCanvasElement;
        this.scene = []


        this.initGPUConfig()

        this.sizes = new Sizes(this);
        this.time = new Time();
        this.helpers = new Helpers();


        this.update = this.update.bind(this)
        this.sizes.on("resize", () => this.resize());
        this.time.setOnTickCallback(this.update)
        this.time.tick();

    }

    private async initGPUConfig() {
        const adapter = await navigator.gpu.requestAdapter()

        if (!adapter) {
            throw new Error("No adapter");
        }
        this.adapter = adapter
        this.device = await this.adapter.requestDevice()


        this.presentationFormat = navigator.gpu.getPreferredCanvasFormat();

        this.renderer = new Renderer(this);
        this.createWorld(Main)

        this.onReady();
    }

    public createWorld(newWorld: new (e: Experience) => World) {
        if (!newWorld) return
        this.world?.clean()
        this.world = new newWorld(this)
        this.isReady && this.world && (this.world.show())

    }

    onReady() {
        this.isReady = true;
        this.world && this.world.onReady()
    }

    public resize(): void {
        if (!this.renderer) return;

        this.renderer.resize();
        if (this.world) this.world.resize();

    }
    public update(): void {
        if (!this.renderer) return;
        if (this.isReady) {

            this.world?.update();
            this.renderer.update()
        }
    }
    public draw() {


    }
}


