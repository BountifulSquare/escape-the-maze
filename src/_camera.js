import { PerspectiveCamera } from "../vendors/three.module.js";
import { OrbitControls } from '../vendors/OrbitControls.js'
import { PointerLockControls } from '../vendors/PointerLockControls.js'

class Camera {
    constructor(canvasEL) {
        this._camera = new PerspectiveCamera(
            45,
            canvasEL.clientWidth / canvasEL.clientHeight,
            0.5,
            5000
        )
    }

    get Object3D() {
        return this._camera
    }

    updateAspect(aspect) {
        this._camera.aspect = aspect
        this._camera.updateProjectionMatrix()
    }
}

class OrbitCamera extends Camera {
    constructor(canvasEL) {
        super(canvasEL)
        this._camera.position.set(0, 20, 20)
        this._orbit = new OrbitControls(this._camera, canvasEL)
        this._orbit.update()
    }
}

class FirstPersonCamera extends Camera {
    constructor(canvasEL, stateManager) {
        super(canvasEL)
        this._stateManager = stateManager

        this._camera.position.set(-40, 1.8, 47)
        this._pointerLock = new PointerLockControls(this._camera, canvasEL)
        this._active = true

        canvasEL.addEventListener('lock', () => {
            if (this._active) {
                this._pointerLock.lock()
            }
        })

        canvasEL.addEventListener('unlock', () => {
            this._pointerLock.unlock()
        })

        this._pointerLock.addEventListener('lock', () => {
            this._stateManager.play()    
        })

        this._pointerLock.addEventListener('unlock', () => {
            if (this._stateManager.State === 1) {
                this._stateManager.pause()
            }
        })
    }
}

class CameraSwitch_dev {
    constructor(canvasEL) {
        this._orbitCamera = new OrbitCamera(canvasEL)
        this._firstPersonCamera = new FirstPersonCamera(canvasEL)
        this._currentActiveCamera = 'orbit'
        this._camera = this._orbitCamera

        document.addEventListener('keydown', (e) => {
            if (e.code === 'Numpad0') {
                if (this._currentActiveCamera === 'orbit') {

                    this._currentActiveCamera = 'firstPerson'
                    this._firstPersonCamera._active = true
                    this._camera = this._firstPersonCamera

                } else if (this._currentActiveCamera === 'firstPerson') {

                    this._currentActiveCamera = 'orbit'
                    this._firstPersonCamera._active = false
                    this._camera = this._orbitCamera
                
                }
            }
        })
    }

    get Object3D() {
        return this._camera.Object3D
    }
    get Orbit() {
        return this._camera._orbit
    }

    get Type() {
        return this._currentActiveCamera
    }

    updateAspect(aspect) {
        this._camera._camera.aspect = aspect
        this._camera._camera.updateProjectionMatrix()
    }
}

export { OrbitCamera, FirstPersonCamera, CameraSwitch_dev }