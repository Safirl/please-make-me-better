export default class Time {

    public start: number
    public current: number
    public elapsedTime: number
    public delta: number
    public isAnimating: boolean
    private cb: () => void = () => { }


    constructor() {
        //Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsedTime = 0
        this.delta = 16 // sth differernt to 0 to prevent bugs and screens running at 60fps by default so why not :)
        this.isAnimating = true
    }
    tick() {
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = this.current - this.start
        // this.trigger("tick")
        if (this.isAnimating) {
            this.cb()
        }
    }
    setCb(cb: () => void) {
        this.cb = cb
    }
    reset() {
        this.elapsedTime = 0
        this.start = Date.now()
    }
    stop() {
        this.isAnimating = false
    }
    animate() {
        this.isAnimating = true
        requestAnimationFrame(() => { this.tick() })
    }
}