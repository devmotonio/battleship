export default class Tile {
  constructor(size, positionX,positionY) {
    this.size = size;
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasFillStyle = "#0ee";
    this.canvasStrokeStyle = "#00f";
    this.isClickable = true;
  }

  animate(ctx) {
    ctx.fillStyle = this.canvasFillStyle;
    ctx.strokeStyle = this.canvasStrokeStyle;
    ctx.lineWidth = 0.1;
    this.draw(ctx);
  }

  click(ctx, canvasFillStyle = this.canvasFillStyle, canvasStrokeStyle = this.canvasStrokeStyle) {
    ctx.fillStyle = canvasFillStyle;
    ctx.strokeStyle = canvasStrokeStyle;
    ctx.lineWidth = 0.1;
    this.isClickable = false;
    this.draw(ctx);
  }

  draw(ctx) {
    ctx.fillRect(this.positionX, this.positionY, this.size, this.size);
    ctx.strokeRect(this.positionX, this.positionY, this.size, this.size);
  }
}
