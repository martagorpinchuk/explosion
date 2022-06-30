import { GroundShockWave } from './GroundShockWave';
import { BlastSphere } from './BlastSphere';
import { BlastFog } from './BlastFog';
import { Color, Vector3 } from 'three';
import { MainScene } from './index';

//

export class Explosion {

    public blastFog: BlastFog;
    public blastSphere: BlastSphere;
    public groundShockWave: GroundShockWave;
    public animation: Animation;

    public mainScene: MainScene = new MainScene();

    constructor () {

        console.log('explosion here!');

        this.addBlastFog();
        this.addBlastSphere();
        this.addGroundShockWave();

    };

    public addBlastFog () : void {

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
        this.blastFog = new BlastFog( new Color().setHex( + props.outerColor.replace( '#', '0x' ) ).getHex(), props.numberOfSprites, props.height, props.width, props.depth );
        this.animation = new Animation();
        this.mainScene.scene.add( this.blastFog.wrapper );

    };

    public addBlastSphere () : void {

        this.blastSphere = new BlastSphere();
        // this.mainScene.scene.add( this.blastSphere.wrapper );

    };

    public addGroundShockWave () : void {

        this.groundShockWave = new GroundShockWave();
        // this.mainScene.scene.add( this.groundShockWave.wrapper );

    };

    public update ( delta, externalForce, elapsedTime ) : void {

        let explosionPosition = new Vector3( 0, 0, 0 );
        this.blastFog.update( delta, explosionPosition, externalForce );
        this.blastSphere.update( elapsedTime );
        this.groundShockWave.update( elapsedTime );

    };

    // public debug () : void {

    //     let  props = {

    //         fogInnerColor: '#ff0000',
    //         fogOuterColor: '#FFCE00',
    //         sphereInnerColor: '#ff0000',
    //         sphereOuterColor: '#FFCE00'

    //     }

    //     let pane = new Pane(  { title: "Explosion" } ); //  expanded: false
    //     let paneSphere = pane.addFolder( { title: "Sphere" } );
    //     let paneFog = pane.addFolder( { title: "Fog" } );
    //     pane.element.parentElement.style['width'] = '330px';

    //     paneSphere.addInput( props, 'sphereInnerColor' ).on( 'change', () => {

    //         this.sphereMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.sphereInnerColor.replace( '#', '0x' ) ) )

    //     } );

    //     paneSphere.addInput( props, 'sphereOuterColor' ).on( 'change', () => {

    //         this.sphereMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.sphereOuterColor.replace( '#', '0x' ) ) )

    //     } );

    //     //

    //     paneFog.addInput( props, 'fogInnerColor' ).on( 'change', () => {

    //         this.explosionMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.fogInnerColor.replace( '#', '0x' ) ) )

    //     } );

    //     paneFog.addInput( props, 'fogOuterColor' ).on( 'change', () => {

    //         this.explosionMaterial.uniforms.uInnerColor.value.setHex( parseInt( props.fogOuterColor.replace( '#', '0x' ) ) )

    //     } );

    // };

};
