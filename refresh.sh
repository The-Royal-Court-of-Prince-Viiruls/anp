#!/bin/bash
cd public/semantic;
gulp build;
cd ../..;
./nodemon.sh;
