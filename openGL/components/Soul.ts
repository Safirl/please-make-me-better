import Helpers from "@/app/utils/Helpers";
import { useSoulStorage } from "@/storage/store";
import Experience from "../Experience";
import Component from "../classes/Component";
import fragment from "./fragment";
const HELPER_FOLDER = "Sphere"


export default class Soul extends Component {

    private paramsFactors = {
        fluidityFactor: 10
    }

    private params = {
        blendingFactor: useSoulStorage.getState().fluidity * this.paramsFactors.fluidityFactor, //8 is the factor. TODO Change later
        factor: 0.25,
        speed: 0.25,


        /**
        * Sphere color
        */
        redIntenisty: 1,
        greenIntenisty: 0,
        blueIntenisty: 1,
        yellowIntenisty: 0,
        globalLightIntensity: 0.5,

        /**
         * Sphere shape
         */
        radius: 1,
        form: 1,
        noiseFactor: 2.02,
        noiseScale: 0.5,
        filaments: 1,
    }

    private uTimeLoc: WebGLUniformLocation | null = null
    private uResolutionLoc: WebGLUniformLocation | null = null
    private uBlendingFactor: WebGLUniformLocation | null = null
    private uFactorLoc: WebGLUniformLocation | null = null
    private uNoise: WebGLUniformLocation | null = null
    private uSpeed: WebGLUniformLocation | null = null

    /**
     * Sphere color
    */
    private uRedIntenisty: WebGLUniformLocation | null = null
    private uGreenIntenisty: WebGLUniformLocation | null = null
    private uBlueIntenisty: WebGLUniformLocation | null = null
    private uYellowIntenisty: WebGLUniformLocation | null = null
    private uGlobalLightIntensity: WebGLUniformLocation | null = null

    /**
     * Sphere shape
    */
    private uForm: WebGLUniformLocation | null = null
    private uRadius: WebGLUniformLocation | null = null
    private uNoiseFactor: WebGLUniformLocation | null = null
    private uNoiseScale: WebGLUniformLocation | null = null
    private uFilament: WebGLUniformLocation | null = null


    private texture: WebGLTexture | undefined

    constructor(experience: Experience) {
        super(experience)

        this.createSphere()


        Helpers.instance.tweak(
            "speed",
            this.params,
            (e: number) => { },
            0,
            10,
            0.1,
            HELPER_FOLDER
        )
        Helpers.instance.tweak(
            "blendingFactor",
            this.params,
            (e: number) => { },
            0,
            10,
            0.1,
            HELPER_FOLDER
        )
        Helpers.instance.tweak(
            "factor",
            this.params,
            (e: number) => { },
            0,
            10,
            0.01,
            HELPER_FOLDER
        );

        /**
         * Sphere color
         */
        [
            "redIntenisty",
            "greenIntenisty",
            "blueIntenisty",
            "yellowIntenisty",
            "globalLightIntensity",
        ].map((color) => {
            Helpers.instance.tweak(
                color,
                this.params,
                (e: number) => { },
                0,
                1,
                0.01,
                "SPHERE COLOR"
            )
        })

        /**
         * Sphere shape
         */
        Helpers.instance.tweak(
            "radius",
            this.params,
            (e: number) => { },
            0,
            2,
            0.1,
            "SPHERE SHAPE"
        )
        Helpers.instance.tweak(
            "form",
            this.params,
            (e: number) => { },
            0,
            5,
            0.01,
            "SPHERE SHAPE"
        )
        Helpers.instance.tweak(
            "noiseFactor",
            this.params,
            (e: number) => { },
            0,
            50,
            0.01,
            "SPHERE SHAPE"
        )
        Helpers.instance.tweak(
            "noiseScale",
            this.params,
            (e: number) => { },
            0,
            1000,
            0.01,
            "SPHERE SHAPE"
        )

        Helpers.instance.tweak(
            "filaments",
            this.params,
            (e: number) => { },
            0,
            1,
            0.01,
            "SPHERE SHAPE"
        )





        this.onSoulStorageChanged();
    }

    onSoulStorageChanged = () => {
        useSoulStorage.subscribe((state) => {
            this.params.blendingFactor = state.fluidity * this.paramsFactors.fluidityFactor;
        })
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
        this.uFactorLoc = this.gl.getUniformLocation(program, "uFactor");
        this.uNoise = this.gl.getUniformLocation(program, "uNoise");
        this.uSpeed = this.gl.getUniformLocation(program, "uSpeed");

        /**
         * Sphere color
         */
        this.uRedIntenisty = this.gl.getUniformLocation(program, "uRedIntenisty")
        this.uGreenIntenisty = this.gl.getUniformLocation(program, "uGreenIntenisty")
        this.uBlueIntenisty = this.gl.getUniformLocation(program, "uBlueIntenisty")
        this.uYellowIntenisty = this.gl.getUniformLocation(program, "uYellowIntenisty")
        this.uGlobalLightIntensity = this.gl.getUniformLocation(program, "uGlobalLightIntensity")

        /**
         * Sphere shape
         */
        this.uForm = this.gl.getUniformLocation(program, "uForm")
        this.uRadius = this.gl.getUniformLocation(program, "uRadius")
        this.uNoiseFactor = this.gl.getUniformLocation(program, "uNoiseFactor")
        this.uNoiseScale = this.gl.getUniformLocation(program, "uNoiseScale")
        this.uFilament = this.gl.getUniformLocation(program, "uFilament")



        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.experience.ressources.items.pmb_noise);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture)
        this.gl.uniform1i(this.uNoise, 0);

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
        this.gl.uniform1f(this.uFactorLoc, this.params.factor);
        this.gl.uniform1f(this.uSpeed, this.params.speed);


        /** 
         * SPHERE COLOR VALUES */
        this.gl.uniform1f(this.uRedIntenisty, this.params.redIntenisty);
        this.gl.uniform1f(this.uGreenIntenisty, this.params.greenIntenisty);
        this.gl.uniform1f(this.uBlueIntenisty, this.params.blueIntenisty);
        this.gl.uniform1f(this.uYellowIntenisty, this.params.yellowIntenisty);
        this.gl.uniform1f(this.uGlobalLightIntensity, this.params.globalLightIntensity);

        /** 
         * Sphere shape
         */
        this.gl.uniform1f(this.uForm, this.params.form);
        this.gl.uniform1f(this.uRadius, this.params.radius);
        this.gl.uniform1f(this.uNoiseFactor, this.params.noiseFactor);
        this.gl.uniform1f(this.uNoiseScale, this.params.noiseScale);
        this.gl.uniform1f(this.uFilament, this.params.filaments);
    }

    draw() {
        // this.gl.drawArrays(this.gl.POINTS, 0, 1);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6); // 6 cause triangles of 3 vertices. Get this info dynamicly in the future
    }
}