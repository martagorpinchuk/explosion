import { AxesHelper, Clock, Color, Euler, Float32BufferAttribute, Matrix4, Mesh, MeshBasicMaterial, Object3D, PerspectiveCamera, PlaneBufferGeometry, PlaneGeometry, PointLight, Quaternion, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from "three";
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Explosion } from "./ExplosionGfx";
import { Pane } from "tweakpane";


//

export class MainScene {

    public scene: Scene;
    public camera: PerspectiveCamera;
    public cameraDepth: PerspectiveCamera;
    public canvas: HTMLCanvasElement;
    public plane: Mesh;
    public renderer: WebGLRenderer;
    public mapControls: MapControls;
    public clock: Clock;
    public delta: number;
    public elapsedTime: number = 0;
    public animation: Animation;
    public intersects: Vector3;
    public externalForce: Vector3 = new Vector3( 0, 0, 0);
    public wrapper: Object3D = new Object3D();

    public explosion: Explosion;

    private sizes = {

        height: 0,
        width: 0

    };

    constructor () {

        this.init();
        console.log('it worked!');

    };

    public init () : void {

        // Canvas
        this.canvas = document.querySelector( 'canvas.webglView' ) as HTMLCanvasElement;

        // Sizes
        this.sizes.width = window.innerWidth,
        this.sizes.height = window.innerHeight;

        // Scene
        this.scene = new Scene();
        this.scene.background = new Color( '#c9e1ff' );

        // Camera
        this.camera = new PerspectiveCamera( 25, this.sizes.width / this.sizes.height, 0.1, 500 );
        this.cameraDepth = new PerspectiveCamera( 25, this.sizes.width / this.sizes.height, 0.1, 4 );
        this.camera.position.set( 6, 5.6, 6 );
        this.scene.add( this.camera );

        //  Axes Helper
        const axesHelper = new AxesHelper( 5 );
        // this.scene.add( axesHelper );

        // Light
        const light = new PointLight( '#ffffff', 4 );
        light.position.set( 0, 7, 7 );
        this.scene.add( light );

        // Controls
        this.mapControls = new MapControls( this.camera, this.canvas );

        // Renderer
        this.renderer = new WebGLRenderer( { canvas: this.canvas } );
        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

        // Plane
        let planeGeometry = new PlaneBufferGeometry( 5, 5, 1, 1 );
        let planeMaterial = new MeshBasicMaterial( { color: '#fcf3d7' } );
        let plane = new Mesh( planeGeometry, planeMaterial );
        plane.rotation.x -= Math.PI / 2;
        plane.rotation.z -= Math.PI / 3;
        this.scene.add( plane );

        // Resize
        window.addEventListener( 'resize', this.resize() );

        //

        this.clock = new Clock();

        //

        this.createExplosion();
        this.debug();

        this.tick();

        // this.debug();

    };

    public createExplosion () : void {

        if ( this.explosion ) {

            this.explosion.blastSphere.material.dispose();
            this.explosion.blastSphere.geometry.dispose();
            this.explosion.blastFog.material.dispose();
            this.explosion.blastFog.geometry.dispose();
            this.explosion.groundShockWave.geometry.dispose();
            this.explosion.groundShockWave.material.dispose();

            this.scene.remove( this.explosion.blastSphere.wrapper );
            this.scene.remove( this.explosion.blastFog.wrapper );
            this.scene.remove( this.explosion.groundShockWave.wrapper );

        }

        this.explosion = new Explosion();

        this.scene.add( this.explosion.groundShockWave.wrapper );
        this.scene.add( this.explosion.blastFog.wrapper );
        this.scene.add( this.explosion.blastSphere.wrapper );

    };

    private resize () : any {

        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

    };

