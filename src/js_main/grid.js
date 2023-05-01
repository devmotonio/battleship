import Tile from "./tile.min.js";

export default class Grid {
  constructor(size, count, startX, startY) {
    this.tiles = [];
    this.enabled = true;
    this.selectedTile = null;
    this.count = count;

    let total = this.count * this.count;
    let positionX = startX;
    let positionY = startY;
    for (let i = 0; i < total; i++) {
      let t = new Tile(size, positionX, positionY);
      this.tiles.push(t);

      if ((i + 1) % this.count == 0) {
        positionX = startX;
        positionY += size;
      } else {
        positionX += size;
      }
    }
  }

  click(positionX, positionY, ctx) {
    let i = 0;
    if (this.enabled) {
      this.tiles.forEach((item, index) => {
        if (
          item.positionX <= positionX &&
          positionX < item.positionX + item.size &&
          item.positionY <= positionY &&
          positionY < item.positionY + item.size
        ) {
          this.markAvailable(index, 2, ctx);
        }
      });
    }
  }

  markAvailable(index, size, ctx) {
    let availableTiles = [];

    //TOP
    if (
      index - size * this.count >= 0 &&
      this.checkAvailable(index - this.count, index - size * this.count, -this.count)
    ) {
      availableTiles.push(index - size * this.count);
    }
    //LEFT
    if ((index % this.count) - size >= 0 && this.checkAvailable(index - 1, index - size, -1)) {
      availableTiles.push(index - size);
    }
    //RIGHT
    if ((index % this.count) + size < this.count && this.checkAvailable(index + 1, index + size, 1)) {
      availableTiles.push(index + size);
    }
    //BOTTOM
    if (
      index + size * this.count < this.count * this.count &&
      this.checkAvailable(index + this.count, index + size * this.count, this.count)
    ) {
      availableTiles.push(index + size * this.count);
    }

    if (availableTiles.length) {
      availableTiles.forEach((item) => {
        this.tiles[item].click(ctx, "#a8a", "#8a8");
      });
      this.tiles[index].click(ctx, "#f0f", "#0f0");
      this.selectedTile = index;
    }
  }

  checkAvailable(start, stop, step) {
    let i = start;
    while (i != (stop+step)) {
      if (this.tiles[i].isClickable == false) {
        return false;
      }
      i += step;
    }
    return true;
  }

  animate(ctx) {
    this.tiles.forEach((item, index) => {
      item.animate(ctx);
    });
  }
}
