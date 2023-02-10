nameInput = document.getElementById("name-input");
emailInput = document.getElementById("email-input");
passwordInput = document.getElementById("password-input");
registerBtn = document.getElementById("registerBtn");
loginBtn = document.getElementById("loginBtn");
registerBtn.addEventListener("click", async function () {
  data = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };

  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch("/register", option);
  console.log(res.json().token);
});

loginBtn.addEventListener("click", async () => {
  data = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  const option = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch("/login", option);
  const token = await res.json();
  console.log(token);
});


