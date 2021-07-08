
class Input {
    constructor() {
        this._keys = {
            KeyW: false,
            KeyS: false,
            KeyD: false,
            KeyA: false,

            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,

        }
        this._click = {
            left: false,
            right: false,
            middle: false
        }

        document.addEventListener('keydown', e => this._onKeyDown(e))
        document.addEventListener('keyup', e => this._onKeyUp(e))

    }

    _onKeyDown(e) {
        switch (e.code) {
            case "KeyW":
                this._keys.KeyW = true
                break
            case "KeyS":
                this._keys.KeyS = true
                break
            case "KeyD":
                this._keys.KeyD = true
                break
            case "KeyA":
                this._keys.KeyA = true
                break
            case "ArrowUp":
                this._keys.ArrowUp = true
                break
            case "ArrowDown":
                this._keys.ArrowDown = true
                break
            case "ArrowRight":
                this._keys.ArrowRight = true
                break
            case "ArrowLeft":
                this._keys.ArrowLeft = true
                break
        }
    }

    _onKeyUp(e) {
        switch (e.code) {
            case "KeyW":
                this._keys.KeyW = false
                break
            case "KeyS":
                this._keys.KeyS = false
                break
            case "KeyD":
                this._keys.KeyD = false
                break
            case "KeyA":
                this._keys.KeyA = false
                break
            case "ArrowUp":
                this._keys.ArrowUp = false
                break
            case "ArrowDown":
                this._keys.ArrowDown = false
                break
            case "ArrowRight":
                this._keys.ArrowRight = false
                break
            case "ArrowLeft":
                this._keys.ArrowLeft = false
                break
        }
    }

    _onClick() {

    }
}

export default Input