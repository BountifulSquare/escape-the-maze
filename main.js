import World from './src/_world.js'
import sky from './src/_sky.js'
import { CameraSwitch_dev, FirstPersonCamera, OrbitCamera } from './src/_camera.js'
import StateManager from './src/_stateManager.js'

import Walls from './src/walls.js'
import Floor from './src/floor.js'
import Input from './src/_input.js'
import Player from './src/player.js'
import Goal from './src/goal.js'
import { Clock } from './vendors/three.module.js'

window.ENV = 'dev';

(function main() {
    const canvasEL = document.getElementById('canvas')
    const stateManager = new StateManager(canvasEL)

    canvasEL.addEventListener('gamestart', () => {
        const world = new World(canvasEL)
        const camera = new FirstPersonCamera(canvasEL, stateManager)

        const walls = new Walls()
        const floor = new Floor()
        const input = new Input()
        const player = new Player(camera, input)
        const goal = new Goal()
        const clock = new Clock()

        world.addChildren(sky)
        world.addChildren(walls.Mesh)
        world.addChildren(floor.Mesh)

        canvasEL.addEventListener('gamereset', () => {
            camera._camera.position.set(0, 1.8, 5)
        })

        function run() {
            const dt = clock.getDelta()

            if (stateManager.State === 1) {
                player.update(dt, walls)
                if (goal.check(camera._camera.position)) {
                    player.stopSound()
                    stateManager.stop()
                }
            }

            world.render(camera.Object3D)
            requestAnimationFrame(run)
        }
        run()

        window.addEventListener('resize', () => {
            camera.updateAspect(window.innerWidth / window.innerHeight)
            world.setSize(window.innerWidth, window.innerHeight)
        })
    })

})();

(function () {
    const canvasEL = document.getElementById('canvas')
    document.getElementById('menu').classList.add('hidden')
    canvasEL.classList.remove('hidden')

    const world = new World(canvasEL)
    const camera = new OrbitCamera(canvasEL)

    const walls = new Walls()
    const floor = new Floor()
    const input = new Input()
    // const player = new Player(camera, input)
    const goal = new Goal()
    const clock = new Clock()

    world.addChildren(sky)
    world.addChildren(walls.Mesh)
    world.addChildren(floor.Mesh)
    world.addChildren(goal.Mesh)

    function run() {
        const dt = clock.getDelta()

        // if (stateManager.State === 1) {
        //     player.update(dt, walls)
        //     if (goal.check(camera._camera.position)) {
        //         player.stopSound()
        //         stateManager.stop()
        //     }
        // }

        world.render(camera.Object3D)
        requestAnimationFrame(run)
    }
    run()

})