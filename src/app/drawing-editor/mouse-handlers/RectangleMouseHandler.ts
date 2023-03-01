import { MouseHandler } from "./mouse-handlers.types";
import * as paper from 'paper'
import { MouseCache } from "./MouseCache";
import { DrawOptions } from "./options/DrawOptions";

export class RectangleMouseHandler implements MouseHandler {
  rectanglePath: paper.Path | null = null
  rectangle: paper.Rectangle | null = null
  mouseCache: MouseCache
  drawOptions: DrawOptions

  constructor(mouseCache: MouseCache, drawOptions: DrawOptions) {
    this.mouseCache = mouseCache
    this.drawOptions = drawOptions
  }

  onMouseDown(e: paper.MouseEvent): void {
    const { mouseDownPos } = this.mouseCache
    this.rectangle = new paper.Rectangle(mouseDownPos!, new paper.Size(1, 1))
    this.rectanglePath = new paper.Path.Rectangle(this.rectangle)
    this.rectanglePath.strokeColor = this.drawOptions.strokeColor
    this.rectanglePath.strokeWidth = this.drawOptions.strokeWidth
  }

  onMouseUp(e: paper.MouseEvent): void {
    paper.project.deselectAll()
    this.rectanglePath!.selected = true
    this.rectanglePath = null
    this.rectangle = null
  }

  onMouseDrag(e: paper.MouseEvent): void {
    const { mouseDragPos, mouseDownPos } = this.mouseCache
    const size = new paper.Size(mouseDragPos!.x - mouseDownPos!.x, mouseDragPos!.y - mouseDownPos!.y)
    this.rectangle!.size = size
      
    if (size.width !== 0 && size.height !== 0) {
        this.rectanglePath!.bounds = this.rectangle!
        const rect = new paper.Rectangle(this.rectangle!)
        if (rect!.width < 0) {
            rect!.x = mouseDownPos!.x + rect!.width
            rect!.width *= -1
        }
        if (rect!.height < 0) {
            rect!.y = mouseDownPos!.y + rect!.height
            rect!.height *= -1
        }
    }
  }

  onMouseMove(e: paper.MouseEvent): void {}
  onClick(e: paper.MouseEvent): void {}
  onDoubleClick(e: paper.MouseEvent): void {}
}