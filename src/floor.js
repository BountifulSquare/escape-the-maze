import { Mesh, PlaneGeometry, MeshBasicMaterial, TextureLoader } from "../vendors/three.module.js"

class Floor {
    constructor() {
        const geo = new PlaneGeometry(100, 100)
        const mat = new MeshBasicMaterial({
            color: 0xF0F0F0
        })

        this._floor = new Mesh(geo, mat)
        this._floor.rotation.x = -Math.PI / 2
    }

    get Mesh() {
        return this._floor
    }
}

export default Floor