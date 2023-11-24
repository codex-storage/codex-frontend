# Codex Frontend

A frontend for codex made with Flutter.

## Features

- Upload file
- View file Uploaded
- Download file
- Download with correct file name and extension
- Persist the state (save recent upload list)
- Upload multiple files at once
- Settings for the connection
- Dockerize frontend
- Show status of locally running codex node
- Upload to codex nodes
- Download from codex nodes
- Now supports marketplace endpoints!

## Planned Features

- Show status of connection to codex peers

## How To Run It

```console
git clone https://github.com/Kayvon-Martinez/codex-frontend
cd codex-frontend
```

Grab your codex api link and put it in the dockercompose file in the root of the directory in the value of codex_url

```console
docker compose up
```

Go to [localhost:3000](http://localhost:3000)

## Screenshots

![Data page: Upload](https://github.com/Kayvon-Martinez/codex-frontend/blob/master/screenshots/upload-page.png)
![Data page: Upload (with uploads)](https://github.com/Kayvon-Martinez/codex-frontend/blob/master/screenshots/upload-page-uploads.png)
![Data page: Download](https://github.com/Kayvon-Martinez/codex-frontend/blob/master/screenshots/download-page.png)
