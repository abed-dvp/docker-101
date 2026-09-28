# 🐳 Docker 101 — Complete Self-Study Guide

A hands-on Docker learning repository based on the learning sequence of TechWorld with Nana's **Docker Crash Course for Absolute Beginners**, with independently written explanations, examples, exercises, debugging guidance, and a runnable Node.js project.

This repository is designed so that you can learn Docker **without keeping the video open beside it**.

> 🚀 Interactive Codelab: https://abed-dvp.github.io/docker-101/  
> 🎥 Source video: https://www.youtube.com/watch?v=pg19Z8LL06w  
> 🧪 Runnable project: the files in this repository

---

## How to use this repository

For every concept or command, ask:

1. **What is it?**
2. **Why does it exist?**
3. **What exactly does the command do?**
4. **What do the important options mean?**
5. **What result should I expect?**
6. **When would I use it?**
7. **What is the common mistake?**

Recommended loop:

```text
Read → Predict → Run → Inspect → Debug → Explain without looking
```

---

# Course Map

| Chapter | Video |
|---|---:|
| Intro and Course Overview | 00:00 |
| What is Docker? | 02:54 |
| What problems Docker solves | 03:51 |
| Virtual Machine vs Docker | 11:38 |
| Install Docker | 17:19 |
| Images vs Containers | 21:36 |
| Docker Registries | 26:32 |
| Image Versions / Tags | 29:38 |
| Main Docker Commands | 32:02 |
| Port Binding | 39:06 |
| Start and Stop Containers | 42:50 |
| Private Registries | 46:54 |
| Registry vs Repository | 48:11 |
| Dockerfile / Dockerize Node.js App | 49:09 |
| Build Image | 58:30 |
| Docker Desktop UI | 1:02:39 |
| Docker in Software Development Lifecycle | 1:03:39 |
| Where to go next | 1:06:38 |

---

# 1. What is Docker? — `02:54`

Docker is a platform for packaging and running applications in **containers**.

A container bundles:

- application code
- runtime
- system libraries
- dependencies
- configuration needed at runtime

The goal is consistency:

```text
same image
   ↓
same runtime environment
   ↓
fewer "works on my machine" problems
```

Docker is not a programming language.

Docker is not a virtual machine.

Docker is a way to package and run isolated application processes.

---

# 2. What problem does Docker solve? — `03:51`

Imagine an application that needs:

```text
Node.js 18
MongoDB 6
Redis 7
specific system libraries
specific environment variables
```

Without containers, every developer must install compatible versions manually.

That creates problems:

- different versions on different laptops
- difficult onboarding
- dependency conflicts
- inconsistent development and deployment environments
- hard-to-reproduce bugs

Docker changes the model.

Instead of installing the software directly:

```text
Laptop
├── Node 18
├── MongoDB 6
└── Redis 7
```

we run isolated containers:

```text
Laptop
├── Node container
├── MongoDB container
└── Redis container
```

Each container carries its own runtime dependencies.

### Key idea

Docker makes the **environment reproducible**.

---

# 3. Virtual Machine vs Docker — `11:38`

Both VMs and containers provide isolation, but they operate at different levels.

## Virtual Machine

A VM contains:

```text
Application
Libraries
Guest Operating System
Hypervisor
Host Operating System
Hardware
```

Each VM includes a full guest OS.

That makes VMs relatively heavy.

## Container

A container contains:

```text
Application
Libraries / dependencies
Container runtime
Host OS kernel
Hardware
```

Containers share the host kernel.

This usually makes containers:

- smaller
- faster to start
- more resource-efficient

### Simplified comparison

| VM | Container |
|---|---|
| Includes guest OS | Shares host kernel |
| Heavier | Lighter |
| Slower startup | Fast startup |
| Strong machine-level isolation | Process-level isolation |
| Often GBs | Often MBs–hundreds of MBs |

### Important nuance

Containers are not "better VMs."

They solve different problems.

---

# 4. Installing Docker — `17:19`

For a local learning environment, Docker Desktop is usually the easiest option on Windows and macOS.

After installation, verify:

```bash
docker --version
```

Expected shape:

