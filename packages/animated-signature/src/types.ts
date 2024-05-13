import type { PointGroupOptions } from "signature_pad";
import type { Bezier } from "signature_pad/src/bezier";
import type { BasicPoint } from "signature_pad/dist/types/point";

/**
 * 配置
 * animated signature options
 */
export type AnimatedSignatureOptions = {
  /**
   * 每条连线完全显示需要的时间
   * each strokes display the time required
   * @defaultValue [10000]
   */
  duration: number[];
  /**
   * 样式类名前缀
   * prefix of class name
   * @defaultValue "sign-"
   */
  classPrefix: string;
  /**
   * 动画名
   * animation name
   * @defaultValue "animatedSignature"
   */
  animationName: string;
  /**
   * 绘制模式
   * drawing speed mode
   * @defaultValue "even"
   */
  drawingMode: "even" | "parallel";
  /**
   * 笔画间断时空隙
   * stroke time gap when break
   * @defaultValue 0
   */
  gap: number;
  /**
   * 点完全显示需要的时间
   * dot duration
   * @defaultValue 10
   */
  dotDuration: number;
  /**
   * 涂鸦颜色模式（待做）
   * doodle color mode(todo)
   * @defaultValue "none"
   */
  // colorMode: "before" | "none" | "after";
};
/**
 * 在转换SVG图片时记录转换过程中需要在后续用到的数据
 * record some data in the process of svg convertion
 */
export type RecordComposition<T = "line" | "dot"> = T extends "dot"
  ? {
      options: PointGroupOptions;
      isDot: true;
      radius: ReturnType<Bezier["length"]>;
      data: {
        circle: HTMLElement;
        point: BasicPoint;
      };
    }
  : {
      options: PointGroupOptions;
      isDot: false;
      data: Array<{
        curve: Bezier;
        path: HTMLElement;
        length: ReturnType<Bezier["length"]>;
      }>;
      partLength: ReturnType<Bezier["length"]>;
      partTime: number;
    };
