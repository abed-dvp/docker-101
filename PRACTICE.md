# 🧪 Docker 101 — Step-by-Step Practical Lab

This lab is designed to be completed **in order** using this repository.

You will practice with the real project files:

- [Dockerfile](./Dockerfile)
- [server.js](./server.js)
- [docker-compose.yml](./docker-compose.yml)

> Rule: whenever this guide says **Terminal**, run the command in VS Code Terminal, PowerShell, or your normal terminal.

Start from the repository root:

```bash
cd docker-101
```

---

# Step 1 — Verify Docker works

**Goal:** confirm both the Docker CLI and Docker Engine are working.

### Terminal

```bash
docker --version
```

This checks whether the Docker CLI is installed.

Then:

```bash
docker run hello-world
```

Mental model:

```text
hello-world image
      ↓
Docker creates a container
      ↓
Container runs
      ↓
Process finishes
      ↓
Container stops
```

Now inspect all containers:

```bash
docker ps -a
```

You should see the exited `hello-world` container.

### What you learned

- an image can create a container
- a container can finish and stop
- stopped containers still exist until removed

### Check yourself

Can you explain why `hello-world` does not appear in plain `docker ps` after it finishes?

---

# Step 2 — Pull a ready-made image

**Goal:** practice Registry → Local Image.

### Terminal

```bash
docker pull nginx:1.27
```

Then inspect local images:

```bash
docker images
```

You should see something like:

```text
REPOSITORY   TAG
nginx        1.27
```

Mental model:

```text
Docker Registry
      ↓ docker pull
Local Docker image cache
```

### Check yourself

What is `nginx`?  
What is `1.27`?

Answer:

```text
nginx → image repository/name
1.27  → tag
```

---

# Step 3 — Create a container from the image

**Goal:** understand `docker run`, naming, port binding, and detached mode.

### Terminal

```bash
docker run --name practice-nginx -p 8080:80 -d nginx:1.27
```

Breakdown:

```text
--name practice-nginx
→ give the container a readable name

-p 8080:80
→ host/laptop port 8080 → container port 80

-d
→ run in detached/background mode

nginx:1.27
→ image used to create the container
```

Now:

```bash
docker ps
```

Look at:

- IMAGE
- STATUS
- PORTS
- NAMES

Then open:

```text
http://localhost:8080
```

You should see the nginx welcome page.

Mental model:

```text
Browser
  ↓
localhost:8080
  ↓
Docker port mapping
  ↓
practice-nginx:80
  ↓
nginx
```

---

# Step 4 — Use logs and exec for real

**Goal:** inspect a running container from outside and inside.

First inspect logs:

```bash
docker logs practice-nginx
```

After loading the nginx page in the browser, you should see request logs.

Now enter the running container:

```bash
docker exec -it practice-nginx sh
```

Important:

`docker exec` does **not** create a new container.

It runs another command inside the existing running container.

Inside the container:

```bash
pwd
```

Then:

```bash
ls
```

Then:

```bash
nginx -v
```

Exit:

```bash
exit
```

Mental model:

```text
docker exec
      ↓
existing running container
      ↓
run another process inside it
```

---

# Step 5 — Practice the container lifecycle

**Goal:** make the difference between run, stop, start, restart, and rm automatic.

Stop:

```bash
docker stop practice-nginx
```

Now:

```bash
docker ps
```

You should not see it because it is no longer running.

But:

```bash
docker ps -a
```

You should still see it because the container still exists.

Start the same container again:

```bash
docker start practice-nginx
```

Restart it:

```bash
docker restart practice-nginx
```

Finally:

```bash
docker stop practice-nginx
docker rm practice-nginx
```

Mental model:

```text
docker run
→ create NEW container + start

docker stop
→ stop existing container

docker start
→ start same existing container

docker restart
→ stop + start same container

docker rm
→ delete container object
```

### Check yourself

What is the difference between:

```text
docker run
docker start
```

If that distinction is not clear yet, repeat this step.

---

# Step 6 — Read your own Dockerfile

Now move from a ready-made nginx image to the project you own.

Open:

```text
Dockerfile
```

Current file:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js .

EXPOSE 3000

CMD ["npm", "start"]
```

Before building anything, translate it into plain English.

```text
What environment do I need?
→ Node.js 20 on Alpine

Where will the app live?
→ /app

What dependency information do I need?
→ package.json / package-lock.json if present

What gets installed?
→ npm dependencies

What application code do I need?
→ server.js

Which container port does the app use?
→ 3000

What runs when the container starts?
→ npm start
```

### Key distinction

```text
RUN npm install
→ happens while BUILDING the image

CMD ["npm", "start"]
→ happens when RUNNING a container
```

Do not continue until you can explain every Dockerfile line without looking at the notes.

---

# Step 7 — Build your own image

**Goal:** Dockerfile → Image.

From the project root:

```bash
docker build -t docker-101-app:1.0 .
```

Breakdown:

```text
docker build
→ build an image

-t docker-101-app:1.0
→ name/tag the image

.
→ use current directory as build context
```

Now:

```bash
docker images
```

You should see:

```text
docker-101-app    1.0
```

Mental model:

```text
Dockerfile + build context
          ↓ docker build
       Docker image
