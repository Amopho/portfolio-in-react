# portfolio-in-react :woman_office_worker: developer portfolio

:arrows_counterclockwise: Update 2022

Let's get to know each other! A portfolio website of junior web developer made with :sparkling_heart: in ReactJS. With a blog feature. See you there!

This project was deployed with :heart: on GitHub.

![Preview](./public/img/portfolio-glimpse.png)

## Console work

### clone repository

git clone <https://github.com/Amopho/portfolio-in-react>

### npm install

npm install

### npm start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## GitHub Workflow

1. Create a repo on GH

   - Create a directory which has exactly the same name.
   - Go to that directory.

   ```bash
   cd test
   echo "# react-project" >> README.md
   git init
   git add README.md
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/profilename/test.git
   git push -u origin main
   ```

2. Create a parallel branch and check the status of branches. Is it up to date? What changes are staged for that branch? Display all branches, and show which is your current.

   ```bash
   git checkout
   git status
   git branch
   ```

3. Create another branch and set upstream - another branch with remote tracking, associated with local branch

    ```bash
    git checkout newbranch
    git push --set-upstream origin newbranch
    git add .
    git commit -m "your branch"
    ```

4. after completing some changes, push them to the current branch and switch to the main.

   ```bash
   git push
   git checkout main
   ```

5. Update the main

   ```bash
   git pull
   git add .
   git commit -m "update to the main"
   ```

6. Switch to the newbranch and merge it with updated main

   ```bash
   git checkout newbranch
   git merge main newbranch
   git add .
   git commit -m "update from the main"
   ```

By this way your branch will get all the changes that were made to the main.

In order to merge changes from the other branch to the main, make sure that those changes are what you would like to introduce and there will be least conflicts possible.

```bash
git checkout main
git merge newbranch main
git add .
git commit -m "update from the newbranch"
```

## Getting Started with Create React App

## ReactJs

A JavaScript library to build web apps
what makes React so special

- Components
- State
- SPA

## files in React

### App.js

All the code you write in your App component which acts as the root component gets rendered to this HTML file. This means that there is only one HTML file where your code will be rendered to -Single Page App.

React Router – like the name implies – helps you route to/navigate to and render your new component in the index.html file. So as a single page application, when you navigate to a new component using React Router, the index.html will be rewritten with the component's logic.

### manifest.json

The web app manifest provides information about an application (such as name, author, icon, and description) in a JSON text file

### reportwebvitals

