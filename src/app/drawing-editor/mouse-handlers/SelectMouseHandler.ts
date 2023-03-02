import { MouseHandler } from "./mouse-handlers.types";
import { MouseCache } from "./MouseCache";
import * as paper from 'paper'

export class SelectMouseHandler implements MouseHandler { 

  // Handle drag
  currElemDragging: paper.Path | null = null
  currElemDraggingStartPos: paper.Point | null = null
  currSegmentDragging: paper.Segment | null = null
  currSegmentDraggingStartPos: paper.Point | null = null
  lastHitResult: paper.HitResult | null = null

  // Handle selection rectangle
  selectionRectangle: paper.Rectangle | null = null
  selectionRectanglePath: paper.Path.Rectangle | null = null

  selectionGroup: paper.Group = new paper.Group()

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
      !hitResult.item.selected && !e.modifiers.control && paper.project.deselectAll()
      hitResult.item.selected = !hitResult.item.selected
      //this.selectionGroup.removeChildren()
      //this.selectionGroup.addChildren(paper.project.selectedItems)
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
    this.lastHitResult = hitResult
    console.log(hitResult)
    if (hitResult && hitResult.item.selected) {
      this.currElemDragging = hitResult.item as paper.Path
      this.currElemDraggingStartPos = this.currElemDragging!.position

      // For dragging segments
      if (this.currElemDragging.fullySelected) {
        if (hitResult.type === 'segment' || 'handle-in' || 'handle-out') {
          this.currSegmentDragging = hitResult.segment
          this.currSegmentDraggingStartPos = new paper.Point(hitResult.point)
        }
      }
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
    
    // Drag element
    if (this.currElemDragging) {
      if (this.currSegmentDragging) {
        if (this.lastHitResult!.type === 'segment') {
          this.currSegmentDragging.point.x = mouseDragPos!.x 
          this.currSegmentDragging.point.y = mouseDragPos!.y
        } else if (this.lastHitResult!.type === 'handle-out') {
          this.currSegmentDragging.handleOut.x = mouseDragPos!.x - this.currSegmentDragging.point.x
          this.currSegmentDragging.handleOut.y = mouseDragPos!.y - this.currSegmentDragging.point.y
        } else if (this.lastHitResult!.type === 'handle-in') {
          this.currSegmentDragging.handleIn.x = mouseDragPos!.x - this.currSegmentDragging.point.x
          this.currSegmentDragging.handleIn.y = mouseDragPos!.y - this.currSegmentDragging.point.y
        }
      } else {
        this.currElemDragging.position.x = mouseDragPos!.x - (mouseDownPos!.x - this.currElemDraggingStartPos!.x)
        this.currElemDragging.position.y = mouseDragPos!.y - (mouseDownPos!.y - this.currElemDraggingStartPos!.y)
        //this.selectionGroup.position.x = mouseDragPos!.x
        //this.selectionGroup.position.y = mouseDragPos!.y
      }
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
        
        const items = paper.project.activeLayer.getItems({ overlapping: rect })
        items.forEach(item => {
          item.selected = true
        })
        console.log(paper.project.selectedItems)
        //this.selectionGroup.removeChildren()
        //this.selectionGroup.addChildren(paper.project.selectedItems)
      }
      
      this.selectionRectanglePath!.selected = true
    }
  }
 
  onMouseUp(e: paper.MouseEvent): void {
    this.currElemDragging = null
    this.currElemDraggingStartPos = null
    this.currSegmentDragging = null
    this.currSegmentDraggingStartPos = null

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