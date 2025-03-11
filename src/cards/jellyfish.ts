import { Card } from "../card";
import { logger } from "../logger";

export class Jellyfish extends Card {
  name = "Jellyfish";
  size = "small" as const;
  tags = new Set(["friend", "aquatic"]);
  hiddenTags = new Set<string>();
  baseCooldown = 7;

  get basePoison() {
    return 1 * this.rarity + 2;
  }

  get baseHaste() {
    return this.rarity;
  }

  onUse = (card: Card) => {
    if (card.tags.has("aquatic") && this.isAdjacentTo(card)) {
      this.board?.giveHaste(this, this.haste);
    }
  };

  activate(): void {
    logger.debug("Jellyfish activate");
    this.board?.dealPoison(this, this.poison);
  }
}