    public debug () : void {

        let  props = {

            fogInnerColor: '#ff0000',
            fogOuterColor: '#FFCE00',
            sphereInnerColor: '#ff0000',
            sphereOuterColor: '#FFCE00'

        }

        let pane = new Pane(  { title: "Explosion" } ); //  expanded: false
        let paneSphere = pane.addFolder( { title: "Sphere" } );
        let paneFog = pane.addFolder( { title: "Fog" } );
        let explosionSize = pane.addFolder( { title: "Size" } );
        let explosionSpeed = pane.addFolder( { title: "Speed" } );
        let explosionFade = pane.addFolder( { title: "Fading" } );
        pane.element.parentElement.style['width'] = '330px';

        paneSphere.addInput( props, 'sphereInnerColor' ).on( 'change', () => {

            this.explosion.blastSphere.material.uniforms.uInnerColor.value.setHex( parseInt( props.sphereInnerColor.replace( '#', '0x' ) ) )

        } );

        paneSphere.addInput( props, 'sphereOuterColor' ).on( 'change', () => {

            this.explosion.blastSphere.material.uniforms.uInnerColor.value.setHex( parseInt( props.sphereOuterColor.replace( '#', '0x' ) ) )

        } );

        //

        paneFog.addInput( props, 'fogInnerColor' ).on( 'change', () => {

            this.explosion.blastFog.material.uniforms.uInnerColor.value.setHex( parseInt( props.fogInnerColor.replace( '#', '0x' ) ) )

        } );

        paneFog.addInput( props, 'fogOuterColor', ).on( 'change', () => {

            this.explosion.blastFog.material.uniforms.uInnerColor.value.setHex( parseInt( props.fogOuterColor.replace( '#', '0x' ) ) )

        } );

        // Sizes
        explosionSize.addInput( this.explosion.blastSphere, 'startSphereSize', { min: 0.01, max: 0.5, step: 0.001, label: 'sphere size' } ).on( 'change', ( options ) => {

            if ( this.explosion ) {

                this.explosion.blastSphere.material.dispose();
                this.explosion.blastSphere.geometry.dispose();
                this.explosion.blastFog.material.dispose();
                this.explosion.blastFog.geometry.dispose();
                this.explosion.groundShockWave.geometry.dispose();
                this.explosion.groundShockWave.material.dispose();

                this.scene.remove( this.explosion.blastSphere.wrapper );
                this.scene.remove( this.explosion.blastFog.wrapper );
                this.scene.remove( this.explosion.groundShockWave.wrapper );

            }

            this.explosion.blastSphere.startSphereSize = options.value;

            this.createExplosion();

        } );

        explosionSize.addInput( this.explosion.groundShockWave, 'size', { min: 1, max: 10, step: 0.1, label: 'ground shock wave size' } ).on( 'change', ( options ) => {

            if ( this.explosion ) {

                this.explosion.blastSphere.material.dispose();
                this.explosion.blastSphere.geometry.dispose();
                this.explosion.blastFog.material.dispose();
                this.explosion.blastFog.geometry.dispose();
                this.explosion.groundShockWave.geometry.dispose();
                this.explosion.groundShockWave.material.dispose();

                this.scene.remove( this.explosion.blastSphere.wrapper );
                this.scene.remove( this.explosion.blastFog.wrapper );
                this.scene.remove( this.explosion.groundShockWave.wrapper );

            }

            this.explosion.groundShockWave.size = options.value;

            this.createExplosion();

        } );

        // Speed
        explosionSize.addInput( this.explosion.blastFog, 'scaleX', { min: 1, max: 1000.0, step: 0.001, label: 'fog size' } ).on( 'change', ( options ) => {

            if ( this.explosion ) {

                this.explosion.blastSphere.material.dispose();
                this.explosion.blastSphere.geometry.dispose();
                this.explosion.blastFog.material.dispose();
                this.explosion.blastFog.geometry.dispose();
                this.explosion.groundShockWave.geometry.dispose();
                this.explosion.groundShockWave.material.dispose();

                this.scene.remove( this.explosion.blastSphere.wrapper );
                this.scene.remove( this.explosion.blastFog.wrapper );
                this.scene.remove( this.explosion.groundShockWave.wrapper );

            }

            for ( let i = 0; i < this.explosion.blastFog.numberOfSprites; i ++ ) {

                // this.explosion.blastFog.scaleX = options.value;
                // this.explosion.blastFog.scaleY = options.value;
                // this.explosion.blastFog.scaleZ = options.value;
                let scaleX = this.explosion.blastFog.geometry.attributes.transformRow1.getX( i );
                let scaleY = this.explosion.blastFog.geometry.attributes.transformRow2.getY( i );
                let scaleZ = this.explosion.blastFog.geometry.attributes.transformRow3.getZ( i );

                this.explosion.blastFog.geometry.attributes.transformRow1.setX( scaleX * options.value, i );
                this.explosion.blastFog.geometry.attributes.transformRow2.setY( scaleY * options.value, i );
                this.explosion.blastFog.geometry.attributes.transformRow3.setZ( scaleZ * options.value, i );

            };

            this.explosion.blastFog.geometry.attributes.transformRow1.needsUpdate = true;
            this.explosion.blastFog.geometry.attributes.transformRow2.needsUpdate = true;
            this.explosion.blastFog.geometry.attributes.transformRow3.needsUpdate = true;

            this.createExplosion();

        } );

        // Fading
        explosionSpeed.addInput( this.explosion.groundShockWave.material.uniforms.uFadingCoef, 'value', { min: 1, max: 100.0, step: 0.001, label: 'ground shock wave fading' } ).on( 'change', ( options ) => {

            if ( this.explosion ) {

                this.explosion.blastSphere.material.dispose();
                this.explosion.blastSphere.geometry.dispose();
                this.explosion.blastFog.material.dispose();
                this.explosion.blastFog.geometry.dispose();
                this.explosion.groundShockWave.geometry.dispose();
                this.explosion.groundShockWave.material.dispose();

                this.scene.remove( this.explosion.blastSphere.wrapper );
                this.scene.remove( this.explosion.blastFog.wrapper );
                this.scene.remove( this.explosion.groundShockWave.wrapper );

            }

            this.explosion.groundShockWave.material.uniforms.uFadingCoef.value = options.value;

            this.createExplosion();

        } );

        explosionSpeed.addInput( this.explosion.blastFog, 'opacity', { min: 1, max: 100.0, step: 0.001, label: 'fog fading' } ).on( 'change', ( options ) => {

            if ( this.explosion ) {

                this.explosion.blastSphere.material.dispose();
                this.explosion.blastSphere.geometry.dispose();
                this.explosion.blastFog.material.dispose();
                this.explosion.blastFog.geometry.dispose();
                this.explosion.groundShockWave.geometry.dispose();
                this.explosion.groundShockWave.material.dispose();

                this.scene.remove( this.explosion.blastSphere.wrapper );
                this.scene.remove( this.explosion.blastFog.wrapper );
                this.scene.remove( this.explosion.groundShockWave.wrapper );

            }

            for ( let i = 0; i < this.explosion.blastFog.numberOfSprites; i ++ ) {

                this.explosion.blastFog.opacityDecrease[ i ] = options.value;

            };

            this.createExplosion();

        } );

        explosionFade.addInput( this.explosion.groundShockWave.material.uniforms.uFadingCoef, 'value', { min: 1, max: 100.0, step: 0.001, label: 'ground shock wavw fading' } ).on( 'change', ( options ) => {

            if ( this.explosion ) {

                this.explosion.blastSphere.material.dispose();
                this.explosion.blastSphere.geometry.dispose();
                this.explosion.blastFog.material.dispose();
                this.explosion.blastFog.geometry.dispose();
                this.explosion.groundShockWave.geometry.dispose();
                this.explosion.groundShockWave.material.dispose();

                this.scene.remove( this.explosion.blastSphere.wrapper );
                this.scene.remove( this.explosion.blastFog.wrapper );
                this.scene.remove( this.explosion.groundShockWave.wrapper );

            }

            this.explosion.groundShockWave.material.uniforms.uFadingCoef.value = options.value;

            this.createExplosion();

        } );


    };

    public tick = () : void => {

        window.requestAnimationFrame( this.tick );

        this.delta = this.clock.getDelta() * 1000;
        this.elapsedTime += this.delta;

        if ( this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight ) {

            this.resize();

        }

        //

        if ( this.explosion ) this.explosion.update( this.delta, this.externalForce, this.elapsedTime );

        this.mapControls.update();
        this.renderer.render( this.scene, this.camera );

    };

};

export default new MainScene();