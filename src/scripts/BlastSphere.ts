import { Mesh, Object3D, SphereBufferGeometry } from "three";
import { BlastSphereMaterial } from "./shaders/BlastSphere.Shader";

//

export class BlastSphere {

    public material: BlastSphereMaterial;
    public geometry: SphereBufferGeometry;
    public wrapper: Object3D = new Object3D();
    public startSphereSize: number;

    constructor ( startSphereSize: number ) {

        this.startSphereSize = startSphereSize;

        this.generate();

    };

    public generate () : void {

        this.geometry = new SphereBufferGeometry( this.startSphereSize, 100 );
        this.material = new BlastSphereMaterial();
        let sphere = new Mesh( this.geometry, this.material );

        if ( sphere ) {

            this.geometry.dispose();

            this.wrapper.remove( sphere );

        }

        this.wrapper.add( sphere );

    };

    public update ( elapsedTime ) : void {

        this.material.uniforms.uTime.value = elapsedTime;

    };

};
