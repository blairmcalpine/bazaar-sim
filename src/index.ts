import { Game } from "./game";
import { Jellyfish } from "./cards/jellyfish";
import { Pufferfish } from "./cards/pufferfish";
import { DockLines } from "./cards/dock-lines";
import { logger } from "./logger";

const game = new Game();
const j1 = new Jellyfish(1);
const j2 = new Jellyfish(1);
const j3 = new Jellyfish(1);
const j4 = new Jellyfish(1);
const dl = new DockLines(2);

game.p1.board.addCard(j1);
game.p1.board.addCard(j2);
game.p2.board.addCard(j3);
game.p2.board.addCard(j4);
// game.p2.board.addCard(dl);

const results = {
  p1: 0,
  p2: 0,
  draw: 0,
};
for (let i = 0; i < 1000; i++) {
  const r = game.run();
  results[r]++;
  game.reset();
}
logger.info(results);
