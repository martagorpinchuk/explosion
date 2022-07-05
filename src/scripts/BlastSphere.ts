import { Mesh, Object3D, SphereBufferGeometry } from "three";
import { BlastSphereMaterial } from "./shaders/BlastSphere.Shader";

//

export class BlastSphere {

    public material: BlastSphereMaterial;
    public geometry: SphereBufferGeometry;
    public wrapper: Object3D = new Object3D();
    public size: number = 0.01;

    constructor () {

        this.generate();

    };

    public generate () : void {

        this.geometry = new SphereBufferGeometry( this.size, 100 );
        this.material = new BlastSphereMaterial();
        let sphere = new Mesh( this.geometry, this.material );

        if ( sphere ) {

            this.geometry.dispose();

            this.wrapper.remove( sphere );

        }

        this.wrapper.add( sphere );
        // this.mainScene.scene.add( sphere );

    };

    public update ( elapsedTime ) : void {

        this.material.uniforms.uTime.value = elapsedTime;

    };

};
