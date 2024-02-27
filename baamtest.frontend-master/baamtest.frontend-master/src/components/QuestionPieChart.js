import React, { Component } from "react";
import Chart from "react-apexcharts";

class QuestionPieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ["Apple", "Mango", "Orange", "Watermelon"],
      },
    };
  }
  render() {
    return (
      <div className="donut">
        <Chart
          options={this.state.options}
          series={this.state.series}
          
          type="donut"
          width="250"
        />
      </div>
    );
  }
}

export default QuestionPieChart;
