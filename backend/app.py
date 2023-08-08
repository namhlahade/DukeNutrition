import os

from flask import Flask
from flask_cors import CORS
from authentication import authentication_bp
from dashboard import dashboard_bp
from meal_cards import mealcards_bp
from nextMeal import nextMeal_bp
from user_profile import profile_bp
from user_info import user_info_bp

from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

from corsOptions import cors_options

app = Flask(__name__)
app.debug = True
# Enable CORS for all domains on all routes which is not recommended for production because it is a security risk
CORS(app, origins="*")

app.register_blueprint(authentication_bp, url_prefix='/authentication')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
app.register_blueprint(nextMeal_bp, url_prefix='/nextMeal')
app.register_blueprint(mealcards_bp, url_prefix='/meal-cards')
app.register_blueprint(profile_bp, url_prefix='/profile')
app.register_blueprint(user_info_bp, url_prefix='/user-info')

if __name__ == '__main__':
    app.run()
