import * as PIXI from 'pixi.js'
import plant1 from "./images/paardenbloem.png"
import plant2 from "./images/tulp.png"
import plant3 from "./images/viooltjes.png"
import plant4 from "./images/zonnebloem.png"
import plant5 from "./images/munt.png"

class planten {
    pixi : PIXI.Application // canvas element in de html file
    loader : PIXI.Loader
    planten: PIXI.Sprite[] = []

    constructor(){
        this.pixi = new PIXI.Application({ width: 800, height: 450 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
        this.loader.add('plant1', plant1)
            .add('plant2', plant2)
            .add('plant3', plant3)
            .add('plant4', plant4)
            .add('plant5', plant5)
        this.loader.load(() => this.loadCompleted())
    }
        //load planten op willekeurige plekken op het veldje (lisa)
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