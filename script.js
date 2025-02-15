function loadData() {
    let data = localStorage.getItem('pembukuan');
    if (data) {
        document.getElementById('data-list').innerHTML = data;
        addDeleteEventListeners();
    }
}

function saveData() {
    localStorage.setItem('pembukuan', document.getElementById('data-list').innerHTML);
}

function tambahData() {
    let today = new Date();
    let formattedDate = today.toISOString().split('T')[0];
    
    let unit = document.getElementById('unit').value;
    let waktu = document.getElementById('waktu').value;
    let tambahan = document.getElementById('tambahan').value;
    
    if (unit === "" || waktu === "" || tambahan === "") {
        alert("Mohon isi semua data");
        return;
    }
    
    let table = document.getElementById("data-list");
    let row = table.insertRow();
    row.insertCell(0).textContent = formattedDate;
    row.insertCell(1).textContent = unit;
    row.insertCell(2).textContent = waktu;
    row.insertCell(3).textContent = tambahan;
    
    let deleteCell = row.insertCell(4);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.style.border = 'none';
    deleteButton.style.background = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.onclick = function () {
        row.remove();
        saveData();
    };
    deleteCell.appendChild(deleteButton);
    
    document.getElementById('unit').value = "";
    document.getElementById('waktu').value = "";
    document.getElementById('tambahan').value = "";
    
    saveData();
}

function addDeleteEventListeners() {
    let buttons = document.querySelectorAll('#data-list button');
    buttons.forEach(button => {
        button.onclick = function () {
            button.parentElement.parentElement.remove();
            saveData();
        };
    });
}

document.addEventListener("DOMContentLoaded", loadData);
