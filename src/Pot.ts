import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Pot extends PIXI.Sprite {

    private isClicked: Boolean
    game: Game

    constructor(texture: PIXI.Texture, game: Game, x: number , y: number) {
        super(texture)
        this.game = game
        this.x = x
        this.y = y
        this.isClicked = false;
        let text = new PIXI.Text('Dit is een pot', { fontFamily: 'Arial', fontSize: 24, fill: 0x000000, align: 'center' });
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick(text, x, y))
        this.on('pointerup', () => this.onLift(text))
    }

    onClick(text: PIXI.Text, x: number, y: number) {
        //roep hier de methode aan die de informatie en trivia vragen toont.
        text.x = x
        text.y = y - 25
        this.isClicked = true;
        this.game.pixi.stage.addChild(text);
    }

    onLift(text: PIXI.Text) {
        this.game.pixi.stage.removeChild(text);
    }

    getIsClicked() {
        return this.isClicked;
    }
}