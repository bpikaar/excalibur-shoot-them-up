import {Actor} from "excalibur";
import {Resources} from "./resources.js";
import {Bullet} from "./bullet.js";

export class Enemy extends Actor {
    constructor() {
        super({
            width: Resources.Enemy.width,
            height: Resources.Enemy.height
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Enemy.toSprite());
        // random from bottom of the screen
        this.pos.x = Math.random() * engine.drawWidth;
        this.pos.y = engine.drawHeight;

        // Move up in a zig-zag by repeated moveBy's
        this.actions.repeatForever((repeatCtx) => {
            repeatCtx.moveBy(-15, -10, 15);
            repeatCtx.moveBy(15, -10, 15);
        });

        this.on('precollision', (ev) => {
            console.log('precollision', ev);
            if(ev.other instanceof Bullet) {
                ev.other.kill();
                this.kill();
            }
        });
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