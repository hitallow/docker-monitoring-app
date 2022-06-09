#!/bin/bash

cd /usr/project/worker

# Load local .env
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

echo $(date -u)

npm install

if [[ -n "$APP_ENV_MODE" && $APP_ENV_MODE == "production" ]]; then
  npm run build && npm run worker:prod
else
  npm run worker:dev
fi
