import Experience from "../Experience";
import Component from "../classes/Component";
const HELPER_FOLDER = "Sphere"


export default class Soul extends Component {



    private params = {
        radius: 1
    }

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
    void main(void) {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
  `
        );
        this.gl.compileShader(frag);

        // Link together into a program
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vert);
        this.gl.attachShader(program, frag);
        this.gl.linkProgram(program);
        this.gl.useProgram(program);



    }

    update() {
        // console.log("update")
    }

    draw() {
        this.gl.drawArrays(this.gl.POINTS, 0, 1);
    }
}