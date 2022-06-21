import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Plant } from './Plant'

export class Pot extends PIXI.Sprite {

    game: Game
    plant: Plant
    private text: PIXI.Text;
    private index: number;

    constructor(texture: PIXI.Texture, game: Game, x: number , y: number , index: number) {
        super(texture)
        this.game = game
        this.index = index
        this.x = x
        this.y = y
        this.text = new PIXI.Text('Dit is een pot', { fontFamily: 'Arial', fontSize: 24, fill: 0x000000, align: 'center' });
        this.text.x = x
        this.text.y = y - 25
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
        this.on('pointerup', () => this.onLift())
    }

    onClick() {
        //roep hier de methode aan die de informatie en trivia vragen toont.
        if (this.plant != undefined) {
            console.log(this.plant.getPlantNaam());
            this.text.text = this.plant.getPlantNaam();
            this.changePlant();
            this.game.pixi.stage.addChild(this.plant);
            this.game.pixi.stage.addChild(this.text)
            this.game.removePlantFromLog(this.plant);
        }
        else {
            this.game.addPlantToPot(this.getPotIndex());
            this.game.pixi.stage.addChild(this.text);
        }
        
    }

    onLift() {
        this.game.pixi.stage.removeChild(this.text);
    }

    addPlant(a: Plant) {
        this.plant = a
        console.log(a)
    }

    getPotIndex() {
        return this.index;
    }

    changePlant() {
        let x = 25 + (150 * this.index);
        let y = 100
        if (this.index % 2 != 0) {
            y = 200
        }
        this.plant.x = x
        this.plant.y = y
    }
}