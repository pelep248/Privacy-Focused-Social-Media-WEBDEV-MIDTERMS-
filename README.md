# Hush

A privacy-focused social media prototype for our Web Development midterm.
It is built with only HTML, CSS and vanilla JavaScript. There is no backend,
database or API. Data is saved in the browser with localStorage.

## How to run
Open `index.html` in a browser (or use the Live Server extension in VS Code).

## Folder structure
```
.
├── index.html            Home / landing page
├── pages/
│   ├── login.html        Log in
│   ├── signup.html       Create an account
│   ├── feed.html         Main feed (post, like, delete)
│   ├── profile.html      Your profile and your posts
│   ├── settings.html     Private account toggle, delete data
│   ├── about.html        About us
│   └── privacy.html      Privacy promise
├── src/
│   ├── css/style.css     All the styling
│   └── js/main.js        All the JavaScript
└── assets/img/           Images (empty for now)
```

## Features
- Sign up and log in (checked against localStorage)
- Pages like feed, profile and settings need a login
- Post, like and delete posts
- Post anonymously
- Private account option (hides your posts from other users)
- Delete all posts or the whole account

## How the code works
`main.js` is split into numbered sections with comments. Each HTML page has
`data-page` and `data-base` on the `<body>` tag. The JS reads them to know
which page it is on and how to build the correct links.

## Limitations
- Data only exists in one browser on one computer.
- Passwords are plain text (fine for a prototype, not for a real app).

## Use of AI
(Write honestly here what you did yourself and what AI helped with.)
