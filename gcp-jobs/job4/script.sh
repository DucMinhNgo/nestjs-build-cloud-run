#!/bin/bash

# Assuming the JavaScript file is named script.js
# and you want to pass an argument to it (e.g., 1)
result=$(node script.js 1)

# Check the exit status of the previous command
if [ $? -eq 0 ]; then
    echo "Name: $result"
    exit 0
else
    echo "Failure."
    exit 1
fi
