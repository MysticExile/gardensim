import * as PIXI from "pixi.js"
import logSprite from "./images/Boekje.png"
import bgImage from "./images/background farm.png"
import bgImageStart from "./images/background field.png"

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

export class Bubbles extends PIXI.Sprite {

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.x = getRandomInt(0, 900)
        this.y = getRandomInt(0, 500)
    }

    update(delta: number) {
        console.log("This bubble is updating!")
        this.y -= 1 * delta
        if (this.y < -100) {
            this.y = 500
        }
    }
}

export class Game {

    pixi: PIXI.Application
    loader: PIXI.Loader
    background: PIXI.Sprite
    log: Log   // <- nu een Fish in plaats van een PIXI.Sprite


    constructor() {
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("logTexture", logSprite)
            .add("backgroundTexture", bgImage)
            .add("backgroundTexture2", bgImageStart)

    this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.pixi.stage.addChild(this.background)

        this.log = new Log(this.loader.resources["logTexture"].texture!)
        this.pixi.stage.addChild(this.log)
        
        let text = new PIXI.Text('Slay', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
        this.pixi.ticker.add((delta) => this.update(delta, text))
    }

    update(delta: number, text: PIXI.Text) {
        this.log.update(delta);
        if (this.log.speak) {
            this.pixi.stage.addChild(text)
        }
        if (!this.log.speak) {
            this.pixi.stage.removeChild(text)
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