Tool for measuring the real life performance of your app(very new to React)
more on that [web-vitals](https://www.npmjs.com/package/web-vitals)

## To start React Project

**Remember:**

- Don't foget before starting the project with npm start DON'T FORGET to cd app-name.
- "public" is the data for the published version
- "src" is with one is working with
- both .js and .jsx extensions work in react
- index.js should contain imports and ReactDOM.render() only

### step 1 Installations

#### React and deployment

```bash
 npm init
 npm i --save-dev gh-pages node-sass live-server npm-run-all
 npx create-react-app <app-name>
 cd <app-name>
 npm i node-sass
 npm start
```

##### Deploy React apps in GH pages

###### Installing gh-pages packages

```bash
npm install gh-pages
```

###### Adding homepage in package.json

Adding homepage into **package.json**

```json
"homepage": "http://<your-gh-username>.github.io/<your-repo-name>"
```

###### Added scripts

Delete 'test' scripts.
Adding some more scripts into **package.json**

```json
"scripts": {
//...
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
}
```

###### Build

Lastly run build script to generate build dir

```bash
npm rum build
npm run deploy
```

#### Scss style

##### To install Scss style sheet

```bash
nmp init
npm install --save-dev live-server
npm install --save-dev saas gh-pages
```

##### Edit the newly created package.json

```json
{
    "description": "Sass project",
    "author": "Alie"
}
```

##### Defeault working directory structure

src-> scss-> main.scss (after npm start sass will watch the change of working dir)
src-> styles-> main.css + main.css.map

##### Mixins

Mixin lets you to make groups of css declarations to resuse them throughout the site.

##### Normalized scss style

```bash
npm install normalize-scss
```

### step 2 scripts

```json
{
    "start": "run-p watch watch:styles",
"build": "run-s clean clean:styles build:styles copy",
"deploy": "run-s build publish",
"build:styles": "sass src/scss:src/styles",
"watch": "live-server src",
"watch:styles": "sass src/scss:src/styles --watch",
"clean": "rm -rf dist",
"clean:styles": "rm -rf src/styles",
"copy": "mkdir dist && rsync -avr --exclude=\"/scss\" src/ dist",
"publish": "gh-pages -d dist"
}
```

### step 3 Create .gitignore

In root/ main directory with added:

- node_modules,
- dist.

### step 4 src

Add to the root another directory with a name "src", which would include:

- index.html,
- scss-> main.scss

### step 5 styles dir

After running the app with a 'npm start', new styles directory will be automatically created. It includes:

- main.css,
- main.css.map

Link main.scss from new folder into index.html.

**DONT'T FORGET** to not to use this terminal window any more. Except after npm start, everytime one changes directory names, files or updating packages, restarting the live-server is required.

After each change to main.scss the content will be transferred into main.css.

### step 6 Build

To create gh-pages version, in the root directory one writes in another, new terminal window:

```bash
npm run build
```

or to update the gh-project:

```bash
npm run build
```

Follow this worklow to update either version control as well as gh-pages:

```bash
git add . && git commit -m "message"
git push
npm run build // create or update dist folder
npm run deploy // create or update gh-pages
```

## To install fontawesome icons packages

```bash
 npm i --save @fortawesome/fontawesome-svg-core
 npm install --save @fortawesome/free-solid-svg-icons
 npm install --save @fortawesome/react-fontawesome
 npm install --save @fortawesome/free-brands-svg-icons
 npm install --save @fortawesome/free-regular-svg-icons
```

## To install react icons package

```bash
npm install react-icons --save
```

### To use fontawesome icons via Individual Use

Import icons into each component.

```jsx
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import { faCoffee } from '@fortawesome/free-solid-svg-icons'
 const element = <FontAwesomeIcon icon={faCoffee} />
 ReactDOM.render(element, document.body)
```

## Installing Router to handle links

```bash
 npm install react-router-dom
```

To make React Router available anywhere in your app change index.js.

All we do is to replace React.StrictMode with BrowserRouter which is imported from react-router-dom.  Now the router features are accessible from any part of your app.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

## Installing Bootstrap to handle cards

```bash
 npm install react-bootstrap bootstrap@5.0.1
```

## Known errors

### failed sass build

I can’t explain what happens when we switch node environment but I know that a simple command fix the error

```bash
npm rebuild node-sass
```

### react-router-dom update

```bash
npm install --save react-router-dom
```

## More reading

### VS Extensions

To make life easier:

TODO Write what you like

## Would you like to create a server-side app?

TODO Write what you like

### Basic Express setup

To start new express project

```bash
npm init -y
echo "PORT=5000\nDB_URL=mongodb://localhost:27017/users" > .env
echo "node_modules/" > .gitignore
npm i express
npm i dotenv
npm i morgan
npm i mongoose
npm i bcrypt
npm i uuid
npm i multer
npm i nodemon --save-dev
touch server.js app.js
<!-- or server.js -->
npm i concurrently
npm i cors
mkdir models controllers routes uploads
<!-- and client? -->
touch models/userModel.js
touch models/sessionModel.js
touch controllers/userController.js
touch controllers/authController.js
touch routes/auth.js routes/user.js routes/users.js routes/plants.js
<!-- touch/middleware/... -->
```

Hint: You may change the link for the mongoDB database, by creating account on Mongo Atlas, and store your data in the cloud.

- json script to start project on npm run dev, without the need of starting Backend and Frontend seperately, which you achieve by installing 'concurrently' package:

```json
"scripts": {
    "start": "node server/server.js",
    "server": "nodemon server/server.js",
    "client": "npm start --prefix  client",
    "dev": " concurrently  \"npm run server\" \"npm run client\" "
  },
"dependencies": {
    "concurrently": "^6.2.2",
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "mongoose": "^6.0.8",
    "morgan": "^1.10.0"
  },
```

- script for global start of the server app:
  "start": "nodemon server.js"
- create new DB in mongo shell

```bash
  use users
  use data
```

Example database was filled out directly from MongoDB Compass, and then stored on the Atlas by creating a link.

### Additional packages for more advanced backend work

```bash
npm i bcrypt
npm i cookie-parser
npm i express-session
npm i express-validator
npm i uuid
npm i multer
```
