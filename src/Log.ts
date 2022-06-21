import * as PIXI from 'pixi.js'
import { Game } from './game'
import { Plant } from './Plant'

export class Log extends PIXI.Sprite {

    game: Game
    private plant: Plant
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
        //inserts a placeholder if you didn't collect any plants yet
        this.plantNaam = `Je hebt nog \n geen planten!` //
        this.text = new PIXI.Text(`${this.plantNaam}`, { fontFamily: 'Arial', fontSize: 24, fill: 0x000000, align: 'center' });
        this.text.x = 225;
        this.text.y = 110;
    }

    //adds plant to the array in this class
    public addPlantToLog(plant: Plant) {
        console.log(plant)
        this.plant = plant
        console.log(this.plants.length)
        //for (let i = 0; i < this.plants.length; i++) {
        //    if (this.plants[i].getPlantNaam() !== plant.getPlantNaam()) {
        //        this.plants.push(plant)
        //        console.log("Log heeft nu een extra plant")
        //    }
        //    console.log(i)
        //}
        this.plants.push(this.plant)
    }

    //gets the current page
    public getPage() {
        //checks if there are even any filled pages
        if (this.plants[this.pageNumber] != undefined) {
            console.log(this.plants.length)
            //extra insurance
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
        //if there are no pages, add placeholder text
        else {
            this.game.pixi.stage.addChild(this.text);
        }
    }

    //moves on to the next apge
    nextPage() {
        console.log(this.plants[this.pageNumber]);
        //checks if the next page is even there
        if (this.plants[this.pageNumber + 1] != undefined) {
            this.game.pixi.stage.removeChild(this.text);
            this.pageNumber++
            this.plantNaam = `${this.plants[this.pageNumber].getPlantNaam()}`
            this.text.text = this.plantNaam;
            this.game.pixi.stage.addChild(this.text);
        }
        //if not, an error message occurs
        else if (this.plants[this.pageNumber + 1] == undefined) {
            this.pageNumber++
            this.text.text = "Er is geen volgende pagina!"
        }
    }

    //same as nextPage()
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

    removePlantFromLog(a: Plant) {
        this.plants = this.plants.filter(data => data.getPlantNaam() != a.getPlantNaam())
    }

    //gets the text object
    getText() {
        return this.text;
    }

    getCurrentPlant() {
        return this.plants[this.pageNumber];
    }

    getPlantArray() {
        return this.plants;
    }
}