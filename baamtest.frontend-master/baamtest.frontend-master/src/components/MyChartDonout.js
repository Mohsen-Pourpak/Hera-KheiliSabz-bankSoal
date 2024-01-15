import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { toFA } from "../utils/Utils";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    console.error({dddd: props.data})

    this.sum = props.data.reduce((a,b) => a+b)

    this.state = {
      series: this.sum === 0 ? [] : props.data,
      options: {
        labels: ['صحیح', 'نزده', 'غلط'],
        colors: ['#28cc2d', '#ffbf00', '#d2222d'],
        title: {
          text: props.name,
          align: 'center',
          margin: 20,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize:  '14px',
            fontWeight:  'bold',
            fontFamily:  undefined,
            color:  '#263238'
          },
        },
        noData: {
          text: 'فاقد گزارش',
          align: 'center',
          verticalAlign: 'top',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: '#fe5555',
            fontSize: '14px',
          }
        },
        yaxis: {
            labels: {
              formatter: val => { return toFA(val) },
          },
        },
        stroke: {
            show: false,     
        },
        xaxis: {labels: {
          formatter: val => { return toFA(val) },
        }},
        tooltip: {
          x: {
            formatter: val => { return toFA(val) },
          },
          y: {
            formatter: val => { return toFA(val) },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: val => { return toFA((val*this.sum)/100) },
        }
      },
    }
  }


  render() {
    return (
      <div style={{letterSpacing: 'normal', flex: 1}}>
        <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
      </div>
    );
  }
}

export default ApexChart;