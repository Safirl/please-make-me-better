// import { GPUBufferUsage } from "react-native-wgpu";
import Experience from "../Experience";
import Component from "../classes/Component";
import { SimpleFS, SimpleVS } from "./shdertest";
const HELPER_FOLDER = "Sphere"

type UniformType = {
    visibility: number;
    buffer: {
        type: GPUBufferBindingType;
    };
}

type EntriesType = {
    buffer?: GPUBuffer | undefined;
    value?: Float32Array<ArrayBuffer>;
    entryType?: GPUBufferBindingType;
    name?: SoulUniformsEntryTypes;
}

type SoulUniformsEntryTypes = "uTime" | "uFactor" | "uResolution" | "uBlendingFactor";

type EntryObjectType = {
    [entryName in SoulUniformsEntryTypes]?: EntriesType
}

const uniformEntryTemplate = {
    visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
    buffer: { type: "uniform" as GPUBufferBindingType }
}
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

    private uniforms: EntryObjectType = {}

    private vertexShader: GPUShaderModule | undefined;
    private fragmentShader: GPUShaderModule | undefined;

    constructor(experience: Experience) {
        super(experience)

        this.confiureBuffers()
        this.configureBindGroupLayout()
        this.loadShaders(SimpleVS, SimpleFS)
        this.configurePipeline()
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

        const entries: GPUBindGroupLayoutEntry[] = []
        let index = 0
        for (const uniform of Object.keys(this.uniforms)) {

            if (!this.uniforms[uniform as SoulUniformsEntryTypes]!.buffer) {
                throw new Error(`${uniform} buffer is not defined`)
            }

            entries.push({
                binding: index,
                ...uniformEntryTemplate,
            })

            index++
        }

        this.bindGroupLayout = this.experience.device.createBindGroupLayout({
            label: "Soul Bind Group Layout",
            entries
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
        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }
        /**
         * @Important : Uniforms must be in the same order as binds are declared in the shader.
         */
        const buffersToInit: {
            defaultValue: Float32Array<ArrayBuffer>;
            name: SoulUniformsEntryTypes;
            entry: "uniform"
        }[] = [
                {
                    defaultValue: new Float32Array([this.experience.time.elapsedTime]),
                    entry: "uniform" as const,
                    name: "uTime"
                },
                {
                    defaultValue: new Float32Array([this.experience.sizes.width, this.experience.sizes.height]),
                    entry: "uniform" as const,
                    name: "uResolution"
                },
                {
                    defaultValue: new Float32Array([this.params.factor]),
                    entry: "uniform" as const,
                    name: "uFactor"
                },
                {
                    defaultValue: new Float32Array([this.params.blendingFactor]),
                    entry: "uniform" as const,
                    name: "uBlendingFactor"
                },
            ]

        for (const bufferToInit of buffersToInit) {

            const { name, defaultValue, entry } = bufferToInit

            this.uniforms[name] = {}
            this.uniforms[name].value = defaultValue;
            this.uniforms[name].name = name
            this.uniforms[name].entryType = entry;

            this.uniforms[name]!.buffer = this.experience.device.createBuffer({
                label: `Soul ${name} Uniform Buffer`,
                size: defaultValue.byteLength * 8, // always 16 bytes minimum for a uniform binding
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
            })

            this.experience.device.queue.writeBuffer(this.uniforms[name]!.buffer, 0, this.uniforms[name]!.value!)
        }


    }



    public loadShaders(vertexShader?: string, fragmentShader?: string) {
        this.loadVertexShader(vertexShader)
        this.loadFragmentShader(fragmentShader)
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


    private configureBindGroup() {

        if (!this.experience.device) {
            throw new Error("Device is not defined")
        }
        if (!this.bindGroupLayout) {
            throw new Error("bindGroupLayout is not defined")
        }

        const entries: GPUBindGroupEntry[] = []
        let index = 0

        for (const uniform of Object.keys(this.uniforms)) {

            if (!this.uniforms[uniform as SoulUniformsEntryTypes]!.buffer) {
                throw new Error(`${uniform} buffer is not defined`)
            }

            entries.push({
                binding: index,
                resource: { buffer: this.uniforms[uniform as SoulUniformsEntryTypes]!.buffer as GPUBuffer }
            })

            index++
        }

        this.bindGroup = this.experience.device.createBindGroup({
            label: "Soul Bind Group",
            layout: this.bindGroupLayout,
            entries
        })

    }

    update() {
        //Check buffers
        if (!this.uniforms.uTime?.buffer) throw new Error("colorBuffer is not defined")
        if (!this.uniforms.uResolution?.buffer) throw new Error("resolutionBuffer is not defined")
        if (!this.uniforms.uFactor?.buffer) throw new Error("factorBuffer is not defined")
        if (!this.uniforms.uBlendingFactor?.buffer) throw new Error("blendingBuffer is not defined")
        //--
        if (!this.experience.device) throw new Error("device is not defined")


        /**
         * Updating uniform time
         */

        this.uniforms.uTime.value![0] = this.experience.time.elapsedTime * 0.006;
        this.experience.device.queue.writeBuffer(this.uniforms.uTime.buffer, 0, this.uniforms.uTime.value!);


        /**
         * Updating uniform resolution
         */

        this.uniforms.uResolution.value![0] = this.experience.sizes.width;
        this.uniforms.uResolution.value![1] = this.experience.sizes.height;
        this.experience.device.queue.writeBuffer(this.uniforms.uResolution.buffer, 0, this.uniforms.uResolution.value!);


        /**
         * Updating uniform factor
         */

        this.uniforms.uFactor.value![0] = this.params.factor
        this.experience.device.queue.writeBuffer(this.uniforms.uFactor.buffer, 0, this.uniforms.uFactor.value!);


        /**
         * Updating uniform factor
         */

        this.uniforms.uBlendingFactor.value![0] = this.params.blendingFactor;
        this.experience.device.queue.writeBuffer(this.uniforms.uBlendingFactor.buffer, 0, this.uniforms.uBlendingFactor.value!);
    }

    draw(pass: GPURenderPassEncoder) {
        if (!this.pipeline) return


        pass.setPipeline(this.pipeline)
        pass.setBindGroup(0, this.bindGroup)
        pass.draw(6)

    }
}