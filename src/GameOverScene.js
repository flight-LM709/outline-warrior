import Phaser from 'phaser'
export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('over-scene')
    }
    init(data) {
        this.replayButton = undefined
        this.score = data.score
    }
    preload() {
        this.load.image ('background', 'images/bg_layer1.png')
        this.load.image('gameover', 'images/gameover.png')
        this.load.image('replay-button', 'images/replay.png')
    }
    create() {
        this.add.image(200, 320, 'background')
        this.add.image(220, 200, 'gameover')
        this.add.text(120, 300, 'Score: ' + this.score, {
        // @ts-ignore
        fontSize: '32px', fill: 'black' })
        this.replayButton = this.add.image(230, 400, 'replay-button')
        .setInteractive() .setScale(0.25)
        this.replayButton.once('pointerup', () => {
            this.scene.start('Outline-Warrior-Scene')
        }, this)
    }
}