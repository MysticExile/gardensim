import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Log extends PIXI.Sprite {
    game: Game
    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = 150
        this.y = 80
        this.height = 300
        this.width = 500
    }
}