import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as paper from 'paper'
import { DrawingEditor } from './drawing-editor/DrawingEditor';
import { SelectMouseHandler } from './drawing-editor/mouse-handlers/SelectMouseHandler';
import { DrawMouseHandler } from './drawing-editor/mouse-handlers/DrawMouseHandler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef

  drawingEditor!: DrawingEditor

  ngAfterViewInit(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
    canvasEl.style.cursor = 'crosshair'
    canvasEl.width = window.innerWidth 
    canvasEl.height = window.innerHeight / 1.25
    canvasEl.style.backgroundColor = 'lightgray'

    paper.setup(canvasEl)
    this.drawingEditor = new DrawingEditor()
    this.drawingEditor.init()
  }
  
  select(): void {
    this.drawingEditor.mouseHandler = new SelectMouseHandler(this.drawingEditor.mouseCache)
  }

  draw(): void {
    this.drawingEditor.mouseHandler = new DrawMouseHandler(this.drawingEditor.mouseCache, this.drawingEditor.strokeColor, this.drawingEditor.strokeWidth)
  }

  setStrokeColor(e: Event): void {
    const target = e.target as HTMLInputElement
    this.drawingEditor.strokeColor = new paper.Color(target.value)
  }

  setStrokeWidth(e: Event): void {
    const target = e.target as HTMLInputElement
    console.log(this.drawingEditor)
    this.drawingEditor.strokeWidth = parseInt(target.value)
  }
}