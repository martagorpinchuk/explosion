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

    // public mainScene: MainScene = new MainScene();

    constructor () {

        console.log('explosion here!');

        this.addBlastSphere();
        this.addBlastFog();
        this.addGroundShockWave();

    };

    public addBlastSphere () : void {

        this.blastSphere = new BlastSphere();
        this.animation = new Animation();
        // this.mainScene.scene.add( this.blastSphere.wrapper );

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
        // this.mainScene.scene.add( this.blastFog.wrapper );

    };

    public addGroundShockWave () : void {

        this.groundShockWave = new GroundShockWave();
        this.animation = new Animation();
        // this.mainScene.scene.add( this.groundShockWave.wrapper );

    };

    public update ( delta, externalForce, elapsedTime ) : void {

        let explosionPosition = new Vector3( 0, 0, 0 );

        this.blastFog.update( delta, explosionPosition, externalForce );
        this.blastSphere.update( elapsedTime );
        this.groundShockWave.update( elapsedTime );

    };

};
