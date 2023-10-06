import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';

  constructor() { }

  ngOnInit(): void {
  }

  contentLoaded() {
    console.log('File loaded');
  }

}