```text
Docker version XX.YY.ZZ, build ...
```

Then test the Docker Engine:

```bash
docker run hello-world
```

### What this command does

Docker:

1. looks for the `hello-world` image locally
2. pulls it if missing
3. creates a container
4. runs it
5. prints a confirmation message
6. exits

This single command demonstrates the full image → container flow.

---

# 5. Docker Image vs Container — `21:36`

This is the most important beginner concept.

## Image

A Docker image is an immutable packaged template.

It contains:

- filesystem
- application
- dependencies
- metadata
- startup instructions

Examples:

```text
nginx:1.27
node:20-alpine
postgres:15
redis:7
```

## Container

A container is a running instance created from an image.

```text
image      → template
container  → running instance
```

One image can create multiple containers:

```text
postgres:15
   ├── postgres-dev
   ├── postgres-test
   └── postgres-demo
```

### Useful analogy

```text
Image     ≈ class / blueprint
Container ≈ object / running instance
```

Not technically exact, but useful for learning.

---

# 6. Docker Registries — `26:32`

A registry stores and distributes Docker images.

The best-known public registry is:

```text
Docker Hub
```

The flow is:

```text
Developer
   ↓ push
Registry
   ↓ pull
Server / Laptop / CI
```

Examples of registries:

- Docker Hub
- GitHub Container Registry
- GitLab Container Registry
- Amazon ECR
- Google Artifact Registry
- Azure Container Registry

---

# 7. Registry vs Repository — `48:11`

These terms are easy to confuse.

## Registry

The whole image storage service.

Example:

```text
Docker Hub
```

## Repository

A collection of versions/tags of one image.

Example:

```text
nginx
```

Inside the repository:

```text
nginx:latest
nginx:1.27
nginx:1.26
nginx:alpine
```

So:

```text
Registry
└── Repository
    ├── tag
    ├── tag
    └── tag
```

---

# 8. Image Names, Versions, and Tags — `29:38`

Example:

```text
postgres:15
```

Parts:

```text
postgres   → repository/image name
15         → tag
```

Another example:

```text
node:20-alpine
```

Tags let you select a specific image variant/version.

If no tag is supplied:

```bash
docker pull nginx
```

Docker usually interprets it as:

```text
nginx:latest
```

### Important

`latest` does **not** mean "the newest version is guaranteed forever."

It is simply a tag named `latest`.

For reproducible systems, explicit version tags are usually safer.

---

# 9. `docker pull` — download an image

```bash
docker pull nginx:1.27
```

## What it does

Downloads the image from its registry to the local Docker image cache.

## When to use it

Use it when:

- you want the image available locally
- you want a specific version before running
- you are testing image availability

## Inspect local images

```bash
docker images
```

Typical columns:

```text
REPOSITORY
TAG
IMAGE ID
CREATED
SIZE
```

---

# 10. `docker run` — create and start a container — `32:02`

Example:

```bash
docker run nginx:1.27
```

This command:

1. checks whether the image exists locally
2. pulls it if necessary
3. creates a new container
4. starts the container process
5. attaches your terminal to its output by default

## Run detached

```bash
docker run -d nginx:1.27
```

`-d` means **detached mode**.

Your terminal returns while the container keeps running.

## Give the container a name

```bash
docker run --name web nginx:1.27
```

Why name containers?

Because this is easier:

```bash
docker logs web
docker stop web
```

than remembering a container ID.

---

# 11. Useful Docker Commands — explained

These commands form the core local Docker workflow.

---

## `docker ps` — show running containers

```bash
docker ps
```

### What it does

Lists containers that are currently running.

### When to use it

First question:

> Is my container actually running?

### Important columns

```text
CONTAINER ID
IMAGE
COMMAND
STATUS
PORTS
NAMES
```

Example:

```text
IMAGE        STATUS        PORTS                  NAMES
nginx:1.27   Up 2 minutes  0.0.0.0:8080->80/tcp  web
```

Interpretation:

- `Up` → running
- `8080->80` → host/container port mapping
- `web` → container name

---

## `docker ps -a` — show all containers

```bash
docker ps -a
```

Shows:

