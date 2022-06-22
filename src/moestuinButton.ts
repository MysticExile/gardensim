import * as PIXI from 'pixi.js'
import { Game } from './game'

export class moestuinButton extends PIXI.Sprite {

    game: Game
    private sound: HTMLAudioElement

    constructor(texture: PIXI.Texture, game: Game,clickSound: HTMLAudioElement) {
        super(texture)
        this.game = game
        this.sound = clickSound
        this.width = 80
        this.height = 77
        this.x = 80
        this.y = 0
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        this.sound.play()
        //destroy all previous loaded content
        this.game.destroyChildren();
        //load new stage
        this.game.loadFarmStage();
    }
}