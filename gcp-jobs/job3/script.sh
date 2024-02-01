#! /bin/sh

commands="
    test1.js
    test2.js
"

for cmd in $commands; do
    result = node "$cmd"
    echo "The value is: $result"
    if [ $? -eq 0 ]; then
        echo "successfully"
    else
        echo "failed"
        exit 1
    fi
done