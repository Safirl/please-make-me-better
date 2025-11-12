import Experience from "../Experience";
import Component from "../classes/Component";
import fragment from "./fragment";
const HELPER_FOLDER = "Sphere"


export default class Soul extends Component {



    private params = {
        radius: 1,
        blendingFactor: 2 //transition radius
    }

    private uTimeLoc: WebGLUniformLocation | null = null
    private uResolutionLoc: WebGLUniformLocation | null = null
    private uBlendingFactor: WebGLUniformLocation | null = null


    constructor(experience: Experience) {
        super(experience)

        this.createSphere()

        this.helpers.tweak(
            "radius",
            this.params,
            (e: number) => {},
            0,
            2,
            0.1,
            HELPER_FOLDER
        )
        this.helpers.tweak(
            "blendingFactor",
            this.params,
            (e: number) => {},
            0,
            10,
            0.1,
            HELPER_FOLDER
        )
    }

    createSphere() {
        const vertices = [
            -1, -1, // Bottom left corner of the screen triangle
            -1, 1, // Bottom left corner of the screen triangle
            1, -1, // Bottom left corner of the screen triangle

            1, 1,
            -1, 1,
            1, -1
        ]




        // Create vertex shader (shape & position)
        const vert = this.gl.createShader(this.gl.VERTEX_SHADER)
        if (!vert) throw new Error('ERROR while Sphere Vertex Shader creation');


        this.gl.shaderSource(
            vert,
            `
            attribute vec2 position;

            void main() {
                gl_Position = vec4(position.x, position.y, 0.0, 1.0);
            }
            `
        );
        this.gl.compileShader(vert);

        // Create fragment shader (color)
        const frag = this.gl.createShader(this.gl.FRAGMENT_SHADER)
        if (!frag) throw new Error('ERROR while Sphere Fragment Shader creation');

        this.gl.shaderSource(frag, fragment);
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

        const buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        this.gl.useProgram(program);



        // Link the GPU information to the CPU
        const position = this.gl.getAttribLocation(program, "position");
        this.gl.enableVertexAttribArray(position);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.vertexAttribPointer(position, 2, this.gl.FLOAT, this.gl.FALSE, 0, 0);







        // Create Uniforms : 
        this.uTimeLoc = this.gl.getUniformLocation(program, "uTime");
        this.uResolutionLoc = this.gl.getUniformLocation(program, "uResolution");
        this.uBlendingFactor = this.gl.getUniformLocation(program, "uBlendingFactor");


        if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
            const info = this.gl.getProgramInfoLog(program);
            throw "Could not compile WebGL program. \n\n${info}";
        }
    }

    update() {

        /**
         * Update Uniforms
         */
        this.gl.uniform1f(this.uTimeLoc, this.time.elapsedTime * 0.0005);
        this.gl.uniform1f(this.uBlendingFactor, this.params.blendingFactor);
        this.gl.uniform2f(this.uResolutionLoc, this.experience.sizes.width, this.experience.sizes.height);
    }

    draw() {
        // this.gl.drawArrays(this.gl.POINTS, 0, 1);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6); // 6 cause triangles of 3 vertices. Get this info dynamicly in the future
    }
}