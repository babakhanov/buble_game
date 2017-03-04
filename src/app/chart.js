import Highcharts from "highcharts";
import HighchartsMore from 'highcharts/highcharts-more';
import showClient from "./show_client";

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
        text: 'Active At'
      },
      labels: {
        format: '{value} tick'
      },
    },

    yAxis: {
      lineColor: 'transparent',
      startOnTick: false,
      endOnTick: false,
      title: {
        text: 'Interacted At'
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
      pointFormat: '<tr><td>{point.name}</td></tr>',
      footerFormat: '</table>',
      followPointer: true
    },

    plotOptions: {
      bubble: {
        events: {
          click: function (e) {
            window.activeClient = e.point.options.id;
            showClient();
          }
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
      y: i.interactedAt,
      z: i.health,
      x: i.lastActive,
      name: i.name,
      color: i.health >= 400 ? 'rgba(0, 128, 0, 0.5)' : (i.health >= 300 ? 'rgba(255, 165, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'),
      bugs: i.bugs,
      questions: i.questions,
      requests: i.requests,
      id: i.id,
    }
  });
  if (!chart){
    chart = initChart(chartData);
  }else{
    chart.series[0].setData(chartData,true);
  }
};

