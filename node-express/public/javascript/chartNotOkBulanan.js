let chartNotOkBulanan;

function createChartNotOkBulananMF() {
  var ctx2 = document
    .getElementById("chart-line-bulanan-notok")
    .getContext("2d");

  getDataNotOkBulanan(
    "http://localhost:8080/DashboardNotOk/getDataNotOkMonth"
  ).then((data) => {
    // console.log(data[1]);
    chartNotOkBulanan = new Chart(ctx2, {
      plugins: [
        {
          beforeInit(chart) {
            const originalFit = chart.legend.fit;
            chart.legend.fit = function fit() {
              originalFit.bind(chart.legend)();
              this.height += 40;
            };
          },
        },
      ],
      type: "line",
      data: {
        labels: data[0],
        datasets: [
          {
            label: "Not OK",
            tension: 0,
            borderWidth: 2,
            pointRadius: 0,
            borderColor: "#ff2727",
            pointBorderColor: "#ff2727",
            pointBackgroundColor: "#ff2727",
            // backgroundColor: gradientStroke1,
            // fill: true,
            data: data[1],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              boxWidth: 6,
              boxHeight: 6,
              padding: 20,
              pointStyle: "circle",
              borderRadius: 50,
              usePointStyle: true,
              font: {
                weight: 400,
              },
            },
          },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#1e293b",
            bodyColor: "#1e293b",
            borderColor: "#e9ecef",
            borderWidth: 1,
            pointRadius: 2,
            usePointStyle: true,
            boxWidth: 8,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [4, 4],
            },
            ticks: {
              callback: function (value, index, ticks) {
                return parseInt(value).toLocaleString() + " Jobs";
              },
              display: true,
              padding: 10,
              color: "#b2b9bf",
              font: {
                size: 12,
                family: "Noto Sans",
                style: "normal",
                lineHeight: 2,
              },
              color: "#64748B",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [4, 4],
            },
            ticks: {
              display: true,
              color: "#b2b9bf",
              padding: 20,
              font: {
                size: 12,
                family: "Noto Sans",
                style: "normal",
                lineHeight: 2,
              },
              color: "#64748B",
            },
          },
        },
      },
    });
  });
}

function createChartNotOkBulananOS() {
  var ctx2 = document
    .getElementById("chart-line-bulanan-notok")
    .getContext("2d");

  getDataNotOkBulanan(
    "http://localhost:8080/DashboardNotOk/getDataNotOkMonth"
  ).then((data) => {
    chartNotOkBulanan = new Chart(ctx2, {
      plugins: [
        {
          beforeInit(chart) {
            const originalFit = chart.legend.fit;
            chart.legend.fit = function fit() {
              originalFit.bind(chart.legend)();
              this.height += 40;
            };
          },
        },
      ],
      type: "line",
      data: {
        labels: data[0],
        datasets: [
          {
            label: "Not Ok",
            tension: 0,
            borderWidth: 2,
            pointRadius: 0,
            borderColor: "#ff2727",
            pointBorderColor: "#ff2727",
            pointBackgroundColor: "#ff2727",
            // backgroundColor: gradientStroke1,
            // fill: true,
            data: data[1],
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              boxWidth: 6,
              boxHeight: 6,
              padding: 28,
              pointStyle: "circle",
              borderRadius: 50,
              usePointStyle: true,
              font: {
                weight: 400,
              },
            },
          },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#1e293b",
            bodyColor: "#1e293b",
            borderColor: "#e9ecef",
            borderWidth: 1,
            pointRadius: 2,
            usePointStyle: true,
            boxWidth: 8,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              borderDash: [4, 4],
            },
            ticks: {
              callback: function (value, index, ticks) {
                return parseInt(value).toLocaleString() + " Jobs";
              },
              display: true,
              padding: 10,
              color: "#b2b9bf",
              font: {
                size: 12,
                family: "Noto Sans",
                style: "normal",
                lineHeight: 2,
              },
              color: "#64748B",
            },
          },
          x: {
            grid: {
              drawBorder: false,
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
              borderDash: [4, 4],
            },
            ticks: {
              display: true,
              color: "#b2b9bf",
              padding: 10,
              font: {
                size: 12,
                family: "Noto Sans",
                style: "normal",
                lineHeight: -10,
              },
              color: "#64748B",
            },
          },
        },
      },
    });
  });
}

createChartNotOkBulananMF();
