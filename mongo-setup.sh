#!/usr/bin/env bash

    
    # Update and begin installing some utility tools
    apt-get -y update
  
    # Install npm
    apt-get install -y npm

    # Install latest stable version of MongoDB
    apt-get install -y mongodb

    cd /home/prova
    
    npm install mongodb --no-bin-links
    npm install nodejs
  