# npm packages
to update dependencies
npm install "$package" --save
to update devDependencies
//npm install "$package" --save-dev
on production/ end user machine
//npm install --production

#Starting
Backend -  node server.js
Frontend - npm start

# Debugging (https://github.com/visionmedia/debug)
"Debug" package is used to log all debugging messages for node.js backend
To view debug messages set a "DEBUG" environment variable as below:
set DEBUG:* 

Save debug statements to a .txt file:
set DEBUG_FD=1
node server/app > log.txt

