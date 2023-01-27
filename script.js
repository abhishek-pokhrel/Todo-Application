window.addEventListener(
  "load",
  showTodos(),
  setDefaultCategories(),
  showCategories(),
  showButtons()
);



// document.getElementById('favourites').addEventListener('mousedown', (ev)=>{
//   if(ev.which == 3){
//     console.log('right click triggered');
//   }
// })



//Add todos with their respective cats
document.getElementById("addTodo").addEventListener("click", () => {
  if (
    document.getElementById("todoInput").value.length < 1 ||
    document.getElementById("categoryInput").value.length < 1
  ) {
    alert("Input all boxes");
  } else {
    let todoInput = document.getElementById("todoInput");
    let categoryInput = document.getElementById("categoryInput");
    let todos = localStorage.getItem("todos");
    if (todos == null) {
      todosObj = [];
    } else {
      todosObj = JSON.parse(todos);
    }

    let check = false;

    todosObj.forEach((todo) => {
      if (
        todo.todoContent.toLowerCase() == todoInput.value.toLowerCase() &&
        todo.todoCategory.toLowerCase() === categoryInput.value.toLowerCase()
      ) {
        check = true;
      }
    });

    if (check) {
      alert("todo already exists");
    } else {
      let todo = {
        todoContent: todoInput.value,
        todoCategory: categoryInput.value,
        isFav: false,
      };
      todosObj.push(todo);
      localStorage.setItem("todos", JSON.stringify(todosObj));
      todoInput.value = "";
      showTodos();
    }
  }
});

function showTodos() {
  let todos = localStorage.getItem("todos");
  if (todos == null) {
    todosObj = [];
  } else {
    todosObj = JSON.parse(todos);
  }
  let html = "";
  todosObj.forEach((todo) => {
    html += `<li class="${todo.todoCategory}">${
      todo.todoContent.charAt(0).toUpperCase() + todo.todoContent.slice(1)
    }, ${
      todo.todoCategory.charAt(0).toUpperCase() + todo.todoCategory.slice(1)
    } <button onClick="addFavourite(this.parentElement)" id="favouriteTodo"><span class="fa fa-star ${
      todo.isFav ? "checked" : ""
    }"></span></button> <button id=delTodo onClick="deleteTodo(this.parentElement)">Del</button>`;
  });

  if (html.length < 1) {
    document.getElementById(
      "todos"
    ).innerHTML = `<li class="notodo">No todos to display</li>`;
  } else {
    document.getElementById("todos").innerHTML = html;
  }
}

function setDefaultCategories() {
  let checkExisting = localStorage.getItem("categories");
  if (checkExisting == null) {
    defaultObj = ["", "sport", "food"];
    localStorage.setItem("categories", JSON.stringify(defaultObj));
  }
}
// Add category
document.getElementById("addCategory").addEventListener("click", () => {
  if (document.getElementById("newCategoryInput").value.length < 1) {
    alert("Input a Category");
  } else {
    let categories = localStorage.getItem("categories");
    if (categories == null) {
      ctsObj = [];
    } else {
      ctsObj = JSON.parse(categories);
    }
    ctsObj.push(
      document.getElementById("newCategoryInput").value.toLowerCase()
    );
    localStorage.setItem("categories", JSON.stringify(ctsObj));
    document.getElementById("newCategoryInput").value = "";
    showCategories();
    showButtons();
  }
});

//Show categories
function showCategories() {
  let categories = localStorage.getItem("categories");
  if (categories == null) {
    ctsObj = [];
  } else {
    ctsObj = JSON.parse(categories);
  }
  let html = "";
  ctsObj.forEach((element) => {
    html += `<option id="cat" value="${element.toLowerCase()}">${
      element.charAt(0).toUpperCase() + element.slice(1)
    }</option>`;
    // Making first letter capital of options
  });
  document.getElementById("categoryInput").innerHTML = html;
}

//Show buttons
function showButtons() {
  let categories = localStorage.getItem("categories");
  ctsObj = JSON.parse(categories);
  let filtered = ctsObj.filter((element) => {
    return element != "";
  });
  console.log(filtered);
  let html = "";
  filtered.forEach((element) => {
    html += `<button onclick="sortButtons(this.innerHTML)" class="${element}" id="dcat">${
      element.charAt(0).toUpperCase() + element.slice(1)
    }</button>`;
  });
  document.getElementById("sort").innerHTML = html;
}

