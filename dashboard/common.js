// Common data for the dashboard and charts
const statesData = [
    { state: "Andhra Pradesh", arrivals: 20000, regArrivals: 12000, disease: 12, diseaseName: "Dengue" },
    { state: "Arunachal Pradesh", arrivals: 5000, regArrivals: 2500, disease: 9, diseaseName: "Malaria" },
    { state: "Assam", arrivals: 30000, regArrivals: 18000, disease: 15, diseaseName: "Japanese Encephalitis" },
    { state: "Bihar", arrivals: 50000, regArrivals: 30000, disease: 18, diseaseName: "Tuberculosis" },
    { state: "Chhattisgarh", arrivals: 15000, regArrivals: 9000, disease: 11, diseaseName: "Malaria" },
    { state: "Delhi", arrivals: 60000, regArrivals: 40000, disease: 7, diseaseName: "Dengue" },
    { state: "Goa", arrivals: 4000, regArrivals: 2500, disease: 5, diseaseName: "Leptospirosis" },
    { state: "Gujarat", arrivals: 35000, regArrivals: 20000, disease: 13, diseaseName: "Chikungunya" },
    { state: "Haryana", arrivals: 18000, regArrivals: 10000, disease: 14, diseaseName: "Tuberculosis" },
    { state: "Himachal Pradesh", arrivals: 7000, regArrivals: 4000, disease: 10, diseaseName: "Respiratory Infections" },
    { state: "Jharkhand", arrivals: 20000, regArrivals: 12000, disease: 12, diseaseName: "Malaria" },
    { state: "Karnataka", arrivals: 40000, regArrivals: 25000, disease: 16, diseaseName: "Dengue" },
    { state: "Kerala", arrivals: 10000, regArrivals: 7000, disease: 8, diseaseName: "Nipah Virus" },
    { state: "Madhya Pradesh", arrivals: 45000, regArrivals: 30000, disease: 19, diseaseName: "Malaria" },
    { state: "Maharashtra", arrivals: 60000, regArrivals: 40000, disease: 20, diseaseName: "Tuberculosis" },
    { state: "Manipur", arrivals: 5000, regArrivals: 3000, disease: 6, diseaseName: "HIV/AIDS" },
    { state: "Meghalaya", arrivals: 6000, regArrivals: 3500, disease: 9, diseaseName: "Malaria" },
    { state: "Mizoram", arrivals: 4000, regArrivals: 2500, disease: 7, diseaseName: "HIV/AIDS" },
    { state: "Nagaland", arrivals: 3500, regArrivals: 2000, disease: 8, diseaseName: "Tuberculosis" },
    { state: "Odisha", arrivals: 25000, regArrivals: 15000, disease: 15, diseaseName: "Malaria" },
    { state: "Punjab", arrivals: 20000, regArrivals: 12000, disease: 12, diseaseName: "Hepatitis C" },
    { state: "Rajasthan", arrivals: 35000, regArrivals: 20000, disease: 16, diseaseName: "Swine Flu" },
    { state: "Sikkim", arrivals: 3000, regArrivals: 2000, disease: 5, diseaseName: "Respiratory Infections" },
    { state: "Tamil Nadu", arrivals: 40000, regArrivals: 25000, disease: 14, diseaseName: "Dengue" },
    { state: "Telangana", arrivals: 28000, regArrivals: 18000, disease: 12, diseaseName: "Chikungunya" },
    { state: "Tripura", arrivals: 6000, regArrivals: 3500, disease: 10, diseaseName: "Malaria" },
    { state: "Uttar Pradesh", arrivals: 75000, regArrivals: 50000, disease: 22, diseaseName: "Tuberculosis" },
    { state: "Uttarakhand", arrivals: 12000, regArrivals: 8000, disease: 9, diseaseName: "Respiratory Infections" },
    { state: "West Bengal", arrivals: 70000, regArrivals: 45000, disease: 17, diseaseName: "Dengue" }
];

