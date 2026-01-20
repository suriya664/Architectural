(function () {
  "use strict";

  const initCharts = () => {
    if (!window.Chart) return;
    const revenueCtx = document.getElementById("revenueChart");
    if (revenueCtx) {
      new Chart(revenueCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Revenue",
              data: [120, 190, 160, 220, 240, 260, 300],
              borderColor: "#2563eb",
              backgroundColor: "rgba(37,99,235,0.15)",
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
        },
      });
    }

    const statusCtx = document.getElementById("statusChart");
    if (statusCtx) {
      new Chart(statusCtx, {
        type: "doughnut",
        data: {
          labels: ["In Progress", "Delivered", "Review", "On Hold"],
          datasets: [
            {
              data: [42, 28, 18, 12],
              backgroundColor: ["#2563eb", "#10b981", "#f59e0b", "#94a3b8"],
            },
          ],
        },
        options: { responsive: true },
      });
    }
  };

  const initDataTables = () => {
    if (!window.jQuery || !jQuery.fn.DataTable) return;
    jQuery("#ordersTable").DataTable({
      pageLength: 5,
      lengthChange: false,
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    initCharts();
    initDataTables();
  });
})();
