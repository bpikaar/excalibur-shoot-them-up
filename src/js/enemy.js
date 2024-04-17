import {Actor, Random} from "excalibur";
import {Resources} from "./resources.js";
import {Bullet} from "./bullet.js";

export class Enemy extends Actor {
    random
    constructor() {
        super({
            width: Resources.Enemy.width,
            height: Resources.Enemy.height
        });
        this.random = new Random(558879);
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Enemy.toSprite());
        // random from bottom of the screen
        this.pos.x = Math.random() * engine.drawWidth;
        this.pos.y = engine.drawHeight;

        // Move up in a zig-zag by repeated moveBy's
        this.actions.repeatForever((repeatCtx) => {
            let speedX = this.random.integer(15, 30)
            repeatCtx.moveBy(-speedX, -30, 25);
            repeatCtx.moveBy(speedX, -30, 25);
        });

        this.on('precollision', (ev) => {
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

        if(this.pos.y < 0) {
            this.kill();
        }
    }
}