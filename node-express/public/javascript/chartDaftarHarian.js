var ctx = document
  .getElementById("chart-bars-daftar-mainframe")
  .getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: daftarAplikasiMf,
    datasets: [
      {
        label: "Jobs",
        tension: 0.4,
        borderWidth: 0,
        borderSkipped: false,
        backgroundColor: "#2ca8ff",
        data: daftarHarianMf,
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        borderColor: "#e9ecef",
        borderWidth: 1,
        usePointStyle: true,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        stacked: true,
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [4, 4],
        },
        ticks: {
          beginAtZero: true,
          padding: 10,
          callback: function (value, index, ticks) {
            return parseInt(value).toLocaleString() + " Jobs";
          },
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
        stacked: true,
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
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

var ctx = document
  .getElementById("chart-bars-daftar-opensystem")
  .getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: daftarAplikasiOs,
    datasets: [
      {
        label: "Jobs",
        tension: 0.4,
        borderWidth: 0,
        borderSkipped: false,
        backgroundColor: "#2ca8ff",
        data: daftarHarianOs,
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        borderColor: "#e9ecef",
        borderWidth: 1,
        usePointStyle: true,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        stacked: true,
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
          beginAtZero: true,
          padding: 10,
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
        stacked: true,
        grid: {
          drawBorder: false,
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        ticks: {
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
