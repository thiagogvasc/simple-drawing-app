import { MouseHandler } from "./mouse-handlers.types";
import { MouseCache } from "./MouseCache";
import * as paper from 'paper'

export class SelectMouseHandler implements MouseHandler { 

  // Handle drag
  currElemDragging: paper.Item | null = null
  currElemDraggingStartPos: paper.Point | null = null

  // Handle selection rectangle
  selectionRectangle: paper.Rectangle | null = null
  selectionRectanglePath: paper.Path.Rectangle | null = null

  mouseCache: MouseCache

  constructor(mouseCache: MouseCache) {
    this.mouseCache = mouseCache
  }

  onClick(e: paper.MouseEvent): void {
    const { mouseDownPos } = this.mouseCache
    if (!e.point.equals(mouseDownPos!)) return 
    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5
    };
    const hitResult = paper.project.hitTest(mouseDownPos!, hitOptions)
    if (!hitResult) {
      paper.project.deselectAll()
    } else {
      hitResult.item.selected = !hitResult.item.selected
    }
  }

  onMouseDown(e: paper.MouseEvent): void {

    const { mouseDownPos } = this.mouseCache
    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5,
      handles: true,
      curves: true
    }

    const hitResult = paper.project.hitTest(mouseDownPos!, hitOptions)
    if (hitResult && hitResult.item.selected) {
      this.currElemDragging = hitResult.item
      this.currElemDraggingStartPos = this.currElemDragging.position
    }

    if (!hitResult) {
      this.selectionRectangle = new paper.Rectangle(mouseDownPos!, new paper.Size(1, 1))
      this.selectionRectanglePath = new paper.Path.Rectangle(this.selectionRectangle)
      this.selectionRectanglePath.strokeColor = new paper.Color('black')
      this.selectionRectanglePath.strokeWidth = 1
    }
  }

  onMouseDrag(e: paper.MouseEvent): void {
    const { mouseDownPos, mouseDragPos } = this.mouseCache
    
    if (this.currElemDragging) {
      this.currElemDragging.position.x = mouseDragPos!.x - (mouseDownPos!.x - this.currElemDraggingStartPos!.x)
      this.currElemDragging.position.y = mouseDragPos!.y - (mouseDownPos!.y - this.currElemDraggingStartPos!.y)
    } else {
      // Drag rectangle to select multiple items
      const size = new paper.Size(mouseDragPos!.x - mouseDownPos!.x, mouseDragPos!.y - mouseDownPos!.y)
      this.selectionRectangle!.size = size
      
      if (size.width !== 0 && size.height !== 0) {
        this.selectionRectanglePath!.bounds = this.selectionRectangle!
        const rect = new paper.Rectangle(this.selectionRectangle!)
        if (rect!.width < 0) {
          rect!.x = mouseDownPos!.x + rect!.width
          rect!.width *= -1
        }
        if (rect!.height < 0) {
          rect!.y = mouseDownPos!.y + rect!.height
          rect!.height *= -1
        }
        
        const items = paper.project.activeLayer.getItems({ overlapping: rect})
        items.forEach(item => {
          item.selected = true
        })
      }
      
      this.selectionRectanglePath!.selected = true
    }
  }
 
  onMouseUp(e: paper.MouseEvent): void {
    this.currElemDragging = null
    this.currElemDraggingStartPos = null

    this.selectionRectangle = null
    this.selectionRectanglePath?.remove()
    this.selectionRectanglePath = null

  }

  onMouseMove(e: paper.MouseEvent): void {}
  onDoubleClick(e: paper.MouseEvent): void {
    const hitOptions = {
      segments: true,
      stroke: true,
      fill: true,
      tolerance: 5
    };
    const hitResult = paper.project.hitTest(e.point, hitOptions)
    if (hitResult) {
       const path = hitResult.item as paper.Path
       path.fullySelected = true
    }
  }
}