class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      this.updateSellIn(item);

      switch (item.name) {
        case 'Aged Brie': 
          this.updateAgedBrie(item); 
          break;
        case 'Backstage passes to a TAFKAL80ETC concert': 
          this.updateBackstage(item); 
          break;
        case 'Sulfuras, Hand of Ragnaros': 
          this.updateSulfuras(item); 
          break;
        case 'Conjured': 
          this.updateConjured(item); 
          break;
        default: 
          this.updateNormalItem(item); 
          break;
      } 
    })
    return this.items;
  }

  updateSellIn(item) {
    if (item.name !== 'Sulfuras, Hand of Ragnaros') {
      item.sellIn -= 1
    }
  }

  updateNormalItem(item) {
    item.quality -= item.sellIn <= 0 ? 2 : 1;
    item.quality = Math.max(0, Math.min(50, item.quality));
  }
  

  updateAgedBrie(item) {
    item.quality = Math.min(50, item.quality + 1);
  }

  updateBackstage(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
    } else {
      const qualityIncrease = item.sellIn < 6 ? 3 : item.sellIn < 11 ? 2 : 1;
      item.quality = Math.min(50, item.quality + qualityIncrease);
    }
  }

  updateSulfuras(item) {
    item.quality = 80
  }

  updateConjured(item) {
    item.quality -= 2
    item.quality = Math.max(0, item.quality);
  }
}


module.exports = {
  Item,
  Shop
}
