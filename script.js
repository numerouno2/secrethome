document.addEventListener('DOMContentLoaded', function() {
    const dataForm = document.getElementById('dataForm');
    const dataList = document.getElementById('dataList');
  
    // Function to save or update data to localStorage
    function saveOrUpdateData(number, name, deposit) {
      let savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
      const existingEntryIndex = savedEntries.findIndex(entry => entry.number === number && entry.name === name);
  
      if (existingEntryIndex !== -1) {
        // Update existing entry
        savedEntries[existingEntryIndex].deposit = deposit;
      } else {
        // Add new entry
        const newData = { number, name, deposit };
        savedEntries.push(newData);
      }
  
      localStorage.setItem('savedEntries', JSON.stringify(savedEntries));
      displaySavedData();
    }
  
    // Function to display saved data
    function displaySavedData() {
      dataList.innerHTML = '';
      let savedEntries = JSON.parse(localStorage.getItem('savedEntries')) || [];
  
      savedEntries.forEach(function(entry, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>Number: ${entry.number}, Name: ${entry.name}, Deposit: <span id="deposit_${index}">${entry.deposit}</span></span>
        `;
        dataList.appendChild(li);
      });
    }
  
    // Event listener for form submission
    dataForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const number = document.getElementById('number').value;
      const name = document.getElementById('name').value;
      const deposit = document.getElementById('deposit').value;
  
      saveOrUpdateData(number, name, deposit);
  
      // Clear form fields after submission
      dataForm.reset();
    });
  
    // Event listener for number selection change
    const numberSelect = document.getElementById('number');
    numberSelect.addEventListener('change', function() {
      const selectedNumber = numberSelect.value;
      const selectedName = getDefaultName(selectedNumber);
      document.getElementById('name').value = selectedName;
    });
  
    // Event listener for +2000 button
    const add2000Button = document.getElementById('add2000');
    add2000Button.addEventListener('click', function() {
      const depositInput = document.getElementById('deposit');
      depositInput.value = parseInt(depositInput.value || 0) + 2000;
    });
  
    // Event listener for +4000 button
    const add4000Button = document.getElementById('add4000');
    add4000Button.addEventListener('click', function() {
      const depositInput = document.getElementById('deposit');
      depositInput.value = parseInt(depositInput.value || 0) + 4000;
    });

    // Event listener for +6000 button
    const add6000Button = document.getElementById('add6000');
    add6000Button.addEventListener('click', function() {
      const depositInput = document.getElementById('deposit');
      depositInput.value = parseInt(depositInput.value || 0) + 6000;
    });

    // Event listener for +6000 button
    const add8000Button = document.getElementById('add8000');
    add8000Button.addEventListener('click', function() {
      const depositInput = document.getElementById('deposit');
      depositInput.value = parseInt(depositInput.value || 0) + 8000;
    });

    // Event listener for +6000 button
    const add10000Button = document.getElementById('add10000');
    add10000Button.addEventListener('click', function() {
      const depositInput = document.getElementById('deposit');
      depositInput.value = parseInt(depositInput.value || 0) + 10000;
    });
  
    // Function to get default name based on selected number
    function getDefaultName(number) {
      // Replace with your logic to get the default name based on the number
      // For example:
      switch (number) {
        case '1':
          return 'Nayla';
        case '2':
          return 'Gofur';
        case '3':
          return 'Aqilla';
        case '4':
          return 'Akbar';
        case '5':
          return 'Rival';
        case '6':
          return 'Dimas';
        case '7':
           return 'Surya';
        case '8':
           return 'Danil';  
        case '9':
           return 'Peking';
        // Add more cases as needed
        default:
          return '';
      }
    }
  
    // Initial display of saved data
    displaySavedData();
  });
  