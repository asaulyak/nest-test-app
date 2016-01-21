**

NEST Test Application
---------------------

**
**Objective**
The purpose of the application is to allow users set up schedule for Nest thermostats in their houses. The application offers several predefined heating modes which can be adjusted. Users have a possibility to set specific heating mode for each day of week and change these settings later. 
For instance, from Monday to Friday the thermostat can work in a “Working Day” mode. It assumes that users can reduce power consumption by decreasing the temperature while they’re not at home (e.g. at work). On Saturday and Sunday, the thermostat can work in a “Week end” mode, meaning that the thermostat will not switch to lower temperatures during the weekend. In addition, there is an “Eco” mode which can be applied in case when the user isn’t at home for a longer period of time (e.g. vacation).
Each mode can be configured to work at desired temperature.
Once the users configure their thermostats, the application creates cron jobs for each one and sets desired temperature during a particular time period.  
**Assumptions**
For the sake of simplicity we assumed that:

 - There are 3 predefined heating modes and users are not going to add
   extra ones.
 - Time bounds during the day are fixed.
 - Thermostats are using Celsius temperature scale.
 - Working Nest environment is predefined and can be changed by
   specifying custom credentials in config file.

**Technologies**
*Client side uses the following technologies:*

 - Backbone.js – for web application structure

 - Semantic-ui – convenient tool for responsive layout building
 - jQuery
 - Underscore.js
*On the server side we have:*
 - Node.js – web server
 - Express.js – MVC framework for REST and web ui
 - Mongodb –thermostats settings storage
 - Mongoose – mongodb object modeling
 - Unirest – middleware for interacting with nest REST API
*Testing:*
 - Mocha – simple test framework for running tests on node.js and in the browser
 - Chai – assertion framework for node/browser testing
 - Chai-backbone – special Chai addon for Backbone.js
 - Supertest – http agent for testing REST API
 - Sinon – library for creating stubs, mocks, spies
 - Proxyquire – overrides node’s “require” function to allow mocking
**Structure**
The application consists of 2 parts – client and server.
Client side works on top of Backbone.js. On the home page the users can observe the locations of their homes where thermostats are installed with detailed information about their current state. Here the users configure a schedule for the thermostats for each day of the week. In the Modes section the user is able to change the temperature settings for each mode.
Server side is responsible for delivering index page of the application to the user, interacting with Nest REST API and storing user defined configuration. 
**Testing**
The application includes a series of tests. There are integration tests for REST API component and web client unit tests. 
The first group covers REST API functionality that has been implemented for client-server communications within the app. It checks the API for proper responses on different types of requests.
The second group covers web components functionality such as backbones’ collections. It checks the component interaction and proper component settings.
