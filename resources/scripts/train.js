import * as THREE from 'three'

/**
 * https://www.google.com/search?q=3%D0%B4+%D0%BF%D0%B0%D1%80%D0%BE%D0%B2%D0%BE%D0%B7+%D0%B8%D0%B7+%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%85+%D0%B3%D0%B5%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85+%D1%84%D0%B8%D0%B3%D1%83%D1%80&tbm=isch&ved=2ahUKEwiWt4jp9bbpAhUHZ5oKHWCeB84Q2-cCegQIABAA&oq=3%D0%B4+%D0%BF%D0%B0%D1%80%D0%BE%D0%B2%D0%BE%D0%B7+%D0%B8%D0%B7+%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%85+%D0%B3%D0%B5%D0%BE%D0%BC%D0%B5%D1%82%D1%80%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85+%D1%84%D0%B8%D0%B3%D1%83%D1%80&gs_lcp=CgNpbWcQA1CPHlitJmCcJ2gAcAB4AIABTYgBzwGSAQEzmAEAoAEBqgELZ3dzLXdpei1pbWc&sclient=img&ei=Exi_XtbhKIfO6QTgvJ7wDA&bih=1129&biw=1858&rlz=1C1SQJL_ruRU846RU846#imgrc=_NENDt9OHAMzkM
 * https://main-cdn.goods.ru/big1/hlr-system/1748262/100000069291b0.jpg
 */

export default class Train
{

