import {Actor, Input, Keys, Logger, Vector} from "excalibur";
import {Resources} from "./resources.js";
import {Bullet} from "./bullet.js";

export class Fighter extends Actor {
    playerNumber;

    constructor(playerNumber) {
        super({
            width: Resources.Plane.width,
            height: Resources.Plane.height
        });
        this.playerNumber = playerNumber;
        this.pos = new Vector(400, 300);
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Plane.toSprite());
    }

    onPreUpdate(engine, delta) {
        super.onPreUpdate(engine, delta);
        let xspeed = 0;
        let yspeed = 0;

        let xAxis = engine.input.gamepads.at(this.playerNumber).getAxes(Input.Axes.LeftStickX);
        let yAxis = engine.input.gamepads.at(this.playerNumber).getAxes(Input.Axes.LeftStickY);

        if (engine.input.keyboard.isHeld(Keys.W) ||
            engine.input.keyboard.isHeld(Keys.Up) ||
            yAxis < -0.5
        ) {
            yspeed = -300;
        }
        if (engine.input.keyboard.isHeld(Keys.S) ||
            engine.input.keyboard.isHeld(Keys.Down) ||
            yAxis > 0.5
        ) {
            yspeed = 300;
        }
        if (engine.input.keyboard.isHeld(Keys.A) ||
            engine.input.keyboard.isHeld(Keys.Left) ||
            xAxis < -0.5
        ) {
            xspeed = -300;
        }
        if (engine.input.keyboard.isHeld(Keys.D) ||
            engine.input.keyboard.isHeld(Keys.Right) ||
            xAxis > 0.5
        ) {
            xspeed = 300;
        }

        this.vel = new Vector(xspeed, yspeed);

        // Buttons
        if (engine.input.keyboard.wasPressed(Keys.Space) ||
            engine.input.gamepads.at(this.playerNumber).wasButtonPressed(Input.Buttons.Face1)
        ) {
            // shoot
            const bulletLeft = new Bullet(new Vector(this.pos.x - 20, this.pos.y + 30));
            engine.add(bulletLeft);

            const bulletRight = new Bullet(new Vector(this.pos.x + 30, this.pos.y + 30));
            engine.add(bulletRight);

            Logger.getInstance().info('Controller A button pressed');
        }
    }
}