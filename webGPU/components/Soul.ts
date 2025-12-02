// import { GPUBufferUsage } from "react-native-wgpu";
import Experience from "../Experience";
import Component from "../classes/Component";
import { SimpleFS, SimpleVS } from "./shdertest";
const HELPER_FOLDER = "Sphere"
export default class Soul extends Component {



    private params = {
        radius: 1,
        blendingFactor: 2, //transition radius
        factor: 0.25
    }


    private pipeline: any;
    private pipelineLayout: any;
    private bindGroup: GPUBindGroup | undefined;
    private bindGroupLayout: GPUBindGroupLayout | undefined;

    /**
     * Uniforms
     */
    private uTime: Float32Array<ArrayBuffer> = new Float32Array([0]);
    private uFactor: Float32Array<ArrayBuffer> = new Float32Array([this.params.factor]);
    private uResolion: Float32Array<ArrayBuffer> = new Float32Array([0, 0]);
    private uBlendingFactor: Float32Array<ArrayBuffer> = new Float32Array([this.params.blendingFactor]);

    private timeBuffer: GPUBuffer | undefined;
    private resolutionBuffer: GPUBuffer | undefined;
    private factorBuffer: GPUBuffer | undefined;
    private blendingBuffer: GPUBuffer | undefined;


    private vertexShader: GPUShaderModule | undefined;
    private fragmentShader: GPUShaderModule | undefined;

    constructor(experience: Experience) {
        super(experience)

        this.loadShaders(SimpleVS, SimpleFS)
        this.confiureBuffers()
        this.configureBindGroup()

        this.helpers.tweak(
            "radius",
            this.params,
            (e: number) => { },
            0,
            2,
            0.1,
            HELPER_FOLDER
        )
        this.helpers.tweak(
            "blendingFactor",
            this.params,
            (e: number) => { },
            0,
            10,
            0.1,
            HELPER_FOLDER
        )
        this.helpers.tweak(
            "factor",
            this.params,
            (e: number) => { },
            0,
            10,
            0.01,
            HELPER_FOLDER
        )
    }

    private configureBindGroupLayout() {
        if (!this.experience.device) throw new Error("Device is undefined");

        this.bindGroupLayout = this.experience.device.createBindGroupLayout({
            label: "Soul Bind Group Layout",
            entries: [
                {
                    binding: 0,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    buffer: { type: "uniform" }
                },
                {
                    binding: 1,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    buffer: { type: "uniform" }
                },
                {
                    binding: 2,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    buffer: { type: "uniform" }
                },
                {
                    binding: 3,
                    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
                    buffer: { type: "uniform" }
                },
            ]
        })

        this.pipelineLayout = this.experience.device.createPipelineLayout({
            label: "Soul Pipeline Layout",
            bindGroupLayouts: [
                this.bindGroupLayout
            ]
        })
    }

    private configurePipeline() {
        if (!this.experience.device) throw new Error("Device is undefined");
        if (!this.vertexShader) throw new Error("Vertex shader is undefined");
        if (!this.fragmentShader) throw new Error("Vertex shader is undefined");
        if (!this.experience.presentationFormat) throw new Error("PresentationFormat shader is undefined");

        this.pipeline = this.experience.device.createRenderPipeline({
            label: "Soul Render Pipeline",
            layout: this.pipelineLayout,
            vertex: {
                module: this.vertexShader,
            },
            fragment: {
                module: this.fragmentShader,
                targets: [{ format: this.experience.presentationFormat }]
            }
        })
    }

    private confiureBuffers() {
        this.configTimeUniform()
        this.setTime()

        this.configResolutionUniform()
        this.setResolution()

        this.configFactorUniform()
        this.setFactor()

        this.configBlendingFactorUniform()
        this.setBlendingFactor()
    }

    configResolutionUniform() {
        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }

        this.resolutionBuffer = this.experience.device.createBuffer({
            label: "Soul uResolution Uniform Buffer",
            size: this.uResolion.byteLength, // should be 4 * 4
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
    }
    setResolution() {

        if (!this.resolutionBuffer) {
            throw new Error("resolutionBuffer is not defined")
        }

        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }


        this.experience.device.queue.writeBuffer(this.resolutionBuffer, 0, this.uResolion)

    }


    configFactorUniform() {
        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }

        this.factorBuffer = this.experience.device.createBuffer({
            label: "Soul uResolution Uniform Buffer",
            size: this.uResolion.byteLength, // should be 4 * 4
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
    }
    setFactor() {

        if (!this.factorBuffer) {
            throw new Error("factorBuffer is not defined")
        }

        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }


        this.experience.device.queue.writeBuffer(this.factorBuffer, 0, this.uFactor)

    }


    configBlendingFactorUniform() {
        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }

