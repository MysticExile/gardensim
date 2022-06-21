import * as PIXI from 'pixi.js'
import { Game } from './game'

export class arrowPrevious extends PIXI.Sprite {

    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game;
        this.x = 315
        this.y =10
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        this.game.previousPage();
    }
}