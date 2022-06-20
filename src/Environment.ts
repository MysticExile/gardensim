import * as PIXI from 'pixi.js'
import { Game } from './game'

export class Environment extends PIXI.Sprite {
    game: Game
    planten: PIXI.Sprite[] = []
    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game 
    }
    loadCompleted() {
        for (let i = 0; i < 2; i++) {
            let plant1 = new PIXI.Sprite(this.loader.resources[`plant1`].texture!)
            plant1.x = Math.random() * this.pixi.screen.width;
            plant1.y = 300;
            this.pixi.stage.addChild(plant1)
            this.planten.push(plant1)

            let plant2 = new PIXI.Sprite(this.loader.resources[`plant2`].texture!)
            plant2.x = Math.random() * this.pixi.screen.width;
            plant2.y = 250;
            this.pixi.stage.addChild(plant2)
            this.planten.push(plant2)

            let plant3 = new PIXI.Sprite(this.loader.resources[`plant3`].texture!)
            plant3.x = Math.random() * this.pixi.screen.width;
            plant3.y = 275;
            this.pixi.stage.addChild(plant3)
            this.planten.push(plant3)

            let plant4 = new PIXI.Sprite(this.loader.resources[`plant4`].texture!)
            plant4.x = Math.random() * this.pixi.screen.width;
            plant4.y = 50;
            this.pixi.stage.addChild(plant4)
            this.planten.push(plant4)

            let plant5 = new PIXI.Sprite(this.loader.resources[`plant5`].texture!)
            plant5.x = Math.random() * this.pixi.screen.width;
            plant5.y = 200;
            this.pixi.stage.addChild(plant5)
            this.planten.push(plant5)
    }
}
}
