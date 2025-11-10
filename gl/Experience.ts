import { ExpoWebGLRenderingContext } from 'expo-gl';
import * as THREE from "three";
import World from "./classes/World";
// import sources from "./common/sources";
import Camera from "./utils/Camera";
import Helpers from "./utils/Helpers";
import Renderer from "./utils/Renderer";
import Ressources from "./utils/Ressources";
import Sizes from "./utils/Sizes";
import Time from "./utils/Time";
import Main from "./worlds/Main";

export default class Experience {

    public gl: ExpoWebGLRenderingContext;
    public isReady: boolean = false;
    public sizes: Sizes;
    public time: Time;

    public scene: THREE.Scene;
    public camera: Camera;
    public renderer: Renderer;
    public helpers: Helpers
    public ressources: Ressources

    public world: World | null = null; // use the genera Page class type

    constructor(gl: ExpoWebGLRenderingContext) {
        this.gl = gl;

        this.scene = new THREE.Scene();

        this.sizes = new Sizes(this);
        this.time = new Time();
        this.helpers = new Helpers();
        this.camera = new Camera(this);
        this.renderer = new Renderer(this);
        this.ressources = new Ressources([])
        this.ressources.startLoading()
        this.createWorld(Main)

        this.sizes.on("resize", () => this.resize());
        this.time.on("tick", () => this.update());
        this.time.tick();
        // this.ressources.on('ready', () => this.onReady())
        this.onReady();
    }

    public createWorld(Exp: new (e : Experience) => World) {
        if (!Exp) return
        this.world?.clean()
        this.world = new Exp(this)
        this.isReady && this.world && (this.world.show())

    }

    onReady() {
        this.isReady = true;
        this.world && this.world.onReady()
    }

    public resize(): void {
        this.camera.resize();
        this.renderer.resize();
        if (this.world) this.world.resize();
        this.sizes.viewWidth = Math.tan(this.camera.instance.fov * Math.PI / 180 / 2) * this.camera.instance.position.z * this.sizes.aspectRatio * 2;
        this.sizes.viewHeight = Math.tan(this.camera.instance.fov * Math.PI / 180 / 2) * this.camera.instance.position.z * 2;
    }
    public update(): void {
        if (this.isReady) {
            this.camera.update();
            this.renderer.update();
            this.world?.update();
        }
    }
}


