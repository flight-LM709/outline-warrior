import Phaser from 'phaser'

export default class OutlineWarriorScene extends Phaser.Scene {
	constructor() {
		super('Outline-Warrior-Scene')
	}

	init() {
		this.gameHalfWidth = this.scale.width * 0.5
		this.gameHalfHeight = this.scale.height * 0.5
	}


	preload() {
		this.load.image ('background', 'images/bg_layer1.png')
		this.load.image ('tile', 'images/tile.png')
		this.load.image ('sky', 'images/sky.png')
		this.load.spritesheet('player', 'images/Skeleton.png', {
            frameWidth: 80,
            frameHeight: 80
        });
		this.load.spritesheet('enemy', 'images/Goblin.png', {
            frameWidth: 80,
            frameHeight: 80
        });
		this.load.audio('france', 'sfx/france.mp3')
	}

	create() {
				this.add.image(240, 320, 'background')
		const sky = this.add.image(240, 145, 'sky')
		const tile = this.physics.add.staticImage(240, sky.height- 30,
			'tile')
			this.player = this.physics.add.sprite(
				this.gameHalfWidth - 150,
				this.gameHalfHeight - 200, 'player'
			)
			.setBounce(0.2)
			.setOffset (-20, -10)
	}

	update() {

	}
}
