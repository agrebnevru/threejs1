import * as THREE from 'three'

import Camera from './camera'
import Train from './train'
import Floor from './floor'
import Light from './light'

let renderer, scene
let classCamera, camera
let classTrain, train
let classFloor, floor
let classLight, light

function init()
{
    renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.domElement.oncontextmenu = () => false
    // renderer.physicallyCorrectLights = true
    // renderer.shadowMapEnabled = true
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    scene = new THREE.Scene()
    scene.background = new THREE.Color('black')

    document.body.appendChild(renderer.domElement)
}

function initScene()
{
    classFloor = new Floor()
    floor = classFloor.get()
    scene.add(floor)

    let axes = new THREE.AxesHelper(500)
    scene.add(axes)

    classTrain = new Train()
    train = classTrain.get()
    scene.add(train)

    classCamera = new Camera()
    camera = classCamera.get()
    scene.add(camera)

    let classLight1 = new Light('hemisphere')
    let light1 = classLight1.get()
    scene.add(light1)
    let hemiLightHelper = new THREE.HemisphereLightHelper(light1, 10);
    scene.add(hemiLightHelper)

    classLight = new Light('directional')
    light = classLight.get()
    scene.add(light)
    // scene.add(light.target)
    // var helper = new THREE.CameraHelper(light.shadow.camera)
    // scene.add(helper)
    var dirLightHeper = new THREE.DirectionalLightHelper(light, 10)
    scene.add(dirLightHeper)

    classCamera.setLookAt(train)
    classCamera.updateCamera()
}

function render()
{  
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

init()
initScene()
render()

document.querySelector('.console-it').addEventListener('click', (e) => {
    console.log(`camera.position.x = ${camera.position.x}`)
    console.log(`camera.position.y = ${camera.position.y}`)
    console.log(`camera.position.z = ${camera.position.z}`)
    console.log(`camera.fov = ${camera.fov}`)
})
