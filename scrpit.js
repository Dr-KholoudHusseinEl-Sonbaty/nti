const userNameInput = document.querySelector("#userName");
const userAgeInput = document.querySelector("#userAge");
const userStatusInput = document.querySelector("#userStatus");
const form = document.querySelector("#formData");
const table = document.querySelector('.table-users');

let userEData = [];

if (localStorage.getItem('AllData')) {
  userEData = JSON.parse(localStorage.getItem("AllData"));
  displayData();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const user = {
    name: userNameInput.value,
    age: userAgeInput.value,
    state: userStatusInput.value,
  };
  userEData.push(user);

  localStorage.setItem('AllData', JSON.stringify(userEData));
  displayData();
  form.reset();
});

table.addEventListener('click', (event) => {
  if (event.target.matches('.btn-delete')) {
    const index = event.target.dataset.index;
    userEData.splice(index, 1);
    localStorage.setItem('AllData', JSON.stringify(userEData));
    displayData();
  } else if (event.target.matches('.btn-edit')) {
    const index = event.target.dataset.index;
    editUser(index);
  } else if (event.target.matches('.btn-status')) {
    const index = event.target.dataset.index;
    changeStatus(index);
  }
});

function displayData() {
  let tableRows = '';
  for (let i = 0; i < userEData.length; i++) {
    const user = userEData[i];
    tableRows += `
      <tr>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td class="text-success fw-bolder">${user.state}</td>
        <td><button class="btn btn-info text-white btn-edit" data-index="${i}">Edit</button></td>
        <td><button class="btn btn-danger btn-delete" data-index="${i}">Delete</button></td>
        <td><button class="btn btn-warning text-white btn-status" data-index="${i}">Change Status</button></td>
      </tr>
    `;
  }
  table.innerHTML = tableRows;
}

function editUser(index) {
  const user = userEData[index];
  userNameInput.value = user.name;
  userAgeInput.value = user.age;
  userStatusInput.value = user.state;
  document.querySelector("#send").classList.add("d-none");
  document.querySelector("#update").classList.remove("d-none");

  function updateData() {
    user.name = userNameInput.value;
    user.age = userAgeInput.value;
    user.state = userStatusInput.value;
    localStorage.setItem('AllData', JSON.stringify(userEData));
    displayData();
    form.reset();
    document.querySelector("#send").classList.remove("d-none");
    document.querySelector("#update").classList.add("d-none");
  }

  document.querySelector("#update").addEventListener('click', updateData);
}

function changeStatus(index) {
  const user = userEData[index];
  user.state = "inactive";
  localStorage.setItem('AllData', JSON.stringify(userEData));
  displayData();
}
