#!/bin/bash

(trap 'kill 0' SIGINT; 
    (cd app && npm i && npm run build && npm run serve) & 
    (cd mf1 && npm i && npm run build && npm run serve) & 
    (cd mf2 && npm i && npm run build && npm run serve))
