import { Mesh, Object3D, SphereBufferGeometry } from "three";
import { SphereMaterial } from "./shaders/Sphere.Shader";

//

export class BlastSphere {

    public material: SphereMaterial;
    public wrapper: Object3D = new Object3D();

    constructor () {

        this.generate();

    };

    public generate () : void {

        let geom = new SphereBufferGeometry( 0.01, 100 );
        this.material = new SphereMaterial();
        let sphere = new Mesh( geom, this.material );

        if ( sphere ) {

            geom.dispose();

            this.wrapper.remove( sphere );

        }

        this.wrapper.add( sphere );
        // this.mainScene.scene.add( sphere );

    };

    public update ( elapsedTime ) : void {

        this.material.uniforms.uTime.value = elapsedTime;

    };

};
