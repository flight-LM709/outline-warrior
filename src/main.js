import Phaser from 'phaser'

import OutlineWarriorScene from './OutlineWarriorScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 480,
	height: 640,
	scale : {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	debug : true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},

	scene: [OutlineWarriorScene],
}

export default new Phaser.Game(config)
