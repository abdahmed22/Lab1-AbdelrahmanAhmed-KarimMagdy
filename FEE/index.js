
function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

// TODO
// add event listener to submit button

const submit = document.querySelector(".btn-primary");

submit.addEventListener("click", (event) => {
  event.preventDefault();
  const nametxt = document.getElementById("name").value;
  const idtxt = document.getElementById("id").value;
  createEmployee(nametxt,idtxt);
});



// TODO
// add event listener to delete button

const table = document.getElementById('dataTable');

table.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-danger')) {
    const row = event.target.closest('tr');
    const id = row.querySelector('td:first-child').textContent;
    deleteEmployee(id);
  }
});


// TODO
function createEmployee (nametxt,idtxt){
  const employee = {
    id: idtxt,
    name: nametxt,
  };
  const employeeJSON = JSON.stringify(employee); 
  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: employeeJSON,
  })
    fetchEmployees();
  // get data from input field
  // send data to BE
  // call fetchEmployees
}



// TODO

function deleteEmployee(id) {
  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data.message);
    fetchEmployees();
  })
  .catch(error => console.error('Error:', error));
  // get id
  // send id to BE
  // call fetchEmployees
}



fetchEmployees()
