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
    public renderer: Renderer | null = null;
    public helpers: Helpers
    public world: World | null = null; // use the genera Page class type

    /**
     * config
     */
    public adapter: any
    public device: any
    public presentationFormat: any

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


        this.sizes.on("resize", () => this.resize());
        this.time.on("tick", () => this.update());
        this.time.tick();

    }

    private async initGPUConfig() {
        this.adapter = await navigator.gpu.requestAdapter()

        if (!this.adapter) {
            throw new Error("No adapter");
        }

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