function sortButtons(str) {
  let filtered = [];
  let todos = JSON.parse(localStorage.getItem("todos"));
  //Incase the LS for todos is empty
  if (todos == null) {
    document.getElementById(
      "todos"
    ).innerHTML = `<li class="notodo">No todos under the category ${str}</li>`;
  } else {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todoCategory == str.toLowerCase()) {
        filtered.push(todos[i]);
      }
    }
    if (filtered.length < 1) {
      //Incase the selected category doesn't have a single todo
      document.getElementById(
        "todos"
      ).innerHTML = `<li class="notodo">No todos under the category ${str}</li>`;
    } else {
      let html = "";
      filtered.forEach((todo) => {
        html += `
                <li class="${todo.todoCategory}">${
          todo.todoContent.charAt(0).toUpperCase() + todo.todoContent.slice(1)
        }, ${todo.todoCategory}`;
      });
      document.getElementById("todos").innerHTML = html;
    }
  }
}

function addFavourite(element) {
  console.log(
    element.childNodes[1].childNodes[0].classList.contains("checked")
  );

  // checking a dom token list
  if (element.childNodes[1].childNodes[0].classList.contains("checked")) {
    // console.log("checked", element.innerHTML.split(",")[0].toLowerCase());

    let todos = localStorage.getItem("todos");
    todosObj = JSON.parse(todos);

    todosObj.forEach((todo) => {
      if (
        element.innerHTML.split(",")[0].toLowerCase() ==
        todo.todoContent.toLowerCase()
      ) {
        todo["isFav"] = false;
      }
    });

    localStorage.setItem("todos", JSON.stringify(todosObj));
    showTodos();
  } else {
    // console.log("elsedd");

    let targetContent = element.innerHTML.split(",")[0];
    let todos = localStorage.getItem("todos");
    if (todos == null) {
      todosObj = [];
    } else {
      todosObj = JSON.parse(todos);
    }
    todosObj.forEach((todo) => {
      if (todo.todoContent.toLowerCase() == targetContent.toLowerCase()) {
        todo["isFav"] = true;
      }
    });
    localStorage.setItem("todos", JSON.stringify(todosObj));
    showTodos();
  }
}

// Sort Favourites todos
function showFavourites() {
  let todos = localStorage.getItem("todos");
  if (todos == null) {
    todosObj = [];
  } else {
    todosObj = JSON.parse(todos);
  }
  let html = "";
  todosObj.forEach((todo) => {
    if (todo.isFav == true) {
      html += `<li class="${todo.todoCategory}">${
        todo.todoContent.charAt(0).toUpperCase() + todo.todoContent.slice(1)
      }, ${
        todo.todoCategory.charAt(0).toUpperCase() + todo.todoCategory.slice(1)
      }`;
    }
  });

  if (html.length < 1) {
    document.getElementById("todos").innerHTML = `<li>No favourites to show!`;
  } else {
    document.getElementById("todos").innerHTML = html;
  }
}

function deleteTodo(element) {
  console.log(element.childNodes[0].data.split(","));
  let selectedTodo = {
    todoContent: element.childNodes[0].data.split(",")[0].toLowerCase(),
    todoCategory: element.childNodes[0].data
      .split(",")[1]
      .split(" ")[1]
      .toLowerCase(),
  };
  console.log(selectedTodo.todoContent, selectedTodo.todoCategory);

  let todos = localStorage.getItem("todos");
  if (todos == null) {
    todosObj = [];
  } else {
    todosObj = JSON.parse(todos);
  }

  let filtered = [];

  todosObj.forEach((todo) => {
    if (
      todo.todoContent.toLowerCase() != selectedTodo.todoContent ||
      todo.todoCategory.toLowerCase() != selectedTodo.todoCategory
    ) {
      filtered.push(todo);
    }
  });

  // console.log(filtered);
  localStorage.setItem("todos", JSON.stringify(filtered));
  showTodos();
}
