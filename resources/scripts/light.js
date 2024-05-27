import * as THREE from 'three'

// Ось X красного цвета, ось Y - зеленая, ось Z - синяя

export default class Light
{

	constructor(style = null)
	{
        this.style = style

        this.light = null
        
        this.init()
	}

	init()
	{
        this.make()
    }

    make()
    {
        switch (this.style) {
            case 'spot':
                this.spot()
                break;
            case 'point':
                this.point()
                break;
            case 'directional':
                this.directional()
                break;
            case 'hemisphere':
                this.hemisphere()
                break;
            default: // ambient
                this.ambient()
                break
        }
    }

    spot()
    {
        let params = {
            color: 0xFFFFFF,
            intensity: .8,
            distance: 0,
            angle: 60 * Math.PI / 180,
            penumbra: .5,
            decay: 1,
        }

        let light = new THREE.SpotLight(
            params.color,
            params.intensity,
            params.distance,
            params.angle,
            params.penumbra,
            params.decay
        )
        light.castShadow = true
        light.shadow.camera.far = 10000
        light.position.set(-600, 1000, -600)
        // light.target.position.set(0, 0, 0)

        this.light = light
    }

    point()
    {
        let params = {
            color: 0xFFFFFF,
            intensity: 1,
            distance: 0,
            decay: .1,
        }

        let light = new THREE.PointLight(
            params.color,
            params.intensity,
            params.distance,
            params.decay
        )
        light.castShadow = true
        // light.power = 200
        // light.distance = Infinity
        // light.shadow.mapSize.width = 1024;  // default
        // light.shadow.mapSize.height = 1024; // default
        // light.shadow.camera.near = 0.5;       // default
        light.shadow.camera.far = 10000
        // light.shadow.darkness = .9
        light.position.set(-3000, 5000, -3000)

        this.light = light
    }

    directional()
    {
        let params = {
            color: 0xFFFFFF,
            intensity: .8,
        }

        let light = new THREE.DirectionalLight(
            params.color,
            params.intensity
        )
        light.castShadow = true
        light.shadow.camera.near = .5
        light.shadow.camera.far = 15000
        light.shadow.camera.left = -300
        light.shadow.camera.right = 300
        light.shadow.camera.top = 300
        light.shadow.camera.bottom = -300
        // light.position.multiplyScalar(30)
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048
        light.shadow.bias = - 0.0001
        light.position.set(-3000, 5000, -3000)
        // light.position.set(0, 1, 0)
        // light.target.position.set(0, 0, 0)

        this.light = light
    }

    hemisphere()
    {
        let params = {
            skyColor: 0xB1E1FF,
            groundColor: 0xB97A20,
            intensity: .6,
        }

        let light = new THREE.HemisphereLight(
            params.skyColor,
            params.groundColor,
            params.intensity
        )
        light.position.set(0, 10000, 0)

        this.light = light
    }

    ambient()
    {
        let params = {
            color: 0x323232,
            intensity: .3,
        }

        let light = new THREE.AmbientLight(
            params.color,
            params.intensity
        )

        this.light = light
    }

    get()
    {
        return this.light
    }

}
