const form = document.querySelector(".form");
const input = document.querySelector(".input");
const list = document.querySelector(".list");
const button = document.querySelector("button");

button.addEventListener("click", function (e) {
  e.preventDefault();

  const taskText = input.value.trim();
  if (taskText) {
    addTask(taskText);
    input.value = "";
    saveTasks(); // Salva a lista atualizada
  }
});

function addTask(taskText, isChecked = false) {
  const li = document.createElement("li");
  // Adicionamos um <span> para facilitar a captura do texto da tarefa
  li.innerHTML = `
    <span>${taskText}</span> <i class="fas fa-check-square"></i><i class="fas fa-trash"></i>
  `;
  if (isChecked) {
    li.classList.add("checked");
  }
  list.appendChild(li);
}

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("fa-trash")) {
    e.target.parentElement.remove();
    saveTasks(); // Salva após remover
  }
  if (e.target.classList.contains("fa-check-square")) {
    e.target.parentElement.classList.toggle("checked");
    saveTasks(); // Salva após marcar/desmarcar
  }
});

// Função para salvar todas as tarefas no localStorage
function saveTasks() {
  const taskItems = document.querySelectorAll(".list li");
  const tasks = [];
  taskItems.forEach((item) => {
    tasks.push({
      text: item.querySelector("span").innerText,
      checked: item.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => addTask(task.text, task.checked));
  }
}

// Carrega as tarefas assim que a página é aberta
loadTasks();
