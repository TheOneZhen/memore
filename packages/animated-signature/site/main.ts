import { AnimatedSignature } from "../src/animatedSignature";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const buttons = document.getElementById("buttons")!;
const preview = document.getElementById("preview")!;

const animatedSignature = new AnimatedSignature(
  canvas,
  {
    duration: [1000],
    gap: 0,
    drawingMode: "parallel",
  },
  {
    backgroundColor: "white"
  }
);

(window as any).animatedSignature = animatedSignature

function addButton(
  innerHTML: string,
  onclick: (e: MouseEvent) => void
) {
  const button = document.createElement("button");

  button.innerHTML = innerHTML;
  button.onclick = onclick;
  buttons.appendChild(button);
}

function generateRandomColor () {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b +")";
}

addButton("preview", (e) => {
  const { svg, style } = animatedSignature.generateSVGAndStyle();

  preview.innerHTML = svg.outerHTML;
  preview.appendChild(style)
});

addButton("clear", () => {
  animatedSignature.clear()
})

addButton('changeColor', () => {
  animatedSignature.changePenColor(generateRandomColor())
})

addButton('generateAnimatedSVGCode', () => {
  const { svg, style } = animatedSignature.generateSVGAndStyle({ includeBackgroundColor: true })

  preview.innerHTML = svg.outerHTML
  preview.appendChild(style)
})