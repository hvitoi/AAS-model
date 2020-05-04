# [Asset Administration Shell]

Available on: https://aas-model.herokuapp.com/index.js
API endpoint: https://aas-model.herokuapp.com/aas



## Installation guide

-> Install Noje.js
https://nodejs.org/en/

-> Install MongoDB
https://www.mongodb.com/

-> Install Git
https://git-scm.com/

-> Clone the repository
git clone https://github.com/hvitoi/AAS-model.git



## Setup

-> Create mongo database
Create a new MongoDB database named 'aas' in the localhost

-> Setup enrivonment variables
Create a folder 'config' at the project directory
create a 'dev.env' file in the 'config' directory with the environment variables:
    PORT=3000
    MONGODB_URL=mongodb://127.0.0.1:27017/aas



## Run

-> Start project (development mode) on the Terminal at the project directory
npm run dev

-> Access system on browser.
localhost:3000