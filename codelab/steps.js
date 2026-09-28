window.CODELAB_STEPS = [
  {
    "title": "What Docker Is",
    "time": "02:54",
    "learn": "Docker packages applications and their runtime dependencies into portable images, then runs those images as isolated containers.",
    "bullets": [
      "Docker is a platform/runtime, not a programming language.",
      "An image is the packaged artifact; a container is a running instance.",
      "The goal is reproducible application environments."
    ],
    "example": "Application code + runtime + libraries → Docker image → container",
    "output": "A consistent runtime artifact that can move between machines.",
    "challenge": "In one sentence, explain the difference between an image and a container.",
    "starter": "An image is ...\nA container is ...",
    "solution": "An image is an immutable packaged template; a container is a running instance created from that image.",
    "takeaway": "Image = artifact. Container = running instance.",
    "type": "text",
    "check": [
      "image",
      "container",
      "running"
    ]
  },
  {
    "title": "The Problem Docker Solves",
    "time": "03:51",
    "learn": "Docker reduces environment drift and dependency conflicts by packaging runtime requirements together.",
    "bullets": [
      "Different laptops may have different runtime versions.",
      "Manual setup creates onboarding and reproducibility problems.",
      "Images make environments explicit and repeatable."
    ],
    "example": "Without Docker: install Node, DB, libraries manually\nWith Docker: run versioned images",
    "output": "Less environment drift between developers and deployments.",
    "challenge": "Name two problems Docker helps reduce.",
    "starter": "1.\n2.",
    "solution": "1. Environment/version differences between machines\n2. Dependency conflicts and manual setup",
    "takeaway": "Docker's value is reproducibility, not just isolation.",
    "type": "text",
    "check": [
      "environment",
      "depend"
    ]
  },
  {
    "title": "VM vs Container",
    "time": "11:38",
    "learn": "Virtual machines include a guest operating system, while containers share the host kernel and isolate application processes.",
    "bullets": [
      "VMs virtualize machines.",
      "Containers virtualize process environments.",
      "Containers are usually smaller and faster to start."
    ],
    "example": "VM: App + libs + Guest OS\nContainer: App + libs + shared host kernel",
    "output": "Different isolation models with different trade-offs.",
    "challenge": "Why are containers usually lighter than VMs?",
    "starter": "Because ...",
    "solution": "Because containers share the host operating-system kernel instead of running a full guest OS for each workload.",
    "takeaway": "Containers are not mini-VMs; they use a different isolation model.",
    "type": "text",
    "check": [
      "share",
      "kernel"
    ]
  },
  {
    "title": "Verify Docker Installation",
    "time": "17:19",
    "learn": "After installing Docker, verify both the CLI and the engine.",
    "bullets": [
      "`docker --version` checks the CLI.",
      "`docker run hello-world` verifies image pull, container creation, execution, and output.",
      "A successful hello-world run proves the basic engine workflow works."
    ],
    "example": "docker --version\ndocker run hello-world",
    "output": "Docker version information and a successful hello-world message.",
    "challenge": "Which command verifies the full pull → create → run flow?",
    "starter": "docker ",
    "solution": "docker run hello-world",
    "takeaway": "Version check proves CLI availability; hello-world proves the engine flow.",
    "type": "text",
    "check": [
      "docker run hello-world"
    ]
  },
  {
    "title": "Image vs Container",
    "time": "21:36",
    "learn": "Images are immutable packaged templates; containers are instantiated runtimes based on those images.",
    "bullets": [
      "One image can create many containers.",
      "Containers have runtime state.",
      "Deleting a container does not necessarily delete the image."
    ],
    "example": "postgres:15 → image\npostgres-dev → container\npostgres-test → container",
    "output": "Multiple containers can share the same underlying image.",
    "challenge": "If you delete a container, does the image automatically disappear?",
    "starter": "",
    "solution": "No. Images and containers are separate Docker objects.",
    "takeaway": "Do not confuse lifecycle of images with lifecycle of containers.",
    "type": "text",
    "check": [
      "no",
      "separate"
    ]
  },
  {
    "title": "Docker Registries",
    "time": "26:32",
    "learn": "A registry is a service that stores and distributes container images.",
    "bullets": [
      "Docker Hub is a public registry.",
      "Cloud providers and Git platforms offer registries too.",
      "Images move between machines through push and pull."
    ],
    "example": "Developer → docker push → Registry → docker pull → Server",
    "output": "A distribution mechanism for versioned images.",
    "challenge": "What is the main purpose of a Docker registry?",
    "starter": "",
    "solution": "To store and distribute container images.",
    "takeaway": "Registry = image distribution service.",
    "type": "text",
    "check": [
      "store",
      "image"
    ]
  },
  {
    "title": "Tags and Versions",
    "time": "29:38",
    "learn": "Tags identify image variants or versions such as `postgres:15` or `node:20-alpine`.",
    "bullets": [
      "The part after `:` is the tag.",
      "Omitting a tag commonly resolves to `latest`.",
      "Explicit tags improve reproducibility."
    ],
    "example": "nginx:1.27\nnode:20-alpine\npostgres:15",
    "output": "Specific image variants selected by tag.",
    "challenge": "Which is more reproducible: `nginx:latest` or `nginx:1.27`? Why?",
    "starter": "",
    "solution": "`nginx:1.27`, because the explicit tag pins the intended image version instead of depending on a moving `latest` tag.",
    "takeaway": "Prefer explicit tags when repeatability matters.",
    "type": "text",
    "check": [
      "1.27",
      "explicit"
    ]
  },
  {
    "title": "docker pull",
    "time": "32:02",
    "learn": "`docker pull` downloads an image from a registry into your local Docker image cache.",
    "bullets": [
      "Use it to pre-download a known image/version.",
      "If an image is missing, `docker run` may pull automatically.",
      "Use `docker images` to inspect local images."
    ],
    "example": "docker pull nginx:1.27\ndocker images",
    "output": "The nginx image becomes available locally.",
    "challenge": "Download PostgreSQL 15 explicitly.",
    "starter": "docker pull ",
    "solution": "docker pull postgres:15",
    "takeaway": "Pull manages local image availability.",
    "type": "text",
    "check": [
      "docker pull postgres:15"
    ]
  },
  {
    "title": "docker run",
    "time": "32:02",
    "learn": "`docker run` creates a new container from an image and starts it.",
    "bullets": [
      "It creates a new container every time unless the command fails before creation.",
      "`--name` gives a readable name.",
      "`-d` runs detached.",
      "`-e` injects environment variables.",
      "`-p` publishes ports."
    ],
    "example": "docker run --name web -d nginx:1.27",
    "output": "A new detached container named `web` running nginx.",
    "challenge": "Run nginx:1.27 detached with the name `my-web`.",
    "starter": "docker run ",
    "solution": "docker run --name my-web -d nginx:1.27",
    "takeaway": "`run` = create + start.",
    "type": "text",
    "check": [
      "docker run",
      "--name my-web",
      "-d",
      "nginx:1.27"
    ]
  },
  {
    "title": "docker ps",
    "time": "33:40",
    "learn": "`docker ps` lists containers that are currently running.",
    "bullets": [
      "Use it to answer: 'Is my container up?'",
      "Check STATUS, PORTS, IMAGE, and NAMES.",
      "Stopped containers are not shown."
    ],
    "example": "docker ps",
    "output": "A table of running containers.",
    "challenge": "Which command should you use first to see running containers?",
    "starter": "",
    "solution": "docker ps",
    "takeaway": "Use `docker ps` for current running state.",
    "type": "text",
    "check": [
      "docker ps"
    ]
  },
  {
    "title": "docker ps -a",
    "time": "34:20",
    "learn": "`docker ps -a` lists all containers, including stopped and crashed ones.",
    "bullets": [
      "Use it when a container is missing from `docker ps`.",
      "An `Exited (...)` status means the main process stopped.",
      "After seeing Exited, inspect logs."
    ],
    "example": "docker ps -a",
    "output": "Running + stopped + exited containers.",
    "challenge": "A container disappeared from `docker ps`. What command next?",
    "starter": "",
    "solution": "docker ps -a",
    "takeaway": "`-a` broadens container status visibility.",
    "type": "text",
    "check": [
      "docker ps -a"
    ]
  },
  {
    "title": "docker logs",
    "time": "35:00",
    "learn": "`docker logs` shows stdout and stderr from the container's main process.",
    "bullets": [
      "Use it after a crash or unexpected behavior.",
      "`-f` follows new logs live.",
      "`--tail 50` shows only recent lines."
    ],
    "example": "docker logs web\ndocker logs -f web\ndocker logs --tail 50 web",
    "output": "Application/process output from inside the container.",
    "challenge": "Follow new logs from container `web` live.",
    "starter": "docker logs ",
    "solution": "docker logs -f web",
    "takeaway": "Logs are usually the next step after seeing a failed/exited container.",
    "type": "text",
    "check": [
      "docker logs -f web"
    ]
  },
  {
    "title": "Port Binding",
    "time": "39:06",
    "learn": "Port publishing maps a host port to a port inside the container.",
    "bullets": [
      "Syntax is `-p HOST:CONTAINER`.",
      "The app must actually listen on the container port.",
      "`EXPOSE` does not publish a host port."
    ],
    "example": "docker run -p 8080:80 nginx:1.27",
    "output": "Browser requests to localhost:8080 reach nginx on container port 80.",
    "challenge": "Map host port 3000 to container port 3000.",
    "starter": "docker run ",
    "solution": "docker run -p 3000:3000 docker-101-app:1.0",
    "takeaway": "Remember the order: host first, container second.",
    "type": "text",
    "check": [
      "-p 3000:3000"
    ]
  },
  {
    "title": "docker stop and start",
    "time": "42:50",
    "learn": "`docker stop` stops an existing container; `docker start` starts that same container again.",
    "bullets": [
      "Stop does not delete the container.",
      "Start does not create a new container.",
      "`docker run` differs because it creates a new one."
    ],
    "example": "docker stop web\ndocker start web",
    "output": "The same container transitions stopped → running.",
    "challenge": "Explain `docker run` vs `docker start`.",
    "starter": "docker run = ...\ndocker start = ...",
    "solution": "docker run = create a new container and start it\ndocker start = start an already-created stopped container",
    "takeaway": "run creates; start reuses.",
    "type": "text",
    "check": [
      "new",
      "existing"
    ]
  },
  {
    "title": "docker rm and rmi",
    "time": "44:30",
    "learn": "`docker rm` removes containers; `docker rmi` removes images.",
    "bullets": [
      "A stopped container can be removed with `docker rm`.",
      "Images are separate objects from containers.",
      "`docker rm -f` force-removes a running container; use carefully."
    ],
    "example": "docker rm web\ndocker rmi nginx:1.27",
    "output": "First removes a container; second removes an image.",
    "challenge": "Which command removes the image `nginx:1.27`?",
    "starter": "",
    "solution": "docker rmi nginx:1.27",
    "takeaway": "rm → container, rmi → image.",
    "type": "text",
    "check": [
      "docker rmi nginx:1.27"
    ]
  },
  {
    "title": "docker exec",
    "time": "45:10",
    "learn": "`docker exec` runs an additional command inside an already-running container.",
    "bullets": [
      "It does not create another container.",
      "`-i` keeps stdin open.",
      "`-t` allocates a terminal.",
      "Useful for shells and debugging."
    ],
    "example": "docker exec -it web sh",
    "output": "An interactive shell process inside the running `web` container.",
    "challenge": "Open an interactive shell inside `docker-101-web`.",
    "starter": "docker exec ",
    "solution": "docker exec -it docker-101-web sh",
    "takeaway": "exec is your doorway into a running container.",
    "type": "text",
    "check": [
      "docker exec",
      "-it",
      "docker-101-web",
      "sh"
    ]
  },
  {
    "title": "Private Registries",
    "time": "46:54",
    "learn": "Private registries restrict image access through authentication and authorization.",
    "bullets": [
      "Useful for proprietary application images.",
      "Common options include GHCR, GitLab Registry, ECR, ACR, Artifact Registry.",
      "CI/CD systems commonly authenticate and push images."
    ],
    "example": "CI → build image → private registry → deployment pulls image",
    "output": "Controlled image distribution for internal software.",
    "challenge": "Why would a company use a private registry?",
    "starter": "",
    "solution": "To restrict access to proprietary or internal container images.",
    "takeaway": "Private registries add access control to image distribution.",
    "type": "text",
    "check": [
      "access",
      "image"
    ]
  },
  {
    "title": "Registry vs Repository",
    "time": "48:11",
    "learn": "A registry is the whole image-hosting service; a repository is a collection of versions/tags for one image name.",
    "bullets": [
      "Docker Hub = registry.",
      "`nginx` = repository.",
      "`nginx:1.27` = repository + tag."
    ],
    "example": "Registry\n└── nginx repository\n    ├── 1.27\n    ├── 1.26\n    └── alpine",
    "output": "A hierarchy from service → repository → tags.",
    "challenge": "In `postgres:15`, what is `postgres` and what is `15`?",
    "starter": "postgres = ...\n15 = ...",
    "solution": "postgres = image repository/name\n15 = tag",
    "takeaway": "Registry, repository, and tag are different levels.",
    "type": "text",
    "check": [
      "repository",
      "tag"
    ]
  },
  {
    "title": "Dockerfile Overview",
    "time": "49:09",
    "learn": "A Dockerfile is a declarative recipe that Docker uses to build an image.",
    "bullets": [
      "Instructions are processed top to bottom.",
      "Build-time instructions create image layers/metadata.",
      "Runtime behavior is defined by CMD/ENTRYPOINT."
    ],
    "example": "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install --omit=dev\nCOPY server.js .\nEXPOSE 3000\nCMD [\"npm\",\"start\"]",
    "output": "An image with Node.js, dependencies, source, and a default startup command.",
    "challenge": "What is the purpose of a Dockerfile?",
    "starter": "",
    "solution": "It defines how to build a reproducible Docker image.",
    "takeaway": "Dockerfile = image build recipe.",
    "type": "text",
    "check": [
      "build",
      "image"
    ]
  },
  {
    "title": "FROM",
    "time": "50:30",
    "learn": "`FROM` selects the base image for your build.",
    "bullets": [
      "Most Dockerfiles begin with FROM.",
      "The base image supplies a starting filesystem/runtime.",
      "Pinning a version improves reproducibility."
    ],
    "example": "FROM node:20-alpine",
    "output": "The build starts from a Node.js 20 Alpine-based image.",
    "challenge": "Write a base image line using Python 3.11 slim.",
    "starter": "FROM ",
    "solution": "FROM python:3.11-slim",
    "takeaway": "FROM defines your starting runtime.",
    "type": "text",
    "check": [
      "from python:3.11-slim"
    ]
  },
  {
    "title": "WORKDIR",
    "time": "51:30",
    "learn": "`WORKDIR` sets the working directory for subsequent Dockerfile instructions and the runtime process.",
    "bullets": [
      "It is clearer than repeatedly using `cd`.",
      "Docker creates the directory if needed.",
      "COPY/RUN/CMD resolve relative paths from it."
    ],
    "example": "WORKDIR /app",
    "output": "Subsequent relative operations happen under `/app`.",
    "challenge": "Set the working directory to `/usr/src/app`.",
    "starter": "",
    "solution": "WORKDIR /usr/src/app",
    "takeaway": "WORKDIR establishes a predictable filesystem context.",
    "type": "text",
    "check": [
      "workdir /usr/src/app"
    ]
  },
  {
    "title": "COPY and Build Cache",
    "time": "52:30",
    "learn": "`COPY` transfers files from the build context into the image; file ordering affects cache reuse.",
    "bullets": [
      "Copy dependency manifests first.",
      "Install dependencies next.",
      "Copy frequently changing source afterward.",
      "This can preserve cached dependency layers."
    ],
    "example": "COPY package*.json ./\nRUN npm install --omit=dev\nCOPY server.js .",
    "output": "Dependency installation can remain cached when only source code changes.",
    "challenge": "Why copy package.json before application source?",
    "starter": "Because ...",
    "solution": "Because Docker can reuse the dependency-install cache layer when source files change but dependency manifests do not.",
    "takeaway": "Dockerfile ordering can make builds much faster.",
    "type": "text",
    "check": [
      "cache",
      "depend"
    ]
  },
  {
    "title": "RUN vs CMD",
    "time": "54:00",
    "learn": "`RUN` executes during image build; `CMD` defines the default command when a container starts.",
    "bullets": [
      "RUN changes the image during build.",
      "CMD is runtime metadata.",
      "Confusing them leads to broken images or containers."
    ],
    "example": "RUN npm install --omit=dev\nCMD [\"npm\",\"start\"]",
    "output": "Dependencies are baked into the image; the app starts when the container starts.",
    "challenge": "Which instruction runs at build time: RUN or CMD?",
    "starter": "",
    "solution": "RUN",
    "takeaway": "RUN = build time. CMD = container runtime.",
    "type": "text",
    "check": [
      "run"
    ]
  },
  {
    "title": "EXPOSE",
    "time": "56:00",
    "learn": "`EXPOSE` documents the port the application expects to listen on inside the container.",
    "bullets": [
      "It does not publish the port to the host.",
      "You still need `docker run -p ...`.",
      "It is useful metadata for humans and tooling."
    ],
    "example": "EXPOSE 3000",
    "output": "Image metadata indicates container port 3000 is expected.",
    "challenge": "Does `EXPOSE 3000` make localhost:3000 reachable by itself?",
    "starter": "",
    "solution": "No. You still need to publish/map the port, for example with `-p 3000:3000`.",
    "takeaway": "EXPOSE documents; `-p` publishes.",
    "type": "text",
    "check": [
      "no",
      "-p"
    ]
  },
  {
    "title": ".dockerignore",
    "time": "57:00",
    "learn": "`.dockerignore` excludes unnecessary files from the Docker build context.",
    "bullets": [
      "Keeps node_modules, Git metadata, and local artifacts out.",
      "Can speed up build context transfer.",
      "Reduces accidental copying of sensitive files."
    ],
    "example": "node_modules\n.git\nREADME.md\ncodelab",
    "output": "A smaller, cleaner build context.",
    "challenge": "Name one directory that should usually be ignored in a Node Docker build.",
    "starter": "",
    "solution": "node_modules",
    "takeaway": "Keep build context intentional.",
    "type": "text",
    "check": [
      "node_modules"
    ]
  },
  {
    "title": "docker build",
    "time": "58:30",
    "learn": "`docker build` executes a Dockerfile and produces an image.",
    "bullets": [
      "`-t` assigns image name/tag.",
      "The final `.` is the build context.",
      "Dockerfile is looked up in the context by default."
    ],
    "example": "docker build -t docker-101-app:1.0 .",
    "output": "A local image named `docker-101-app` tagged `1.0`.",
    "challenge": "Build the current project as `my-app:1.0`.",
    "starter": "docker build ",
    "solution": "docker build -t my-app:1.0 .",
    "takeaway": "Build converts Dockerfile + context into an image.",
    "type": "text",
    "check": [
      "docker build",
      "-t my-app:1.0",
      "."
    ]
  },
  {
    "title": "Run Your Custom Image",
    "time": "59:40",
    "learn": "After building, run the image with an explicit name and port mapping.",
    "bullets": [
      "Use `--name` for readable lifecycle commands.",
      "Publish the app port.",
      "Detached mode keeps the terminal free."
    ],
    "example": "docker run --name docker-101-web -p 3000:3000 -d docker-101-app:1.0",
    "output": "The sample app becomes reachable at `http://localhost:3000`.",
    "challenge": "Write the full run command for this repository.",
    "starter": "docker run ",
    "solution": "docker run --name docker-101-web -p 3000:3000 -d docker-101-app:1.0",
    "takeaway": "Build creates the artifact; run instantiates it.",
    "type": "text",
    "check": [
      "--name docker-101-web",
      "-p 3000:3000",
      "-d",
      "docker-101-app:1.0"
    ]
  },
  {
    "title": "Tag and Push",
    "time": "1:00:30",
    "learn": "Tags can give an existing image another registry-qualified reference; `docker push` uploads image layers to a registry.",
    "bullets": [
      "`docker tag` adds another reference.",
      "`docker login` authenticates.",
      "`docker push` uploads the tagged image."
    ],
    "example": "docker tag docker-101-app:1.0 yourname/docker-101-app:1.0\ndocker login\ndocker push yourname/docker-101-app:1.0",
    "output": "The image becomes available from the remote registry.",
    "challenge": "What must the image tag usually include before pushing to your Docker Hub namespace?",
    "starter": "",
    "solution": "Your registry/repository namespace, for example `yourname/docker-101-app:1.0`.",
    "takeaway": "Push works on a correctly named/tagged image reference.",
    "type": "text",
    "check": [
      "yourname",
      "docker-101-app"
    ]
  },
  {
    "title": "Docker Desktop UI",
    "time": "1:02:39",
    "learn": "Docker Desktop provides a GUI for inspecting containers, images, volumes, logs, and settings.",
    "bullets": [
      "Useful for visual inspection.",
      "CLI remains essential for CI, servers, and transferable skills.",
      "Use the UI as a complement, not a replacement."
    ],
    "example": "Docker Desktop → Containers / Images / Volumes / Logs",
    "output": "A visual view of Docker objects.",
    "challenge": "Why should you still learn the CLI if Docker Desktop exists?",
    "starter": "",
    "solution": "Because CI systems and remote/server environments often use the CLI, and CLI knowledge transfers across platforms.",
    "takeaway": "GUI helps inspection; CLI builds durable operational skill.",
    "type": "text",
    "check": [
      "cli",
      "server"
    ]
  },
  {
    "title": "Docker in the Development Lifecycle",
    "time": "1:03:39",
    "learn": "Docker images act as versioned deployable artifacts that can move through development, CI, and production.",
    "bullets": [
      "Developers build/test images.",
      "CI can rebuild and scan images.",
      "Registries distribute artifacts.",
      "Deployment systems pull and run the same image."
    ],
    "example": "Code → Build image → Test → Push registry → Deploy container",
    "output": "A consistent artifact moves through the software lifecycle.",
    "challenge": "What artifact should ideally move between environments: raw source setup instructions or a versioned image?",
    "starter": "",
    "solution": "A versioned container image.",
    "takeaway": "Docker standardizes the deployable artifact.",
    "type": "text",
    "check": [
      "versioned",
      "image"
    ]
  },
  {
    "title": "Debugging Workflow",
    "time": "1:06:38",
    "learn": "Good Docker debugging narrows the failure layer instead of randomly rebuilding everything.",
    "bullets": [
      "1. `docker ps -a` — does the container exist and what state is it in?",
      "2. `docker logs` — what did the process report?",
      "3. `docker inspect` — is configuration/networking/mounting correct?",
      "4. `docker exec` — inspect from inside a running container."
    ],
    "example": "docker ps -a\ndocker logs docker-101-web\ndocker inspect docker-101-web\ndocker exec -it docker-101-web sh",
    "output": "A disciplined evidence-based troubleshooting sequence.",
    "challenge": "A container shows `Exited (1)`. What should you do next?",
    "starter": "",
    "solution": "Read its logs with `docker logs <container-name>` before changing anything.",
    "takeaway": "State → logs → configuration → inside-container inspection.",
    "type": "text",
    "check": [
      "docker logs"
    ]
  },
  {
    "title": "Final Docker Mental Model",
    "time": "1:06:38",
    "learn": "Docker becomes simple when you separate artifacts, runtime instances, distribution, networking, and build instructions.",
    "bullets": [
      "Dockerfile → builds image.",
      "Image → immutable artifact.",
      "Container → running instance.",
      "Registry → stores/distributes images.",
      "Port mapping → exposes container services to the host."
    ],
    "example": "Dockerfile → docker build → Image → docker run → Container\n                         ↓\n                      Registry",
    "output": "The core Docker lifecycle in one diagram.",
    "challenge": "Write the lifecycle from Dockerfile to a running container.",
    "starter": "Dockerfile → ",
    "solution": "Dockerfile → docker build → Image → docker run → Container",
    "takeaway": "If you can reconstruct this lifecycle, you understand Docker's core model.",
    "type": "text",
    "check": [
      "dockerfile",
      "docker build",
      "image",
      "docker run",
      "container"
    ]
  }
];