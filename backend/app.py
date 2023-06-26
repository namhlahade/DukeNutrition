import os

from flask import Flask
from flask_cors import CORS
from authentication import authentication_bp
from dashboard import dashboard_bp
from nextMeal import nextMeal_bp
from profile import profile_bp

from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from corsOptions import cors_options

app = Flask(__name__)
app.debug = True
CORS(app, origins="*") # Enable CORS for all domains on all routes which is not recommended for production because it is a security risk

app.register_blueprint(authentication_bp, url_prefix='/authentication')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
app.register_blueprint(nextMeal_bp, url_prefix='/nextMeal')
app.register_blueprint(profile_bp, url_prefix='/profile')

if __name__ == '__main__':
    app.run()