        this.blendingBuffer = this.experience.device.createBuffer({
            label: "Soul uResolution Uniform Buffer",
            size: this.uBlendingFactor.byteLength, // should be 4 * 4
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
    }
    setBlendingFactor() {

        if (!this.blendingBuffer) {
            throw new Error("blendingBuffer is not defined")
        }

        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }


        this.experience.device.queue.writeBuffer(this.blendingBuffer, 0, this.uBlendingFactor)

    }

    public loadShaders(vertexShader?: string, fragmentShader?: string) {
        this.loadVertexShader(vertexShader)
        this.loadFragmentShader(fragmentShader)

        this.configureBindGroupLayout()
        this.configurePipeline()
    }


    private loadVertexShader(shader?: string) {
        if (!this.experience.device) return
        this.vertexShader = this.experience.device.createShaderModule({
            label: "Soul Vertex Shader",
            code: shader ?? /* wgsl */`
                @vertex
                fn vs(
                    @builtin(vertex_index) vertexIndex : u32
                ) -> @builtin(position) vec4f {
                    let pos = array(
                        vec2(-1.0, -1.0),
                        vec2(-1.0, 1.0),
                        vec2(1.0, -1.0),

                        vec2(1.0, 1.0),
                        vec2(1.0, -1.0),
                        vec2(-1.0, 1.0),
                    );
            
                    return vec4f(pos[vertexIndex], 0.0, 1.0);
                }
            `
        })
    }

    private loadFragmentShader(shader?: string) {
        if (!this.experience.device) return

        this.fragmentShader = this.experience.device.createShaderModule({
            label: "Soul Fragment Shader",
            code: shader ?? /* wgsl */`
                @fragment
                fn fs() -> @location(0) vec4f {
                    return vec4f(1.0, 0.0, 0.0, 1.0);
                }
            `,
        })
    }

    private configTimeUniform() {
        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }

        this.timeBuffer = this.experience.device.createBuffer({
            label: "Soul uTime Uniform Buffer",
            size: this.uTime.byteLength, // should be 4 * 4
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        })
    }

    public setTime(time?: number) {
        if (!this.timeBuffer) {
            throw new Error("colorBuffer is not defined")
        }

        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }


        this.experience.device.queue.writeBuffer(this.timeBuffer, 0, this.uTime)
    }


    private configureBindGroup() {

        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }
        if (!this.bindGroupLayout) {
            throw new Error("bindGroupLayout is not defined")
        }
        if (!this.timeBuffer) {
            throw new Error("colorBuffer is not defined")
        }
        if (!this.resolutionBuffer) {
            throw new Error("resolutionBuffer is not defined")
        }
        if (!this.factorBuffer) {
            throw new Error("factorBuffer is not defined")
        }
        if (!this.blendingBuffer) {
            throw new Error("blendingBuffer is not defined")
        }

        this.bindGroup = this.experience.device.createBindGroup({
            label: "Soul Bind Group",
            layout: this.bindGroupLayout,
            entries: [
                { binding: 0, resource: { buffer: this.timeBuffer } },
                { binding: 1, resource: { buffer: this.resolutionBuffer } },
                { binding: 2, resource: { buffer: this.factorBuffer } },
                { binding: 3, resource: { buffer: this.blendingBuffer } },
            ]
        })

    }

    update() {
        //Check buffers
        if (!this.timeBuffer) throw new Error("colorBuffer is not defined")
        if (!this.resolutionBuffer) throw new Error("resolutionBuffer is not defined")
        if (!this.factorBuffer) throw new Error("factorBuffer is not defined")
        if (!this.blendingBuffer) throw new Error("blendingBuffer is not defined")
        //--
        if (!this.experience.device) throw new Error("device is not defined")



        /**
         * Updating uniform time
         */

        this.uTime[0] = this.experience.time.elapsedTime * 0.006;
        this.experience.device.queue.writeBuffer(this.timeBuffer, 0, this.uTime);


        /**
         * Updating uniform resolution
         */

        this.uResolion[0] = this.experience.sizes.width;
        this.uResolion[1] = this.experience.sizes.height;
        this.experience.device.queue.writeBuffer(this.resolutionBuffer, 0, this.uResolion);


        /**
         * Updating uniform factor
         */

        this.uFactor[0] = this.params.factor
        this.experience.device.queue.writeBuffer(this.factorBuffer, 0, this.uFactor);


        /**
         * Updating uniform factor
         */

        this.uBlendingFactor[0] = this.params.blendingFactor;
        this.experience.device.queue.writeBuffer(this.blendingBuffer, 0, this.uBlendingFactor);


    }

    draw(pass: GPURenderPassEncoder) {
        if (!this.pipeline) return


        pass.setPipeline(this.pipeline)
        pass.setBindGroup(0, this.bindGroup)
        pass.draw(6)

    }
}