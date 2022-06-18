import * as PIXI from 'pixi.js'
import { Game } from './game'

export class LogButton extends PIXI.Sprite {

    isClicked: Boolean
    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.width = 80
        this.height = 77
        this.isClicked = false;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        if (this.isClicked) {
            this.isClicked = false;
        }
        else if (!this.isClicked) {
            this.isClicked = true;
        }
    }
}