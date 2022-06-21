import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Plant extends PIXI.Sprite {

    game: Game
    private plantNaam = "*"

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
        //shows name of the plant when you click on it
        text.x = x
        text.y = y - 25
        this.game.pixi.stage.addChild(text);
        let a = this.getPlantIndex()
        //calls addPlant with the index of the clicked on plant
        this.game.addPlantToLog(a);
    }

    //removes the name of the plant
    onLift(text: PIXI.Text) {
        this.game.pixi.stage.removeChild(text);
    }

    //decodes texture to actual plantname
    getPlantNaam() {
        switch (this.plantNaam) {
            case "plant1": {
                return "paardenbloem";
                break;
            }
            case "plant2": {
                return "tulp";
                break;
            }
            case "plant3": {
                return "viooltje";
                break;
            }
            case "plant4": {
                return "zonnebloem";
                break;
            }
            case "plant5": {
                return "munt";
                break;
            }
        }
        //on the ocassion that none of the plant names match, that the plant is undefined or that the player just doesn't have any plants yet, return a placeholder.
        return "Je hebt nog geen planten!";
    }

    //decodes plant name to index in the Game.ts/planten[] array
    getPlantIndex() {
        switch (this.plantNaam) {
            case "paardenbloem": {
                return 0;
                break;
            }
            case "tulp": {
                return 1;
                break;
            }
            case "viooltje": {
                return 2;
                break;
            }
            case "zonnebloem": {
                return 3;
                break;
            }
            case "munt": {
                return 4;
                break;
            }
                //make sure that either name given will give the correct index
            case "plant1": {
                return 0;
                break;
            }
            case "plant2": {
                return 1;
                break;
            }
            case "plant3": {
                return 2;
                break;
            }
            case "plant4": {
                return 3;
                break;
            }
            case "plant5": {
                return 4;
                break;
            }
        }
        return;
    }

    getplantNaam() {
        return this.plantNaam;
    }
}