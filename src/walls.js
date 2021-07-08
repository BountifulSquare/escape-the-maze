import transformation from '../data/data.js'
import { Box3, BoxGeometry, Euler, InstancedMesh, Mesh, MeshStandardMaterial, Object3D, Vector3 } from '../vendors/three.module.js'


class Walls {
    constructor() {
        const geo = new BoxGeometry()
        const mat = new MeshStandardMaterial({
            color: 0x3E3E3E
        })
        const o3d = new Object3D()

        this._mesh = new InstancedMesh(geo, mat, 86)
        this._boxes = []

        const position = new Vector3()
        const rotation = new Euler()
        const scale = new Vector3()

        let i = 0
        for (let tfm of transformation) {
            position.set(
                tfm.position.x,
                tfm.position.y,
                tfm.position.z
            )
            rotation.set(
                tfm.rotation._x,
                tfm.rotation._y,
                tfm.rotation._z,
                tfm.rotation._order
            )
            scale.set(
                tfm.scale.x,
                tfm.scale.y,
                tfm.scale.z
            )

            o3d.position.copy(position)
            o3d.setRotationFromEuler(rotation)
            o3d.scale.copy(scale)
            o3d.updateMatrix()
            this._mesh.setMatrixAt(i++, o3d.matrix)

            const box = new Box3()
            box.setFromCenterAndSize(o3d.position, o3d.scale)
            this._boxes.push(box)
        }
        this._mesh.instanceMatrix.needsUpdate = true
    }

    get Mesh() {
        return this._mesh
    }

    get Boxes() {
        return this._boxes
    }
}

export default Walls

