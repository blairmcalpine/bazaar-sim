import { INTERVAL } from "./const";
import { logger } from "./logger";
import { Player } from "./player";

export class Game {
  readonly p1: Player;
  readonly p2: Player;
  constructor() {
    this.p1 = new Player(this, 1000, "p1");
    this.p2 = new Player(this, 1000, "p2");
  }

  run = () => {
    let timestamp = 0;
    while (this.p1.health > 0 && this.p2.health > 0) {
      logger.setTimestamp(timestamp);
      this.p1.runHealth(timestamp);
      this.p2.runHealth(timestamp);
      this.p1.runBoard(timestamp);
      this.p2.runBoard(timestamp);
      timestamp = Math.round((timestamp + INTERVAL) * 10) / 10;
    }
    logger.resetTimestamp();
    if (this.p1.health <= 0 && this.p2.health <= 0) {
      return "draw";
    } else if (this.p2.health <= 0) {
      return "p1";
    }
    return "p2";
  };

  getOpponent = (player: Player) => {
    return player === this.p1 ? this.p2 : this.p1;
  };

  reset = () => {
    this.p1.reset();
    this.p2.reset();
  };
}
