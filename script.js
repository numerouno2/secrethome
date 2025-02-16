function loadData() {
    let pembayaranData = JSON.parse(localStorage.getItem('pembayaran')) || [];
    let pembukuanData = JSON.parse(localStorage.getItem('pembukuan')) || [];
    
    let pembayaranTable = document.getElementById('pembayaran-list');
    pembayaranTable.innerHTML = "";
    pembayaranData.forEach(data => tambahKeTabel(data, pembayaranTable, true));
    
    let pembukuanTable = document.getElementById('pembukuan-list');
    pembukuanTable.innerHTML = "";
    pembukuanData.forEach(data => tambahKeTabel(data, pembukuanTable, false));
}

function saveData() {
    let pembayaranData = [];
    document.querySelectorAll('#pembayaran-list tr').forEach(row => {
        let cells = row.getElementsByTagName('td');
        if (cells.length > 0) {
            pembayaranData.push({
                tanggal: cells[0].textContent,
                unit: cells[1].textContent,
                waktu: cells[2].textContent,
                tambahan: cells[3].innerHTML.replace(/\n/g, '<br>')
            });
        }
    });
    localStorage.setItem('pembayaran', JSON.stringify(pembayaranData));
    
    let pembukuanData = [];
    document.querySelectorAll('#pembukuan-list tr').forEach(row => {
        let cells = row.getElementsByTagName('td');
        if (cells.length > 0) {
            pembukuanData.push({
                tanggal: cells[0].textContent,
                unit: cells[1].textContent,
                waktu: cells[2].textContent,
                tambahan: cells[3].innerHTML.replace(/\n/g, '<br>')
            });
        }
    });
    localStorage.setItem('pembukuan', JSON.stringify(pembukuanData));
}

function tambahData() {
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0];
    let formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let unit = document.getElementById('unit').value;
    let waktu = document.getElementById('waktu').value;
    let tambahan = document.getElementById('tambahan').value.replace(/\n/g, '<br>');
    
    if (unit === "" || waktu === "" || tambahan === "") {
        alert("Mohon isi semua data");
        return;
    }
    
    let pembayaranTable = document.getElementById("pembayaran-list");
    let data = { tanggal: formattedDate + ' ' + formattedTime, unit, waktu, tambahan };
    tambahKeTabel(data, pembayaranTable, true);
    saveData();
}

function tambahKeTabel(data, table, isPembayaran) {
    let row = table.insertRow();
    row.insertCell(0).textContent = data.tanggal;
    row.insertCell(1).textContent = data.unit;
    row.insertCell(2).textContent = data.waktu;
    row.insertCell(3).innerHTML = data.tambahan;
    
    if (isPembayaran) {
        let actionCell = row.insertCell(4);
        actionCell.style.display = 'flex';
        actionCell.style.gap = '10px';
        
        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.classList.add('cancel-btn');
        cancelButton.onclick = function () {
            row.remove();
            saveData();
        };
        actionCell.appendChild(cancelButton);
        
        let buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.classList.add('buy-btn');
        buyButton.onclick = function () {
            let pembukuanTable = document.getElementById('pembukuan-list');
            tambahKeTabel(data, pembukuanTable, false);
            row.remove();
            saveData();
        };
        actionCell.appendChild(buyButton);
    }
}

document.addEventListener("DOMContentLoaded", loadData);
