# EREBUS

## Development Setup

#### Software Dependencies

```sh
$ docker-compose up -d db mq
```

#### NPM Dependencies

```sh
$ cd packages/protocols
$ npm install
$ npm run build
```

```sh
$ cd packages/sdk
$ npm install
$ npm run build
```

#### Backend (GraphQL API)
```sh
$ cd services/client
$ npm install
$ npm start
```

#### Frontend (React App)
```sh
$ cd services/client
$ npm install
$ npm start
```

## Production Setup

Work In Progress
