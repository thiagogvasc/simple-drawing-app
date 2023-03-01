import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as paper from 'paper'
import { DrawingEditor } from './drawing-editor/DrawingEditor';
import { SelectMouseHandler } from './drawing-editor/mouse-handlers/SelectMouseHandler';
import { DrawMouseHandler } from './drawing-editor/mouse-handlers/DrawMouseHandler';
import { DrawOptions } from './drawing-editor/mouse-handlers/options/DrawOptions';
import { LineMouseHandler } from './drawing-editor/mouse-handlers/LineMouseHandler';
import { RectangleMouseHandler } from './drawing-editor/mouse-handlers/RectangleMouseHandler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef

  drawingEditor!: DrawingEditor
  drawOptions: DrawOptions = new DrawOptions(2, new paper.Color('black'))

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    canvasEl.style.cursor = 'crosshair'
    canvasEl.width = window.innerWidth 
    canvasEl.height = window.innerHeight / 1.25
    canvasEl.style.backgroundColor = 'lightgray'

    paper.setup(canvasEl)
    this.drawingEditor = new DrawingEditor()
    this.drawingEditor.mouseHandler = new DrawMouseHandler(this.drawingEditor.mouseCache, this.drawOptions)
    this.drawingEditor.init()
  }
  
  select(): void {
    this.drawingEditor.mouseHandler = new SelectMouseHandler(this.drawingEditor.mouseCache)
  }

  draw(): void {
    this.drawingEditor.mouseHandler = new DrawMouseHandler(this.drawingEditor.mouseCache, this.drawOptions)
  }

  line(): void {
    this.drawingEditor.mouseHandler = new LineMouseHandler(this.drawingEditor.mouseCache, this.drawOptions)
  }

  rectangle(): void {
    this.drawingEditor.mouseHandler = new RectangleMouseHandler(this.drawingEditor.mouseCache, this.drawOptions)
  }

  setStrokeColor(e: Event): void {
    const target = e.target as HTMLInputElement
    this.drawOptions.strokeColor = new paper.Color(target.value)
  }

  setStrokeWidth(e: Event): void {
    const target = e.target as HTMLInputElement
    console.log(target.value)
    this.drawOptions.strokeWidth = parseInt(target.value)
  }
}