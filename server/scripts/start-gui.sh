#!/bin/bash
# Use to run production mode outside of docker.

HERE=$(cd `dirname $0`; pwd)
CLONEROOT=$HERE/..

if ! test -e $CLONEROOT/logs; then
    mkdir $CLONEROOT/logs
fi

NODE_ENV=production node src/index.js > $CLONEROOT/logs/gui.log 2>&1 &
echo $! > $CLONEROOT/logs/gui.pid
echo "Started spdz-voting-gui, pid $!."
