window.onload = () => {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
  }
};
const createInput = document.getElementById("create-input");
const btnCreate = document.getElementById("btn-create");
const feed = document.getElementById("feed");
const getAllTasks = async () => {
  const option = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await fetch("/getTasks", option);

  const { tasks } = await res.json();
  tasks.forEach((task) => {
    displayTask(task);
  });
};

getAllTasks();

const displayTask = async (task) => {
  const { name, createdBy, _id } = task;
  const res = await fetch(`/user/${createdBy}`);
  const { userName } = await res.json();
  div = `<div class="task-component" data-id="${_id}">

                          <p> Task Name: ${name} </p>
                          <p> Created By: ${userName} </p>
                          <button class="btnUpdate button" ><a href="/updateTask?id=${_id}"><span>Update</span></a></button>
                          <button class="btnDelete button" onclick="deleteTask('${_id}')"><span>Delete</span></button>
                      </div>`;
  feed.insertAdjacentHTML("beforeend", div);
};

btnCreate.addEventListener("click", async () => {
  data = {
    name: createInput.value,
  };
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch("/addTask", option);
  const { task } = await res.json();
  displayTask(task);
  createInput.value = "";
});

const btnDelete = document.querySelector(".btnDelete");

const deleteTask = async (id) => {
  // delete from database
  await fetch(`/deleteTask/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  // delete from display
  const tasks = document.querySelectorAll(".task-component");
  tasks.forEach((task) => {
    if (task.dataset.id == id) {
      task.remove();
    }
  });
};

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  localStorage.clear();
  window.location.replace("/");
});
