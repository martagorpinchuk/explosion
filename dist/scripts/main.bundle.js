/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/ExplosionGfx.ts":
/*!*************************************!*\
  !*** ./src/scripts/ExplosionGfx.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExplosionGfx = void 0;
const three_2 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const Explosion_Shader_1 = __webpack_require__(/*! ./shaders/Explosion.Shader */ "./src/scripts/shaders/Explosion.Shader.ts");
//
class ExplosionGfx {
    //
    constructor(color, numberOfSprites, height, width, depth) {
        this.numberOfSprites = 60;
        this.height = 1;
        this.width = 1;
        this.depth = 1;
        this.density = 105;
        this.velocity = [];
        this.positions = [];
        this.randomPos = (Math.random() - 0.5) * 2;
        this.speedSizeChange = 0.137;
        this.coordEpearingParticle = 0.3;
        this.opacityCoef = 0.00999;
        this.wrapper = new three_2.Object3D();
        this.newPosition = new three_2.Vector3(0, 0.5, 0);
        this.soursePosition = new three_2.Vector3(0, 0.5, 0);
        this.cubeVisibility = true;
        this.sizeCoef = 0.1;
        this.externalForce = new three_2.Vector3(0, 0, 0);
        this._frameDuration = 300;
        this.height = height;
        this.width = width;
        this.depth = depth;
        this.numberOfSprites = numberOfSprites;
        // create explosion
        this.material = new Explosion_Shader_1.ExplosionMaterial();
        this.material.side = three_2.DoubleSide;
        this.material.uniforms.uColor.value.setHex(color);
        this.material.uniforms.uFrameDuration.value = this._frameDuration;
        this.generate(this.density, this.height, this.width, this.depth, this.newPosition);
    }
    ;
    generate(density, height, width, depth, newPosition) {
        const boxGeometry = new three_2.BoxGeometry(1, 1, 1);
        const boxMaterial = new three_2.MeshBasicMaterial({ color: 0x00ff00 });
        boxMaterial.wireframe = true;
        if (!this.cube) {
            this.cube = new three_2.Mesh(boxGeometry, boxMaterial);
            // this.wrapper.add( this.cube );
        }
        if (this.mesh) {
            this.geometry.dispose();
            boxGeometry.dispose();
            this.wrapper.remove(this.mesh);
        }
        this.newPosition.x = newPosition.x;
        this.newPosition.y = newPosition.y;
        this.newPosition.z = newPosition.z;
        this.height = height;
        this.width = width;
        this.depth = depth;
        let explosionPointPosition = new three_2.Vector3(0, 0, 0);
        this.numberOfSprites = density * height * width * depth;
        let size = [], uv, offsetFrame = [], sizeIncrease = [], opacityDecrease = [], color = [];
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        for (let i = 0; i < this.numberOfSprites; i++) {
            let x = (Math.random() - 0.5) * width * 0.01;
            let y = Math.random() * height * 0.01;
            let z = (Math.random() - 0.5) * depth * 0.01;
            let distanceX = explosionPointPosition.x - x;
            let distanceY = y - explosionPointPosition.y;
            let distanceZ = explosionPointPosition.z - z;
            if (Math.abs(distanceX) > width / 2.5 - Math.random() - 0.5) {
                distanceX -= Math.random() - 0.5;
            }
            if (Math.abs(distanceY) > height / 2.5 - Math.random() - 0.5) {
                distanceY -= Math.random() - 0.5;
            }
            if (Math.abs(distanceZ) > depth / 2.5 - Math.random() - 0.5) {
                distanceZ -= Math.random() - 0.5;
            }
            let scaleX = 0.01;
            let scaleY = 0.01;
            let scaleZ = 0.01;
            const rotationX = 0;
            const rotationY = 0;
            const rotationZ = 0;
            let transformMatrix = new three_2.Matrix4().compose(new three_2.Vector3(distanceX, distanceY, distanceZ), new three_2.Quaternion().setFromEuler(new three_2.Euler(rotationX, rotationY, rotationZ)), new three_2.Vector3(scaleX, scaleY, scaleZ)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
            size.push(0);
            sizeIncrease.push(Math.random() * 0.02);
            opacityDecrease.push(Math.random() * 1.2);
            this.velocity.push((Math.random() - 0.5) * 2 / 100, (Math.random() - 0.5) * 2 / 100, (Math.random() - 0.5) * 2 / 100);
            offsetFrame.push(Math.floor(Math.random() * 50 * 16));
        }
        this.positions = [
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0,
            1.0, 1.0, 0.0,
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0
        ];
        uv = [
            0, 0,
            1, 0,
            1, 1,
            1, 1,
            0, 1,
            0, 0
        ];
        this.geometry = new three_2.InstancedBufferGeometry();
        this.geometry.setAttribute('position', new three_2.Float32BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('uv', new three_2.Float32BufferAttribute(uv, 2));
        this.geometry.setAttribute('transformRow1', new three_2.InstancedBufferAttribute(new Float32Array(transformRow1), 4));
        this.geometry.setAttribute('transformRow2', new three_2.InstancedBufferAttribute(new Float32Array(transformRow2), 4));
        this.geometry.setAttribute('transformRow3', new three_2.InstancedBufferAttribute(new Float32Array(transformRow3), 4));
        this.geometry.setAttribute('transformRow4', new three_2.InstancedBufferAttribute(new Float32Array(transformRow4), 4));
        this.geometry.setAttribute('offsetFrame', new three_2.InstancedBufferAttribute(new Float32Array(offsetFrame), 1));
        this.geometry.setAttribute('velocity', new three_2.InstancedBufferAttribute(new Float32Array(this.velocity), 3));
        this.geometry.setAttribute('opacityDecrease', new three_2.InstancedBufferAttribute(new Float32Array(opacityDecrease), 1));
        this.geometry.setAttribute('size', new three_2.InstancedBufferAttribute(new Float32Array(size), 1));
        this.mesh = new three_2.Mesh(this.geometry, this.material);
        this.wrapper.add(this.mesh);
    }
    ;
    update(delta, intersects, externalForce) {
        for (let i = 0; i < this.numberOfSprites; i++) {
            const newSize = this.geometry.attributes.size.getX(i) + this.speedSizeChange * this.sizeCoef;
            this.geometry.attributes.size.setX(i, newSize);
            let velosityX = this.geometry.attributes.velocity.getX(i);
            let velosityY = this.geometry.attributes.velocity.getY(i);
            let velosityZ = this.geometry.attributes.velocity.getZ(i);
            let newPosX = this.geometry.attributes.transformRow4.getX(i);
            let newPosY = this.geometry.attributes.transformRow4.getY(i);
            let newPosZ = this.geometry.attributes.transformRow4.getZ(i);
            let velosityAccelerationX = (intersects.x - newPosX + externalForce.x) / 200;
            let velosityAccelerationY = (intersects.y - newPosY + externalForce.y) / 200;
            ;
            let velosityAccelerationZ = (intersects.z - newPosZ + externalForce.z) / 200;
            const newOpacity = this.geometry.attributes.opacityDecrease.getX(i) - this.opacityCoef;
            this.geometry.attributes.opacityDecrease.setX(i, newOpacity);
            newPosX += ((velosityX + velosityAccelerationX * newOpacity) * delta) / 16;
            newPosY += ((velosityY + velosityAccelerationY * newOpacity) * delta) / 16;
            newPosZ += ((velosityZ + velosityAccelerationZ * newOpacity) * delta) / 16;
            if (newOpacity <= 0.001) {
                newPosX = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.x;
                newPosY = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.y;
                newPosZ = (Math.random() - 0.5) * this.coordEpearingParticle + this.soursePosition.z;
                this.geometry.attributes.size.setX(i, 0);
                // this.geometry.attributes.opacityDecrease.setX( i, 1 );
            }
            this.geometry.attributes.transformRow4.setX(i, newPosX);
            this.geometry.attributes.transformRow4.setY(i, newPosY);
            this.geometry.attributes.transformRow4.setZ(i, newPosZ);
        }
        this.geometry.attributes.opacityDecrease.needsUpdate = true;
        this.geometry.attributes.size.needsUpdate = true;
        this.geometry.attributes.transformRow4.needsUpdate = true;
    }
    ;
    //
    get frameDuration() {
        return this._frameDuration;
    }
    ;
    set frameDuration(frameDuration) {
        this.material.uniforms.uFrameDuration.value = frameDuration;
        this._frameDuration = this.material.uniforms.uFrameDuration.value;
    }
    ;
    get outerColor() {
        return this._outerColor;
    }
    ;
    set outerColor(color) {
        this._outerColor = color;
        if (typeof color === 'string') {
            this.material.uniforms.uColor.value.setHex(parseInt(color.replace('#', '0x')));
        }
        else {
            this.material.uniforms.uColor.value.setHex(color);
        }
    }
    ;
    get innerColor() {
        return this._innerColor;
    }
    ;
    set innerColor(color) {
        this._innerColor = color;
        if (typeof color === 'string') {
            this.material.uniforms.uInnerColor.value.setHex(parseInt(color.replace('#', '0x')));
        }
        else {
            this.material.uniforms.uInnerColor.value.setHex(color);
        }
    }
    ;
}
exports.ExplosionGfx = ExplosionGfx;


/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const three_1 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
const OrbitControls_js_1 = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
const ExplosionGfx_1 = __webpack_require__(/*! ./ExplosionGfx */ "./src/scripts/ExplosionGfx.ts");
const CirclesOnTheFlor_Shader_1 = __webpack_require__(/*! ./shaders/CirclesOnTheFlor.Shader */ "./src/scripts/shaders/CirclesOnTheFlor.Shader.ts");
const Sphere_Shader_1 = __webpack_require__(/*! ./shaders/Sphere.Shader */ "./src/scripts/shaders/Sphere.Shader.ts");
//
class ModelScene {
    constructor() {
        this.elapsedTime = 0;
        this.sizes = {
            height: 0,
            width: 0
        };
        this.tick = () => {
            window.requestAnimationFrame(this.tick);
            this.delta = this.clock.getDelta() * 1000;
            this.elapsedTime += this.delta;
            if (this.sizes.width !== window.innerWidth || this.sizes.height !== window.innerHeight) {
                this.resize();
            }
            //
            // let explosionPosition = new Vector3( 0, 0, 0 );
            // this.explosion.update( this.delta, explosionPosition, this.explosion.externalForce );
            // this.explosion.material.uniforms.uTime.value = this.elapsedTime;
            this.circleMaterial.uniforms.uTime.value = this.elapsedTime;
            // this.sphereMaterial.uniforms.uTime.value = this.elapsedTime;
            this.mapControls.update();
            this.renderer.render(this.scene, this.camera);
        };
        this.init();
        console.log('it worked!');
    }
    ;
    init() {
        // Canvas
        this.canvas = document.querySelector('canvas.webglView');
        // Sizes
        this.sizes.width = window.innerWidth,
            this.sizes.height = window.innerHeight;
        // Scene
        this.scene = new three_1.Scene();
        this.scene.background = new three_1.Color('#c9e1ff');
        // Camera
        this.camera = new three_1.PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.1, 500);
        this.cameraDepth = new three_1.PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.1, 4);
        this.camera.position.set(6, 5.6, 6);
        this.scene.add(this.camera);
        //  Axes Helper
        const axesHelper = new three_1.AxesHelper(5);
        // this.scene.add( axesHelper );
        // Light
        const light = new three_1.PointLight('#ffffff', 4);
        light.position.set(0, 7, 7);
        this.scene.add(light);
        // Controls
        this.mapControls = new OrbitControls_js_1.MapControls(this.camera, this.canvas);
        // Renderer
        this.renderer = new three_1.WebGLRenderer({ canvas: this.canvas });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // Plane
        let planeGeometry = new three_1.PlaneBufferGeometry(5, 5, 1, 1);
        let planeMaterial = new three_1.MeshBasicMaterial({ color: '#fcf3d7' });
        let plane = new three_1.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x -= Math.PI / 2;
        plane.rotation.z -= Math.PI / 3;
        this.scene.add(plane);
        // Resize
        window.addEventListener('resize', this.resize());
        //
        this.clock = new three_1.Clock();
        // this.addExplosion();
        this.addCircleOnTheGround();
        // this.addSphere();
        this.tick();
    }
    ;
    addExplosion() {
        // Explosion
        let props = {
            numberOfSprites: 16,
            height: 1,
            width: 1,
            depth: 1,
            outerColor: '#ff0000',
            innerColor: '#FFCE00',
            newPosition: new three_1.Vector3(0, 0.5, 0)
        };
        this.explosion = new ExplosionGfx_1.ExplosionGfx(new three_1.Color().setHex(+props.outerColor.replace('#', '0x')).getHex(), props.numberOfSprites, props.height, props.width, props.depth);
        this.animation = new Animation();
        this.scene.add(this.explosion.wrapper);
    }
    ;
    addCircleOnTheGround() {
        let circleGeom = new three_1.PlaneBufferGeometry(1, 1);
        this.circleMaterial = new CirclesOnTheFlor_Shader_1.CircleMaterial();
        let circle = new three_1.Mesh(circleGeom, this.circleMaterial);
        const transformRow1 = [];
        const transformRow2 = [];
        const transformRow3 = [];
        const transformRow4 = [];
        let brightness = [];
        for (let i = 0; i < 50; i++) {
            brightness.push((Math.random() - 0.5) * 2);
            let rotationX = -Math.PI * 0.5;
            let rotationY = 0;
            let rotationZ = 0;
            let transformMatrix = new three_1.Matrix4().compose(new three_1.Vector3(0, 0.01, 0), new three_1.Quaternion().setFromEuler(new three_1.Euler(rotationX, rotationY, rotationZ)), new three_1.Vector3(1, 1, 1)).toArray();
            transformRow1.push(transformMatrix[0], transformMatrix[1], transformMatrix[2], transformMatrix[3]);
            transformRow2.push(transformMatrix[4], transformMatrix[5], transformMatrix[6], transformMatrix[7]);
            transformRow3.push(transformMatrix[8], transformMatrix[9], transformMatrix[10], transformMatrix[11]);
            transformRow4.push(transformMatrix[12], transformMatrix[13], transformMatrix[14], transformMatrix[15]);
        }
        circleGeom.setAttribute('brightness', new three_1.Float32BufferAttribute(brightness, 1));
        circleGeom.setAttribute('transformRow1', new three_1.Float32BufferAttribute(new Float32Array(transformRow1), 4));
        circleGeom.setAttribute('transformRow2', new three_1.Float32BufferAttribute(new Float32Array(transformRow2), 4));
        circleGeom.setAttribute('transformRow3', new three_1.Float32BufferAttribute(new Float32Array(transformRow3), 4));
        circleGeom.setAttribute('transformRow4', new three_1.Float32BufferAttribute(new Float32Array(transformRow4), 4));
        this.scene.add(circle);
    }
    ;
    addSphere() {
        let sphereGeom = new three_1.SphereBufferGeometry(0.35, 100);
        this.sphereMaterial = new Sphere_Shader_1.SphereMaterial();
        let sphere = new three_1.Mesh(sphereGeom, this.sphereMaterial);
        this.scene.add(sphere);
    }
    ;
    debug() {
    }
    ;
    resize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;
        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
    ;
}
;
exports["default"] = new ModelScene();