```

---

# Step 8 — Run your own image

**Goal:** Image → Container → Browser.

### Terminal

```bash
docker run --name docker-101-web -p 3000:3000 -d docker-101-app:1.0
```

Then:

```bash
docker ps
```

Open:

```text
http://localhost:3000
```

Expected response shape:

```json
{
  "message": "Docker 101 app is running",
  "port": 3000,
  "hostname": "..."
}
```

Now open:

```text
http://localhost:3000/health
```

Expected:

```json
{"status":"ok"}
```

Or test from the terminal:

```bash
curl http://localhost:3000/health
```

### What you just proved

```text
your source code
      ↓
your Dockerfile
      ↓
your image
      ↓
your container
      ↓
published port
      ↓
working application
```

---

# Step 9 — Inspect your own container from the inside

Enter it:

```bash
docker exec -it docker-101-web sh
```

Inside:

```bash
pwd
```

Expected:

```text
/app
```

Why?

Because the Dockerfile contains:

```dockerfile
WORKDIR /app
```

Now:

```bash
ls
```

You should see project files such as:

```text
package.json
server.js
node_modules
```

Check the runtime:

```bash
node --version
```

You should see Node.js 20.x.

Inspect the source actually baked into the image:

```bash
cat server.js
```

This is important.

You are not reading the host file now.

You are reading the copy that exists **inside the container filesystem**.

Exit:

```bash
exit
```

---

# Step 10 — Observe Docker build cache

This step is essential.

Open:

```text
server.js
```

Temporarily change:

```javascript
message: 'Docker 101 app is running',
```

to:

```javascript
message: 'I changed my Docker app!',
```

Now build a new image version:

```bash
docker build -t docker-101-app:1.1 .
```

Watch the build output carefully.

These instructions may be cached:

```dockerfile
COPY package*.json ./
RUN npm install --omit=dev
```

Why?

Because:

```text
package.json unchanged ✅
server.js changed ❌
```

Docker can reuse layers before the changed instruction.

That is the reason for this Dockerfile ordering:

```dockerfile
COPY package*.json ./
RUN npm install --omit=dev

COPY server.js .
```

instead of:

```dockerfile
COPY . .
RUN npm install
```

Mental model:

```text
stable files first
      ↓
expensive dependency installation
      ↓
frequently changing source later
      ↓
better cache reuse
```

---

# Step 11 — Run the new image version

The existing container still runs the old image.

A running container does not automatically change because you built a new image.

Stop and remove the old container:

```bash
docker stop docker-101-web
docker rm docker-101-web
```

Now run image version 1.1:

```bash
docker run --name docker-101-web -p 3000:3000 -d docker-101-app:1.1
```

Open:

```text
http://localhost:3000
```

You should now see:

```text
I changed my Docker app!
```

Mental model:

```text
source changed
      ↓
new image built
      ↓
old container still old
      ↓
create new container from new image
      ↓
new version is running
```

### Important lesson

```text
Image != Container
```

again.

The image is the artifact.  
The container is an instance created from a specific image version.

---

# Step 12 — Run the same project with Docker Compose

First remove the manual container:

```bash
docker stop docker-101-web
docker rm docker-101-web
```

Open:

```text
docker-compose.yml
```

The repository contains:

```yaml
services:
  app:
    build:
      context: .
    image: docker-101-app:1.0
    container_name: docker-101-web
    ports:
      - "3000:3000"
    environment:
      PORT: 3000
```

Instead of manually running build + run:

```bash
docker compose up --build -d
```

What it does:

```text
read docker-compose.yml
      ↓
build image
      ↓
create container
      ↓
apply port mapping
      ↓
inject environment variables
      ↓
start service
```

Check:

```bash
docker compose ps
```

Open:

```text
http://localhost:3000
```

Inspect logs:

```bash
docker compose logs app
```

Enter the service:

```bash
docker compose exec app sh
```

Inside:

```bash
printenv PORT
```

Expected:

```text
3000
```

Exit:

```bash
exit
```

Stop/remove Compose services:

```bash
docker compose down
```

### Key idea

Manual workflow:

```text
docker build
      ↓
docker run + options
```

Compose workflow:

```text
docker-compose.yml
      ↓
docker compose up
```

Compose stores your multi-option runtime configuration as code.

---

# Final Challenge — No README

Now close this guide.

From memory, do the entire workflow:

```text
1. Inspect Dockerfile
2. Build image
3. Run container
4. Publish port
5. Confirm container is running
6. Read logs
7. Enter the container
8. Stop it
9. Start it again
10. Remove it
```

Commands you should be comfortable with:

```bash
docker --version
docker pull
docker images
docker build
docker run
docker ps
docker ps -a
docker logs
docker exec
docker stop
docker start
docker restart
docker rm
docker rmi
docker inspect
docker compose up
docker compose ps
docker compose logs
docker compose exec
docker compose down
```

---

# Mastery Check

You are ready to move on when you can explain, without notes:

- image vs container
- `docker run` vs `docker start`
- `docker rm` vs `docker rmi`
- `RUN` vs `CMD`
- `EXPOSE` vs `-p`
- host port vs container port
- why Dockerfile instruction order affects cache
- why a new image does not update an already-running container
- what Compose replaces in the manual workflow

If one of these is fuzzy, repeat the relevant lab step.
