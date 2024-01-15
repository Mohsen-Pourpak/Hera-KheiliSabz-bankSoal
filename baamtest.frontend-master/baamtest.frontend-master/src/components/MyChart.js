import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { toFA } from "../utils/Utils";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    console.error({dddd: props.data})

    this.state = {
      options: {
        chart: {
          locales: [{
            "name": "fa",
            "options": {
              "toolbar": {
                  "exportToSVG": "دانلود SVG",
                  "exportToPNG": "دانلود PNG",
                  "exportToCSV": "دانلود CSV",
              }
            }
          }],
          defaultLocale: "fa",
          toolbar: {
            show: true,
            offsetX: 25,
            offsetY: -20,
          },
        },
        fill: {
          type: "gradient",
          colors: ['#fe5555'],
          gradient: {
            shade: 'light',
            type: "horizontal",
            shadeIntensity: 0.1,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.4,
            opacityTo: 1,
            stops: [0, 95, 100],
            colorStops: []
          }
        },
        yaxis: {
          labels: {
              formatter: val => { return toFA(val) },
              show: true,
              align: 'right',
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
          },
        },
        tooltip: {
          x: {
            formatter: val => { return toFA(val) },
          },
          y: {
            formatter: val => { return toFA(val) },
          },
        },
        grid: {
          show: true,
          borderColor: '#00000052',
          strokeDashArray: 3,
          position: 'back',
          xaxis: {
              lines: {
                  show: true
              }
          },   
          yaxis: {
              lines: {
                  show: true
              }
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: 10
          }
        },
        dataLabels: {
          enabled: false
        }
      }
    }
  }


  render() {
    return (
      <div style={{letterSpacing: 'normal', flex: 1}}>
        <ReactApexChart options={{...this.state.options, xaxis: {
          labels: {
            formatter: val => { return toFA(parseInt(val)) },
          },
          tickAmount: 4,
          tickPlacement: 'between',
          min: this.props.min - ((this.props.max - this.props.min)*0.3),
          max: this.props.max + ((this.props.max - this.props.min)*0.3),
          
        }}} series={[{ data: this.props.data }]} type="rangeBar" />
      </div>
    );
  }
}

export default ApexChart;