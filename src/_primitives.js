import { BoxGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, SphereGeometry } from '../vendors/three.module.js'

const boxGeo = new BoxGeometry()
const sphereGeo = new SphereGeometry()
const cylinderGeo = new CylinderGeometry()
const material = new MeshStandardMaterial()

const box = (color) => {
    const mat = color ? new MeshStandardMaterial({color}) : material
    const mesh = new Mesh(boxGeo, mat)
    mesh.name = 'Box' 
    return mesh
}

const sphere = (color) => {
    const mat = color ? new MeshStandardMaterial({color}) : material
    const mesh = new Mesh(sphereGeo, mat)
    mesh.name = 'sphere'
    return mesh
}

const cylinder = (color) => {
    const mat = color ? new MeshStandardMaterial({color}) : material
    const mesh = new Mesh(cylinderGeo, mat)
    mesh.name = 'cylinder'
    return mesh
}

export {
    box,
    sphere,
    cylinder
}