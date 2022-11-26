import p5 from 'p5';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let t = 0;
let palette;

let colorScheme = [
  {
    name: 'DocterStrange',
    colors: ['#ba7c50', '#915d35', '#c28757', '#b38167'],
  },
];

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.angleMode(p.DEGREES);
    p.frameRate(60);
    palette = p.shuffle(p.random(colorScheme).colors.concat());
  };
  let rotation = 0;
  p.draw = () => {
    p.blendMode(p.BLEND);
    p.background(0, 0, 0);
    p.blendMode(p.ADD);
    p.randomSeed(42);

    for (let r = 0; r <= 360; r += 6) {
      p.push();

      p.translate(p.width / 2, p.height / 2);
      p.rotate(r);
      let wave = p.random([2, 3, 4, 5]);
      p.shearX(p.cos(rotation * wave) * wave);
      p.shearY(p.sin(rotation * wave) * wave);
      let step = p.random([
        // 1, 2, 3, 4, 5, 6, 8, 9, 10,
        12, 15, 18, 20, 24, 30,
        // 36, 40, 45, 60, 72, 90, 120,
      ]);
      let angle_step = 360 / step;
      for (let angle = 0; angle < 360; angle += angle_step) {
        p.push();

        p.strokeWeight(2);
        p.strokeCap(p.ROUND);
        let colors = p.shuffle(palette.concat());
        let c0 = p.color(colors[0]);
        c0.setAlpha(50);
        p.drawingContext.shadowColor = c0;

        let c1 = p.color(colors[1]);
        c1.setAlpha(0);

        let gradient = p.drawingContext.createConicGradient(
          p.radians(angle),
          0,
          0
        );
        gradient.addColorStop(0, c0);
        // gradient.addColorStop(angle_step / 360 / 2, colors[2]);
        // gradient.addColorStop(angle_step / 360, c1);

        //   gradient = p.drawingContext.createRadialGradient(
        //     0,
        //     0,
        //     r,
        //     0,
        //     0,
        //     r * 2
        //   );
        //   gradient.addColorStop(0, c0);
        //   gradient.addColorStop(1 / 2, colors[2]);
        //   gradient.addColorStop(1, c1);
        // }
        p.drawingContext.strokeStyle = gradient;
        p.push();
        p.rotate(angle);
        p.noFill();
        // p.drawingContext.filter = 'blur(' + 5 + 'px)';
        p.beginShape();
        for (let a = 0; a < angle_step; a++) {
          let nr = 200 + a * 3;
          let x = p.cos(a * 1.5) * nr;
          let y = p.sin(a * 1.5) * nr;
          p.vertex(x, y);
        }
        p.endShape();
        p.pop();
        p.pop();
        // break;
      }
      rotation += 1;
      p.pop();
      // break;
    }
  };
};

new p5(sketch);