// Function to load main dashboard data and charts
function loadDashboardData() {
    const totalMigrants = statesData.reduce((sum, s) => sum + s.arrivals, 0);
    const totalRegistered = statesData.reduce((sum, s) => sum + s.regArrivals, 0);
    const avgAffected = (statesData.reduce((sum, s) => sum + s.disease, 0) / statesData.length).toFixed(1);

    document.getElementById("totalResidents").innerText = totalMigrants.toLocaleString();
    document.getElementById("totalRegistered").innerText = totalRegistered.toLocaleString();
    document.getElementById("avgPrediction").innerText = avgAffected + "%";

    // Overview Chart
    const affectedCounts = statesData.map(s => Math.round(s.arrivals * s.disease / 100));
    new Chart(document.getElementById("overviewChart"), {
        type: "bar",
        data: {
            labels: statesData.map(s => s.state),
            datasets: [
                { label: "New Arrivals", data: statesData.map(s => s.arrivals), backgroundColor: "#0a74da" },
                { label: "Registered Migrants", data: statesData.map(s => s.regArrivals), backgroundColor: "#3bc9db" },
                { label: "Affected Migrants", data: affectedCounts, backgroundColor: "#ff6b6b" }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 45
                    }
                }
            }
        }
    });
}

// Function to load the states data table
function loadStatesTable() {
    const tableBody = document.querySelector("#statesTable tbody");
    if (tableBody) {
        tableBody.innerHTML = "";
        statesData.forEach(s => {
            const row = `
                <tr>
                    <td>${s.state}</td>
                    <td>${s.arrivals.toLocaleString()}</td>
                    <td>${s.regArrivals.toLocaleString()}</td>
                    <td>${s.disease}%</td>
                    <td>${s.diseaseName}</td>
                </tr>`;
            tableBody.innerHTML += row;
        });
    }
}

// Function to load the disease trends chart
function loadDiseaseTrends() {
    const diseaseCounts = {};
    statesData.forEach(s => {
        diseaseCounts[s.diseaseName] = (diseaseCounts[s.diseaseName] || 0) + 1;
    });

    new Chart(document.getElementById("diseaseChart"), {
        type: "doughnut",
        data: {
            labels: Object.keys(diseaseCounts),
            datasets: [{
                label: "Disease Distribution",
                data: Object.values(diseaseCounts),
                backgroundColor: [
                    "#0D6B63", "#4CAF50", "#2196F3", "#E63946", "#FFC107",
                    "#9C27B0", "#00BCD4", "#8BC34A", "#FF9800", "#673AB7"
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: "#333"
                    }
                },
                title: {
                    display: true,
                    text: "Widespread Disease Distribution Across States",
                    color: "#333",
                    font: { size: 16 }
                }
            }
        }
    });
}
function setPeriod(period) {
      document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      console.log("Selected period:", period);
    }
    // Example dataset (replace with your real data)
    const states = [
      "Andhra Pradesh","Assam","Bihar","Delhi","Gujarat","Karnataka","Maharashtra","Tamil Nadu","Uttar Pradesh","West Bengal"
    ];
    const newArrivals = [20000,30000,50000,60000,35000,40000,60000,40000,75000,70000];
    const registered = [12000,20000,30000,40000,20000,25000,40000,30000,50000,45000];
    const affected = [3000,5000,8000,2000,4000,5000,12000,6000,15000,10000];

    // KPI Values
    const totalMigrants = newArrivals.reduce((a,b) => a+b, 0);
    const totalRegistered = registered.reduce((a,b) => a+b, 0);
    const avgAffected = ((affected.reduce((a,b) => a+b, 0) / totalMigrants) * 100).toFixed(2);

    document.getElementById("totalMigrants").textContent = totalMigrants.toLocaleString();
    document.getElementById("totalRegistered").textContent = totalRegistered.toLocaleString();
    document.getElementById("avgAffected").textContent = avgAffected + "%";

    // Chart.js
    const ctx = document.getElementById("overviewChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: states,
        datasets: [
          { label: "New Arrivals", data: newArrivals, backgroundColor: "#007bff" },
          { label: "Registered Migrants", data: registered, backgroundColor: "#17a2b8" },
          { label: "Affected Migrants", data: affected, backgroundColor: "#dc3545" }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          tooltip: { mode: "index", intersect: false }
        },
        scales: {
          y: { beginAtZero: true, ticks: { callback: val => val.toLocaleString() } }
        }
      }
    });