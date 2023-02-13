#!/usr/bin/bash

if [ "$1" = "" ]; then
    echo "[error] no argument passed"
    exit 1
fi

mkdir "$1"
cd "$1"
python3 -m venv venv
echo "Activate with \". ./venv/bin/activate\""
