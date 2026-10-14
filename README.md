# Hush

A privacy-focused social media prototype. I made it for my DS315 - Web Development midterm.
It uses only HTML, CSS and vanilla JavaScript. There is no backend, database or API.
Everything is saved in the browser with localStorage.

## Features

- Sign up and log in (just a username and password)
- Feed where you can post, like and delete your own posts
- Anonymous posting
- Search box and a 280-character limit on posts
- Profile page with a bio and your own posts
- Private account option (hides your posts from other users)
- Delete all your posts or your whole account
- Dark mode (saved)
- Feed, profile and settings need a login

## Pages

| Page | File |
| --- | --- |
| Home | `index.html` |
| Log in | `pages/login.html` |
| Sign up | `pages/signup.html` |
| Feed | `pages/feed.html` |
| Profile | `pages/profile.html` |
| Settings | `pages/settings.html` |
| About us | `pages/about.html` |
| Privacy | `pages/privacy.html` |

## Folder structure

```
.
├── index.html
├── pages/
├── src/
│   ├── css/style.css
│   └── js/main.js
├── assets/img/
└── README.md
```

## How to run

Open `index.html` in a browser. Nothing to install.

## How it works

- localStorage is used like a small database. It saves `users`, `posts` and `currentUser`.
- Every page uses the same `style.css` and `main.js`. Each page has `data-page` and `data-base` on the `<body>` tag so `main.js` knows which page it is on.
- `main.js` is split into numbered sections with comments (helpers, navigation, signup, login, posts, feed, profile, settings).
- Posts are shown with `textContent` instead of `innerHTML` so nobody can put code inside a post.

## Limitations

- The data stays in one browser on one computer, so users can't see each other's posts on different devices.
- Passwords are saved as plain text. This is okay for a prototype but a real app would need a backend and hashed passwords.
- Clearing the browser data deletes everything.

## Submitted by

Philip Andree C. Tupas  
DS3A