/***/ }),

/***/ "./src/scripts/shaders/CirclesOnTheFlor.Shader.ts":
/*!********************************************************!*\
  !*** ./src/scripts/shaders/CirclesOnTheFlor.Shader.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CircleMaterial = void 0;
const three_3 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
const textureLoader = new three_3.TextureLoader();
const circleTexture = textureLoader.load('resources/textures/circle.png');
class CircleMaterial extends three_3.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        varying vec2 vUv;

        attribute float brightness;
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;

        uniform float uTime;

        void main() {

            mat4 transforms = mat4 (
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * modelViewMatrix * transforms * vec4( position * uTime * 0.0009, 1.0 );

            vUv = uv;

        }`,
            this.transparent = true;
        this.alphaTest = 10.0001;
        this.fragmentShader = `
        varying vec2 vUv;

        uniform float uTime;
        uniform sampler2D uTexture;
        uniform vec3 uColor;

        void main() {

            vec2 centeredUv = vec2( vUv - 0.5 );
            float distanceToCenter = length( centeredUv );

            float circle = step( distanceToCenter, 0.5 );

            float strength = step( 0.02, abs( distance( vUv, vec2( 0.5 ) ) - 0.1 - uTime * 0.0001 ) );

            // if ( distanceToCenter > 0.47 ) { discard; }
            // if ( distanceToCenter < 0.4 ) { discard; }

            // gl_FragColor = vec4( vec3( strength ), 1.0 - uTime * 10.1 ); //* texture2D( uTexture, gl_PointCoord );

            gl_FragColor = texture2D( uTexture, vUv );
            gl_FragColor.rgb += uColor;

            gl_FragColor.a = 1.0;// - uTime * 0.0005;

        }`,
            this.uniforms = {
                uTime: { value: 0.0 },
                uTexture: { value: circleTexture },
                uColor: { value: new three_3.Color(0x2b1605) }
            };
    }
}
exports.CircleMaterial = CircleMaterial;
;


/***/ }),

