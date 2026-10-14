# Hush

**A quiet social media prototype. No tracking, no ads, no AI reading your posts.**

Hush is my DS315 - Web Development midterm project. It is a multi-page social media
app made with only **HTML, CSS and vanilla JavaScript**. There is no backend,
no database and no API. Everything you do is saved in your own browser.

---

## Why I made this

AI is getting into everything, and a lot of apps collect more of our data than
we notice. I wanted to make a small app where people can post and share ideas
without worrying about who is watching. Hush shows that idea in a simple way:
if the data never leaves your browser, nobody else can collect it.

## Features

- Sign up and log in (no email or phone number needed)
- Main feed where you can post, like and delete your own posts
- Anonymous posting
- Search box on the feed
- 280-character limit with a counter
- Dark mode (the choice is saved)
- Profile page with an editable bio and your own posts
- Private account option (hides your posts from other users)
- Delete all your posts or your whole account anytime
- Protected pages: feed, profile and settings need a login
- About and Privacy pages

## Pages

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Landing page with login and signup buttons |
| Log in | `pages/login.html` | Checks the account in localStorage |
| Sign up | `pages/signup.html` | Creates an account with basic validation |
| Feed | `pages/feed.html` | Post, like and delete |
| Profile | `pages/profile.html` | Edit bio, see your posts |
| Settings | `pages/settings.html` | Private account toggle, delete data |
| About us | `pages/about.html` | Why I made it and who submitted it |
| Privacy | `pages/privacy.html` | The privacy promise |

## Folder structure

```
.
├── index.html
├── pages/
│   ├── login.html
│   ├── signup.html
│   ├── feed.html
│   ├── profile.html
│   ├── settings.html
│   ├── about.html
│   └── privacy.html
├── src/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── assets/
│   └── img/
└── README.md
```

## How to run it

1. Download or clone this repository.
2. Open `index.html` in any browser (or use Live Server in VS Code).
3. Click **Sign up**, make an account, then log in.

No installing and no internet needed.

## How it works

- **localStorage** acts as the "database". It saves three things: `users`,
  `posts` and `currentUser`.
- **One CSS file and one JS file** are used by every page. Each page has
  `data-page` and `data-base` on its `<body>` tag, so `main.js` knows which
  page it is on and which code to run.
- `main.js` is split into numbered sections with comments: helpers, navigation,
  signup, login, posts, feed, profile and settings.
- Posts are shown using `textContent` and not `innerHTML`, so someone cannot
  put code inside a post.

## Submitted by

Philip Andree C. Tupas  
DS3A

*Made for the DS315 Web Development midterm. Built with HTML, CSS and JavaScript only.*
