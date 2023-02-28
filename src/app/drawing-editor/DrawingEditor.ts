import * as paper from 'paper'
import { MouseCache } from "./mouse-handlers/MouseCache";
import { DrawMouseHandler } from "./mouse-handlers/DrawMouseHandler";
import { MouseHandler } from "./mouse-handlers/mouse-handlers.types";

export class DrawingEditor {

  strokeWidth = 2
  strokeColor = new paper.Color('000')
  mouseCache: MouseCache = new MouseCache()
  mouseHandler: MouseHandler = new DrawMouseHandler(this.mouseCache, this.strokeColor, this.strokeWidth)

  lastTime = 0
  fps = 0

  update(): void {
    const currentTime = Date.now()
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime
    this.fps = 1 / deltaTime;
  }

  init(): void {
    paper.project.view.onClick = (e: paper.MouseEvent) => {
      this.mouseCache.onClick(e)
      this.mouseHandler.onClick(e)
    }

    paper.project.view.onDoubleClick = (e: paper.MouseEvent) => {
      this.mouseCache.onDoubleClick(e)
      this.mouseHandler.onDoubleClick(e)
    }

    paper.project.view.onMouseDown = (e: paper.MouseEvent) => {
      this.mouseCache.onMouseDown(e)
      this.mouseHandler.onMouseDown(e)
    }

    paper.project.view.onMouseUp = (e: paper.MouseEvent) => {
      this.mouseCache.onMouseUp(e)
      this.mouseHandler.onMouseUp(e)
    }

    paper.project.view.onMouseMove = (e: paper.MouseEvent) => {
      this.mouseCache.onMouseMove(e)
      this.mouseHandler.onMouseMove(e)
    }

    paper.project.view.onMouseDrag = (e: paper.MouseEvent) => {
      this.mouseCache.onMouseDrag(e)
      this.mouseHandler.onMouseDrag(e)
    }

    paper.project.view.onFrame = () => {
      this.update()
    }
  }
}