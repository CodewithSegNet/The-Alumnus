#!/usr/bin/env python3

# generate_secret_key.py
import os
import string
import secrets
from decouple import config

# Generate a random string of 32 characters from letters, digits, and symbols
secret_key = ''.join(
    secrets.choice(string.ascii_letters + string.digits + string.punctuation)
    for _ in range(32)
)

# store in .env
with open('.env', 'w') as env_file:
    env_file.write(f'SECRET_KEY={secret_key}\n')

# Read the secret key
secret_key = config('SECRET_KEY')
