import { Card } from "../card";
import { logger } from "../logger";

export class DockLines extends Card {
  name = "Dock Lines";
  size = "medium" as const;
  tags = new Set(["tool", "aquatic"]);
  hiddenTags = new Set<string>();
  baseCooldown = 5;

  get baseSlow() {
    return 3;
  }

  activate(): void {
    this.board?.dealSlow(this.rarity, this.slow);
  }
}
