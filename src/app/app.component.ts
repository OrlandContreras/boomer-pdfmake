import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app PDF Works!';
  strImage = 'encondeImage.txt';  // leer el encode del archivo assets/images/encodeImage.txt;
  arr = [
      'JOHN VAN HELSING',
      '2.123.178.987',
      'EJECUTIVO DE CUENTA',
      'TRES MILLONES DE PESOS M/CTE. ($ 3.00.000)',
      'INDEFINIDO'
    ];

  constructor() {
    // called first time before the ngOnInit()
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Pdf structure and content
    let document1 = {
      pageSize: 'A4',
     // pageOrientation: 'landscape', // by default is Portrait
      // Recibe de un array [left, top, right, bottom] o [ horizontal, vertical ]
      pageMargins: [ 40, 60, 40, 60],
      content: [
        {
          text: 'This is a standard paragraph, using default style',
          style: 'header' },
        {
          text: 'this paragraph will have a bigger font', fontSize: 15
        },
        {
          text: 'Another text',
          style: 'anotherStyle'
        },
        {
          text: [
            'This paragraph is defined as an array of elements to make it possible to',
            { text: 'restyle part of it and make it bigger ', fontSize: 15 },
            'than the rest.'
          ]
        },
        {
          text: 'Multiple style',
          style: ['header', 'anotherStyle']
        },
        {

        },
        {
          // image: 'data:image/png;base64, imagen codificada'
          //image: `data:image/jpeg;base64,${ this.strImage }`
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        anotherStyle: {
          italic: true,
          alignment: 'right'
        }
      }
    };

    let document2 = {
        content: [
          {
            stack: [
              {
                text: 'Bogotá, 26 de Septiembre del 2017',
                style: 'date'
              },
              {
                text: 'CERTIFICAMOS',
               style: 'title1'
              }
            ]
          },
          {
            stack: [
              {
                text: [
                  'Que el(a) señor(a) ', { text: this.arr[0], bold: true },
                  { text: ' identificado(a) con cédula de ciudadanía No. '},
                  { text: this.arr[1], bold: true},
                  { text: ', trabaja en nuestra compañía desde el 02 de enero del 2017 a la fecha, desempeñando el cargo de '},
                  { text: this.arr[2], bold: true },
                  { text: ', devengando un salario mensual Ordinario de '},
                  { text: this.arr[3], bold: true },
                  { text: ', con contrato a término '},
                  { text: `${this.arr[4]}.`, bold: true }
                ]
              },
            ],
            margin: [0, 20, 0, 0],
            alignment: 'justify'
          }
        ],
        styles: {
          date: {
            fontSize: 12
          },
          title1: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 150, 0, 50]
          }
        }
    };
    // pdfMake.createPdf(esructura y contenido del pdf).download('nombre del archivo pdf');
    //pdfMake.createPdf(document1).download('demo1.pdf');
    pdfMake.createPdf(document2).download('demo2.pdf');
  }
}
