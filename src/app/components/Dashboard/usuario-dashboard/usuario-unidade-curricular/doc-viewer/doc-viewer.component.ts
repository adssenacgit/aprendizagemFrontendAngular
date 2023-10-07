import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
  arquivoDataString: string;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.currentData
    .subscribe(data => {
      this.arquivoDataString = this.decodeBase64ToDataUrl(data);
    })

  }

  contentLoaded() {
    console.log(this.arquivoDataString)
    console.log('File loaded');
  }

  decodeBase64ToDataUrl(base64String: string) {
    const binaryString = atob(base64String);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    return url;
  }
}

