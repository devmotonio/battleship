import Grid from "./grid.min.js";

export default class Game {
  constructor(count, size) {
    this.count = count;
    this.size = size;
    this.canvas = document.getElementById("game");
    this.ctx = this.canvas.getContext("2d");
  }

  init() {
    this.initCanvas();

    this.grid1 = new Grid(this.size, this.count, 0, 0);
    this.grid2 = new Grid(this.size, this.count, this.size * this.count + 1, 0);

    this.line = {
      start: { x: this.size * this.count, y: 0 },
      end: { x: this.size * this.count, y: this.size * this.count },
      strokeStyle: "#000",
      lineWidth: "1",
    };

    this.gameGrids = [this.grid1, this.grid2];
  }

  initCanvas() {
    this.canvas.width = this.count * this.size * 2 + 1;
    this.canvas.height = this.count * this.size;

    this.canvas.onmousedown = (event) => {
      this.clickGrid(event.offsetX, event.offsetY);
    };
  }

  clickGrid(positionX, positionY) {
    this.gameGrids.forEach((item) => {
      item.click(positionX,positionY,this.ctx);
    });
  }

  animate() {
    this.ctx.strokeStyle = this.line.strokeStyle;
    this.ctx.lineWidth = this.line.lineWidth;
    this.ctx.beginPath();
    this.ctx.moveTo(this.line.start.x, this.line.start.y);
    this.ctx.lineTo(this.line.end.x, this.line.end.y);
    this.ctx.stroke();

    this.gameGrids.forEach((item) => {
      item.animate(this.ctx);
    });
  }

  start() {
    this.init();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.animate();
  }
}
