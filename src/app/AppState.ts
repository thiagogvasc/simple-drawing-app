import * as paper from 'paper'
import { MouseListener } from "./MouseListener";
import { Draw } from "./operations/Draw";
import { Operation } from "./operations/operation.types";

export class AppState {

  mouseListener!: MouseListener
  selectedItems: paper.Item[] = []
  operation: Operation = new Draw()

  constructor(mouseListener: MouseListener) {
    this.mouseListener = mouseListener
    this.mouseListener.init()
  }

  update(): void {
    this.operation.handle(this)
  }
}