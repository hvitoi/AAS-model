# Asset Administration Shell Management

- AAS implementation

## Installation on Linux

### Install the latest Docker Engine for your distribution

```bash
https://docs.docker.com/engine/
```

### Install Docker Compose

```bash
https://docs.docker.com/compose/
```

### Clone or download the repository

```bash
git clone https://github.com/hvitoi/AAS-model.git
```

### Run docker-compose

```bash
docker-compose up
```

### Access system on the browser

```bash
http://localhost:3000
```

## Installation on Windows

### Install the latest Docker Toolbox executable

```bash
https://github.com/docker/toolbox/releases
```

- Docker Toolbox must be installed for the majority of Windows versions.
- [Docker for Windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) version of docker is only available for Windows 10 Professional or Enterprise and should not be installed.
- Docker Toolbox comes with docker-compose built-in.

### Download the .zip from the repository and extract it to your local machine

```bash
https://github.com/hvitoi/AAS-model
```

### Open 'Docker Quickstart Terminal'

```bash
Windows Menu > Docker/Docker Quickstart Terminal
```

### Get docker-machine ip

```bash
docker-machine ip
```

- Save this ip! It will be used to access the website later on

### Change into the repo directory in the docker terminal

```bash
cd ~/Downloads/AAS-model-master
```

- This example is applied to the repository extracted to the 'Downloads' folder

### Run docker-compose up

```bash
docker-compose up
```

- First startup will take some minutes, because docker must download all the images necessary for the project

### Access the system on the browser

```bash
http://docker-machine-ip:3000
```

- Replace the docker-machine-ip with the ip provided by the command docker-machine-ip
