import { Box3, Vector3, AudioListener, Audio, AudioLoader } from "../vendors/three.module.js"

class Player {
    constructor(camera, input) {
        this._camera = camera
        this._input = input

        this._velocity = new Vector3(0, 1.8, 0)
        this._direction = new Vector3()

        this._box3 = new Box3()
        this._box3Size = new Vector3(1.5, 1, 1.5)

        const listener = new AudioListener()
        const audioLoader = new AudioLoader()
        this._camera._camera.add(listener)
        this._sound = new Audio(listener)
        audioLoader.load('../assets/audio/footstep00.ogg', buffer => {
            this._sound.setBuffer(buffer)
            this._sound.setLoop(true)
            this._sound.setVolume(0.5)
        })
    }

    get Position() {
        return this._camera._camera.position
    }

    stopSound() {
        this._sound.stop()
    }

    update(dt, walls) {
        this._velocity.z -= this._velocity.z * 10 * dt
        this._velocity.x -= this._velocity.x * 10 * dt

        this._direction.z = Number(this._input._keys.KeyW) - Number(this._input._keys.KeyS)
        this._direction.x = Number(this._input._keys.KeyD) - Number(this._input._keys.KeyA)
        this._direction.normalize()

        if (this._input._keys.KeyW || this._input._keys.KeyS) {
            this._velocity.z -= this._direction.z * 100 * dt
        }
        if (this._input._keys.KeyD || this._input._keys.KeyA) {
            this._velocity.x -= this._direction.x * 100 * dt
        }

        this._camera._pointerLock.moveForward(-this._velocity.z * dt)
        this._camera._pointerLock.moveRight(-this._velocity.x * dt)

        if (this._direction.z !== 0 || this._direction.x !== 0) {
            if (!this._sound.isPlaying) {
                this._sound.play()
            }
        } else {
            if (this._sound.isPlaying) {
                this._sound.stop()
            }
        }

        this._box3.setFromCenterAndSize(this._camera._camera.position, this._box3Size)
        for (let box of walls.Boxes) {
            if (this._box3.intersectsBox(box)) {
                this._camera._pointerLock.moveForward(this._velocity.z * dt)
                this._camera._pointerLock.moveRight(this._velocity.x * dt)
                
                if (this._sound.isPlaying) {
                    this._sound.stop()
                }
                break
            }
        }
    }
}

export default Player