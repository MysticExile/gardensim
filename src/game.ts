import * as PIXI from "pixi.js"

//import sprites and textures
import logSprite from "./images/Boekje.png"
import bgImage from "./images/background farm.png"
import bgImageField from "./images/background field.png"
import bgImageStart from "./images/startmenu.png"
import startImage from "./images/start knop.png"
import buttonLog from "./images/knop_boekje.png"
import buttonMoestuin from "./images/knop_moestuin.png"
import buttonEnvironment from "./images/knop_omgeving.png" 

//import classes
import { Log } from './Log'
import { Menu } from './Menu'
import { Farm } from './Farm'
import { LogButton } from './LogButton'
import { moestuinButton } from './moestuinButton'
import { environmentButton } from './environmentButton'
import { startKnop } from './startKnop'
import { Environment } from './environment'

//Make an easier randomised integer function, call this if you need a random integer
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    log: Log   // <- nu een Fish in plaats van een PIXI.Sprite
    menu: Menu
    startKnop: startKnop
    farm: Farm
    environment: Environment
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
            .add("backgroundTexture3", bgImageField)
            .add("startButton", startImage)
            .add("logButtonTexture", buttonLog)
            .add("moestuinButtonTexture", buttonMoestuin)
            .add("environmentButtonTexture", buttonEnvironment)
            

    this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        //load initial load screen
        this.menu = new Menu(this.loader.resources["backgroundTexture2"].texture!, this)
        this.pixi.stage.addChild(this.menu)

        this.startKnop = new startKnop(this.loader.resources["startButton"].texture!, this)
        this.pixi.stage.addChild(this.startKnop)

        //load textures that are to be eventually used

        this.farm = new Farm(this.loader.resources["backgroundTexture"].texture!, this)

        this.logButton = new LogButton(this.loader.resources["logButtonTexture"].texture!, this)
        this.moestuinButton = new moestuinButton(this.loader.resources["moestuinButtonTexture"].texture!, this)
        this.environmentButton = new environmentButton(this.loader.resources["environmentButtonTexture"].texture!, this)

        this.log = new Log(this.loader.resources["logTexture"].texture!, this)

        this.environment = new Environment(this.loader.resources["backgroundTexture3"].texture!, this)

        //start gameloop
        
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta: number) {}

    loadLog() {
        this.pixi.stage.addChild(this.log)
    }

    loadFarmStage() {
        this.pixi.stage.addChild(this.farm);
        this.pixi.stage.addChild(this.logButton)
        this.pixi.stage.addChild(this.moestuinButton)
        this.pixi.stage.addChild(this.environmentButton)
        console.log("Farm stage loaded")
    }

    loadEnvironmentStage() {
        this.pixi.stage.addChild(this.environment)
        this.pixi.stage.addChild(this.logButton)
        this.pixi.stage.addChild(this.moestuinButton)
        this.pixi.stage.addChild(this.environmentButton)
        console.log("Environment stage loaded")
    }

    destroyChildren() {
        this.pixi.stage.destroy
    }
}

new Game()