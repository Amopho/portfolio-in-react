# portfolio-in-react :woman_office_worker:

Update 2022

Let's get to know each other! A portfolio website of aspiring web developer made with :sparkling_heart: in ReactJS.

![Preview](./public/img/portfolio-glimpse.png)

# Getting Started with Create React App

## ReactJs

A JavaScript library to build web apps
what makes React so special

- Components
- State

# files in React

## manifest.json

The web app manifest provides information about an application (such as name, author, icon, and description) in a JSON text file

## reportwebvitals

Tool for measuring the real life performance of your app(very new to React)
more on that [web-vitals](https://www.npmjs.com/package/web-vitals)

## To start React Project

```
 $ npx create-react-app <app-name>
 $ cd <app-name>
 $ npm i node-sass
 $ npm start
```

## Deploy React apps in GH pages

# step 1

Installing gh-pages package

```
$ npm install gh-pages
```

# step 2

Adding homepage into **package.json**

```
"homepage": "http://<your-gh-username>.github.io/<your-repo-name>"

```

# step 3

Adding some more scripts into **package.json**

```
"scripts": {
//...
"predeploy": "npm run build",
"deploy": "gh-pages -d build",
}
```

# step 4

Lastly run build script to generate build dir

```
$ npm rum build
$ npm run deploy
```

## To install fontawesome icons packages

```
 $ npm i --save @fortawesome/fontawesome-svg-core
 $ npm install --save @fortawesome/free-solid-svg-icons
 $ npm install --save @fortawesome/react-fontawesome
 $ npm install --save @fortawesome/free-brands-svg-icons
 $ npm install --save @fortawesome/free-regular-svg-icons
```

## To install react icons package

```
$ npm install react-icons --save
```

### To use fontawesome icons via Individual Use

Import icons into each component.

```
 $ import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 $ import { faCoffee } from '@fortawesome/free-solid-svg-icons'
 $ const element = <FontAwesomeIcon icon={faCoffee} />
 $ ReactDOM.render(element, document.body)
```

## Installing Router to handle links

```
 $ npm install react-router-dom
```

## Installing Bootstrap to handle cards

```
 $ npm install react-bootstrap bootstrap@5.0.1
```

## Scss style

```
$ npm install normalize-scss
```
