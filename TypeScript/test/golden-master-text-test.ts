import { Item, GildedRose } from "../app/gilded-rose";

console.log("OMGHAI!");

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // this conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),

  // Edge cases:
  // Quality at 0
  new Item("+5 Dexterity Vest", 5, 0),
  new Item("Elixir of the Mongoose", 0, 0),
  new Item("Aged Brie", 5, 0),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0),
  new Item("Conjured Mana Cake", 3, 0),

  // Quality at 50
  new Item("+5 Dexterity Vest", 5, 50),
  new Item("Aged Brie", 5, 50),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 50),

  // Backstage passes at sellIn 0 and -1
  new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20),

  // Conjured item after sell date and at quality 1
  new Item("Conjured Mana Cake", 0, 6),
  new Item("Conjured Mana Cake", 0, 1),
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(element.name + ", " + element.sellIn + ", " + element.quality);
  });
  console.log();
  gildedRose.updateQuality();
}
