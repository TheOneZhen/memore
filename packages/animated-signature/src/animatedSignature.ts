import { Errors } from "./errors";
import type {
  Options as SignaturePadOptions,
  PointGroup,
  ToSVGOptions,
  PointGroupOptions,
} from "signature_pad";

import type { AnimatedSignatureOptions, RecordComposition } from "./types";
import { CustomSignaturePad } from "./customSignaturePad";
import { BasicPoint, Point } from "signature_pad/src/point";
import { Bezier } from "signature_pad/src/bezier";

export class AnimatedSignature extends CustomSignaturePad {
  redoStack: PointGroup[] = [];

  _options: AnimatedSignatureOptions;
  get options() {
    return this._options;
  }

  constructor(
    canvas: HTMLCanvasElement,
    options: {
      [Prop in keyof AnimatedSignatureOptions]?: AnimatedSignatureOptions[Prop]; // make props optional
    },
    signaturePadOptions: SignaturePadOptions
  ) {
    if (!canvas) throw new Error(Errors.CANVAS_NOT_EXIST);
    super(canvas, signaturePadOptions);

    let _duration: AnimatedSignatureOptions["duration"] = [1000];
    let _drawingMode: AnimatedSignatureOptions["drawingMode"] = "even";
    let _gap: AnimatedSignatureOptions["gap"] = 0;
    let _dotDuration: AnimatedSignatureOptions["dotDuration"] = 10;

    this._options = {
      get duration() {
        return _duration;
      },
      set duration(val: AnimatedSignatureOptions["duration"]) {
        if (Array.isArray(val)) _duration = [...val];
        else console.warn("warning: this input value of `duration` type valid");
      },
      classPrefix: "sign-",
      animationName: "animatedSignature",
      get drawingMode() {
        return _drawingMode;
      },
      set drawingMode(val) {
        if (["parallel", "even"].includes(val)) _drawingMode = val;
        else _drawingMode = "even";
      },
      get gap() {
        return _gap;
      },
      set gap(val) {
        _gap = val > 0 ? val : 0;
      },
      get dotDuration() {
        return _dotDuration;
      },
      set dotDuration(val) {
        _dotDuration = val > 0 ? val : 0;
      }
    };

    Object.assign(this.options, options);

    this.addEventListener("endStroke", () => {
      this.redoStack.splice(0);
    });
  }

  /**
   * 开始绘制
   * start drawing
   */
  handleDrawing() {
    this.compositeOperation = "source-over";
  }
  /**
   * 改变画笔颜色
   * change pen color
   */
  changePenColor(color: string) {
    this.penColor = color;
  }
  /**
   * 撤销
   * undo
   */
  undo() {
    const data = this.toData();
    const middle = data.pop();

    middle && this.redoStack.push(middle);
  }
  /**
   * 重做
   * redo
   */
  redo() {
    const data = this.toData();
    const middle = this.redoStack.pop();

    middle && data.push(middle);
  }

  generateSVGAndStyle(toSVGOptions: ToSVGOptions = {}) {
    const record: RecordComposition[] = [];

    return {
      svg: this.generateSVG(toSVGOptions, record),
      style: this.generateStyle(record)
    }
  }

  generateSVG({ includeBackgroundColor }: ToSVGOptions = {}, record: RecordComposition[]) {
    const pointGroups = this.toData();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const minX = 0;
    const minY = 0;
    const maxX = this.canvas.width / ratio;
    const maxY = this.canvas.height / ratio;
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", `${minX} ${minY} ${maxX} ${maxY}`);
    svg.setAttribute("width", maxX.toString());
    svg.setAttribute("height", maxY.toString());

    if (includeBackgroundColor && this.backgroundColor) {
      const rect = document.createElement("rect");

      rect.setAttribute("width", "100%");
      rect.setAttribute("height", "100%");
      rect.setAttribute("fill", this.backgroundColor);

      svg.appendChild(rect);
    }

    const drawCurve = (curve: Bezier, options: PointGroupOptions) => {
      const path = document.createElement("path");

      if (
        !isNaN(curve.control1.x) &&
        !isNaN(curve.control1.y) &&
        !isNaN(curve.control2.x) &&
        !isNaN(curve.control2.y)
      ) {
        const attr =
          `M ${curve.startPoint.x.toFixed(3)},${curve.startPoint.y.toFixed(
            3
          )} ` +
          `C ${curve.control1.x.toFixed(3)},${curve.control1.y.toFixed(3)} ` +
          `${curve.control2.x.toFixed(3)},${curve.control2.y.toFixed(3)} ` +
          `${curve.endPoint.x.toFixed(3)},${curve.endPoint.y.toFixed(3)}`;

        path.setAttribute("d", attr);
        path.setAttribute("stroke-width", (curve.endWidth * 2.25).toFixed(3));
        path.setAttribute("stroke", options.penColor);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);

        return path;
      }
    };

