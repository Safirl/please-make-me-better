import Experience from "../Experience";
import Component from "../classes/Component";
const HELPER_FOLDER = "Sphere"


export default class Soul extends Component {



    private params = {
        radius: 1
    }
    private uTimeLoc: WebGLUniformLocation | null = null
    private uResolutionLoc: WebGLUniformLocation | null = null
    constructor(experience: Experience) {
        super(experience)

        this.createSphere()
        this.helpers.tweak(
            "radius",
            this.params,
            (e: number) => {
                this.dispose()
                this.createSphere()
                this.addScene()
            },
            0,
            2,
            0.1,
            HELPER_FOLDER
        )
    }

    createSphere() {





        // Create vertex shader (shape & position)
        const vert = this.gl.createShader(this.gl.VERTEX_SHADER)
        if (!vert) throw new Error('ERROR while Sphere Vertex Shader creation');


        this.gl.shaderSource(
            vert,
            `
    void main(void) {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 150.0;
    }
  `
        );
        this.gl.compileShader(vert);

        // Create fragment shader (color)
        const frag = this.gl.createShader(this.gl.FRAGMENT_SHADER)
        if (!frag) throw new Error('ERROR while Sphere Fragment Shader creation');

        this.gl.shaderSource(
            frag,
            `
            precision mediump float;
            uniform float uTime;
            uniform vec2 uResolution;

// #define MAX_STEPS 50
// #define MAX_DIST 100.0
// #define SURFACE_DIST 0.001


            void main() {


                vec2 uv = gl_FragCoord.xy / uResolution;
                uv -= 0.5;
                uv.x *= uResolution.x / uResolution.y;

                gl_FragColor = vec4(uv.x , uv.y, 0.0, 1.0);
            }
  `
        );
        this.gl.compileShader(frag);




        // Link together into a program
        const program = this.gl.createProgram();





        this.gl.compileShader(vert);
        if (!this.gl.getShaderParameter(vert, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(vert));
        }

        this.gl.compileShader(frag);
        if (!this.gl.getShaderParameter(frag, this.gl.COMPILE_STATUS)) {
            console.error(this.gl.getShaderInfoLog(frag));
        }




        // Attach to the program

        this.gl.attachShader(program, vert);
        this.gl.attachShader(program, frag);
        this.gl.linkProgram(program);
        this.gl.useProgram(program);

        // Create Uniforms : 

        this.uTimeLoc = this.gl.getUniformLocation(program, "uTime");
        // this.gl.uniform1f(uTime, this.time.elapsedTime);
        this.uResolutionLoc = this.gl.getUniformLocation(program, "uResolution");


        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const info = this.gl.getProgramInfoLog(program);
            throw "Could not compile WebGL program. \n\n${info}";
        }
    }

    update() {
        this.gl.uniform1f(this.uTimeLoc, this.time.elapsedTime);
        this.gl.uniform2f(this.uResolutionLoc, this.experience.sizes.width, this.experience.sizes.height);
    }

    draw() {
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    }
}