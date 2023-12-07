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
		this.button1 = undefined
		this.button2 = undefined
		this.button3 = undefined
		this.button4 = undefined
		this.button5 = undefined
		this.button6 = undefined
		this.button7 = undefined
		this.button8 = undefined
		this.button9 = undefined
		this.button10 = undefined
		this.button0 = undefined
		this.buttonOk = undefined
		this.numberArray = []
		this.number = 0
		this.question = []
		this.correctAnswer = undefined
		this.playerattack = false
		this.enemyAttack = false
		this.score = 0
		this.scoreLabel = undefined
		this.timer = 10
		this.timerLabel = undefined
		this.countdown = undefined
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
		this.load.image('austria-btn', 'images/aus-btn.png')
		this.load.image('eswatini-btn', 'images/esw-btn.png')
		this.load.image('iraq-btn', 'images/iraq-btn.png')
		this.load.image('kenya-btn', 'images/ken-btn.png')
		this.load.image('lesotho-btn', 'images/les-btn.png')
		this.load.image('liechtenstein-btn', 'images/lie-btn.png')
		this.load.image('pakistan-btn', 'images/pak-btn.png')
		this.load.image('paraguay-btn', 'images/par-btn.png')
		this.load.image('thailand-btn', 'images/tha-btn.png')
		this.load.image('uzbekistan-btn', 'images/uzb-btn.png')
		this.load.image('zambia-btn', 'images/zam-btn.png')
		this.load.image('ok-btn', 'images/ok-btn.png')
	}

	create() {
				this.add.image(240, 320, 'background')
		const sky = this.add.image(240, 145, 'sky')
		const tile = this.physics.add.staticImage(250, sky.height+5,
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
			this.scoreLabel = this.add.text(10, 10, 'Score :', {
				fill: 'white', backgroundColor:'black'
			}).setDepth(1)
			this.timerLabel = this.add.text(380, 10, 'Time :', {
				fill: 'white', backgroundColor:'black'
			}).setDepth(1)
	}

	update(time) {
		if (this.correctAnswer === true && !this.playerAttack) {
			this.player.anims.play('player-attack', true)
			this.time.delayedCall(500, () => {
				this.createSlash(this.player.x+60,this.player.y, 4, 600)
			})
			this.playerAttack = true
			this.score += 10
		}
		if (this.correctAnswer === undefined) {
			this.player.anims.play('player-standby', true)
			this.enemy.anims.play('enemy-standby', true)
		}
		if(this.correctAnswer === false && !this.enemyAttack) {
			this.enemy.anims.play('enemy-attack', true)
			this.time.delayedCall(500, () => {
				this.createSlash(this.enemy.x-60,
					this.enemy.y,2,-600,true)
						})
				this.enemyAttack=true
				this.score += 10
			}
			this.scoreLabel.setText('Score :' +this.score)
			if (this.startGame = true) {
				this.timerLabel.setText('Timer :' +this.timer)
					}
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
			callback: this.gameOver,
			callbackScope: this,
			loop: true
		})
		this.createButtons()
		this.input.on('gameobjectdown', this.addNumber, this)
		this.generateQuestion()
		}
		createButtons() {
			const startPosY = this.scale.height - 246
			const widthDiff = 131
			const heightDiff = 71.25
	
			//center buttons
			this.button2 =this.add.image(this.gameHalfWidth,startPosY,
				'eswatini-btn', 1).setInteractive().setData('value', 2)
				
				this.button5 = this.add.image(this.gameHalfWidth,this.button2.y
				+ heightDiff,'lesotho-btn',4).setInteractive().setData('value', 5)
				
				this.button8 = this.add.image(this.gameHalfWidth,this.button5.y
				+ heightDiff, 'pakistan-btn', 7).setInteractive().setData('value', 8)
				
				this.button0 = this.add.image(this.gameHalfWidth, this.button8.y
				+ heightDiff, 'uzbekistan-btn', 10).setInteractive().setData('value', 0)
				//left side
			this.button1 = this.add.image(this.button2.x - widthDiff, startPosY,
				'austria-btn', 0).setInteractive().setData('value', 1)
				this.button4 = this.add.image(this.button5.x - widthDiff,
				this.button1.y + heightDiff, 'kenya-btn', 3).setInteractive()
				.setData('value', 4)
				this.button7 = this.add.image(this.button8.x - widthDiff,
				this.button4.y + heightDiff, 'liechtenstein-btn', 6).setInteractive()
				.setData('value', 7)
				this.buttonDel = this.add.image(this.button0.x - widthDiff,
				this.button7.y + heightDiff, 'paraguay-btn', 9).setInteractive()
				.setData('value', 'del')
				this.button3 = this.add.image(this.button2.x + widthDiff, startPosY,
					'iraq-btn', 2).setInteractive().setData('value', 3)
					this.button6 = this.add.image(this.button5.x + widthDiff,
					this.button3.y + heightDiff, 'thailand-btn', 5).setInteractive()
					.setData('value', 6)
					this.button9 = this.add.image(this.button8.x + widthDiff,
					this.button6.y + heightDiff, 'zambia-btn', 8).setInteractive()
					.setData('value', 9)
					this.buttonOk = this.add.image(this.button0.x + widthDiff,
					this.button9.y + heightDiff, 'ok-btn', 11).setInteractive()
					.setData('value', 'ok')
				}
				addNumber(pointer, object, event) {
					let value = object.getData('value')
					if (isNaN(value)) {
						if(value == 'del') {
							this.numberArray.pop()
							if(this.numberArray.length < 1) {
								this.numberArray[0] = 0
							}
						}
						if(value == 'ok') {
							this.checkAnswer()
							this.numberArray = []
							this.numberArray[0] = 0
						}
					}
					else {
						if(this.numberArray.length==1 && this.numberArray[0]==0) {
							this.numberArray[0] = value
						} else {
							if (this.numberArray.length <10) {
								this.numberArray.push(value)
							}
						}
					}
					
				this.number = parseInt(this.numberArray.join(''))
				// @ts-ignore
				this.resultText.setText(this.number)
				const textHalfWidth = this.resultText.width * 0.5
				this.resultText.setX(this.gameHalfWidth - textHalfWidth)
				 event.stopPropagation()
				}
				getOperator() {
					const operator = ['+', '-', 'x', ':']
					return operator[Phaser.Math.Between(0,3)]
				}
				generateQuestion() {
					let numberA = Phaser.Math.Between(0, 50)
					let numberB = Phaser.Math.Between(0, 50)
					let operator = this.getOperator()
					if (operator === '+') {
						this.question[0] = `${numberA} + ${numberB}`
						this.question[1] = numberA + numberB
					}
					if (operator === 'x') {
						this.question[0] = `${numberA} x ${numberB}`
						this.question[1] = numberA * numberB
					}
					if (operator === '-') {
						if (numberB > numberA) {
						this.question[0] = `${numberB} - ${numberA}`
						this.question[1] = numberB - numberA
					} else {
							this.question[0] = `${numberA} - ${numberB}`
							this.question[1] = numberA - numberB
						}
					}
					if (operator === ':') {
						do {
							numberA = Phaser.Math.Between(0, 50)
							numberB = Phaser.Math.Between(0, 50)
						}while(!Number.isInteger(numberA/numberB))
						this.question[0] = `${numberA} : ${numberB}`
						this.question[1] = numberA / numberB
					}
					this.questionText.setText(this.question[0])
					const textHalfWidth = this.questionText.width * 0.5
					this.questionText.setX(this.gameHalfWidth - textHalfWidth)
				}
				checkAnswer() {
					if (this.number == this.question[1]) {
						this.correctAnswer = true 
					} else {
						this.correctAnswer = false
					}
				}
				createSlash(x, y, frame, velocity, flip = false){
					this.slash.setPosition(x,y)
					.setActive(true)
					.setVisible(true)
					.setFrame(frame)
					.setFlipX(flip)
					.setVelocityX(velocity)
					}
					spriteHit(slash, sprite) {
						slash.x = 0
						slash.y = 0
						slash.setActive(false)
						slash.setVisible(false)
						if (sprite.texture.key == 'player') {
							sprite.anims.play ('player-hit', true)
						} else {
							sprite.anims.play ('enemy-hit', true)
						}
						this.time.delayedCall (500, () => {
							this.playerAttack = false
							this.enemyAttack = false
							this.correctAnswer = undefined
							this.generateQuestion()
						})
					}
					gameOver(){
						this.timer--
						if(this.timer <0){
							this.scene.start('over-scene',
							{score: this.score})
						}
					}

}
