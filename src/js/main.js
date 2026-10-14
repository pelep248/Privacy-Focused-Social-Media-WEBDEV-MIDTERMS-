/* Hush - main.js
   One JavaScript file for every page.
   There is no backend, so everything is saved in the browser's localStorage.

   localStorage keys used:
     "users"       -> list of all accounts
     "posts"       -> list of all posts
     "currentUser" -> username of whoever is logged in
*/

/* ===== 1. helper functions (get and save data) ===== */

function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}
function getPosts() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}
function savePosts(posts) {
  localStorage.setItem("posts", JSON.stringify(posts));
}
function getCurrentUser() {
  return localStorage.getItem("currentUser");
}
function findUser(username) {
  return getUsers().find(function (u) { return u.username === username; });
}

/* Each page has <body data-page="..." data-base="...">
   page = which page we are on, base = path back to the main folder */
const page = document.body.dataset.page;
const base = document.body.dataset.base;

/* ===== 2. navigation bar (same on every page) ===== */

function buildNav() {
  const user = getCurrentUser();
  let html = '<a class="logo" href="' + base + 'index.html">Hush</a><div>';
  html += '<a href="' + base + 'pages/about.html">About</a>';
  html += '<a href="' + base + 'pages/privacy.html">Privacy</a>';

  if (user) {
    html += '<a href="' + base + 'pages/feed.html">Feed</a>';
    html += '<a href="' + base + 'pages/profile.html">Profile</a>';
    html += '<a href="' + base + 'pages/settings.html">Settings</a>';
    html += '<a href="#" id="logout">Log out</a>';
  } else {
    html += '<a href="' + base + 'pages/login.html">Log in</a>';
    html += '<a href="' + base + 'pages/signup.html">Sign up</a>';
  }
  html += '<button id="themeBtn" class="icon" title="Switch light/dark">◐</button>';
  html += "</div>";
  document.getElementById("nav").innerHTML = html;

  /* dark mode: save the choice so it stays on every page */
  document.getElementById("themeBtn").addEventListener("click", function () {
    const dark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = dark ? "light" : "dark";
    localStorage.setItem("theme", dark ? "light" : "dark");
  });

  const logout = document.getElementById("logout");
  if (logout) {
    logout.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.href = base + "index.html";
    });
  }
}

/* pages that need a login: send visitors to the login page */
function protectPage() {
  const needsLogin = ["feed", "profile", "settings"];
  if (needsLogin.includes(page) && !getCurrentUser()) {
    window.location.href = base + "pages/login.html";
  }
}

/* ===== 3. signup ===== */

function setupSignup() {
  const form = document.getElementById("signupForm");
  const msg = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    if (username === "" || password === "") {
      msg.textContent = "Please fill in all fields.";
    } else if (password.length < 6) {
      msg.textContent = "Password must be at least 6 characters.";
    } else if (password !== confirm) {
      msg.textContent = "Passwords do not match.";
    } else if (findUser(username)) {
      msg.textContent = "That username is already taken.";
    } else {
      const users = getUsers();
      users.push({ username: username, password: password, bio: "", isPrivate: false });
      saveUsers(users);
      alert("Account created! You can log in now.");
      window.location.href = "login.html";
    }
  });
}

/* ===== 4. login ===== */

function setupLogin() {
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const user = findUser(username);

    if (user && user.password === password) {
      localStorage.setItem("currentUser", username);
      window.location.href = "feed.html";
    } else {
      msg.textContent = "Wrong username or password.";
    }
  });
}

/* ===== 5. posts (used by the feed and the profile) ===== */

/* Draws a list of posts inside the element with the given id.
   textContent is used instead of innerHTML so nobody can sneak
   code into a post (basic security). */
function showPosts(listId, posts) {
  const list = document.getElementById(listId);
  list.innerHTML = "";

  if (posts.length === 0) {
    list.innerHTML = "<p>No posts yet.</p>";
    return;
  }

  posts.forEach(function (post) {
    const item = document.createElement("div");
    item.className = "post";

    /* round avatar with the first letter of the name */
    const avatar = document.createElement("div");
    avatar.className = post.anon ? "avatar anon" : "avatar";
    avatar.textContent = post.anon ? "?" : post.author[0].toUpperCase();

    const body = document.createElement("div");
    body.className = "post-body";

    const who = document.createElement("strong");
    who.textContent = post.anon ? "Anonymous" : post.author;

    const time = document.createElement("small");
    time.textContent = post.time;

    const text = document.createElement("p");
    text.textContent = post.text;

    const likeBtn = document.createElement("button");
    likeBtn.className = "small";
    likeBtn.textContent = "Like (" + post.likes + ")";
    likeBtn.addEventListener("click", function () { likePost(post.id); });

    body.append(who, time, text, likeBtn);

    /* only the owner of a post can delete it */
    if (post.author === getCurrentUser()) {
      const delBtn = document.createElement("button");
      delBtn.className = "small danger";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", function () { deletePost(post.id); });
      body.append(delBtn);
    }

    item.append(avatar, body);
    list.append(item);
  });
}

