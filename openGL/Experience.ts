import { ExpoWebGLRenderingContext } from 'expo-gl';

import Component from "./classes/Component";
import World from "./classes/World";

import Helpers from "./utils/Helpers";
import Renderer from "./utils/Renderer";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Main from "./worlds/Main";

export default class Experience {

    public gl: ExpoWebGLRenderingContext;
    public isReady: boolean = false;
    public sizes: Sizes;
    public time: Time;

    public scene: Component[];
    public renderer: Renderer;
    public helpers: Helpers

    public world: World | null = null; // use the genera Page class type

    constructor(gl: ExpoWebGLRenderingContext) {

        this.gl = gl;
        this.scene = []
        this.sizes = new Sizes(this);
        this.time = new Time();
        this.helpers = new Helpers();
        this.renderer = new Renderer(this);

        this.createWorld(Main)

        this.sizes.on("resize", () => this.resize());
        this.time.on("tick", () => this.update());
        this.time.tick();
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
        this.renderer.resize();
        if (this.world) this.world.resize();
       
    }
    public update(): void {
        if (this.isReady) {

            this.world?.update();
            this.renderer.update()
        }
    }
    public draw() {


    }
}


