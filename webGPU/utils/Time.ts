export default class Time {

    public start: number
    public current: number
    public elapsedTime: number
    public delta: number
    public isAnimating: boolean
    private tickCallback: () => void = () => { }


    constructor() {

        //Setup
        this.start = performance.now()
        this.current = this.start
        this.elapsedTime = 0
        this.delta = 16 // sth differernt to 0 to prevent bugs and screens running at 60fps by default so why not :)
        this.isAnimating = true
    }
    tick = () => {
        const currentTime = performance.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsedTime = this.current - this.start
        this.tickCallback()
        if (this.isAnimating) {
            requestAnimationFrame(this.tick)
        }
    }
    setOnTickCallback(cb: () => void) {
        this.tickCallback = cb
    }
    reset() {
        this.elapsedTime = 0
        this.start = performance.now()

    }
    stop() {
        this.isAnimating = false
    }
    animate() {
        this.isAnimating = true
        requestAnimationFrame(this.tick)
    }
}