function likePost(id) {
  const posts = getPosts();
  posts.forEach(function (p) {
    if (p.id === id) { p.likes++; }
  });
  savePosts(posts);
  location.reload();
}

function deletePost(id) {
  const posts = getPosts().filter(function (p) { return p.id !== id; });
  savePosts(posts);
  location.reload();
}

/* ===== 6. feed ===== */

function setupFeed() {
  const form = document.getElementById("postForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const text = document.getElementById("postText").value.trim();
    if (text === "") { return; }

    const posts = getPosts();
    posts.unshift({            // unshift puts the newest post first
      id: Date.now(),
      author: getCurrentUser(),
      text: text,
      anon: document.getElementById("anon").checked,
      likes: 0,
      time: new Date().toLocaleString()
    });
    savePosts(posts);
    location.reload();
  });

  /* character counter under the post box */
  const box = document.getElementById("postText");
  box.addEventListener("input", function () {
    document.getElementById("count").textContent = box.value.length + " / 280";
  });

  /* show the posts, filtered by the search box.
     posts from private accounts are hidden (except your own) */
  const search = document.getElementById("search");
  function drawFeed() {
    const word = search.value.toLowerCase();
    const visible = getPosts().filter(function (p) {
      const author = findUser(p.author);
      const isPrivate = author && author.isPrivate;
      const allowed = !isPrivate || p.author === getCurrentUser();
      return allowed && p.text.toLowerCase().includes(word);
    });
    showPosts("feedList", visible);
  }
  search.addEventListener("input", drawFeed);
  drawFeed();
}

/* ===== 7. profile ===== */

function setupProfile() {
  const me = findUser(getCurrentUser());
  document.getElementById("profileName").textContent = me.username;
  document.getElementById("bio").value = me.bio;

  document.getElementById("bioForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const users = getUsers();
    users.forEach(function (u) {
      if (u.username === me.username) {
        u.bio = document.getElementById("bio").value.trim();
      }
    });
    saveUsers(users);
    document.getElementById("message").textContent = "Bio saved.";
  });

  const mine = getPosts().filter(function (p) { return p.author === me.username; });
  showPosts("myPosts", mine);
  document.getElementById("bigAvatar").textContent = me.username[0].toUpperCase();
  document.getElementById("postCount").textContent = mine.length + " posts";
}

/* ===== 8. settings ===== */

function setupSettings() {
  const me = findUser(getCurrentUser());
  const toggle = document.getElementById("privateToggle");
  toggle.checked = me.isPrivate;

  toggle.addEventListener("change", function () {
    const users = getUsers();
    users.forEach(function (u) {
      if (u.username === me.username) { u.isPrivate = toggle.checked; }
    });
    saveUsers(users);
  });

  document.getElementById("deletePosts").addEventListener("click", function () {
    if (confirm("Delete all of your posts?")) {
      const others = getPosts().filter(function (p) { return p.author !== me.username; });
      savePosts(others);
      alert("Your posts were deleted.");
    }
  });

  document.getElementById("deleteAccount").addEventListener("click", function () {
    if (confirm("Delete your account and all your data? This cannot be undone.")) {
      saveUsers(getUsers().filter(function (u) { return u.username !== me.username; }));
      savePosts(getPosts().filter(function (p) { return p.author !== me.username; }));
      localStorage.removeItem("currentUser");
      window.location.href = base + "index.html";
    }
  });
}

/* ===== 9. start: run the right code for the current page ===== */

if (localStorage.getItem("theme") === "dark") {
  document.documentElement.dataset.theme = "dark";
}

protectPage();
buildNav();

if (page === "signup") { setupSignup(); }
if (page === "login") { setupLogin(); }
if (page === "feed" && getCurrentUser()) { setupFeed(); }
if (page === "profile" && getCurrentUser()) { setupProfile(); }
if (page === "settings" && getCurrentUser()) { setupSettings(); }
