import * as PIXI from 'pixi.js'
import { Game } from './game'

export class startKnop extends PIXI.Sprite {

    game: Game
    private sound: HTMLAudioElement

    constructor(texture: PIXI.Texture, game: Game ,clickSound: HTMLAudioElement) {
        super(texture)
        this.game = game
        this.sound = clickSound
        this.x = 200;
        this.y = 60;
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