import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Plant } from './Plant'

export class Log extends PIXI.Sprite {

    game: Game
    private plants: Plant[] = []
    private plantNaam = "*"
    private pageNumber = 0;
    public text: PIXI.Text

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = 150
        this.y = 80
        this.height = 300
        this.width = 500
        this.plantNaam = `Je hebt nog \n geen planten!`
        this.text = new PIXI.Text(`${this.plantNaam}`, { fontFamily: 'Arial', fontSize: 24, fill: 0x000000, align: 'center' });
        this.text.x = 225;
        this.text.y = 110;
    }

    public addPlant(plant: Plant) {
        console.log(plant)
        this.plants.push(plant)
    }

    public getPage() {
        if (this.plants[this.pageNumber] != undefined) {
            console.log(this.plants.length)
            if (this.plants.length > 0) {
                console.log(this.plants[this.pageNumber].getPlantNaam());
                this.plantNaam = `${this.plants[this.pageNumber].getPlantNaam()}`
                this.text.text = this.plantNaam;
                this.game.pixi.stage.addChild(this.text);
            }
            else {
                this.game.pixi.stage.addChild(this.text);
            }
        }
        else {
            this.game.pixi.stage.addChild(this.text);
        }
    }

    nextPage() {
        console.log(this.plants[this.pageNumber]);
        if (this.plants[this.pageNumber + 1] != undefined) {
            this.game.pixi.stage.removeChild(this.text);
            this.pageNumber++
            this.plantNaam = `${this.plants[this.pageNumber].getPlantNaam()}`
            this.text.text = this.plantNaam;
            this.game.pixi.stage.addChild(this.text);
        }
        else if (this.plants[this.pageNumber + 1] == undefined) {
            this.pageNumber++
            this.text.text = "Er is geen volgende pagina!"
        }
    }

    previousPage() {
        console.log(this.plants[this.pageNumber]);
        if (this.plants[this.pageNumber - 1] != undefined) {
            this.game.pixi.stage.removeChild(this.text);
            this.pageNumber--
            this.plantNaam = `${this.plants[this.pageNumber].getPlantNaam()}`
            this.text.text = this.plantNaam;
            this.game.pixi.stage.addChild(this.text);
        }
        else if (this.plants[this.pageNumber - 1] == undefined) {
            this.pageNumber--
            this.text.text = "Er is geen vorige pagina!"
        }
    }

    getText() {
        return this.text;
    }
}