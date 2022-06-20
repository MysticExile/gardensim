import * as PIXI from 'pixi.js'
import { Game } from './game'
import { planten } from './planten_veld'

export class Environment extends PIXI.Sprite {
    game: Game
    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
    }
    
}