- running containers
- stopped containers
- crashed/exited containers

Use this when a container is missing from `docker ps`.

Example:

```text
Exited (1) 10 seconds ago
```

Then the next logical command is:

```bash
docker logs <container>
```

---

## `docker logs` — inspect application output

```bash
docker logs web
```

Shows stdout/stderr from the main process in the container.

Use it when:

- the container exits
- the app fails
- the service is not behaving as expected

Follow logs live:

```bash
docker logs -f web
```

`-f` = follow.

Show only the last 50 lines:

```bash
docker logs --tail 50 web
```

---

## `docker stop` — stop gracefully

```bash
docker stop web
```

Stops the container.

The container still exists.

Verify:

```bash
docker ps -a
```

---

## `docker start` — start an existing stopped container

```bash
docker start web
```

Difference:

```text
docker run   → create NEW container + start
docker start → start EXISTING container
```

This distinction is critical.

---

## `docker restart`

```bash
docker restart web
```

Conceptually:

```text
stop → start
```

Useful for a quick restart.

But repeated crashes should be diagnosed with logs, not hidden with endless restarts.

---

## `docker rm` — remove a container

```bash
docker rm web
```

Normally the container must be stopped first.

Force removal:

```bash
docker rm -f web
```

Use `-f` carefully.

---

## `docker rmi` — remove an image

```bash
docker rmi nginx:1.27
```

Removes the local image.

This is different from removing a container.

```text
docker rm  → container
docker rmi → image
```

---

## `docker exec` — run a command inside a running container

```bash
docker exec -it web sh
```

### What `-it` means

- `-i` → interactive input
- `-t` → allocate a terminal

Use it to:

- inspect files
- test commands
- check environment variables
- debug from inside the container

Important:

`docker exec` does not create a new container.

It starts another process inside an existing running container.

---

## `docker inspect`

```bash
docker inspect web
```

Returns detailed JSON describing:

- networking
- ports
- mounts
- environment
- state
- image
- container configuration

Use it when ordinary `ps` and `logs` are not enough.

---

# 12. Port Binding — `39:06`

A container has its own network namespace.

If an application listens on port 3000 inside the container, that does not automatically mean your laptop can open:

```text
localhost:3000
```

You must publish/map the port.

Example:

```bash
docker run -p 8080:80 nginx:1.27
```

Meaning:

```text
host:container
8080:80
```

Request flow:

```text
Browser
  ↓
localhost:8080
  ↓
Docker port mapping
  ↓
container:80
  ↓
nginx
```

## Common mistake

Confusing the order.

```text
-p HOST_PORT:CONTAINER_PORT
```

not the reverse.

---

# 13. Start vs Stop vs Run — `42:50`

This is a frequent beginner confusion.

## Create + start

```bash
docker run --name web nginx:1.27
```

Creates a **new** container.

## Stop

```bash
docker stop web
```

The container still exists.

## Start again

```bash
docker start web
```

Reuses the same existing container.

## Remove

```bash
docker rm web
```

Now the container object no longer exists.

A useful lifecycle:

```text
image
  ↓ docker run
container created + running
  ↓ docker stop
container stopped
  ↓ docker start
container running again
  ↓ docker rm
container deleted
```

---

# 14. Public vs Private Registries — `46:54`

Public images can generally be pulled by anyone.

Private registries require authentication and authorization.

A common company flow:

```text
Developer / CI
      ↓ build
company-app:1.4.0
      ↓ push
Private Registry
      ↓ pull
Production Server
```

Examples:

- Docker Hub private repository
- GitHub Container Registry
- GitLab Container Registry
- Amazon ECR

Why private?

Because proprietary application images should not usually be publicly downloadable.

---

# 15. Dockerfile — `49:09`

A Dockerfile is a recipe for building an image.

This repository contains a small Node.js application:

```text
app/
├── package.json
└── server.js
```

Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

# 16. Dockerfile instructions — line by line

## `FROM`

```dockerfile
FROM node:20-alpine
```

Selects the base image.

This gives us:

- Linux userspace
- Node.js runtime
- npm

Why Alpine?

It is a compact Linux distribution commonly used in small images.

