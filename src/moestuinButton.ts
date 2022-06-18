import * as PIXI from 'pixi.js'
import { Game } from './game'

export class moestuinButton extends PIXI.Sprite {

    isClicked: Boolean
    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.width = 80
        this.height = 77
        this.x = 80
        this.y = 0
        this.isClicked = false;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        this.isClicked = true;
    }
}