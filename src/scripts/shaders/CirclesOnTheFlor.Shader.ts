import { Color, ShaderMaterial, TextureLoader } from "three";

//

const textureLoader = new TextureLoader();
const circleTexture = textureLoader.load( 'resources/textures/circle.png' );

export class CircleMaterial extends ShaderMaterial {

    constructor () {

        super();

        this.vertexShader = `
        varying vec2 vUv;

        attribute float brightness;
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;

        uniform float uTime;

        void main() {

            mat4 transforms = mat4 (
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * modelViewMatrix * transforms * vec4( position * uTime * 0.0009, 1.0 );

            vUv = uv;

        }`,
        this.transparent = true;
        this.alphaTest = 10.0001;
        this.fragmentShader = `
        varying vec2 vUv;

        uniform float uTime;
        uniform sampler2D uTexture;
        uniform vec3 uColor;

        void main() {

            vec2 centeredUv = vec2( vUv - 0.5 );
            float distanceToCenter = length( centeredUv );

            float circle = step( distanceToCenter, 0.5 );

            float strength = step( 0.02, abs( distance( vUv, vec2( 0.5 ) ) - 0.1 - uTime * 0.0001 ) );

            // if ( distanceToCenter > 0.47 ) { discard; }
            // if ( distanceToCenter < 0.4 ) { discard; }

            // gl_FragColor = vec4( vec3( strength ), 1.0 - uTime * 10.1 ); //* texture2D( uTexture, gl_PointCoord );

            gl_FragColor = texture2D( uTexture, vUv );
            gl_FragColor.rgb += uColor;

            gl_FragColor.a = 1.0;// - uTime * 0.0005;

        }`,

        this.uniforms = {

            uTime: { value: 0.0 },
            uTexture: { value: circleTexture },
            uColor: { value: new Color( 0x2b1605 ) }

        }

    }

};
