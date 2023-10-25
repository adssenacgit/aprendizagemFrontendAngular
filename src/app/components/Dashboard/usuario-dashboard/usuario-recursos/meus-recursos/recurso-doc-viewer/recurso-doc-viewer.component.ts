import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-recurso-doc-viewer',
  templateUrl: './recurso-doc-viewer.component.html',
  styleUrls: ['./recurso-doc-viewer.component.css']
})
export class RecursoDocViewerComponent implements OnInit, OnChanges {

  @Input() recursoURL: string;
  @Input() viewer: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('mudei ' + this.viewer)
  }

  ngOnInit(): void {
  }

}
