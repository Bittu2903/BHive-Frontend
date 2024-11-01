# Mutual Fund Dashboard

This project is a frontend application built with React that interacts with a backend API to manage mutual fund data.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents
- [Available Scripts](#available-scripts)
- [Prerequisites](#prerequisites)
- [Clone the Repository](#clone-the-repository)
- [Install Packages](#install-packages)
- [Running the Project](#running-the-project)
- [Testing the Project](#testing-the-project)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm (Node package manager)

## Clone the Repository

To get started, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/yourusername/your-repo-name.git
```

Change into the project directory:

```bash
cd your-repo-name
```

## Install Packages

Once you have cloned the repository, install the required packages using:

```bash
npm install
```

## Running the Project

To run the React application, use the following command:

```bash
npm start
```

This will start the app in development mode, and you can view it at [http://localhost:3000](http://localhost:3000).

## Testing the Project

To run the tests for the project, use the following command:

```bash
npm test
```

This will execute all tests and display the results in the terminal.

## Environment Variables

Make sure to set the necessary environment variables for your application. You can create a `.env` file in the project root with the following structure:

```
REACT_APP_DUMMY_USERNAME=bhive_user
REACT_APP_DUMMY_PASSWORD=bhive_backend_secret_password
REACT_APP_RAPIDAPI_KEY=14deeb8a7bmsh8b823ba7d593207p11a9bajsnf0682742e2a8 (Replace with your API KEY)
```

## API Documentation

The API documentation for the backend service can be found at:

```
http://localhost:8005/docs
```

### Getting API Key

To access mutual fund data, you need an API key from [RapidAPI](https://rapidapi.com/suneetk92/api/latest-mutual-fund-nav). Sign up for an account and subscribe to the API to get your key.

