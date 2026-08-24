# Transfer: Tennis Performance Development System

## GitHub
Private repository (created from this project). Invite: `Bogdancerebro@gmail.com`.

## Cursor — new account
1. Sign in to the new Cursor account.
2. Clone the GitHub repo (or File → Open the folder after clone).
3. Conversation history does **not** move with Cursor accounts. Use the export files on Desktop (`TPDS-conversation-export/`).
4. `npm install` then `npm run site` (local, port 3006).

## Vercel — keep live, reconnect later
Do **not** delete the current Vercel project. Production stays as-is until you reconnect Git.

On the **new** Cursor / GitHub account:
1. Vercel → Project → Settings → Git
2. Disconnect the old Git connection if it points to a missing repo
3. Connect this GitHub repository
4. Confirm Production Branch = `main`
5. Copy environment variables (`ADMIN_PASSWORD` if set)
6. Do not change the production domain until the new Git connection is verified

Local `vercel` CLI login on the new machine:
```bash
npx vercel login
npx vercel link
```

## Admin
Set `ADMIN_PASSWORD` in Vercel env (and local `.env.local`). Do not commit secrets.
