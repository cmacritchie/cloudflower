# Cloudflower
##### CloudFlower is a demo project that uses the following technology:
- React, Redux, Electron Client
- AWS Lambda & API Gateway
- AWS Cognito
- AWS DynamoDB
- AWS CloudFront
- AWS ECR & Docker

### Features
- Sign up, Login and hit authorized endpoints. 
- Input Iris Petal and Sepal dimensions into ML endpoint to determine Iris type
- Save values in DynamoDB Database
- Delete Database Values

## Installation

Cloudflower requires [Node.js](https://nodejs.org/) v10+ to run.
before running you will need a .env file in the electron-client folder that contains:
- Get Endpoint for functionRead Endpoint
- Post Endpoint for the functionWrite Endpoint
- Delete Endpoint for the functionDelete Endpoint
- Post Endpoint for the pythonMContainerwCode Endpoint
- Cognito User Pool Id
- Cognito Client Id
 
##### The .env file should look like this:

```sh
REACT_APP_FLOWER_GET={insert your functionReadEndpoint}
REACT_APP_FLOWER_POST={insert your functionWriteEndpoint}
REACT_APP_FLOWER_DELETE={insert your functionDeleteEndpoint}
REACT_APP_FLOWER_ML={insert your pythonMContainerwCode}
REACT_APP_COG_POOL_ID={insert your Cognito User Pool Id}
REACT_APP_COG_CLIENT_ID={insert your Cognito Client Id}
```

Install the dependencies and devDependencies and start the webpack de server.

```sh
cd electron-client
npm i
npm run dev
node app
```
An electron app should open as well as a browser version.

To visit the browser version go to your localhost on port 3000:

```sh
127.0.0.1:3000
```

### Backend Services
The backend Services are included in this repo. The dynamoserverless contains the CR_D endpoints written in Node.js and are deployable via the template.yml cloudfront file. You'll need AWS SAM CLI and user access credentials to deploy.

The PythonMLContainerCode contains the Machine Learning Code using Python. With dependencies, the files size came out to around 600mb and therefore needed to be built using containers. The DockerFile is in the folder for building, the container, but you'll need to setup the API GAteway to use the lambda function using containers yourself. 

There isn't currently a production build for this project as it is meant for demo purposes


