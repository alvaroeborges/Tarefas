const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const button = document.querySelector("button");

button.addEventListener("click", function (e) {
  e.preventDefault();

  const task = input.value.trim();
  if (task) {
    addTask(task);
    input.value = "";
  }
});

function addTask(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${task} <i class="fas fa-check-square"></i><i class="fas fa-trash"></i>
  `;
  list.appendChild(li);
}
list.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("fa-check-square")) {
    e.target.parentElement.classList.toggle("checked");
  }
});


