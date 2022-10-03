import { Component, Input, OnInit } from '@angular/core';
import { Ruta } from '../../../interfaces/admin.interfaces';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() ruta: Ruta;

  barData: any;
  barOptions: any;

  constructor() { }

  ngOnInit(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['Cartera', 'Gastos', 'Inversiones', 'Retiros'],
      datasets: [
        {
          label: this.ruta.nombre,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          data: [
            this.ruta.cartera, 
            this.ruta.gastos, 
            this.ruta.inversiones,
            this.ruta.retiros
          ]
        }
      ]
    };

    this.barOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: [surfaceBorder],
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: [surfaceBorder],
            drawBorder: false
          }
        },
      }
    };
  }

  // initCharts() {
  //   const documentStyle = getComputedStyle(document.documentElement);
  //   const textColor = documentStyle.getPropertyValue('--text-color');
  //   const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
  //   const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

  //   this.barData = {
  //     labels: ['Cartera', 'Gastos', 'Inversiones'],
  //     datasets: [
  //       {
  //         label: this.ruta.nombre,
  //         backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
  //         borderColor: documentStyle.getPropertyValue('--bluegray-700'),
  //         data: [this.ruta.cartera, this.ruta.gastos, this.ruta.inversiones]
  //       }
  //     ]
  //   };

  //   this.barOptions = {
  //     plugins: {
  //       legend: {
  //         labels: {
  //           color: textColor
  //         }
  //       }
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           color: textColorSecondary,
  //           font: {
  //             weight: 500
  //           }
  //         },
  //         grid: {
  //           color: [surfaceBorder],
  //           drawBorder: false
  //         }
  //       },
  //       y: {
  //         ticks: {
  //           color: textColorSecondary
  //         },
  //         grid: {
  //           color: [surfaceBorder],
  //           drawBorder: false
  //         }
  //       },
  //     }
  //   };
  // }

}
