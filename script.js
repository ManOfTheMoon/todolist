document.addEventListener('DOMContentLoaded', function () {
  // Загружаем сохраненные задачи при старте
  loadTasks();

  // Добавляем обработчик события для нажатия клавиши "Enter" в поле ввода
  document.getElementById('taskInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask(); // Вызываем функцию добавления задачи при нажатии "Enter"
    }
  });

  // Добавляем обработчик события для изменения значения в фильтре задач
  document.getElementById('taskFilter').addEventListener('change', function () {
    filterTasks(); // Вызываем функцию фильтрации задач при изменении значения фильтра
  });
});

// Функция добавления задачи
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim(); //удаляет пробельные символы с начала и с конца строки

  // Проверяем, что введен текст
  if (taskText !== '') {
    const taskList = document.getElementById('taskList');
    const newTask = document.createElement('li');
    newTask.className = 'task'; // Устанавливаем класс для стилизации задачи
    newTask.innerHTML = `
            <span>${taskText}</span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="deleteTask(this)">Delete</button>
        `; // Создаем HTML-разметку для новой задачи

    taskList.appendChild(newTask); // Добавляем задачу в список

    saveTasks(); // Сохраняем задачи в локальное хранилище

    taskInput.value = ''; // Очищаем поле ввода
  }
}

// Функция завершения задачи
function completeTask(button) {
  const taskItem = button.parentNode; //Возвращает родителя определённого элемента

  taskItem.classList.toggle('completed'); // Переключаем класс завершенной задачи

  saveTasks(); // Сохраняем задачи в локальное хранилище
}

// Функция удаления задачи
function deleteTask(button) {
  const taskItem = button.parentNode;
  taskItem.classList.add('deleted'); // Добавляем класс удаленной задачи

  saveTasks(); // Сохраняем задачи в локальное хранилище
}

// Функция отображения задач в соответствии с фильтром
function showTasks(filter) {
  const taskList = document.getElementById('taskList');
  const tasks = taskList.querySelectorAll('.task');

  tasks.forEach(function (task) {
    task.style.display = 'flex'; // Показываем задачу

    // Применяем фильтр: скрываем задачи в зависимости от выбранного фильтра
    if (filter === 'active' && task.classList.contains('completed')) {
      task.style.display = 'none';
    } else if (filter === 'completed' && !task.classList.contains('completed')) {
      task.style.display = 'none';
    } else if (filter === 'deleted' && !task.classList.contains('deleted')) {
      task.style.display = 'none';
    }
  });
}

// Функция обработки изменения фильтра задач
function filterTasks() {
  const filter = document.getElementById('taskFilter').value;
  showTasks(filter); // Вызываем функцию отображения задач в соответствии с выбранным фильтром
}

// Функция сохранения задач в локальное хранилище
function saveTasks() {
  const taskList = document.getElementById('taskList').innerHTML;
  localStorage.setItem('tasks', taskList);
}

// Функция загрузки задач из локального хранилища при старте
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    document.getElementById('taskList').innerHTML = savedTasks;
  }
}
