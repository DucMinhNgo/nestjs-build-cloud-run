#! /bin/sh

commands="
    test1.js
    test2.js
"

for cmd in $commands; do
    node "$cmd"
    if [ $? -eq 0 ]; then
        echo "successfully"
    else
        node "fail.js"
        echo "failed"
        exit 1
    fi
done