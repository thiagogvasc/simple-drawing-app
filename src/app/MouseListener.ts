import * as paper from 'paper'

export class MouseListener {
  element!: HTMLCanvasElement

  mouseDown = false
  mouseDownPos: paper.Point | null = null

  mouseUp = true
  mouseUpPos: paper.Point | null = null

  mouseMove = false
  mouseMovePos: paper.Point | null = null

  constructor(element: HTMLCanvasElement) {
    this.element = element
  }

  init(): void {
    this.element.addEventListener('mousedown', (event: MouseEvent) => {
      this.mouseDown = true
      this.mouseUp = false
      if (this.mouseDownPos) {
        this.mouseDownPos.x = event.offsetX
        this.mouseDownPos.y = event.offsetY
      } else {
        this.mouseDownPos = new paper.Point(event.offsetX, event.offsetY)
      }
    })
    
    this.element.addEventListener('mouseup', (event: MouseEvent) => {
      this.mouseUp = true
      this.mouseDown = false
      if (this.mouseUpPos) {
        this.mouseUpPos.x = event.offsetX
        this.mouseUpPos.y = event.offsetY
      } else {
        this.mouseUpPos = new paper.Point(event.offsetX, event.offsetY)
      }
    })

    this.element.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.mouseMovePos) {
        this.mouseMovePos.x = event.offsetX
        this.mouseMovePos.y = event.offsetY
      } else {
        this.mouseMovePos = new paper.Point(event.offsetX, event.offsetY)
      }
    })
  }
}