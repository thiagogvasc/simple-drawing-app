export interface MouseHandler {
  onClick(e: paper.MouseEvent): void
  onDoubleClick(e: paper.MouseEvent): void
  onMouseDown(e: paper.MouseEvent): void
  onMouseUp(e: paper.MouseEvent): void
  onMouseMove(e: paper.MouseEvent): void
  onMouseDrag(e: paper.MouseEvent): void
}