/***/ "./src/scripts/shaders/Explosion.Shader.ts":
/*!*************************************************!*\
  !*** ./src/scripts/shaders/Explosion.Shader.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExplosionMaterial = void 0;
const three_5 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
let randomnum = Math.random();
const textureLoader = new three_5.TextureLoader();
const explosionTexture = textureLoader.load('resources/textures/explosion.png');
const noise = textureLoader.load('resources/textures/tNoise.png');
class ExplosionMaterial extends three_5.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        attribute vec4 transformRow1;
        attribute vec4 transformRow2;
        attribute vec4 transformRow3;
        attribute vec4 transformRow4;
        attribute float offsetFrame;
        attribute float size;
        attribute vec3 velocity;
        attribute float opacityDecrease;

        varying vec2 vUv;
        varying float vOffsetFrame;
        varying float vCurrentFrameId;
        varying float vNextFrameId;
        varying float vOpacityDecrease;
        varying float vOpacity;
        varying vec3 vPosition;

        uniform float uRandomNum;
        uniform sampler2D uNoise;
        uniform float uTime;
        uniform float uFrameDuration;
        uniform float uOpacity;

        void main() {

            float numOfFrames = 16.0;

            float currentFrameId = mod( floor( mod( uTime + offsetFrame, numOfFrames * uFrameDuration ) / uFrameDuration ), numOfFrames );

            float nextFrameId;
            if ( currentFrameId == numOfFrames - 1.0 ) {

                nextFrameId = 0.0;

            } else {

                nextFrameId = currentFrameId + 1.0;

            }

            mat4 transforms = mat4(
                transformRow1,
                transformRow2,
                transformRow3,
                transformRow4
            );

            gl_Position = projectionMatrix * ( modelViewMatrix * transforms * vec4(0.0, 0.0, 0.0, 1.0) + vec4( position * size, 1.0 ) );

            vUv = uv;
            vOffsetFrame = offsetFrame;
            vNextFrameId = nextFrameId;
            vCurrentFrameId  = currentFrameId;
            vOpacityDecrease = opacityDecrease;
            vOpacity = uOpacity;
            vPosition = transformRow4.xyz;

        }
        `,
            this.depthWrite = false;
        this.transparent = true;
        // this.wireframe = true;
        this.fragmentShader = `
        varying vec2 vUv;
        varying float vOffsetFrame;
        varying float vCurrentFrameId;
        varying float vNextFrameId;
        varying float vOpacityDecrease;
        varying float vOpacity;
        varying vec3 vPosition;

        uniform sampler2D uPointTexture;
        uniform float alphaTest;
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uFrameDuration;
        uniform vec3 uInnerColor;
        uniform float uTimeDuration;

        void main() {

            gl_FragColor = vec4( uColor, 0.04 );

            //

            vec4 offsets;

            offsets.y = floor( vCurrentFrameId / 4.0 ) * 0.25;
            offsets.x = mod( vCurrentFrameId, 4.0 ) * 0.25;

            offsets.w = floor( vNextFrameId / 4.0 ) * 0.25;
            offsets.z = mod( vNextFrameId, 4.0 ) * 0.25;

            //

            vec4 texture1 = texture2D( uPointTexture, vec2( vUv.x * 0.25 + offsets.x, vUv.y * 0.25 + offsets.y ) );
            vec4 texture2 = texture2D( uPointTexture, vec2( vUv.x * 0.25 + offsets.z, vUv.y * 0.25 + offsets.w ) );

            float fragmentTime = mod( uTime + vOffsetFrame, uFrameDuration ) / uFrameDuration;

            gl_FragColor = mix( texture1, texture2, fragmentTime );
            vec3 finalColor = uColor;

            finalColor = mix( uColor, uInnerColor, step( 0.3, vOpacityDecrease ) * vOpacityDecrease );

            gl_FragColor *= vec4( finalColor, vOpacityDecrease * vOpacity );

            if ( gl_FragColor.a < alphaTest ) discard;

        }
        `;
        this.uniforms = {
            uRandomNum: { value: randomnum },
            uPointTexture: { value: explosionTexture },
            uNoise: { value: noise },
            alphaTest: { value: 0.0001 },
            uColor: { value: new three_5.Color(0x1A75FF) },
            uTime: { value: 0.0 },
            uTimeX: { value: 0.0 },
            uTimeY: { value: 0.0 },
            uFrameDuration: { value: 16.0 },
            uOpacity: { value: 0.9 },
            uInnerColor: { value: new three_5.Color(0xFFCE00) },
        };
    }
}
exports.ExplosionMaterial = ExplosionMaterial;
;


/***/ }),

