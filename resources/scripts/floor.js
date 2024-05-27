import * as THREE from 'three'

// Ось X красного цвета, ось Y - зеленая, ось Z - синяя

export default class Floor
{

	constructor()
	{
        this.params = {
            sizes: [1000, 1000],
            widthSegments: 1,
            heightSegments: 1,
            color: 0xcccccc,
        }

        this.floor = null
        
        this.init()
	}

	init()
	{
        this.make()
    }

    make()
    {
        let geometry = new THREE.PlaneGeometry(
            ...this.params.sizes,
            this.params.widthSegments,
            this.params.heightSegments
        )
        let material = new THREE.MeshPhongMaterial({color: this.params.color})

        let floor = new THREE.Mesh(geometry, material)
        floor.rotation.x = - 90 * Math.PI / 180
        floor.receiveShadow = true

        this.floor = floor
    }

    get()
    {
        return this.floor
    }

}
