// import GUI from "lil-gui";
import Experience from "../Experience";
import Component from "../classes/Component";
import World from "../classes/World";
import Soul from "../components/Soul";

const lerp = (t: number, i: number, e: number) => t * (1 - e) + i * e


export default class Main extends World {

    private exp: Experience;
    private scene: Component[]

    private soul : Soul | null = null;
    public isPlaying = false

    constructor(exp: Experience) {
        super();
        this.exp = exp;
        this.scene = exp.scene
        this.isPlaying = false

        this.createScene()
    }

    createScene() {

        this.soul = new Soul(this.exp);
        this.soul.addScene();

    }

    update() {
        if (!this.isPlaying) return
    }

}


