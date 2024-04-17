import {Actor, Vector} from "excalibur";
import {Resources} from "./resources.js";

export class Bullet extends Actor {
    constructor(position) {
        super({
            width: Resources.Bullet.width,
            height: Resources.Bullet.height
        });
        this.pos = position
        this.vel = new Vector(0, 300)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Bullet.toSprite())
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
    }

    update(engine, delta) {
        super.update(engine, delta);

        if(this.isOffScreen) {
            this.kill();
        }
    }
}