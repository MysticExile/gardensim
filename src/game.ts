import * as PIXI from "pixi.js"
import logSprite from "./images/Boekje.png"
import bgImage from "./images/background farm.png"
import bgImageStart from "./images/background field.png"
import startImage from "./images/start knop.png"
import buttonLog from "./images/knop_boekje.png"
import buttonMoestuin from "./images/knop_moestuin.png"
import buttonEnvironment from "./images/knop_omgeving.png" 
import { ENV } from "pixi.js"
export class Log extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 150
        this.y = 80
        this.height = 300
        this.width = 500
    }
}

export class Menu extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
    }
}

export class Farm extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
    }
}

export class LogButton extends PIXI.Sprite {

    isClicked: Boolean

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.width = 80
        this.height = 77
        this.isClicked = false;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        if (this.isClicked) {
            this.isClicked = false;
        }
        else if (!this.isClicked) {
            this.isClicked = true;
        }
    }
}

export class moestuinButton extends PIXI.Sprite {

    isClicked: Boolean

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.width = 80
        this.height = 77
        this.x = 80
        this.y = 0
        this.isClicked = false;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        this.isClicked = true;
    }
}

export class environmentButton extends PIXI.Sprite {

    isClicked: Boolean

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.width = 80
        this.height = 77
        this.x = 160
        this.y = 0
        this.isClicked = false;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        this.isClicked = true;
    }
}

export class startKnop extends PIXI.Sprite {

    isClicked: Boolean

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.isClicked = false;
        this.x = 200;
        this.y = 60;
        this.interactive = true  // make clickable
        this.buttonMode = true   // show hand cursor
        this.on('pointerdown', () => this.onClick())
    }

    onClick() {
        this.isClicked = true;
    }


}

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    log: Log   // <- nu een Fish in plaats van een PIXI.Sprite
    menu: Menu
    startKnop: startKnop
    farm: Farm
    logButton: LogButton
    moestuinButton: moestuinButton
    environmentButton: environmentButton


    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("logTexture", logSprite)
            .add("backgroundTexture", bgImage)
            .add("backgroundTexture2", bgImageStart)
            .add("startButton", startImage)
            .add("logButtonTexture", buttonLog)
            .add("moestuinButtonTexture", buttonMoestuin)
            .add("environmentButtonTexture", buttonEnvironment)
            

    this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        this.menu = new Menu(this.loader.resources["backgroundTexture2"].texture!)
        this.pixi.stage.addChild(this.menu)

        this.startKnop = new startKnop(this.loader.resources["startButton"].texture!)
        this.pixi.stage.addChild(this.startKnop)

        this.farm = new Farm(this.loader.resources["backgroundTexture"].texture!)

        this.logButton = new LogButton(this.loader.resources["logButtonTexture"].texture!)
        this.log = new Log(this.loader.resources["logTexture"].texture!)
        this.moestuinButton = new moestuinButton(this.loader.resources["moestuinButtonTexture"].texture!)
        this.environmentButton = new environmentButton(this.loader.resources["environmentButtonTexture"].texture!)
        
        this.pixi.ticker.add((delta) => this.update(delta, this.startKnop, this.logButton, this.moestuinButton, this.environmentButton))
    }

    update(delta: number, startKnop: startKnop, logButton: LogButton, moestuinButton: moestuinButton, environmentButton: environmentButton) {
        //checks if the start button has been pressed
        if (startKnop.isClicked) {
            //removes the menu texture and the button texture
            this.pixi.stage.removeChild(this.menu)
            this.pixi.stage.removeChild(this.startKnop)
            //adds farm and buttons textures
            this.pixi.stage.addChild(this.farm);
            this.pixi.stage.addChild(this.logButton)
            this.pixi.stage.addChild(this.moestuinButton)
            this.pixi.stage.addChild(this.environmentButton)
        }

        if (logButton.isClicked) {
            this.pixi.stage.addChild(this.log)
        }
        else if (!logButton.isClicked) {
            this.pixi.stage.removeChild(this.log)
        }

        if (moestuinButton.isClicked) {
            this.pixi.stage.removeChild(this.farm)
            this.pixi.stage.removeChild(this.moestuinButton)
        }

        if (environmentButton.isClicked) {
            this.pixi.stage.removeChild(this.farm)
            this.pixi.stage.removeChild(this.environmentButton)
        }
    }
}

new Game()

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
//console.log("hoi")
