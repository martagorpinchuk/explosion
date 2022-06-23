import { AxesHelper, Clock, Color, Euler, Float32BufferAttribute, Matrix4, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneBufferGeometry, PlaneGeometry, PointLight, Quaternion, Scene, SphereBufferGeometry, Vector3, WebGLRenderer } from "three";
import { MapControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ExplosionGfx } from "./ExplosionGfx";
import { ExplosionMaterial } from "./shaders/Explosion.Shader";
import { CircleMaterial } from './shaders/CirclesOnTheFlor.Shader';
import { SphereMaterial } from './shaders/Sphere.Shader';
import { Pane } from "tweakpane";

//

class ModelScene {

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
    public explosionMaterial: ExplosionMaterial;
    public explosion: ExplosionGfx;
    public animation: Animation;
    public intersects: Vector3;
    public circleMaterial: CircleMaterial;
    public sphereMaterial: SphereMaterial;

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

        this.addExplosion();
        this.addCircleOnTheGround();
        this.addSphere();
        // this.addCircleOnTheGround();

        this.debug();

        this.tick();

    };

    public addExplosion () : void {

        // Explosion
        let props = {

            numberOfSprites: 16,
            height: 1,
            width: 1,
            depth: 1,
            outerColor: '#331402',
            innerColor: '#ffd675',
            newPosition: new Vector3( 0, 0.5, 0 )

        }
        this.explosion = new ExplosionGfx( new Color().setHex( + props.outerColor.replace( '#', '0x' ) ).getHex(), props.numberOfSprites, props.height, props.width, props.depth );
        this.animation = new Animation();
        this.scene.add( this.explosion.wrapper );

    };

    public addCircleOnTheGround () : void {

        let circleGeom = new PlaneBufferGeometry( 1, 1 );
        this.circleMaterial = new CircleMaterial();
        let circle = new Mesh( circleGeom, this.circleMaterial );

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

        circleGeom.setAttribute( 'brightness', new Float32BufferAttribute( brightness, 1 ) );
        circleGeom.setAttribute( 'transformRow1', new Float32BufferAttribute( new Float32Array( transformRow1 ), 4 ) );
        circleGeom.setAttribute( 'transformRow2', new Float32BufferAttribute( new Float32Array( transformRow2 ), 4 ) );
        circleGeom.setAttribute( 'transformRow3', new Float32BufferAttribute( new Float32Array( transformRow3 ), 4 ) );
        circleGeom.setAttribute( 'transformRow4', new Float32BufferAttribute( new Float32Array( transformRow4 ), 4 ) );

        this.scene.add( circle );

    };

    public addSphere () : void {

        let sphereGeom = new SphereBufferGeometry( 0.01, 100 );
        this.sphereMaterial = new SphereMaterial();
        let sphere = new Mesh( sphereGeom, this.sphereMaterial );

        this.scene.add( sphere );

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
        pane.element.parentElement.style['width'] = '330px';

        paneSphere.addInput( props, 'sphereInnerColor' ).on( 'change', () => {

            this.sphereMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.sphereInnerColor.replace( '#', '0x' ) ) )

        } );

        paneSphere.addInput( props, 'sphereOuterColor' ).on( 'change', () => {

            this.sphereMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.sphereOuterColor.replace( '#', '0x' ) ) )

        } );

        //

        paneFog.addInput( props, 'fogInnerColor' ).on( 'change', () => {

            this.explosionMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.fogInnerColor.replace( '#', '0x' ) ) )

        } );

        paneFog.addInput( props, 'fogOuterColor' ).on( 'change', () => {

            this.explosionMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.fogOuterColor.replace( '#', '0x' ) ) )

        } );

    };

    private resize () : any {

        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( this.sizes.width, this.sizes.height );
        this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );

    };

    public tick = () : void => {

        window.requestAnimationFrame( this.tick );

        this.delta = this.clock.getDelta() * 1000;
        this.elapsedTime += this.delta;

        if ( this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight ) {

            this.resize();

        }

        //

        let explosionPosition = new Vector3( 0, 0, 0 );
        if ( this.explosion ) this.explosion.update( this.delta, explosionPosition, this.explosion.externalForce );

        this.explosion.material.uniforms.uTime.value = this.elapsedTime;
        this.circleMaterial.uniforms.uTime.value = this.elapsedTime;
        this.sphereMaterial.uniforms.uTime.value = this.elapsedTime;

        this.mapControls.update();
        this.renderer.render( this.scene, this.camera );

    };

};

export default new ModelScene();