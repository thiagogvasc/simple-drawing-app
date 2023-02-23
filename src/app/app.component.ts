import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as paper from 'paper'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'example1';
  @ViewChild('myCanvas', { static: true }) canvas!: ElementRef
  private ctx: CanvasRenderingContext2D | null = null

  ngAfterViewInit(): void {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement
      this.ctx = canvasEl.getContext('2d')

      paper.setup(canvasEl)

      const circle = new paper.Path.Circle(new paper.Point(100, 100), 50)
      circle.fillColor = new paper.Color('red')
  }
}
