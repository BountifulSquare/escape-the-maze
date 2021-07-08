import { Box3, Box3Helper, Mesh, MeshStandardMaterial, PlaneGeometry, Vector3 } from '../vendors/three.module.js'

class Goal {
    constructor() {
        const g1 = new Box3()
        const g2 = new Box3()
        const center = new Vector3(20.5, 1, 20.5)
        const size = new Vector3(6, 2, 6)
        g1.setFromCenterAndSize(center, size)
        center.set(-20.5, 1, -33.2)
        g2.setFromCenterAndSize(center, size)

        this._boxes = [g1, g2]

        const geo = new PlaneGeometry()
        const mat = new MeshStandardMaterial({ color: 0xFF0000 })
        const m1 = new Mesh(geo, mat)
        const m2 = new Mesh(geo, mat)
        m1.rotation.x = -Math.PI / 2
        m2.rotation.x = -Math.PI / 2
        m1.scale.set(6, 6, 2)
        m2.scale.set(6, 6, 2)
        m1.position.set(20.5, 0.1, 20.5)
        m2.position.set(-20.5, 0.1, -33.2)

        this._mesh = [m1, m2]
    }

    get Mesh() {
        return this._mesh
    }

    check(point) {
        for (let box of this._boxes) {
            if (box.containsPoint(point)) {
                return true
            }
        }
    }
}

export default Goal