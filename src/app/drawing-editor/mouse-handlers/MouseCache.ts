import * as paper from 'paper'
import { MouseHandler } from './mouse-handlers.types'

export class MouseCache implements MouseHandler {
  mouseDown = false
  mouseDownPos: paper.Point | null = null

  mouseUp = true
  mouseUpPos: paper.Point | null = null

  mouseMovePos: paper.Point | null = null

  mouseDragPos: paper.Point | null = null

  onMouseDown(e: paper.MouseEvent): void {
    console.log(e)
    this.mouseDown = true
    this.mouseUp = false
    if (this.mouseDownPos) {
      this.mouseDownPos = e.point
    } else {
      this.mouseDownPos = new paper.Point(e.point)
    }
  }

  onMouseUp(e: paper.MouseEvent): void {
    this.mouseUp = true
    this.mouseDown = false
    if (this.mouseUpPos) {
      this.mouseUpPos = e.point
    } else {
      this.mouseUpPos = new paper.Point(e.point)
    }
  }

  onMouseMove(e: paper.MouseEvent): void {
    if (this.mouseMovePos) {
      this.mouseMovePos = e.point
    } else {
      this.mouseMovePos = new paper.Point(e.point)
    }
  }

  onMouseDrag(e: paper.MouseEvent): void {
    if (this.mouseDragPos) {
      this.mouseDragPos = e.point
    } else {
      this.mouseDragPos = new paper.Point(e.point)
    }
  }
  onClick(e: paper.MouseEvent): void {
    //throw new Error('Method not implemented.')
  }
  onDoubleClick(e: paper.MouseEvent): void {
    //throw new Error('Method not implemented.')
  }
}