---

## `WORKDIR`

```dockerfile
WORKDIR /app
```

Sets the default working directory for subsequent instructions and runtime commands.

Conceptually:

```text
cd /app
```

but persisted as image metadata.

---

## `COPY package*.json ./`

Copies dependency manifests first.

Why before copying all source code?

Docker build cache.

If application source changes but dependency files do not, Docker may reuse the dependency-install layer.

---

## `RUN`

```dockerfile
RUN npm install --omit=dev
```

Runs during **image build**.

It installs application dependencies into the image.

Important difference:

```text
RUN → build time
CMD → container runtime
```

---

## `COPY . .`

Copies the application source into the image.

---

## `EXPOSE 3000`

Documents that the application is expected to listen on container port 3000.

Important:

`EXPOSE` does **not** publish the port to your host.

You still need:

```bash
-p 3000:3000
```

when running.

---

## `CMD`

```dockerfile
CMD ["npm", "start"]
```

Defines the default command when a container starts from this image.

---

# 17. `.dockerignore`

Like `.gitignore`, but for Docker build context.

Example:

```text
node_modules
npm-debug.log
.git
.gitignore
README.md
codelab
```

Why?

When you run:

```bash
docker build .
```

Docker sends the build context to the builder.

You do not want unnecessary files included.

Benefits:

- faster build context transfer
- smaller risk of copying secrets
- more predictable image builds

---

# 18. Build your own image — `58:30`

From the project root:

```bash
docker build -t docker-101-app:1.0 .
```

Breakdown:

## `docker build`

Build an image from a Dockerfile.

## `-t docker-101-app:1.0`

`-t` assigns a name/tag.

```text
repository: docker-101-app
tag:        1.0
```

## `.`

The final dot means:

> use the current directory as the build context

Docker looks for:

```text
./Dockerfile
```

by default.

---

# 19. Run your custom image

```bash
docker run --name docker-101-web \
  -p 3000:3000 \
  -d docker-101-app:1.0
```

Then open:

```text
http://localhost:3000
```

Check:

```bash
docker ps
```

Logs:

```bash
docker logs docker-101-web
```

Test with curl:

```bash
curl http://localhost:3000
```

Stop:

```bash
docker stop docker-101-web
```

Start again:

```bash
docker start docker-101-web
```

Remove:

```bash
docker rm docker-101-web
```

---

# 20. Image layers and build cache

Dockerfile instructions create image layers.

Simplified:

```text
FROM node:20-alpine
        ↓
COPY package files
        ↓
RUN npm install
        ↓
COPY source
```

If only `server.js` changes, dependency files may remain unchanged.

Docker can often reuse the cached npm install layer.

That is why this ordering is useful:

```dockerfile
COPY package*.json ./
RUN npm install
COPY . .
```

rather than copying everything before installing dependencies.

---

# 21. Tag an image

Existing image:

```text
docker-101-app:1.0
```

Create another tag:

```bash
docker tag docker-101-app:1.0 yourname/docker-101-app:1.0
```

This does not duplicate the image contents.

It creates another reference/tag.

Then:

```bash
docker images
```

may show both names referencing the same image ID.

---

# 22. Push an image

After authenticating to a registry:

```bash
docker login
```

Push:

```bash
docker push yourname/docker-101-app:1.0
```

Flow:

```text
Local Image
   ↓ docker push
Registry
   ↓ docker pull
Another machine
```

Do not commit passwords or access tokens into your repository.

---

# 23. Docker Desktop UI — `1:02:39`

Docker Desktop gives a GUI for:

- containers
- images
- volumes
- logs
- settings

This is convenient.

But still learn the CLI.

Why?

Because:

- CI systems use commands
- remote Linux servers may not have a GUI
- documentation usually uses CLI
- CLI knowledge transfers across environments

Use the UI to inspect.

Use the CLI to understand.

---

# 24. Docker in the software lifecycle — `1:03:39`

A typical flow:

```text
Developer writes code
        ↓
Docker image built
        ↓
Image tested
        ↓
Image pushed to registry
        ↓
Deployment pulls image
        ↓
Container runs in target environment
```

