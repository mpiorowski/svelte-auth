# Svelte Auth

Summary of all the authentication flows versus different providers. All of them include:

- Svelte as the main framework
- OAuth2 flow
- Server-side authorization
- As clean as possible

Each of the sections is correlated with an article:

- Svelte + PocketBase - https://dev.to/mpiorowski/oauth2-is-so-complicated-or-90-lines-of-code-with-svelte-532
- Svelte + PocketBase + Nginx - https://dev.to/mpiorowski/bonus-svelte-pocketbase-nginx-amazingness-54l
- Svelte + Firebase - https://dev.to/mpiorowski/svelte-firebase-ssr-3p3j

# How to run

1. Go to the desire solution

2. Create .env file

```
cp .env.example .env
```

3. Fill out the .env file with the proper values

4. Run app

```
docker compose up --build
```
