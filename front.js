const ctx = document.getElementById('myChart');
const data = [12, 15, 3, 5, 2, 3 ,11 ,9 ,13  ];
const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

let mychart ;

let type ;

function CreateChart(data, labels, type) {
  myChart.destroy();
  mychart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: 'distance',
        data: data,
        borderWidth: 1
      }]
    },
    options: {
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  });
}
CreateChart(data, labels, 'line')


