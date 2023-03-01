import { MouseHandler } from "./mouse-handlers.types";
import * as paper from 'paper'
import { MouseCache } from "./MouseCache";
import { DrawOptions } from "./options/DrawOptions";

export class LineMouseHandler implements MouseHandler {
  currPath!: paper.Path
  mouseCache: MouseCache
  drawOptions: DrawOptions

  constructor(mouseCache: MouseCache, drawOptions: DrawOptions) {
    this.mouseCache = mouseCache
    this.drawOptions = drawOptions
  }

  onMouseDown(e: paper.MouseEvent): void {
    const { mouseDownPos } = this.mouseCache
    if (!this.currPath)
        this.currPath = new paper.Path()
    this.currPath.strokeColor = this.drawOptions.strokeColor
    this.currPath.strokeWidth = this.drawOptions.strokeWidth
    this.currPath.add(new paper.Point(mouseDownPos!))
  }

  onMouseUp(e: paper.MouseEvent): void {
    paper.project.deselectAll()
    this.currPath.selected = true
  }

  onMouseDrag(e: paper.MouseEvent): void { }
  onMouseMove(e: paper.MouseEvent): void {}
  onClick(e: paper.MouseEvent): void {}
  onDoubleClick(e: paper.MouseEvent): void {}
}