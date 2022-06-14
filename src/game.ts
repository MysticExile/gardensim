import * as PIXI from "pixi.js"
import logSprite from "./images/Boekje.png"
import bgImage from "./images/background farm.png"
import bgImageStart from "./images/background field.png"
import startImage from "./images/start knop.png"
import plant1 from "./images/paardenbloem.png"
import plant2 from "./images/tulp.png"
import plant3 from "./images/viooltjes.png"
import plant4 from "./images/zonnebloem.png"
import plant5 from "./images/munt.png"
export class Log extends PIXI.Sprite {

    xspeed = 0
    yspeed = 0
    alive: Boolean
    public speak: Boolean

    constructor(texture: PIXI.Texture) {
        super(texture)
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        this.x = 600
        this.y = 20
        this.width = 100
        this.height = 60
    }

    update(delta: number) {
        this.x += this.xspeed
        this.y += this.yspeed
        console.log("This fish is updating!")
    }

    showLogs() {
        if (this.speak) {
            this.speak = false
        }
        else if (!this.speak) {
            this.speak = true;
        }
        return this.speak
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "TAB":
                this.showLogs()
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "TAB":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}

export class Menu extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
    }
}

export class startKnop extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = 200
        this.y = 60
    }
}

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    log: Log   // <- nu een Fish in plaats van een PIXI.Sprite
    menu: Menu
    startKnop: startKnop

    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("logTexture", logSprite)
            .add("backgroundTexture", bgImage)
            .add("backgroundTexture2", bgImageStart)
            .add("startButton", startImage)

    this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        //this.log = new Log(this.loader.resources["logTexture"].texture!)
        //this.pixi.stage.addChild(this.log)

        this.menu = new Menu(this.loader.resources["backgroundTexture2"].texture!)
        this.pixi.stage.addChild(this.menu)

        this.startKnop = new startKnop(this.loader.resources["startButton"].texture!)
        this.pixi.stage.addChild(this.startKnop)

        this.pixi.ticker.add((delta) => this.update(delta))
    }

    update(delta: number) {
        /*this.log.update(delta);
        if (this.log.speak) {
            this.pixi.stage.addChild(text)
        }
        if (!this.log.speak) {
            this.pixi.stage.removeChild(text)
        }
        */
    }
}

new Game()

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
//console.log("hoi")
