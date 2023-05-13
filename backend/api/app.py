from flask import Flask
from authentication import authentication_bp
from dashboard import dashboard_bp
from nextMeal import nextMeal_bp
from profile import profile_bp

app = Flask(__name__)

app.register_blueprint(authentication_bp, url_prefix='/authentication')
app.register_blueprint(dashboard_bp, url_prefix='/dashboard')
app.register_blueprint(nextMeal_bp, url_prefix='/nextMeal')
app.register_blueprint(profile_bp, url_prefix='/profile')
