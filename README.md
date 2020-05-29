# Asset Administration Shell

- Access: localhost:8080
- API endpoint: localhost:8080/api/aas



## Installation guide

#### Install Docker Engine
- https://docs.docker.com/engine/

#### Install Docker Compose
- https://docs.docker.com/compose/



## Setup

#### Start mongo
- Start up mongodb database service on localhost

#### Setup enrivonment variables
- Create a folder 'config' at the project directory
- create a 'dev.env' file in the 'config' directory with the environment variables:

```jsx
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/aas
```



## Run

#### Start project (development mode) on the Terminal at the project directory
- npm run dev

#### Access system on browser.
- localhost:3000