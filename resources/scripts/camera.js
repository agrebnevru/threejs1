import * as THREE from 'three'

// Ось X красного цвета, ось Y - зеленая, ось Z - синяя

export default class Camera
{

	constructor()
	{
        this.objectLookAt = null

        this.degToRad = Math.PI / 180

        this.params = {
            fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 0.1,
            far: 5000,
        }

        this.cameraParams = {
            distance: 1,
            mdown: new THREE.Vector2(),
            mmove: new THREE.Vector2(),
            phi: 25,
            theta: -15,
            phim: 0,
            thetam: 0,
            startPosition: {
                x: 0,
                y: 0,
                z: 500,
            },
            minY: 30,
            fov: {
                min: 20,
                max: 80,
            }
        }

        this.camera = null
        
        this.init()
	}

	init()
	{
        this.makeCamera()

        this.initHandlers()
    }

    makeCamera()
    {
        this.camera = new THREE.PerspectiveCamera(
            this.params.fov,
            this.params.aspect,
            this.params.near,
            this.params.far,
        )

        this.camera.position.set(
            this.cameraParams.startPosition.x,
            this.cameraParams.startPosition.y,
            this.cameraParams.startPosition.z,
        )
    }

    initHandlers()
    {
        const MOUSE_BUTTON_RIGHT = 3

        document.onmousedown = e => {
            if (e.which != MOUSE_BUTTON_RIGHT) {
                return
            }

            this.cameraParams.mdown.set(e.clientX, e.clientY)
            this.cameraParams.thetam = this.cameraParams.theta
            this.cameraParams.phim = this.cameraParams.phi

            document.onmousemove = e => {
                this.cameraParams.mmove.set(e.clientX, e.clientY)

                this.cameraParams.theta = -(this.cameraParams.mmove.x - this.cameraParams.mdown.x) *
                    0.5 + this.cameraParams.thetam

                this.cameraParams.phi = (this.cameraParams.mmove.y - this.cameraParams.mdown.y) *
                    0.5 + this.cameraParams.phim
                this.cameraParams.phi = Math.min(90, Math.max(-90, this.cameraParams.phi))

                this.updateCamera()
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }

        document.addEventListener('wheel', (e) => {
            let scale = e.deltaY * 0.02
        
            let fov = this.params.fov + scale
            fov = Math.max(this.cameraParams.fov.min, fov)
            fov = Math.min(this.cameraParams.fov.max, fov)
        
            this.params.fov = fov
        
            this.camera.fov = this.params.fov
        
            this.camera.updateProjectionMatrix()
        })
    }

    setLookAt(object)
    {
        this.objectLookAt = object

        this.cameraParams.distance = this.camera.position.clone().sub(this.objectLookAt.position).length()
    }

    updateCamera()
    {
        let x = this.cameraParams.distance *
            Math.sin(this.cameraParams.theta * this.degToRad) *
            Math.cos(this.cameraParams.phi * this.degToRad)

        let y = this.cameraParams.distance *
            Math.sin(this.cameraParams.phi * this.degToRad)

        let z = this.cameraParams.distance *
            Math.cos(this.cameraParams.theta * this.degToRad) *
            Math.cos(this.cameraParams.phi * this.degToRad)

        this.camera.position.x = x
        this.camera.position.y = Math.max(y, this.cameraParams.minY)
        this.camera.position.z = z

        this.camera.position.x += this.objectLookAt.position.x
        this.camera.position.z += this.objectLookAt.position.z

        this.camera.lookAt(this.objectLookAt.position)
    }

    get()
    {
        return this.camera
    }

}
