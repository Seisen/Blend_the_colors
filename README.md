# BLEND THE COLORS   

This project is developed with react-app and firebase.  

It has no other goal than to progress.  

## Blending colors  

I used [npm-color-blend](https://www.npmjs.com/package/color-blend)  

##Color picker

I used and modified [react-color-picker](https://github.com/radial-color-picker/react-color-picker)

## Getting results  

Credits to this repo [rgb-lab](https://github.com/antimatter15/rgb-lab).  

It's using the __Delta E 101__ method.  

<table>
    <tbody>
    <tr>
        <th>Delta E</th>
        <th>Perception</th>
    </tr>
    <tr>
        <td>&lt;= 1.0</td>
        <td>Not perceptible by human eyes.</td>
    </tr>
    <tr>
        <td>1 - 2</td>
        <td>Perceptible through close observation.</td>
    </tr>
    <tr>
        <td>2 - 10</td>
        <td>Perceptible at a glance.</td>
    </tr>
    <tr>
        <td>11 - 49</td>
        <td>Colors are more similar than opposite</td>
    </tr>
    <tr>
        <td>100</td>
        <td>Colors are exact opposite</td>
    </tr>
    </tbody>
</table>

By inverting this result you can get a score.

[More informations...](http://zschuessler.github.io/DeltaE/learn/)


# RULES

## Normal mode

You have two colors in the background and you have to find the exact mix of these two.

## Reverse mode

You have to find two colors that mixed together blend to the one in the center













# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
