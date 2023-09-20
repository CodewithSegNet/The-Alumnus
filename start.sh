#!/bin/bash

# Activate virtual environment 
source myenv/bin/activate

# run gunicorn
gunicortn app.app:create_app()
