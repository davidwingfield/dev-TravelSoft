#!/bin/bash
cd ../src || exit

php phpDocumentor.phar -d . -t ../docs/FrameWork
