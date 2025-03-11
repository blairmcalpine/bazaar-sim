import type { Card } from "./card";
import { INTERVAL } from "./const";
import type { Player } from "./player";

type CardStatus = {
  cooldown: number;
  haste: number;
  slow: number;
  freeze: number;
  destroyed: boolean;
};

export class Board {
  statuses: Map<Card, CardStatus> = new Map();

  get cards() {
    return Array.from(this.statuses.keys());
  }

  player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  addCard = (card: Card) => {
    card.board = this;
    this.statuses.set(card, {
      cooldown: card.cooldown,
      haste: 0,
      slow: 0,
      freeze: 0,
      destroyed: false,
    });
  };

  getPosition = (card: Card) => {
    return this.cards.indexOf(card);
  };

  getStatus = (card: Card) => {
    const status = this.statuses.get(card);
    if (!status) {
      throw new Error("Card not found");
    }
    return status;
  };

  shouldCrit = (card: Card) => {
    return Math.random() * 100 < card.crit;
  };

  giveHaste = (card: Card, duration: number) => {
    const status = this.getStatus(card);
    status.haste = duration;
    this.cards.forEach((c) => c.onHaste(card));
  };

  giveSlow = (items: number, duration: number) => {
    const itemsToSlow = this.randomItems(items);
    itemsToSlow.forEach((c) => {
      const status = this.getStatus(c);
      status.slow += duration;
    });
  };

  giveCharge = (card: Card, duration: number) => {
    const status = this.getStatus(card);
    status.cooldown = Math.max(status.cooldown - duration, 0);
  };

  dealPoison = (card: Card, amount: number) => {
    const crit = this.shouldCrit(card);
    if (crit) {
      amount *= 2;
    }
    this.player.dealPoison(amount);
    this.cards.forEach((c) => c.onPoison());
  };

  dealSlow = (items: number, duration: number) => {
    this.player.dealSlow(items, duration);
    for (let i = 0; i < items; i++) {
      this.cards.forEach((c) => c.onSlow());
    }
  };

  private randomItems = (n: number) => {
    let result = [];
    let seenIndices = new Set();

    while (result.length < n) {
      let randomIndex = Math.floor(Math.random() * this.cards.length);
      if (!seenIndices.has(randomIndex)) {
        result.push(this.cards[randomIndex]);
        seenIndices.add(randomIndex);
      }
    }

    return result;
  };

  run = (timestamp: number) => {
    this.cards.forEach((card) => {
      const status = this.getStatus(card);
      if (status.destroyed) {
        return;
      }

      if (status.cooldown > 0) {
        if (status.freeze) {
          status.freeze -= INTERVAL;
          return;
        }

        let interval = INTERVAL;
        if (status.slow) {
          interval /= 2;
          status.slow -= INTERVAL;
        }
        if (status.haste) {
          interval *= 2;
          status.haste -= INTERVAL;
        }

        status.cooldown -= interval;
      }

      if (status.cooldown <= 0) {
        card.activate();
        this.cards.forEach((c) => c.onUse(card));
        status.cooldown = card.cooldown;
      }
    });
  };

  reset = () => {
    this.cards.forEach((card) => {
      this.statuses.set(card, {
        cooldown: card.cooldown,
        haste: 0,
        slow: 0,
        freeze: 0,
        destroyed: false,
      });
    });
  };
}
