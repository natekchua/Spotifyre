<h1 align="center">Welcome to Spotifyre 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0-blue.svg?cacheSeconds=2592000" />
</p>

> Spotifyre is a Spotify application that acts as a Playlist Manager for curators. Our app focuses on making playlist collaboration and song sharing between listeners and curators super easy.

### ✨ [Use the App Here!](https://spotifyre-manager.netlify.app/)

### 🏠 [Homepage](https://github.com/natekchua/Spotifyre#readme)

## Install & Usage Locally

```sh
yarn install
yarn run dev
```

### Server

```sh
cd server
yarn install && yarn start
```

### Client

```sh
cd client
yarn install && yarn start
```

### Editor Setup

#### VS Code

To have `eslint` running in VS Code, create a `.vscode/settings.json` file with following content:

> Note: this assumes you have eslint extension installed.

```json
{
    "eslint.workingDirectories": [
        "client/",
        "server/"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}

```

## Authors

👤 **Afrah Ahmed**

- Github: [@afrahahmed1](https://github.com/afrahahmed1)

👤 **Daniel Artuso**

- Github: [@dartuso](https://github.com/dartuso)

👤 **Nathan Chua**

- Github: [@natekchua](https://github.com/natekchua)
- Website: https://natekchua.me

👤 **Naweed Anwari**

- Github: [@naweedanwari](https://github.com/naweedanwari)

👤 **Rakheem Dewji**

- Github: [@raksdewji](https://github.com/raksdewji)
- Website: https://raksdewji.github.io/

### Community Contributors

👤 **Artem Golovin**

- Github: [@awave1](https://github.com/awave1)
- Website: https://temagolovin.dev/

## Technology Stack

- [React](https://reactjs.org/) used for the front-end development to build our interface on the client side.
- [Material-UI](https://material-ui.com/) used for the majority of front-end components.
- [AntD](https://ant.design/) used for notification component.
- [React Context](https://reactjs.org/docs/context.html) used for application state management.
- [Node.js](https://nodejs.org/) To handle backend requests.
- [Express](https://expressjs.com/) Framework for Node Backend.
- [PostgreSQL](https://www.postgresql.org/) queries to interact with the database for storage and persistence.
- [Netlify](https://www.netlify.com/) used for simple CI/CD and hosting the client.
- [Heroku](https://heroku.com/) used to host the server and PostgreSQL database.
- [Spotify Web API Node](https://github.com/thelinmichael/spotify-web-api-node) universal wrapper/client for the Spotify Web API that runs on Node.JS.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/natekchua/Spotifyre/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 Spotifyre<br />
This project is ISC licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