/***/ "./src/scripts/shaders/Sphere.Shader.ts":
/*!**********************************************!*\
  !*** ./src/scripts/shaders/Sphere.Shader.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SphereMaterial = void 0;
const three_2 = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
//
const textureLoader = new three_2.TextureLoader();
const noise = textureLoader.load('resources/textures/tNoise.png');
class SphereMaterial extends three_2.ShaderMaterial {
    constructor() {
        super();
        this.vertexShader = `
        uniform sampler2D uNoise;
        uniform float uTime;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vNoise;


        //
        vec3 mod289(vec3 x)
        {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 mod289(vec4 x)
        {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
        }

        vec4 permute(vec4 x)
        {
            return mod289(((x*34.0)+1.0)*x);
        }

        vec4 taylorInvSqrt(vec4 r)
        {
            return 1.79284291400159 - 0.85373472095314 * r;
        }

        vec3 fade(vec3 t) {
            return t*t*t*(t*(t*6.0-15.0)+10.0);
        }

        // Classic Perlin noise, periodic variant
        float pnoise(vec3 P, vec3 rep)
        {
            vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
            vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
            Pi0 = mod289(Pi0);
            Pi1 = mod289(Pi1);
            vec3 Pf0 = fract(P); // Fractional part for interpolation
            vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 * (1.0 / 7.0);
            vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 * (1.0 / 7.0);
            vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
            return 2.2 * n_xyz;
        }
        //

        float turbulence( vec3 p ) {

            float w = 100.0;
            float t = -.5;

            for (float f = 1.0 ; f <= 10.0 ; f++ ){
              float power = pow( 2.0, f );
              t += abs( pnoise( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
            }

            return t;

        }

        void main() {

            // float n = texture2D( uNoise, abs( normal.xy ) ).r * 0.15;

            float distortion = pnoise( ( normal * 0.98 + uTime * 0.0005 ) * 2.3, vec3( 100.0 ) ) * 0.105;

            vec3 newPosition = position + ( normal * distortion );
            newPosition.y += 0.2;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition + uTime * 0.0005, 1.0 );

            vUv = uv;
            vNormal = normal;
            vNoise = distortion;

        }`,
            this.transparent = true;
        this.fragmentShader = `
        uniform float uTime;
        uniform sampler2D uNoise;
        uniform vec3 uYellowColor;
        uniform vec3 uRedColor;
        uniform vec3 uOrangeColor;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying float vNoise;

        float random( vec3 scale, float seed ){
            return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
        }

        void main() {

            float r = 1.1 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
            float noise = texture2D( uNoise, abs( vNormal.xy ) ).r * 0.6;
            vec3 color = mix( uYellowColor, uRedColor, vNoise * 18.0 + r * 0.25 ); //+ noise * 1.0;
            // vec3 color = vec3( noise + r );
            color = mix( color, uOrangeColor, noise );

            gl_FragColor.rgb = color;
            gl_FragColor.a = 1.0 - uTime * 0.0006;

        }`,
            this.uniforms = {
                uTime: { value: 0.0 },
                uNoise: { value: noise },
                uYellowColor: { value: new three_2.Color(0xffd500) },
                uRedColor: { value: new three_2.Color(0x871a01) },
                uOrangeColor: { value: new three_2.Color(0xfa7305) }
            };
    }
}
exports.SphereMaterial = SphereMaterial;
;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunklive_city"] = self["webpackChunklive_city"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendor"], () => (__webpack_require__("./src/scripts/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map