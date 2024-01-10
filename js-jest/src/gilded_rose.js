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
      if (item.name !== 'Sulfuras, Hand of Ragnaros') this.decreaseSellInDateByOne(item)

      switch (item.name) {
        case 'Aged Brie': this.updateAgedBrie(item); break;
        case 'Backstage passes to a TAFKAL80ETC concert': this.updateBackstage(item); break;
        case 'Sulfuras, Hand of Ragnaros': this.updateSulfuras(item); break;
        case 'Conjured': this.updateConjured(item); break;
        default: this.updateNormalItem(item); break;
      } 
    })
    return this.items;
  }

  updateNormalItem(item) {
    if (item.sellIn <= 0) {
      this.decreaseExpiredQuality(item)
    } else {
      item.quality -= 1
    }
  }

  decreaseSellInDateByOne(item) {
    item.sellIn -= 1
  }

  decreaseExpiredQuality(item) {
    if (item.quality >= 2) {
      item.quality -= 2
    } else if (item.quality > 0) {
      item.quality -= 1
    } else {
      return
    }
  }

  updateAgedBrie(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }

  updateBackstage(item) {
    if (item.sellIn < 0) {
      item.quality = 0;
      return
    } 
    if (item.quality < 50) {
      this.updateBackstageQuality(item)
    }
  }

  updateBackstageQuality(item) {
    if (item.sellIn < 6 ) {
      item.quality = item.quality + 3;
    } else if (item.sellIn < 11) {
      item.quality = item.quality + 2;
    } else {
      item.quality = item.quality + 1;
    }
  }

  updateSulfuras(item) {
    item.quality = 80
  }

  updateConjured(item) {
    item.quality -= 2
  }

}


module.exports = {
  Item,
  Shop
}
