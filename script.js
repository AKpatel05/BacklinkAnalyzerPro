let currentData = [];

// Load Competitor Data
async function loadCompetitorData() {
    const competitorUrl = document.getElementById('competitorUrl').value;
    const response = await fetch('competitor_data.json');
    const data = await response.json();
    
    if (data[competitorUrl]) {
        currentData = data[competitorUrl];
        document.getElementById('results').classList.remove('hidden');
        renderTable(currentData);
        renderAnchorChart(currentData);
    } else {
        alert("इस URL का डेटा उपलब्ध नहीं है। DEMO बटन आज़माएँ।");
    }
}

// DEMO Button (Sample Data)
function loadSampleData() {
    currentData = [
        { domain: "demo-site1.com", da: 70, anchor_text: "click here", status: "active" },
        { domain: "broken-demo.com", da: 25, anchor_text: "buy now", status: "broken" }
    ];
    document.getElementById('results').classList.remove('hidden');
    renderTable(currentData);
    renderAnchorChart(currentData);
}

// Render Table
function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    data.forEach(entry => {
        const row = `<tr>
            <td>${entry.domain}</td>
            <td>${entry.da}</td>
            <td>${entry.anchor_text}</td>
            <td class="${entry.status}">${entry.status.toUpperCase()}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Filter Data by DA
function filterData() {
    const daValue = document.getElementById('filterDA').value;
    const filtered = daValue ? currentData.filter(entry => entry.da >= parseInt(daValue)) : currentData;
    renderTable(filtered);
}

// Anchor Text Chart (Chart.js)
function renderAnchorChart(data) {
    const ctx = document.getElementById('anchorChart').getContext('2d');
    const anchors = data.map(entry => entry.anchor_text);
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: anchors,
            datasets: [{
                data: anchors.map(() => 1), // Count each anchor
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1']
            }]
        },
        options: { responsive: true }
    });
}
