import { MouseHandler } from "./mouse-handlers.types";
import * as paper from 'paper'
import { MouseCache } from "./MouseCache";

export class DrawMouseHandler implements MouseHandler {
  currPath: paper.Path
  mouseCache: MouseCache

  constructor(mouseCache: MouseCache) {
    this.currPath = new paper.Path()
    this.currPath.strokeColor = new paper.Color('black')
    this.currPath.strokeWidth = 2
    this.mouseCache = mouseCache
  }

  onMouseDown(e: paper.MouseEvent): void {
    const { mouseDownPos } = this.mouseCache
    this.currPath = new paper.Path()
    this.currPath.strokeColor = new paper.Color('black')
    this.currPath.strokeWidth = 10
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
  }

  onMouseMove(e: paper.MouseEvent): void {}
  onClick(e: paper.MouseEvent): void {}
  onDoubleClick(e: paper.MouseEvent): void {}
}