    const drawDot = (point: BasicPoint, options: PointGroupOptions) => {
      const { penColor, dotSize, minWidth, maxWidth } = options;
      const circle = document.createElement("circle");
      const size = dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2;

      circle.setAttribute("r", size.toString());
      circle.setAttribute("cx", point.x.toString());
      circle.setAttribute("cy", point.y.toString());
      circle.setAttribute("fill", penColor);
      svg.appendChild(circle);

      return circle;
    };

    for (const group of pointGroups) {
      const { points } = group;
      const pointGroupOptions = this._getPointGroupOptions(group);

      if (points.length > 1) {
        const data: RecordComposition<"line">["data"] = [];
        let partLength = 0;

        for (let j = 0; j < points.length; j += 1) {
          const basicPoint = points[j];
          const point = new Point(
            basicPoint.x,
            basicPoint.y,
            basicPoint.pressure,
            basicPoint.time
          );

          if (j === 0) {
            this._reset(pointGroupOptions);
          }

          const curve = this._addPoint(point, pointGroupOptions);

          if (curve) {
            const path = drawCurve(curve, pointGroupOptions);
            const length = curve.length();

            partLength += length;
            path &&
              data.push({
                path,
                curve,
                length,
              });
          }
        }
        record.push({
          options: pointGroupOptions,
          isDot: false,
          data,
          partLength,
          partTime: points[points.length - 1].time - points[0].time,
        });
      } else {
        this._reset(pointGroupOptions);

        const { dotSize, minWidth, maxWidth } = pointGroupOptions;

        record.push({
          options: pointGroupOptions,
          isDot: true,
          radius: dotSize > 0 ? dotSize : (minWidth + maxWidth) / 2,
          data: {
            circle: drawDot(points[0], pointGroupOptions),
            point: points[0],
          },
        });
      }
    }

    return svg;
  }
  
  generateStyle(record: RecordComposition[]) {
    /** modify SVG inner style */
    const { duration, classPrefix, drawingMode, gap, dotDuration, animationName } =
      this.options;
    const strokes = duration.length;

    if (drawingMode === "even") {
      const lengths = Array(strokes).fill(0);
      const delays = Array(strokes).fill(0);

      record.forEach(
        (item, index) =>
          !item.isDot && (lengths[index % strokes] += item.partLength)
      );

      record.forEach((item, index) => {
        const relatedIndex = index % strokes;

        if (item.isDot) {
          const { circle } = item.data;

          circle.className += ` ${classPrefix}element ${classPrefix}circle`;
          circle.style.animationDuration = `${dotDuration}ms`;
          circle.style.animationDelay = `${delays[relatedIndex]}ms`;
          delays[relatedIndex] += dotDuration + gap;
        } else {
          item.data.forEach(({ path, length }) => {
            const animationDuration =
              (length / lengths[relatedIndex]) * duration[relatedIndex];

            path.className += ` ${classPrefix}element ${classPrefix}path`;
            path.style.animationDuration = `${animationDuration}ms`;
            path.style.animationDelay = `${delays[relatedIndex]}ms`;
            delays[relatedIndex] += animationDuration;
          });
          delays[relatedIndex] += gap;
        }
      });
    } else if (drawingMode === "parallel") {
      const times = Array(strokes).fill(0);
      const delays = Array(strokes).fill(0);

      record.forEach(
        (item, index) =>
          !item.isDot && (times[index % strokes] += item.partTime)
      );

      record.forEach((item, index) => {
        const relatedIndex = index % strokes;
        if (item.isDot) {
          const { circle } = item.data;

          circle.className += ` ${classPrefix}element ${classPrefix}circle`;
          circle.style.animationDuration = `${dotDuration}ms`;
          circle.style.animationDelay = `${delays[relatedIndex]}ms`;
          delays[relatedIndex] += dotDuration + gap;
        } else {
          item.data.forEach(({ curve, path }) => {
            const animationDuration =
              ((curve.endPoint.time - curve.startPoint.time) /
                times[relatedIndex]) *
              duration[relatedIndex];

            path.className += ` ${classPrefix}element ${classPrefix}path`;
            path.style.animationDuration = `${animationDuration}ms`;
            path.style.animationDelay = `${delays[relatedIndex]}ms`;
            delays[relatedIndex] += animationDuration;
          });
          delays[relatedIndex] += gap;
        }
      });
    }
    /** generate outer style */
    const style = document.createElement("style");
    const maxDash = 10000

    style.innerHTML = `
      @keyframes ${animationName} {
        0% {
          stroke-dashoffset: 1px;
          stroke-dasharray: 0 ${maxDash}px;
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        to {
          stroke-dasharray: ${maxDash}px 0;
        }
      }
      .${classPrefix}element {
        stroke-dashoffset: 1px;
        stroke-dasharray: ${maxDash}px, 0;
        transform-origin: center center;
        animation-name: animatedSignature;
        animation-timing-function: cubic-bezier(0, -0.8, 0, 0);
        animation-fill-mode: both;
        animation-iteration-count: 1;
      }
    `;

    return style
  }
}
