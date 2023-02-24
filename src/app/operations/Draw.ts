import { Operation } from "./operation.types";
import { AppState } from "../AppState"
import * as paper from 'paper'

export class Draw implements Operation {
  currPath: paper.Path

  constructor() {
    this.currPath = new paper.Path()
    this.currPath.strokeColor = new paper.Color('black')
    this.currPath.strokeWidth = 2
  }

  handle(state: AppState): void {
    const { mouseDown, mouseUp, mouseDownPos, mouseUpPos, mouseMovePos } = state.mouseListener
    
    if (mouseDown) {
      this.currPath.strokeColor = new paper.Color('black')
      this.currPath.strokeWidth = 2
      this.currPath.add(new paper.Point(mouseMovePos!))
    }

    if (mouseUp) {
      this.currPath.simplify()
      this.currPath.selected = true
      this.currPath = new paper.Path()
    }
  }
}