The important thing is that the artifact remains consistent.

Instead of:

```text
copy source code → rebuild environment manually on every server
```

you move:

```text
versioned container image
```

through environments.

This fits naturally into CI/CD.

---

# 25. Core debugging workflow

When a container is not working:

## Step 1 — Does it exist?

```bash
docker ps -a
```

## Step 2 — Is it running?

Check:

```text
STATUS
```

## Step 3 — Why did it fail?

```bash
docker logs <container>
```

## Step 4 — Is the port mapping correct?

```bash
docker ps
```

Inspect:

```text
PORTS
```

## Step 5 — Inspect configuration

```bash
docker inspect <container>
```

## Step 6 — Enter the container

```bash
docker exec -it <container> sh
```

This is much better than randomly rebuilding everything.

---

# 26. Useful cleanup commands — Beyond the video

## Remove stopped containers

```bash
docker container prune
```

Docker asks for confirmation.

This removes all stopped containers.

## Remove unused images

```bash
docker image prune
```

## Inspect disk usage

```bash
docker system df
```

## Broad cleanup

```bash
docker system prune
```

Be careful.

Cleanup commands can remove cached or unused objects you may want later.

---

# 27. Common beginner mistakes

## Mistake 1 — confusing image and container

```text
image ≠ container
```

## Mistake 2 — confusing `run` and `start`

```text
run   → new container
start → existing container
```

## Mistake 3 — reversing port order

Correct:

```text
HOST:CONTAINER
8080:80
```

## Mistake 4 — thinking `EXPOSE` publishes a port

It does not.

You still need:

```bash
docker run -p ...
```

## Mistake 5 — deleting the image when the container is the problem

Always identify the object:

```text
container → docker rm
image     → docker rmi
```

## Mistake 6 — using `latest` for everything

Explicit tags make environments more reproducible.

## Mistake 7 — rebuilding before reading logs

Better sequence:

```text
ps -a → logs → inspect → exec
```

---

# 28. Run the project

Clone:

```bash
git clone https://github.com/abed-dvp/docker-101.git
cd docker-101
```

Build:

```bash
docker build -t docker-101-app:1.0 .
```

Run:

```bash
docker run --name docker-101-web \
  -p 3000:3000 \
  -d docker-101-app:1.0
```

Open:

```text
http://localhost:3000
```

Check health endpoint:

```bash
curl http://localhost:3000/health
```

Expected:

```json
{"status":"ok"}
```

Logs:

```bash
docker logs docker-101-web
```

Cleanup:

```bash
docker stop docker-101-web
docker rm docker-101-web
```

---

# Repository structure

```text
docker-101/
├── README.md
├── Dockerfile
├── .dockerignore
├── package.json
├── server.js
├── docker-compose.yml
├── index.html
│
├── codelab/
│   ├── index.html
│   ├── styles.css
│   ├── steps.js
│   ├── app.js
│   └── README.md
│
└── .github/
    └── workflows/
        └── publish-gh-pages.yml
```

---

# Interview-ready mental model

If someone asks:

> What is Docker?

A strong answer is:

> Docker packages an application and its runtime dependencies into an immutable image. A container is a running instance of that image. This gives teams a reproducible artifact that can be tested and moved consistently across development, CI, and deployment environments. Containers share the host kernel, so they are usually lighter and faster to start than full virtual machines.

If they ask:

> What happens when you run `docker run nginx`?

Answer in sequence:

```text
1. Resolve image/tag
2. Pull image if missing
3. Create container
4. Configure container runtime
5. Start image CMD/ENTRYPOINT process
6. Attach or detach depending on options
```

---

# Next topics after this course

Once this repository is comfortable, continue with:

1. Docker Compose
2. container networking
3. volumes and persistent data
4. environment variables and secrets
5. multi-stage Dockerfiles
6. health checks
7. CI/CD image pipelines
8. Kubernetes

---

## Credits

The learning sequence follows TechWorld with Nana's **Docker Crash Course for Absolute Beginners**.

The explanations, examples, sample Node.js application, exercises, debugging guidance, and interactive Codelab in this repository are independently written for self-study.
