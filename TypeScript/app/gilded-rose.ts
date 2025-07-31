export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

// Strategy interfaces
interface UpdateStrategy {
  update(item: Item): void;
}

// Normal item strategy
class NormalStrategy implements UpdateStrategy {
  update(item: Item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
    if (item.quality < 0) item.quality = 0;
  }
}

// Aged Brie strategy
class AgedBrieStrategy implements UpdateStrategy {
  update(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
    if (item.quality > 50) item.quality = 50;
  }
}

// Sulfuras strategy
class SulfurasStrategy implements UpdateStrategy {
  update(item: Item) {
    // Legendary: do nothing
  }
}

// Backstage passes strategy
class BackstageStrategy implements UpdateStrategy {
  update(item: Item) {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality += 1;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality += 1;
      }
    }
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = 0;
    }
    if (item.quality > 50) item.quality = 50;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private static getStrategy(item: Item): UpdateStrategy {
    if (item.name === "Aged Brie") return new AgedBrieStrategy();
    if (item.name === "Sulfuras, Hand of Ragnaros")
      return new SulfurasStrategy();
    if (item.name.startsWith("Backstage passes"))
      return new BackstageStrategy();
    return new NormalStrategy();
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const strategy = GildedRose.getStrategy(this.items[i]);
      strategy.update(this.items[i]);
    }

    return this.items;
  }
}