	constructor()
	{
        this.params = {
            wireframe: false,
            testColors: false,
            shadows: {
                receiveShadow: true,
                castShadow: true,
            },
        }

        this.train = null

        this.trainState = {
            speed: 0,
        }

        this.obp = {
            platform: {},
        },

        this.obp.platform = {
            main: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [70, 180, 10],
                color: (this.params.testColors ? 'olive' : 0x001502),
                startPosition: [0, 0, 0],
            },
            conus: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                color: (this.params.testColors ? 'blue' : 0x001502),
                startPosition: [0, 90, 5],
            }
        }

        this.obp.engine = {
            sphere: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [30, 30, 120, 20],
                color: (this.params.testColors ? 'green' : 0x003c07),
                startPosition: [0, 45, -30],
            },
            infront: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [34, 20, 10, Math.PI * 10, Math.PI * 2, Math.PI * 0, Math.PI * .35], // , 1, 2, .8, .2
                color: (this.params.testColors ? 'black' : 0x003c07),
                startPosition: [0, 89, -30],
            },
        }

        this.obp.pipe = {
            top: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [12, 15, 4, 20],
                color: (this.params.testColors ? 'blue' : 0x2d9967),
                startPosition: [0, 12, 20],
            },
            bottom: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [15, 12, 20, 20],
                color: (this.params.testColors ? 'red' : 0x2d9967),
                startPosition: [0, 0, 20],
            },
            group: {
                startPosition: [0, 50, -70],
            },
        }

        this.obp.cabin = {
            lvl3: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [68, 68, 22],
                color: (this.params.testColors ? 'blue' : 0x52abd9),
                startPosition: [0, 0, -66],
            },
            lvl2: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [60, 60, 22],
                color: (this.params.testColors ? 'red' : 0xba2022),
                startPosition: [0, 0, -44],
            },
            lvl1: {
                wireframe: this.params.wireframe,
                shadows: this.params.shadows,
                geometry: [60, 60, 66],
                color: (this.params.testColors ? 'black' : 0x003c07),
                startPosition: [0, 0, 0],
            },
            group: {
                startPosition: [0, -45, -38],
            },
        }

        this.obp.wheels = {
            right: {
                stick: {
                    wireframe: this.params.wireframe,
                    shadows: this.params.shadows,
                    geometry: [2, (96 + 30 + 4), 4],
                    color: (this.params.testColors ? 'black' : 0xdcd524),
                    startPosition: [(- 35 - 16 - 1), 16, 0],
                },
                group: {
                    startPosition: [(- 35 - 8), 66, 0],
                },
            },
            left: {
                stick: {
                    wireframe: this.params.wireframe,
                    shadows: this.params.shadows,
                    geometry: [2, (96 + 30 + 4), 4],
                    color: (this.params.testColors ? 'black' : 0xdcd524),
                    startPosition: [(35 + 16 + 1), 16, 0],
                },
                group: {
                    startPosition: [(35 + 8), 66, 0],
                },
            },
            wireframe: this.params.wireframe,
            shadows: this.params.shadows,
            sideCount: 4,
            distanceBetweenWheels: 10,
            geometry: [16, 16, 16, 12],
            color: (this.params.testColors ? 'red' : 0x000000),
        }

        this.objects = {}
        
        this.init()
	}

	init()
	{
        this.makePlatform()
        this.makeEngine()
        this.makePipe()
        this.makeCabin()
        this.makeWheels()

        this.make()

        this.rotate()

        this.position()
    }

    makePlatform()
    {
        var group = new THREE.Object3D()

        let mainGeometry = new THREE.BoxGeometry(...this.obp.platform.main.geometry)
        let mainMaterial = new THREE.MeshLambertMaterial({
            color: this.obp.platform.main.color,
            wireframe: this.obp.platform.main.wireframe
        })
        let platform = new THREE.Mesh(mainGeometry, mainMaterial)
        platform.receiveShadow = this.obp.platform.main.shadows.receiveShadow
        platform.castShadow = this.obp.platform.main.shadows.castShadow
        platform.position.set(...this.obp.platform.main.startPosition)

        const conusGeometry = new THREE.CylinderBufferGeometry(
            (this.obp.platform.main.geometry[0] / 2),
            (this.obp.platform.main.geometry[0] / 2 + this.obp.wheels.geometry[1]),
            (this.obp.wheels.geometry[1] + this.obp.platform.main.geometry[2] / 2) - 4,
            15,
            2,
            false,
            Math.PI * 1.5,
            Math.PI * 1
        )
        let conusMaterial = new THREE.MeshLambertMaterial({
            color: this.obp.platform.conus.color,
            wireframe: this.obp.platform.conus.wireframe
        })
        let conus = new THREE.Mesh(conusGeometry, conusMaterial)
        conus.receiveShadow = this.obp.platform.conus.shadows.receiveShadow
        conus.castShadow = this.obp.platform.conus.shadows.castShadow
        conus.position.set(...this.obp.platform.conus.startPosition)
        conus.position.z -= 1
        conus.rotateX(-90 * (Math.PI / 180))

        group.add(platform)
        group.add(conus)

        this.objects.platform = group
    }

    makeEngine()
    {
        var group = new THREE.Object3D()

        let geometrySphere = new THREE.CylinderGeometry(...this.obp.engine.sphere.geometry)
        let materialSphere = new THREE.MeshLambertMaterial({
            color: this.obp.engine.sphere.color,
            wireframe: this.obp.engine.sphere.wireframe
        })
        let cilyndr = new THREE.Mesh(geometrySphere, materialSphere)
        cilyndr.receiveShadow = this.obp.engine.sphere.shadows.receiveShadow
        cilyndr.castShadow = this.obp.engine.sphere.shadows.castShadow
        cilyndr.position.set(...this.obp.engine.sphere.startPosition)

        const geometryInfront = new THREE.SphereBufferGeometry(...this.obp.engine.infront.geometry)
        let materialInfront = new THREE.MeshLambertMaterial({
            color: this.obp.engine.infront.color,
            wireframe: this.obp.engine.infront.wireframe
        })
        let infront = new THREE.Mesh(geometryInfront, materialInfront)
        infront.receiveShadow = this.obp.engine.infront.shadows.receiveShadow
        infront.castShadow = this.obp.engine.infront.shadows.castShadow
        infront.position.set(...this.obp.engine.infront.startPosition)

        group.add(cilyndr)
        group.add(infront)

        this.objects.engine = group
    }

    makePipe()
    {
        var group = new THREE.Object3D()

        let geometryTop = new THREE.CylinderGeometry(...this.obp.pipe.top.geometry)
        let materialTop = new THREE.MeshLambertMaterial({
            color: this.obp.pipe.top.color,
            wireframe: this.obp.pipe.top.wireframe
        })
        let cylinderTop = new THREE.Mesh(geometryTop, materialTop)
        cylinderTop.receiveShadow = this.obp.pipe.top.shadows.receiveShadow
        cylinderTop.castShadow = this.obp.pipe.top.shadows.castShadow
        cylinderTop.position.set(...this.obp.pipe.top.startPosition)

        let geometryBottom = new THREE.CylinderGeometry(...this.obp.pipe.bottom.geometry)
        let materialBottom = new THREE.MeshLambertMaterial({
            color: this.obp.pipe.bottom.color,
            wireframe: this.obp.pipe.bottom.wireframe
        })
        let cylinderBottom = new THREE.Mesh(geometryBottom, materialBottom)
        cylinderBottom.receiveShadow = this.obp.pipe.bottom.shadows.receiveShadow
        cylinderBottom.castShadow = this.obp.pipe.bottom.shadows.castShadow
        cylinderBottom.position.set(...this.obp.pipe.bottom.startPosition)

        group.add(cylinderTop)
        group.add(cylinderBottom)

        group.rotateX(-90 * (Math.PI / 180))

        group.position.set(...this.obp.pipe.group.startPosition)

        this.objects.pipe = group
    }

    makeCabin()
    {
        var group = new THREE.Object3D()

        let cubeGeometry1 = new THREE.BoxGeometry(...this.obp.cabin.lvl1.geometry)
        let cubeMaterial1 = new THREE.MeshLambertMaterial({
            color: this.obp.cabin.lvl1.color,
            wireframe: this.obp.cabin.lvl1.wireframe
        })
        let cabinLvl1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1)
        cabinLvl1.receiveShadow = this.obp.cabin.lvl1.shadows.receiveShadow
        cabinLvl1.castShadow = this.obp.cabin.lvl1.shadows.castShadow
        cabinLvl1.position.set(...this.obp.cabin.lvl1.startPosition)

        let cubeGeometry2 = new THREE.BoxGeometry(...this.obp.cabin.lvl2.geometry)
        let cubeMaterial2 = new THREE.MeshLambertMaterial({
            color: this.obp.cabin.lvl2.color,
            wireframe: this.obp.cabin.lvl2.wireframe
        })
        let cabinLvl2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2)
        cabinLvl2.receiveShadow = this.obp.cabin.lvl2.shadows.receiveShadow
        cabinLvl2.castShadow = this.obp.cabin.lvl2.shadows.castShadow
        cabinLvl2.position.set(...this.obp.cabin.lvl2.startPosition)

        let cubeGeometry3 = new THREE.BoxGeometry(...this.obp.cabin.lvl3.geometry)
        let cubeMaterial3 = new THREE.MeshLambertMaterial({
            color: this.obp.cabin.lvl3.color,
            wireframe: this.obp.cabin.lvl3.wireframe
        })
        let cabinLvl3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3)
        cabinLvl3.receiveShadow = this.obp.cabin.lvl3.shadows.receiveShadow
        cabinLvl3.castShadow = this.obp.cabin.lvl3.shadows.castShadow
        cabinLvl3.position.set(...this.obp.cabin.lvl3.startPosition)

        group.add(cabinLvl1)
        group.add(cabinLvl2)
        group.add(cabinLvl3)

        group.position.set(...this.obp.cabin.group.startPosition)

        this.objects.cabin = group
    }

    makeWheels()
    {
        this.makeRightWheels()
        this.makeLeftWheels()
    }

    makeRightWheels()
    {
        let group = this.getSideWheels(this.obp.wheels.right.group.startPosition)

        let mainGeometry = new THREE.BoxGeometry(...this.obp.wheels.right.stick.geometry)
        let mainMaterial = new THREE.MeshLambertMaterial({
            color: this.obp.wheels.right.stick.color,
            wireframe: this.obp.wheels.right.stick.wireframe
        })
        let stick = new THREE.Mesh(mainGeometry, mainMaterial)
        stick.receiveShadow = this.obp.wheels.right.stick.shadows.receiveShadow
        stick.castShadow = this.obp.wheels.right.stick.shadows.castShadow
        stick.position.set(...this.obp.wheels.right.stick.startPosition)

        group.add(stick)

        this.objects.wheelsRight = group
    }

    makeLeftWheels()
    {
        let group = this.getSideWheels(this.obp.wheels.left.group.startPosition)

        let mainGeometry = new THREE.BoxGeometry(...this.obp.wheels.left.stick.geometry)
        let mainMaterial = new THREE.MeshLambertMaterial({
            color: this.obp.wheels.left.stick.color,
            wireframe: this.obp.wheels.left.stick.wireframe
        })
        let stick = new THREE.Mesh(mainGeometry, mainMaterial)
        stick.receiveShadow = this.obp.wheels.left.stick.shadows.receiveShadow
        stick.castShadow = this.obp.wheels.left.stick.shadows.castShadow
        stick.position.set(...this.obp.wheels.left.stick.startPosition)

        group.add(stick)

        this.objects.wheelsLeft = group
    }

    getSideWheels(position)
    {
        var group = new THREE.Object3D()

        let geometry = new THREE.CylinderGeometry(...this.obp.wheels.geometry)
        let material = new THREE.MeshLambertMaterial({
            color: this.obp.wheels.color,
            wireframe: this.obp.wheels.wireframe
        })
        let wheel = new THREE.Mesh(geometry, material)
        wheel.receiveShadow = this.obp.wheels.shadows.receiveShadow
        wheel.castShadow = this.obp.wheels.shadows.castShadow
        wheel.position.set(...position)
        wheel.rotateZ(-90 * (Math.PI / 180))

        group.add(wheel)

        for (let i = 1; i < this.obp.wheels.sideCount; i++) {
            let nextWheel = wheel.clone()
            nextWheel.position.y -= (this.obp.wheels.geometry[1] * 2 + this.obp.wheels.distanceBetweenWheels) * i

            group.add(nextWheel)
        }

        return group
    }

    make()
    {
        var group = new THREE.Object3D()

        for (let [key, object] of Object.entries(this.objects)) {
            group.add(object)
        }
        // group.add(this.objects.engine)
        // group.add(this.objects.pipe)
        // group.add(this.objects.wheelInfrontLeft)
        // group.add(this.objects.wheelInfrontRight)
        // group.add(this.objects.wheelBehindLeft)
        // group.add(this.objects.wheelBehindRight)

        this.train = group
    }

    rotate()
    {
        this.train.rotateX(90 * (Math.PI / 180))
    }

    position()
    {
        this.train.position.x = 40
        this.train.position.y = 20
        this.train.position.z = 0
    }

    get()
    {
        return this.train
    }

}
