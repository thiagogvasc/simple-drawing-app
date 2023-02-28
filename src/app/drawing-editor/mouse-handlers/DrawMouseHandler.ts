import { MouseHandler } from "./mouse-handlers.types";
import * as paper from 'paper'
import { MouseCache } from "./MouseCache";

export class DrawMouseHandler implements MouseHandler {
  currPath: paper.Path
  mouseCache: MouseCache
  strokeWidth: number
  strokeColor: paper.Color

  constructor(mouseCache: MouseCache, strokeColor: paper.Color, strokeWidth: number,) {
    this.currPath = new paper.Path()
    this.mouseCache = mouseCache
    this.strokeWidth = strokeWidth
    this.strokeColor = strokeColor
    this.currPath.strokeColor = this.strokeColor
    this.currPath.strokeWidth = this.strokeWidth
  }

  onMouseDown(e: paper.MouseEvent): void {
    const { mouseDownPos } = this.mouseCache
    this.currPath = new paper.Path()
    this.currPath.strokeColor = this.strokeColor
    this.currPath.strokeWidth = this.strokeWidth
    console.log(mouseDownPos)
    this.currPath.add(new paper.Point(mouseDownPos!))
  }

  onMouseUp(e: paper.MouseEvent): void {
    this.currPath.simplify()
    this.currPath.selected = true
    console.log(paper.project.activeLayer)
    console.log(this.currPath)
  }

  onMouseDrag(e: paper.MouseEvent): void {
    const { mouseDragPos } = this.mouseCache
    this.currPath.add(new paper.Point(mouseDragPos!))
    this.currPath.smooth()
  }

  onMouseMove(e: paper.MouseEvent): void {}
  onClick(e: paper.MouseEvent): void {}
  onDoubleClick(e: paper.MouseEvent): void {}
}