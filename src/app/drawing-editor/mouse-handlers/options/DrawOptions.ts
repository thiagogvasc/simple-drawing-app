export class DrawOptions {
    strokeWidth: number
    strokeColor: paper.Color

    constructor(strokeWidth: number, strokeColor: paper.Color) {
        this.strokeWidth = strokeWidth
        this.strokeColor = strokeColor
    }
}