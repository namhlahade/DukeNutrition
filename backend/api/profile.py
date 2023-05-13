import sqlite3
from flask import Blueprint, jsonify

profile_bp = Blueprint('profile', __name__)

def get_db():
    db = sqlite3.connect('database.db')
    return db