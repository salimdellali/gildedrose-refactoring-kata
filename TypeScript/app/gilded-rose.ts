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

  // Static cached strategy instances
  private static readonly normalStrategy = new NormalStrategy();
  private static readonly agedBrieStrategy = new AgedBrieStrategy();
  private static readonly sulfurasStrategy = new SulfurasStrategy();
  private static readonly backstageStrategy = new BackstageStrategy();

  // Strategy map for item name to strategy
  private static readonly strategyMap: Record<string, UpdateStrategy> = {
    "Aged Brie": GildedRose.agedBrieStrategy,
    "Sulfuras, Hand of Ragnaros": GildedRose.sulfurasStrategy,
    "Backstage passes to a TAFKAL80ETC concert": GildedRose.backstageStrategy,
  };

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private static getStrategy(item: Item): UpdateStrategy {
    return GildedRose.strategyMap[item.name] || GildedRose.normalStrategy;
  }

  updateQuality() {
    for (const item of this.items) {
      const strategy = GildedRose.getStrategy(item);
      strategy.update(item);
    }

    return this.items;
  }
}
