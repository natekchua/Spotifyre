<p align="center">
    <img alt="Playfyre" src="assets/playlit-dark.png" />
</p>

> Playlit is a Spotify application that acts as a Playlist Manager for curators. Our app focuses on making playlist collaboration and song sharing between listeners and curators super easy.

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
yarn install && yarn dev
```

#### Local Postgres Setup

> Make sure `docker` is setup on your machine first

In the project root, run:

```sh
docker-compose --env-file ./server/.env.local up -d
```

To connect to database:

```sh
psql spotifyre -h localhost -U postgres
# When prompted for password, enter "postgres"
```

If postgres tools are not installed on your machine:

```sh
docker container ls # find the container for spotifyre_db and copy its id
docker exec -it <container-id> psql -U postgres spotifyre
```

### Client

```sh
cd client
yarn install && yarn dev
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
