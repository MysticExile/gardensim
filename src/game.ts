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
import plant1 from "./images/paardenbloem.png"
import plant2 from "./images/tulp.png"
import plant3 from "./images/viooltjes.png"
import plant4 from "./images/zonnebloem.png"
import plant5 from "./images/munt.png"
import pot from "./images/potje.png"
import next from "./images/arrow_right.png"
import previous from "./images/arrow_left.png"

//import classes
import { Log } from './Log'
import { Menu } from './Menu'
import { Farm } from './Farm'
import { LogButton } from './LogButton'
import { moestuinButton } from './moestuinButton'
import { environmentButton } from './environmentButton'
import { startKnop } from './startKnop'
import { Environment } from './environment'
import { Plant } from './Plant'
import { Pot } from './Pot'
import { arrowNext } from './arrowNext'
import { arrowPrevious } from './arrowPrevious'

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    public log: Log   // <- nu een Fish in plaats van een PIXI.Sprite
    private menu: Menu
    private startKnop: startKnop
    private farm: Farm
    private environment: Environment
    public plant: Plant
    private pot: Pot
    private planten: Plant[] = []
    private pots: Pot[] = []
    private logButton: LogButton
    private moestuinButton: moestuinButton
    private environmentButton: environmentButton
    public arrowPrevious: arrowPrevious
    public arrowNext: arrowNext


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
            .add('plant1', plant1)
            .add('plant2', plant2)
            .add('plant3', plant3)
            .add('plant4', plant4)
            .add('plant5', plant5)
            .add('potTexture', pot)
            .add('nextButtonTexture', next)
            .add('previousButtonTexture', previous)
            

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
        this.arrowNext = new arrowNext(this.loader.resources['nextButtonTexture'].texture!, this)
        this.arrowPrevious = new arrowPrevious(this.loader.resources['previousButtonTexture'].texture!, this)

        this.environment = new Environment(this.loader.resources["backgroundTexture3"].texture!, this)

        for (let i = 0; i < 5; i++) {
            let x = 25 + (150 * i);
            let y = 235
            if (i % 2 != 0) {
                y = 200
            }
            let plantTexture = "plant" + (i+1)
            let plant = new Plant(this.loader.resources[plantTexture].texture!, this, x, y, plantTexture)
            this.planten.push(plant)
        }

        for (let i = 0; i < 5; i++) {
            let x = 25 + (150 * i);
            let y = 225
            if (i % 2 != 0) {
                y = 325
            }
            let pot = new Pot(this.loader.resources["potTexture"].texture!, this, x, y)
            this.pots.push(pot)
        }

        //start gameloop
        
        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta: number) {
    }

    addPlant(a: number) {
        this.log.addPlant(this.planten[a]);
    }

    loadLog() {
        this.pixi.stage.addChild(this.log)
        this.pixi.stage.addChild(this.arrowNext)
        this.pixi.stage.addChild(this.arrowPrevious)
        this.log.getPage();
        console.log("Log loaded")
    }

    unLoadLog() {
        this.pixi.stage.removeChild(this.log)
        this.pixi.stage.removeChild(this.arrowNext)
        this.pixi.stage.removeChild(this.arrowPrevious)
        let a = this.log.getText();
        this.pixi.stage.removeChild(a);
        console.log("Log loaded")
    }

    nextPage() {
        this.log.nextPage();
    }

    previousPage() {
        this.log.previousPage();
    }

    loadFarmStage() {
        this.pixi.stage.addChild(this.farm);
        this.pixi.stage.addChild(this.logButton)
        this.pixi.stage.addChild(this.moestuinButton)
        this.pixi.stage.addChild(this.environmentButton)
        for (let i = 0; i < this.pots.length; i++) {
            this.pixi.stage.addChild(this.pots[i])
        }
        console.log("Farm stage loaded")
    }

    loadEnvironmentStage() {
        this.pixi.stage.addChild(this.environment)
        this.pixi.stage.addChild(this.logButton)
        this.pixi.stage.addChild(this.moestuinButton)
        this.pixi.stage.addChild(this.environmentButton)
        for (let i = 0; i < this.planten.length; i++) {
            this.pixi.stage.addChild(this.planten[i])
        }
        console.log("Environment stage loaded")
    }

    destroyChildren() {
        for (let i = 0; i < this.pixi.stage.children.length; i++) {
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
            this.pixi.stage.removeChild(this.pixi.stage.children[i])
        }
    }
    //Make an easier randomised integer function, call this if you need a random integer
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
}

new Game()