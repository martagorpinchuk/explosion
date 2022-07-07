import { Euler, Float32BufferAttribute, Matrix4, Mesh, Object3D, PlaneBufferGeometry, Quaternion, Vector3 } from "three";
import { GroundShockWaveMaterial } from "./shaders/GroundShockWave.Shader";

//

export class GroundShockWave {

    public material: GroundShockWaveMaterial;
    public wrapper: Object3D = new Object3D();
    public geometry: PlaneBufferGeometry;
    public size: number = 1;
    public startWaveSize: number;

    constructor ( startWaveSize ) {

        this.startWaveSize = startWaveSize;

        this.generate();

    };

    public generate () : void {

        this.geometry = new PlaneBufferGeometry( this.size, 1 );
        this.material = new GroundShockWaveMaterial();

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

            let transformMatrix = new Matrix4().compose( new Vector3( 0, 0.01, 0 ), new Quaternion().setFromEuler( new Euler( rotationX, rotationY, rotationZ ) ), new Vector3( this.startWaveSize, this.startWaveSize, this.startWaveSize ) ).toArray();

            transformRow1.push( transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3] );
            transformRow2.push( transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7] );
            transformRow3.push( transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11] );
            transformRow4.push( transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15] );

        }

        this.geometry.setAttribute( 'brightness', new Float32BufferAttribute( brightness, 1 ) );
        this.geometry.setAttribute( 'transformRow1', new Float32BufferAttribute( new Float32Array( transformRow1 ), 4 ) );
        this.geometry.setAttribute( 'transformRow2', new Float32BufferAttribute( new Float32Array( transformRow2 ), 4 ) );
        this.geometry.setAttribute( 'transformRow3', new Float32BufferAttribute( new Float32Array( transformRow3 ), 4 ) );
        this.geometry.setAttribute( 'transformRow4', new Float32BufferAttribute( new Float32Array( transformRow4 ), 4 ) );

        let circle = new Mesh( this.geometry, this.material );

        if ( circle ) {

            this.geometry.dispose();

            this.wrapper.remove( circle );

        }

        this.wrapper.add( circle );
        // this.mainScene.scene.add( circle );

    };

    public update ( elapsedTime ) : void {

        this.material.uniforms.uTime.value = elapsedTime;

    };

};
