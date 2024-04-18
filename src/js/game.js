import '../css/style.css';
import {Buttons, DisplayMode, Engine, Input, Resolution, Timer} from "excalibur";
import {ResourceLoader} from './resources.js';
import {Fighter} from "./fighter.js";
import {Enemy} from "./enemy.js";

export class Game extends Engine {

    playerNumber = 0;
    gamepadConnected = false;
    timer
    constructor() {
        super({
            // width: 800,
            // height: 600,
            displayMode: DisplayMode.FillScreen,
            antialiasing:false,
            resolution:Resolution.GameBoyAdvance,
            suppressPlayButton: true,
        });
        this.start(ResourceLoader).then(() => this.startGame());
    }

    onInitialize(engine) {
        console.log("initializing game");

        engine.input.gamepads.setMinimumGamepadConfiguration({
            axis: 4,
            buttons: 6,
        });
        engine.input.gamepads.enabled = true;

        engine.input.gamepads.on('connect', (connectEvent) => {
            const fighter = new Fighter(this.playerNumber++);
            this.add(fighter);
            console.log('Gamepad connected', connectEvent);
            this.gamepadConnected = true
        });

        setTimeout(() => {
            if(!this.gamepadConnected) {
                const fighter = new Fighter(this.playerNumber++);
                this.add(fighter);
            }
        }, 2000);


    // spawn timer for enemies
        this.timer = new Timer({
            fcn: () => this.spawn(),
            interval: 2000,
            repeats: true
        })
        this.add(this.timer)
        this.timer.start()
    }

    startGame() {
        console.log("start de game!");


    }

    spawn() {
        const enemy = new Enemy();
        this.add(enemy);
    }
}

new Game();
