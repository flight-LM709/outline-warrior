import Phaser from 'phaser'

export default class OutlineWarriorScene extends Phaser.Scene {
	constructor() {
		super('Outline-Warrior-Scene')
	}

	init() {
		this.gameHalfWidth = this.scale.width * 0.5
		this.gameHalfHeight = this.scale.height * 0.5
		this.startGame = false
		this.questionText = undefined
		this.resultText = undefined
	}


	preload() {
		this.load.image ('background', 'images/bg_layer1.png')
		this.load.image ('tile', 'images/tile.png')
		this.load.image ('sky', 'images/sky.png')
		this.load.spritesheet('player', 'images/Skeleton.png', {
            frameWidth: 100,
            frameHeight: 100
        });
		this.load.spritesheet('enemy', 'images/Goblin.png', {
            frameWidth: 100,
            frameHeight: 100
        });
		this.load.audio('france', 'sfx/france.mp3')
		this.load.image('start-btn', 'images/start_button.png')
	}

	create() {
				this.add.image(240, 320, 'background')
		const sky = this.add.image(240, 145, 'sky')
		const tile = this.physics.add.staticImage(250, sky.height+ 35,
			'tile')
			this.player = this.physics.add.sprite(
				this.gameHalfWidth - 150,
				this.gameHalfHeight - 200, 'player'
			)
			.setBounce(0.2)
			.setOffset (0, -0)
			//enemy
			this.physics.add.collider (this.player, tile)
			this.enemy = this.physics.add.sprite(
				this.gameHalfWidth + 150,
				this.gameHalfHeight - 200, 'enemy'
			)
			.setBounce(0.2)
			.setOffset (0, -0)
			.setFlipX(true)
			this.physics.add.collider (this.enemy, tile)
			this.createAnimation()
			let start_button = this.add.image (this.gameHalfWidth, this.gameHalfHeight +181, 'start-btn') .setInteractive()
			start_button.on ('pointerdown', () => {
				this.gameStart()
				start_button.destroy()
			}, this) 
	}

	update(time) {

	}
	createAnimation() {
		//player animations
     this.anims.create({
		key: 'player-standby',
		frames: this.anims.generateFrameNumbers('player',
		{ start: 0, end: 0 }),
		frameRate: 10,
		repeat: -1
	})
	this.anims.create({
		key: 'player-attack',
		frames: this.anims.generateFrameNumbers('player',
		{ start: 0, end: 5 }),
		frameRate: 10
	})
	//enemy animations
this.anims.create({
	key: 'enemy-standby',
	frames: this.anims.generateFrameNumbers('enemy',
	{ start: 0, end: 0 }),
	frameRate: 10,
	repeat: -1
	})
	this.anims.create({
	key: 'enemy-attack',
	frames: this.anims.generateFrameNumbers('enemy',
	{ start: 0, end: 11 }),
	frameRate: 10
	})
	}
	gameStart(){
		this.startGame = true
		this.player.anims.play('player-standby', true)
		this.enemy.anims.play('enemy-standby', true)
		this.resultText = this.add.text(this.gameHalfWidth,200,
		'0', { fontSize :'32px', fill: '#000'})
		this.questionText = this.add.text(this.gameHalfWidth,100,
		'0', { fontSize : '32px', fill: '#000' })
		this.createButtons()
		this.input.on('gameobjectdown', this.addNumber, this)
		this.generateQuestion()
		this.countdown = this.time.addEvent({
			delay:1000,
			callback:this.gameOver,
			callbackScope: this,
			loop: true
		})
		}
}
