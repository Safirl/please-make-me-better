import { Dimensions, EmitterSubscription, PixelRatio } from "react-native"
import Experience from "../Experience"
import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter {
    public width: number
    public height: number
    public pixelRatio: number
    public aspectRatio: number
    public viewWidth: number
    public viewHeight: number
    public devicePixelRatio: number
    private experience: Experience
    private subscription: EmitterSubscription
    constructor(e: Experience) {
        super()

        this.experience = e
        this.width = this.experience.canvas.clientWidth * 0.5
        this.height = this.experience.canvas.clientHeight * 0.5


        this.devicePixelRatio = PixelRatio.get()
        this.pixelRatio = Math.min(devicePixelRatio, 2)

        this.aspectRatio = this.width / this.height
        this.viewWidth = 0
        this.viewHeight = 0

        /**
         * @Important : Set canvas Height
         */
        this.experience.canvas.width = this.experience.canvas.clientWidth * this.pixelRatio;
        this.experience.canvas.height = this.experience.canvas.clientHeight * this.pixelRatio;

        this.resize = this.resize.bind(this)
        this.subscription = Dimensions.addEventListener('change', this.resize);
    }

    resize() {

        this.width = this.experience.canvas.clientWidth * 0.5
        this.height = this.experience.canvas.clientHeight * 0.5
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.aspectRatio = this.width / this.height
        this.trigger("resize")

    }

    clear() {
        this.subscription?.remove();
    }
}