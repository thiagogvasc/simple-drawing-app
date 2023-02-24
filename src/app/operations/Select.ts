import { Operation } from "./operation.types";
import { AppState } from "../AppState"
import * as paper from 'paper'

export class Select implements Operation {

  // Handle click
  clickStart = false
  click = false

  // Handle drag
  //...

  handle(state: AppState): void {
    const { mouseDown, mouseUp, mouseDownPos, mouseUpPos, mouseMovePos } = state.mouseListener

    if (mouseDown) {
      this.clickStart = true
      // handle drag
    }

    if (this.clickStart && mouseUp && (mouseDownPos?.equals(mouseUpPos!))) {
      this.click = true
    }

    if (this.click) {
      this.handleClick(mouseDownPos!)
    }
  }

  handleClick(mouseDownPos: paper.Point): void {
    var hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5
    };
    const hitResult = paper.project.hitTest(mouseDownPos, hitOptions)
    hitResult && (hitResult.item.selected = !hitResult.item.selected)
    this.click = false
    this.clickStart = false
  }

  handleDrag(): void {
    // Drag
    // if (mouseDown) {
    //   var hitOptions = {
    //     segments: true,
    //     stroke: true,
    //     fill: true,
    //     tolerance: 5
    //   };
    //   const hitResult = paper.project.hitTest(mouseDownPos!, hitOptions)
    //   hitResult && (hitResult.item.selected === true) && (
    //     hitResult.item.position = mouseMovePos!
    //   )
    // }
  }
}