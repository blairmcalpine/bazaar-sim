import { Card } from "../card";
import { logger } from "../logger";

export class Pufferfish extends Card {
  name = "Pufferfish";
  size = "medium" as const;
  tags = new Set(["friend", "aquatic"]);
  hiddenTags = new Set<string>();

  get baseCooldown() {
    return 11 - this.rarity;
  }

  get basePoison() {
    return 10;
  }

  get baseCharge() {
    return 2;
  }

  onHaste = () => {
    logger.debug("Pufferfish onHaste");
    this.board?.giveCharge(this, this.charge);
  };

  activate(): void {
    this.board?.dealPoison(this, this.poison);
  }
}
