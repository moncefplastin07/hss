name: Deploy
on: [push]

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Needed for auth with Deno Deploy
      contents: read # Needed to clone the repository

    steps:
      - name: Clone repository
        uses: actions/checkout@v2

      # TODO: add a build step here

      - name: Upload to Deno Deploy
        uses: denoland/deployctl@v1
        with:
          project: "moncefplastin07-hss"
          entrypoint: "./app.ts" # TODO: update entrypoint
