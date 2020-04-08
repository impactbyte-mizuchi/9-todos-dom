const formTodo = document.getElementById("form-todo");
const todosResult = document.getElementById("list-todos");
const searchInput = document.getElementById("search-todo");

const getTodosLocal = () => {
  return localStorage.getItem("listTodos") === null
    ? []
    : JSON.parse(localStorage.getItem("listTodos"));
};

const saveTodosLocal = (todos) => {
  return localStorage.setItem("listTodos", JSON.stringify(todos));
};

const addTodo = (event) => {
  event.preventDefault();

  const todo = document.getElementById("add-todo").value;

  const listTodos = getTodosLocal();

  listTodos.push(todo);

  displayTodos(listTodos);

  saveTodosLocal(listTodos);
};

const displayTodos = (listTodos = getTodosLocal()) => {
  todosResult.innerHTML = "";

  listTodos.forEach((element, index) => {
    const resultTodo = document.createElement("li");
    resultTodo.innerHTML = `<span id=edit-${index} class="edit">${element} <span id=delete-${index} class="delete">X</span>`;

    todosResult.appendChild(resultTodo);
  });
};

const deleteTodo = (event) => {
  if (event.target.matches(".delete")) {
    const id = event.target.id.replace("delete-", "");
    const listTodos = getTodosLocal();

    listTodos.splice(id, 1);
    displayTodos(listTodos);

    saveTodosLocal(listTodos);
  }
};

const editTodo = (event) => {
  if (event.target.matches(".edit")) {
    const newTodo = prompt("edit your todo here");
    const id = event.target.id.replace("edit-", "");
    const listTodos = getTodosLocal();

    console.log(id, "id");

    listTodos.splice(id, 1, newTodo);
    displayTodos(listTodos);

    saveTodosLocal(listTodos);
  }
};

const searchTodo = () => {
  const listTodos = getTodosLocal();
  const input = document.getElementById("search-todo").value;

  const filterTodos = listTodos.filter((element) => {
    if (element.includes(input)) {
      return element;
    }
  });

  displayTodos(filterTodos);
};

displayTodos();
formTodo.addEventListener("submit", addTodo);
todosResult.addEventListener("click", deleteTodo);
todosResult.addEventListener("click", editTodo);
searchInput.addEventListener("keyup", searchTodo);
