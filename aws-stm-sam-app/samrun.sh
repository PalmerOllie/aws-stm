#!/bin/sh
# npm run test
# VALID="$(npm test | grep -o 'failing')"
# echo $VALID

npm run test
if [ $? -eq 0 ] #  $ var holds exit status of last command
then
    echo "SUCCESS - Running Sam Build & Deploy..."
    sam build
    sam deploy
else
    echo "FAIL - Aborting build process."
fi
