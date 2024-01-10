const { Item, Shop } = require("../src/gilded_rose.js");

describe("Gilded Rose Pin Down Tests", () => {
  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(19); //check
  });

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  test('quality degrades 2x after sell by date', () => {
    let expired = new Item('expired', 0, 20);
    const gildedRose = new Shop([expired])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18)
  })

  test('quality never negative', () => {
    let qualityItem = new Item('qualityItem', -5, 1)
    const gildedRose = new Shop([qualityItem])
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0)
  })

  test('quality never >50', () => {
    let agedBrie = new Item("Aged Brie", 10, 50);
    const gildedRose = new Shop([agedBrie]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })

  test('quality sell by under 0', () => {
    let agedBrie = new Item("Aged Brie", -1, 20);
    const gildedRose = new Shop([agedBrie]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  })
  
  test('sulfuras doesnt decrease in quality or have to be sold', () => {
    let sulfuras = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
    const gildedRose = new Shop([sulfuras]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(10);
  })

  test('Quality of "Backstage passes" should increase by 2 when there are 10 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  test('Quality of "Backstage passes" expires', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      -1,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  test('Quality of "Backstage passes" days over 10', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      15,
      20
    );
    const gildedRose = new Shop([backstagePass]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  });

  test('Conjured degrades 2x', () => {
    let conjured = new Item("Conjured", 10, 20);
    const gildedRose = new Shop([conjured]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  })

  test("Normal items quality never negative", () => {
    let normalItem = new Item("normal", -1, 0); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(0); //check
  });
});
