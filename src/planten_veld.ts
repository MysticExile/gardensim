import plant1 from "./images/paardenbloem.png"
import plant2 from "./images/tulp.png"
import plant3 from "./images/viooltjes.png"
import plant4 from "./images/zonnebloem.png"
import plant5 from "./images/munt.png"

//load planten op willekeurige plekken op het veldje (lisa)
for (let i = 0; i < 5; i++) {
    let plant = new PIXI.Sprite(this.loader.resources[`plant${i}`].texture!)
    plant.x = Math.random() * this.pixi.screen.width;
    plant.y = Math.random() * this.pixi.screen.height;
    this.pixi.stage.addChild(plant)
}