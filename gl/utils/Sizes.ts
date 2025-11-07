import { PixelRatio } from "react-native"
import Experience from "../Experience"
import EventEmitter from "./EventEmitter"
export default class Sizes extends EventEmitter {
    public width: number
    public height: number
    public pixelRatio: number
    public pageHeight: number
    public aspectRatio: number
    public viewWidth: number
    public viewHeight: number
    constructor(e: Experience) {
        super()
        //Setup
        this.width = e.gl.drawingBufferWidth
        this.height = e.gl.drawingBufferHeight
        const devicePixelRatio = PixelRatio.get()
        this.pixelRatio = Math.min(devicePixelRatio, 2)
        this.pageHeight = 0
        this.aspectRatio = this.width / this.height
        this.viewWidth = 0
        this.viewHeight = 0

        //Resize
        // window.addEventListener('resize', () => {
            // Update sizes
            // this.width = window.innerWidth
            // this.height = window.innerHeight
            // this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            // this.pageHeight = document.querySelector("body")?.getBoundingClientRect().height || 0
            // this.trigger("resize")


            // this.aspectRatio = this.width / this.height


        // })


    }
}