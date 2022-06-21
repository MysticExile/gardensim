import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Log } from './Log'

export class LogButton extends PIXI.Sprite {

    private toggle: Boolean
    game: Game
    log: Log

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.width = 80
        this.height = 77
        this.toggle = false;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        if (!this.toggle) {
            this.toggle = true;
            this.game.loadLog();
        }
        else if (this.toggle) {
            this.toggle = false;
            this.game.unLoadLog();
        }
    }
}