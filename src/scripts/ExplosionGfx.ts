import { GroundShockWave } from './GroundShockWave';
import { BlastSphere } from './BlastSphere';
import { BlastFog } from './BlastFog';
import { Color, Vector3 } from 'three';

//

export class Explosion {

    public blastFog: BlastFog;
    public blastSphere: BlastSphere;
    public groundShockWave: GroundShockWave;
    public animation: Animation;
    public startFogSize: number = 0;
    public startSphereSize: number = 0.01;
    public startWaveSize: number = 1;
    public fogSpeed: number = 1;
    public sphereSpeed: number = 1;
    public waveSpeed: number = 1;

    constructor () {

        console.log('explosion here!');

        this.addBlastSphere( this.startSphereSize );
        this.addBlastFog( this.startFogSize );
        this.addGroundShockWave( this.startWaveSize );

    };

    public addBlastSphere ( startSphereSize ) : void {

        this.blastSphere = new BlastSphere( startSphereSize );
        this.animation = new Animation();

    };

    public addBlastFog ( startFogSize ) : void {

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
        this.blastFog = new BlastFog( new Color().setHex( + props.outerColor.replace( '#', '0x' ) ).getHex(), props.numberOfSprites, props.height, props.width, props.depth, startFogSize );
        this.animation = new Animation();

    };

    public addGroundShockWave ( startWaveSize ) : void {

        this.groundShockWave = new GroundShockWave( startWaveSize );
        this.animation = new Animation();

    };

    public update ( delta, externalForce, elapsedTime ) : void {

        let explosionPosition = new Vector3( 0, 0, 0 );

        this.blastFog.update( delta * this.fogSpeed, explosionPosition, externalForce );
        this.blastSphere.update( elapsedTime * this.sphereSpeed );
        this.groundShockWave.update( elapsedTime * this.waveSpeed );

    };

};
