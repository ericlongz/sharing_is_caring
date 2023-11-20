var ctx = document
  .getElementById("chart-bars-top-10-not-ok-os")
  .getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: job_name_top_10_os,
    datasets: [
      {
        label: "Jobs",
        tension: 0.4,
        borderWidth: 0,
        borderSkipped: false,
        backgroundColor: "#ff2727",
        data: total_top_10_os,
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    indexAxis: "y",
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
      // intersect: false,
      mode: "index",
    },
    scales: {
      x: {
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
      y: {
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
  .getElementById("chart-bars-top-10-not-ok-mf")
  .getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: job_name_top_10_mf,
    datasets: [
      {
        label: "Jobs",
        tension: 0.4,
        borderWidth: 0,
        borderSkipped: false,
        backgroundColor: "#ff2727",
        data: total_top_10_mf,
        maxBarThickness: 6,
      },
    ],
  },
  options: {
    indexAxis: "y",
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
      // intersect: false,
      mode: "index",
    },
    scales: {
      x: {
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
      y: {
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
