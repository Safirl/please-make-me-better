import Experience from "../Experience";

export default class PerformanceChecker {
    private experience: Experience
    private startTime = 0
    private isDevMode = false
    private fps = 0
    private runTime = 0
    private el: HTMLDivElement | undefined;

    constructor(experience: Experience) {
        this.experience = experience
        this.isDevMode = process.env.EXPO_OS === 'web'
        if (!this.isDevMode) return



        this.el = document.createElement("div");
        this.el.innerHTML = `${this.fps.toFixed(1)}fps </br> ${this.runTime.toFixed(1)}ms`
        this.el.style.position = "fixed"
        this.el.style.zIndex = "10000"
        this.el.style.top = "0"
        this.el.style.left = "0"
        this.el.style.color = "#fff"
        this.el.style.background = "#000"

        document.body.appendChild(this.el)

    }

    public startRecordingPerformances() {
        if (!this.isDevMode) return

        this.startTime = performance.now();
    }



    public endRecodingPerformances() {
        if (!this.isDevMode) return

        const jsTime = performance.now() - this.startTime;

        this.fps = 1000 / this.experience.time.delta
        this.runTime = jsTime



        this.el && (this.el.innerHTML = `${this.fps.toFixed(1)}fps </br> ${this.runTime.toFixed(1)}ms`)

    }
}

