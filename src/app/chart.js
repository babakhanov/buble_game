import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

var initChart = (data) => {
  return Highcharts.chart('chart-container', {

    chart: {
      type: 'bubble',
      plotBorderWidth: 1,
      zoomType: 'xy'
    },

    legend: {
      enabled: false
    },

    title: {
      text: ''
    },

    xAxis: {
      lineColor: 'transparent',
      gridLineWidth: 0,
      gridLineColor: 'transparent',
      tickColor: 'transparent',
      minorGridLineWidth: 0,
      minorGridLineColor: 'transparent',
      title: {
        enabled: false,
      },
      labels: {
        enable: false,
      },
    },

    yAxis: {
      lineColor: 'transparent',
      startOnTick: false,
      endOnTick: false,
      title: {
        text: ''
      },
      labels: {
        format: '{value} tick'
      },
      maxPadding: 0.2,
    },
    credits: {
      enabled: false,
    },

    tooltip: {
      useHTML: true,
      headerFormat: '<table>',
      pointFormat: '<tr><td>{point.bugs}</td></tr>',
      footerFormat: '</table>',
      followPointer: true
    },

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{\'<span class="icon-bug" style="color: black;"></span>\'.repeat(point.name)}',
        }
      }
    },

    series: [{
      data: data,
    }]

  });
};

var chart = null;

export default (data) => {
  var chartData = _.map(data, (i) => {
    return {
      x: i.interactedAt,
      z: i.health,
      y: i.lastActive,
      name: i.name,
      color: i.health >= 400 ? 'green' : (i.health >= 300 ? 'orange' : 'red'),
      bugs: i.bugs,
      questions: i.questions,
      requests: i.requests,
    }
  });
  if (!chart){
    chart = initChart(chartData);
  }else{
    chart.series[0].setData(chartData,true);
  }
};

