import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Plant extends PIXI.Sprite {

    game: Game

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = game.getRandomInt(0,800)
        this.y = game.getRandomInt(0,450)
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        //roep hier de methode aan die de informatie en trivia vragen toont.
    }
}