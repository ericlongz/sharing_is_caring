let chartOrderBulanan;

function createChartOrderBulanan() {
  var ctx2 = document.getElementById("chart-line-bulanan").getContext("2d");

  var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke1.addColorStop(1, "rgba(0, 121, 255, 0.2)");
  gradientStroke1.addColorStop(0.2, "rgba(0, 121, 255, 0.1)");
  gradientStroke1.addColorStop(0, "rgba(0, 121, 255, 0)"); //blue colors

  var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke2.addColorStop(1, "rgba(0, 223, 162, 0.2)");
  gradientStroke2.addColorStop(0.7, "rgba(0, 223, 162, 0.1)");
  gradientStroke2.addColorStop(0, "rgba(0, 223, 162, 0)"); //green colors

  var gradientStroke3 = ctx2.createLinearGradient(0, 230, 0, 50);

  gradientStroke3.addColorStop(1, "rgba(255, 164, 27, 0.2)");
  gradientStroke3.addColorStop(0.7, "rgba(255, 164, 27, 0.1)");
  gradientStroke3.addColorStop(0, "rgba(255, 164, 27, 0)"); //orange colors

  getDataOrderBulanan("http://localhost:3000/ordered/getDataOrderMonth").then(
    (data) => {
      chartOrderBulanan = new Chart(ctx2, {
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
              label: "Development",
              tension: 0,
              borderWidth: 2,
              pointRadius: 3,
              borderColor: "#0079FF",
              pointBorderColor: "#0079FF",
              pointBackgroundColor: "#0079FF",
              backgroundColor: gradientStroke1,
              fill: true,
              data: data[1],
              maxBarThickness: 6,
            },
            {
              label: "Production",
              tension: 0,
              borderWidth: 2,
              pointRadius: 3,
              borderColor: "#00DFA2",
              pointBorderColor: "#00DFA2",
              pointBackgroundColor: "#00DFA2",
              backgroundColor: gradientStroke2,
              fill: true,
              data: data[2],
              maxBarThickness: 6,
            },
            {
              label: "Total",
              tension: 0,
              borderWidth: 2,
              pointRadius: 3,
              borderColor: "#FFA41B",
              pointBorderColor: "#FFA41B",
              pointBackgroundColor: "#FFA41B",
              backgroundColor: gradientStroke3,
              fill: true,
              data: data[3],
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
    }
  );
}

createChartOrderBulanan();
