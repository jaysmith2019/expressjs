// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
// Time
var timeEnd = (new Date(Date.now())).toISOString();
var timeEndnoISO = new Date(Date.now());
var timeRaw = Date.now();
var timeRawSeconds = Math.floor(timeRaw/1000);
var timeBegin = (new Date(Date.now() - 60000)).toISOString();
$("#timeEnd").html(timeRawSeconds);

console.log("Time Now Eastern (RAW ms) :     " + timeRaw);
console.log("Time Now Eastern (RAW s) :      " + timeRawSeconds)
console.log("Time Now Eastern (ISO) :     " + timeEnd);
console.log("Time Now Eastern (No ISO) :     " + timeEndnoISO);

// Static Data
var sampleDeliveredFirstService = {
	"status": "success",
	"data": {
		"resultType": "matrix",
		"result": [{
			"metric": {
				"SENDER": "ESOA-TEST",
				"STATUS": "SUCCESSFUL",
				"TARGET": "ESOA",
				"__name__": "routing_service_message_delivery_successful_total",
				"endpoint": "web",
				"instance": "192.168.185.45:8080",
				"job": "cumulus-routing-service",
				"namespace": "cumulus-dev",
				"pod": "cumulus-routing-service-fd8f8cbfc-gch6k",
				"service": "cumulus-routing-service"
			},
			"values": [
				[
					1555336230.781,
					"8"
				],
				[
					1555336530.781,
					"9"
				],
				[
					1555336830.781,
					"13"
				],
				[
					1555337130.781,
					"15"
				],
				[
					1555337430.781,
					"17"
				],
				[
					1555337730.781,
					"17"
				],
				[
					1555338030.781,
					"17"
				],
				[
					1555338330.781,
					"17"
				],
				[
					1555338630.781,
					"17"
				],
				[
					1555338930.781,
					"17"
				],
				[
					1555339230.781,
					"17"
				],
				[
					1555339530.781,
					"17"
				],
				[
					1555339830.781,
					"17"
				],
				[
					1555340130.781,
					"17"
				],
				[
					1555340430.781,
					"17"
				]
			]
		}]
	}
};
console.log(sampleDeliveredFirstService);
var i;
var j;
var c;
var timelabels = [];
var counts = [];
var labels = [];
var count = [];
// Where I left off
for (i = 0; i < sampleDeliveredFirstService.data.result[0].values.length; i++) {
  console.log("------TEST:  ");
  timelabels.push(new Date(sampleDeliveredFirstService.data.result[0].values[i][0] * 1000).toLocaleTimeString());
}
for (j = 0; j < sampleDeliveredFirstService.data.result[0].values.length; j++) {
  counts.push(sampleDeliveredFirstService.data.result[0].values[j][1]);
}
console.log("----------");
console.log(timelabels);
// Area Chart Example
// Set new default font family and font color to mimic Bootstrap's default styling
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var values = data.data.result[0].values;
      for (c = 0; c < values.length; c++){
        labels.push(new Date(values[c][0] * 1000).toLocaleTimeString());
        count.push(values[c][1]);
      }
      console.log(labels);
      console.log(count);
    }
  };
  xhttp.open("GET", "http://cumulus-monitor-api.dev.api.paradymelab.com/system/status/range?query=routing_service_message_delivery_fail_total&start=2019-04-15T13:30:30.781Z&end=2019-04-18T18:00:30.781Z&step=60", true);
  xhttp.send();
  console.log(count);
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    // Time interval goes in here
    //Success
    labels: timelabels,
    datasets: [{
      data: counts,
      label: "Delivered on First Try",
      borderColor: "#1cc88a",
      backgroundColor: "rgba(28, 200, 137, 0.1)",
      fill: true
    }, { //Retry
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      label: "Delivered on Retry",
      borderColor: "#4e73df",
      backgroundColor: "rgba(78, 115, 223, 0.1)",
      fill: true
    }, { //Failed
      data: [1,1,9,12,20,7,5,5,5,5,5,5,5,1,1],
      // data: count,
      label: "Failed Events",
      borderColor: "#e74a3b",
      backgroundColor: "rgba(231, 74, 59, 0.1)",
      fill: true
    }, { //Unsupported
      data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      label: "Unsupported Events",
      borderColor: "#f6c23e",
      backgroundColor: "rgba(246, 194, 62, 0.1)",
      fill: true
    }
  ]
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          // callback: function(value, index, values) {
          //   return '$' + number_format(value);
          // }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          // return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
          return datasetLabel + ': ' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});
