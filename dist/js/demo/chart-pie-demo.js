// Set new default font family and font color to mimic Bootstrap's default styling
var errors = [];
var fiveErrors = [];
var fourErrors = [];
var fivefourErrors = [];
var pieData;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(xhttp.response);
      var i;
      for (i = 0; i < data.length; i++){
        errors.push(data[i].errorType);
        if(data[i].errorType === 'HTTP_500') {
          fiveErrors.push(fiveErrors.length);
        } else if (data[i].errorType === 'HTTP_400') {
          fourErrors.push(data[i].errorType);
        } else if (data[i].errorType === 'TIMEOUT') {
          fivefourErrors.push(data[i].errorType);
        }
      }
      pieData = [fiveErrors.length, fourErrors.length, fivefourErrors.length];
      console.log(pieData);
      var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['500 Error', '400 Error', '504 Timeout'],
    datasets: [{
      data: pieData,
      backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    }],
  },
  options: {
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
    },
    legend: {
      display: false
    },
    cutoutPercentage: 80,
  },
});
    }
  };

  xhttp.open("GET", "http://cumulus-error-processor.dev.api.paradymelab.com/error/details/query_range?query=firstTriedTS&start=2019-03-31T00:00:00.000Z&end=2019-04-01T00:00:00.000Z", true);
  xhttp.send();

Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example

