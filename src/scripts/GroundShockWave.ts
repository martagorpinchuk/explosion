import { Euler, Float32BufferAttribute, Matrix4, Mesh, Object3D, PlaneBufferGeometry, Quaternion, Vector3 } from "three";
import { GroundShockWaveMaterial } from "./shaders/GroundShockWave.Shader";

//

export class GroundShockWave {

    public material: GroundShockWaveMaterial;
    public wrapper: Object3D = new Object3D();

    constructor () {

        this.generate();

    };

    public generate () : void {

        let geom = new PlaneBufferGeometry( 1, 1 );
        this.material = new GroundShockWaveMaterial();
        let circle = new Mesh( geom, this.material );

        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        let  brightness = [];

        for ( let i = 0; i < 50; i ++ ) {

            brightness.push( ( Math.random() - 0.5 ) * 2 );

            let rotationX = - Math.PI * 0.5;
            let rotationY = 0;
            let rotationZ = 0;

            let transformMatrix = new Matrix4().compose( new Vector3( 0, 0.01, 0 ), new Quaternion().setFromEuler( new Euler( rotationX, rotationY, rotationZ ) ), new Vector3( 1, 1, 1 ) ).toArray();

            transformRow1.push( transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3] );
            transformRow2.push( transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7] );
            transformRow3.push( transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11] );
            transformRow4.push( transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15] );

        }

        geom.setAttribute( 'brightness', new Float32BufferAttribute( brightness, 1 ) );
        geom.setAttribute( 'transformRow1', new Float32BufferAttribute( new Float32Array( transformRow1 ), 4 ) );
        geom.setAttribute( 'transformRow2', new Float32BufferAttribute( new Float32Array( transformRow2 ), 4 ) );
        geom.setAttribute( 'transformRow3', new Float32BufferAttribute( new Float32Array( transformRow3 ), 4 ) );
        geom.setAttribute( 'transformRow4', new Float32BufferAttribute( new Float32Array( transformRow4 ), 4 ) );

        if ( circle ) {

            geom.dispose();

            this.wrapper.remove( circle );

        }

        this.wrapper.add( circle );
        // this.mainScene.scene.add( circle );

    };

    public update ( elapsedTime ) : void {

        this.material.uniforms.uTime.value = elapsedTime;

    };

};
