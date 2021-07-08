import {
    WebGLRenderer, Scene, GridHelper, AxesHelper,
    DirectionalLight, AmbientLight, sRGBEncoding
} from '../vendors/three.module.js'
import Stats from '../vendors/stats.module.js'

class World {
    constructor(canvas) {
        this._renderer = new WebGLRenderer({
            canvas,
            antialias: true
        })
        this._renderer.physicallyCorrectLights = true
        this._renderer.gammaFactor = 2.2
        this._renderer.outputEncoding = sRGBEncoding
        this._renderer.setSize(canvas.clientWidth, canvas.clientHeight)
        this._scene = new Scene()

        if (window.ENV === 'dev') {
            const grid = new GridHelper(200, 20)
            const axes = new AxesHelper(10)

            const dLight = new DirectionalLight(0xFFFFFF, 1)
            dLight.position.set(-5, 10, 0)
            const aLight = new AmbientLight(0.1)

            this._scene.add(grid)
            this._scene.add(axes)
            this._scene.add(dLight)
            this._scene.add(aLight)

            this._stats = new Stats()
            document.body.appendChild(this._stats.dom)
        }
    }

    addChildren(children) {
        if (Array.isArray(children)) {
            children.forEach(child => {
                this._scene.add(child)
            })
        } else {
            this._scene.add(children)
        }
    }

    setSize(width, height) {
        this._renderer.setSize(width, height)
    }

    render(camera) {
        this._stats.update()
        this._renderer.render(this._scene, camera)
    }
}

export default World