#!/bin/bash

# Activate virtual environment 
source myvenv/bin/activate

# run gunicorn
gunicortn 'app.app:create_app()'
