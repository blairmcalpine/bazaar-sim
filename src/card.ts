import type { Board } from "./board";

type Size = "small" | "medium" | "large";
type Rarity = 1 | 2 | 3 | 4 | 5;

export abstract class Card {
  rarity: Rarity;
  board: Board | null = null;

  constructor(rarity: Rarity) {
    this.rarity = rarity;
  }

  abstract readonly name: string;
  abstract readonly size: Size;
  abstract tags: Set<string>;
  abstract hiddenTags: Set<string>;

  get baseDamage() {
    return 0;
  }
  get addedDamage() {
    return 0;
  }
  get damage() {
    return this.baseDamage + this.addedDamage;
  }

  get baseHeal() {
    return 0;
  }
  get addedHeal() {
    return 0;
  }
  get heal() {
    return this.baseHeal + this.addedHeal;
  }

  get baseShield() {
    return 0;
  }
  get addedShield() {
    return 0;
  }
  get shield() {
    return this.baseShield + this.addedShield;
  }

  get basePoison() {
    return 0;
  }
  get addedPoison() {
    return 0;
  }
  get poison() {
    return this.basePoison + this.addedPoison;
  }

  get baseBurn() {
    return 0;
  }
  get addedBurn() {
    return 0;
  }
  get burn() {
    return this.baseBurn + this.addedBurn;
  }

  get baseSlow() {
    return 0;
  }
  get addedSlow() {
    return 0;
  }
  get slow() {
    return this.baseSlow + this.addedSlow;
  }

  get baseFreeze() {
    return 0;
  }
  get addedFreeze() {
    return 0;
  }
  get freeze() {
    return this.baseFreeze + this.addedFreeze;
  }

  get baseHaste() {
    return 0;
  }
  get addedHaste() {
    return 0;
  }
  get haste() {
    return this.baseHaste + this.addedHaste;
  }

  get baseCharge() {
    return 0;
  }
  get addedCharge() {
    return 0;
  }
  get charge() {
    return this.baseCharge + this.addedCharge;
  }

  get baseCrit() {
    return 0;
  }
  get addedCrit() {
    return 0;
  }
  get crit() {
    return this.baseCrit + this.addedCrit;
  }

  abstract baseCooldown: number;
  get addedCooldown() {
    return 0;
  }
  get cooldown() {
    return this.baseCooldown + this.addedCooldown;
  }

  abstract activate(): void;

  onBurn = () => {};
  onPoison = () => {};
  onShield = () => {};
  onHeal = () => {};
  onDamage = () => {};
  onHaste = (card: Card) => {};
  onSlow = () => {};
  onFreeze = () => {};
  onUpgradeSelf = () => {};
  onUse = (card: Card) => {};

  upgrade = (): boolean => {
    if (this.rarity === 4) {
      return false;
    }
    this.rarity++;
    return true;
  };

  isAdjacentTo = (card: Card): boolean => {
    if (!this.board) {
      throw new Error("Card not on board");
    }
    return (
      Math.abs(this.board.getPosition(this) - this.board.getPosition(card)) ===
      1
    );
  };
}
