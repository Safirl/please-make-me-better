import Experience from "../Experience";
import Component from "../classes/Component";

const HELPER_FOLDER = "Sphere"
export default class Soul extends Component {



    private params = {
        radius: 1,
        blendingFactor: 2, //transition radius
        factor: 0.25
    }

    private uTimeLoc: WebGLUniformLocation | null = null
    private uResolutionLoc: WebGLUniformLocation | null = null
    private uBlendingFactor: WebGLUniformLocation | null = null
    private uFactorLoc: WebGLUniformLocation | null = null
    private pipeline: any;

    constructor(experience: Experience) {
        super(experience)

        this.createSphere()

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

    createSphere() {

        const module = this.experience.device.createShaderModule({
            label: 'our hardcoded red triangle shaders',
            code: /* wgsl */ `
                @vertex fn vs(
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
            
                @fragment fn fs() -> @location(0) vec4f {
                    return vec4f(1.0, 0.0, 0.0, 1.0);
                }
            `,
        });


        this.pipeline = this.experience.device.createRenderPipeline({
            label: 'our hardcoded red triangle pipeline',
            layout: 'auto',
            vertex: {
                entryPoint: 'vs',
                module,
            },
            fragment: {
                entryPoint: 'fs',
                module,
                targets: [{ format: this.experience.presentationFormat }],
            },
        });

    }

    update() {

        /**
         * Update Uniforms
         */
        // this.gl.uniform1f(this.uTimeLoc, this.time.elapsedTime * 0.0005);
        // this.gl.uniform1f(this.uBlendingFactor, this.params.blendingFactor);
        // this.gl.uniform2f(this.uResolutionLoc, this.experience.sizes.width, this.experience.sizes.height);
        // this.gl.uniform1f(this.uFactorLoc, this.params.factor);
        
    }

    draw(pass: any) {
        if (!this.pipeline) return
        pass.setPipeline(this.pipeline);
        pass.draw(6);

    }
}