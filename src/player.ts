import { Board } from "./board";
import { INTERVAL } from "./const";
import type { Game } from "./game";
import { logger } from "./logger";

export class Player {
  board: Board;
  game: Game;
  label: string;
  maxHealth: number;
  health: number;
  shield: number;
  poison: number;
  burn: number;

  constructor(game: Game, maxHealth: number, label: string) {
    this.board = new Board(this);
    this.label = label;
    this.game = game;
    this.maxHealth = maxHealth;
    this.health = maxHealth;
    this.shield = 0;
    this.poison = 0;
    this.burn = 0;
  }

  runHealth = (timestamp: number) => {
    logger.setPlayer(this.label);
    if (timestamp % 1 < 1e-10) {
      // One second timestamp
      this.health -= this.poison;
      logger.debug("Taking poision damage", this.poison, this.health);
    }
    if (timestamp % 0.5 < 1e-10) {
      // 500ms timestamp
      if (this.shield) {
        const burnTick = Math.floor(this.burn / 2);
        if (burnTick > this.shield) {
          this.shield = 0;
          this.health -= burnTick - this.shield;
        } else {
          this.shield -= burnTick;
        }
      } else {
        this.health -= this.burn;
      }

      if (this.burn) this.burn -= 1;
    }
    logger.resetPlayer();
  };

  runBoard = (timestamp: number) => {
    logger.setPlayer(this.label);
    this.board.run(timestamp);
    logger.resetPlayer();
  };

  recievePoison = (amount: number) => {
    this.poison += amount;
  };
  dealPoison = (amount: number) => {
    this.game.getOpponent(this).recievePoison(amount);
  };

  recieveSlow = (items: number, duration: number) => {
    this.board.giveSlow(items, duration);
  };
  dealSlow = (items: number, duration: number) => {
    this.game.getOpponent(this).recieveSlow(items, duration);
  };

  reset = () => {
    this.health = this.maxHealth;
    this.shield = 0;
    this.poison = 0;
    this.burn = 0;
    this.board.reset();
  };
}
