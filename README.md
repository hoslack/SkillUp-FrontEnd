## Skill App
Welcome to the largest community of professionals that supports your career journey by reviewing your Resume for efficient job Applications

### Run With Example Data

1. Run `yarn install` to install dependencies
1. Run `yarn start`
1. Visit `localhost:3000` to view and add todos (note the todos are shared among everyone)

### Run Your Own

1. Make sure you have Firestore setup within your Firebase console 
1. Run `yarn install` to install dependencies
1. Change the config in `src/config/config.js` to match your Firebase instance (from Firebase console)
1. Run `yarn start`
1. Visit `localhost:3000` to view and add todos to your own `todos` collection of Firestore

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## Rebasing 

Rebasing code is simply merging the changes from one branch into another but with a rewrite of the history so as to achieve a linear/reconciled succession of commits

### Commands used for Rebasing on this this Repo

- `git pull --rebase origin develop` *Pull the default branch and rebase it with your feature branch*
 
- `git add .` *If there are conflicts after rebasing, solve them manually then add them to git*

- `git rebase —continue` *Continue rebasing until there are no more conflicts, follow these 3 commands to make the cycle complete*

