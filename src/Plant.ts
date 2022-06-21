import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Plant extends PIXI.Sprite {

    game: Game
    private plantNaam: string

    constructor(texture: PIXI.Texture, game: Game, x: number, y: number, plantNaam: string) {
        super(texture)
        this.game = game
        this.plantNaam = plantNaam
        this.x = x
        this.y = y
        let text = new PIXI.Text(`${this.getPlantNaam()}`, { fontFamily: 'Arial', fontSize: 24, fill: 0x000000, align: 'center' });
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick(text, x, y))
        this.on('pointerup', () => this.onLift(text))
    }

    onClick(text: PIXI.Text, x: number, y: number) {
        //roep hier de methode aan die de informatie en trivia vragen toont.
        text.x = x
        text.y = y - 25
        this.game.pixi.stage.addChild(text);
    }

    onLift(text: PIXI.Text) {
        this.game.pixi.stage.removeChild(text);
    }

    getPlantNaam() {
        switch (this.plantNaam) {
            case "plant1": {
                return "paardenbloem";
            }
            case "plant2": {
                return "tulp";
            }
            case "plant3": {
                return "viooltje";
            }
            case "plant4": {
                return "zonnebloem";
            }
            case "plant5": {
                return "munt";
            }
        }
    }
}