let c1;
let c2;
function main(p) {
  p.setup = function () {
    c1 = p.createCanvas(p.windowWidth, p.windowHeight / 2);
    c1.position(0,0)
    p.background(0);
  };
  let col = p.color(p.random(255), p.random(255), p.random(255));
  p.draw = function () {
    p.background(0, 50);
    let mouseSpeed = (p.mouseX - p.pmouseX + (p.mouseY - p.pmouseY)) / 2;
    if (mouseSpeed !== 0) {
      col = p.color(p.random(255), p.random(255), p.random(255));
    }
    p.strokeWeight(20);
    p.stroke(col);
    p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    p.noStroke();
    p.fill(255, 127);
    p.circle(p.mouseX, p.mouseY, 50);
  };
}

new p5(main);

function overlay(p) {
  let cols = 50;
  let rows = 20;
  let tileWidth;
  let tileHeight;
  let pd = 1;
  p.setup = function () {
    c2 = p.createCanvas(p.windowWidth, p.windowHeight / 2);
    c2.position(0, 0);
    p.background(0);
    p.fill(0);
    p.stroke(255);
    tileWidth = p.width / cols;
    tileHeight = p.height / rows;
    
    let but = p.createButton('overlay option: normal');
    but.style("font-family", "Comic Sans MS");
    let num = [1,"normal"]
    but.position(0, p.windowHeight / 2);
    but.mousePressed(function () {
      if (num[0] === 1) {
        num = [2,"seperated"];
        c2.show();
        c2.position(0, c2.height);
      } else if (num[0] === 2) {
        num = [3,"hidden"];
        c2.hide();
      } else if (num[0] === 3) {
        num = [1,"normal"];
        c2.show();
        c2.position(0, 0);
      }
      but.html('overlay option: '+num[1])
    });
  };
  p.draw = function () {
    //c2.position(0, p.frameCount%p.height);
    // testing out canvas position ^^^
    p.push();
    p.image(c1, 0, 0);
    p.loadPixels();
    p.pop();
    p.background(0);
    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        let x = p.floor(tileWidth * col);
        let y = p.floor(tileHeight * row);
        let index = (y * 2 * (p.width * pd) + x * pd) * 8;
        let r = p.pixels[index];
        let g = p.pixels[index + 1];
        let b = p.pixels[index + 2];
        let a = p.pixels[index + 3];
        let c = p.color(r, g, b, a);
        let angle = p.map(p.red(c), 0, 255, 0, p.TWO_PI);
        let sclX = p.map(
          p.sin(x / 2 + y / 2 + p.frameCount / 10),
          -1,
          1,
          0.5,
          1
        );
        let sclY = p.map(
          p.sin(-x / 2 + y / 2 + p.frameCount / 10),
          -1,
          1,
          0.5,
          1
        );
        p.noStroke();
        p.fill(c);
        p.rectMode(p.CENTER);
        p.push();
        p.translate(x + tileWidth / 2, y + tileHeight / 2);
        p.rotate(angle);
        p.ellipse(0, 0, tileWidth * sclX, tileHeight * sclY);
        p.pop();
      }
    }
  };
}
new p5(overlay);
