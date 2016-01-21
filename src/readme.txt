**NEST Test Application**

The purpose of the application is to allow users set up schedule for nest thermostats in their houses. The application offers several predefined heating modes which can be adjusted. Users have a possibility to set specific heating mode for each week day and change these setting later. 

**Requirements:**

 - Node.js >= 4.2.4
 - Mongodb >= 2.6

**To start application:**

 - Run '*npm install*' command to resolve dependencies

 - Run '*npm run populatedb*' to init database

 - Run '*npm start*'

**Testing**

 - Run '*npm test*' for REST API integration tests
 - Launch */test/ui/index.html* for web components unit tests

The application will be available at ***http://localhost:3000***