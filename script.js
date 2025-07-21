
function customSignUp() {
  const username = document.getElementById("customUsername").value;
  const password = document.getElementById("customPassword").value;
  if (!username || !password) return alert("Fill both fields");
  localStorage.setItem("user_" + username, password);
  alert("User created!");
}

function customLogin() {
  const username = document.getElementById("customUsername").value;
  const password = document.getElementById("customPassword").value;
  const savedPassword = localStorage.getItem("user_" + username);
  if (savedPassword === password) {
    localStorage.setItem("currentUser", username);
    alert("Login successful as " + username);
    loadGames();
  } else {
    alert("Invalid credentials!");
  }
}

function customLogout() {
  localStorage.removeItem("currentUser");
  alert("Logged out");
  document.getElementById("gamesList").innerHTML = "";
}

function uploadGame() {
  const title = document.getElementById("gameTitle").value;
  const desc = document.getElementById("gameDesc").value;
  const link = document.getElementById("gameLink").value;
  const user = localStorage.getItem("currentUser");
  if (!user) return alert("Please log in");
  if (!title || !link) return alert("Title and Link required");

  const games = JSON.parse(localStorage.getItem("games") || "[]");
  games.push({ title, desc, link, user });
  localStorage.setItem("games", JSON.stringify(games));
  alert("Game uploaded!");
  loadGames();
}

function loadGames() {
  const gamesList = document.getElementById("gamesList");
  gamesList.innerHTML = "";
  const games = JSON.parse(localStorage.getItem("games") || "[]");
  games.forEach((game, i) => {
    const canDelete = (game.user === localStorage.getItem("currentUser"));
    const div = document.createElement("div");
    div.innerHTML = `<h3>${game.title}</h3><p>${game.desc}</p>
      <p>By: ${game.user}</p><a href="${game.link}" target="_blank">Download</a>`;
    if (canDelete) div.innerHTML += `<button onclick="deleteGame(${i})">Delete</button>`;
    if (canDelete) div.innerHTML += `<button onclick="deleteGame(${i})">Delete</button>`;
    gamesList.appendChild(div);
  });
}

function searchGames() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const games = JSON.parse(localStorage.getItem("games") || "[]");
  const gamesList = document.getElementById("gamesList");
  gamesList.innerHTML = "";
  games.filter(g => g.title.toLowerCase().includes(query)).forEach((game, i) => {
    const canDelete = (game.user === localStorage.getItem("currentUser"));
    const div = document.createElement("div");
    div.innerHTML = `<h3>${game.title}</h3><p>${game.desc}</p>
      <p>By: ${game.user}</p><a href="${game.link}" target="_blank">Download</a>`;
    if (canDelete) div.innerHTML += `<button onclick="deleteGame(${i})">Delete</button>`;
    if (canDelete) div.innerHTML += `<button onclick="deleteGame(${i})">Delete</button>`;
    gamesList.appendChild(div);
  });
}


function deleteGame(index) {
  const user = localStorage.getItem("currentUser");
  let games = JSON.parse(localStorage.getItem("games") || "[]");

  if (games[index].user === user) {
    if (confirm("Are you sure you want to delete this game?")) {
      games.splice(index, 1);
      localStorage.setItem("games", JSON.stringify(games));
      loadGames();
    }
  } else {
    alert("You can only delete your own games.");
  }
}
