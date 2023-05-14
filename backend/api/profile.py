import sqlite3
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

profile_bp = Blueprint('profile', __name__)

def get_db():
    db = sqlite3.connect('database.db')
    return db

@profile_bp.route('/userInfo', methods=['POST'])
def userInfo():
    data = request.get_json()
    userid = request.get('userid')

    db = get_db()
    
    if "newUsername" in data:
        username = data.get('username')
        db.execute('update User_Table set username = ? where user_id = ?', (username, userid))
        return jsonify({'message': 'Username change was successful.'}), 200

    if 'newPassword' in data:
        password = data.get('newPassword')
        password_hash = generate_password_hash(password)
        db.execute('update User_Table set password = ? where user_id = ?', (password_hash, userid))
        return jsonify({'message': 'Password change was successful.'}), 200
        
    if 'newCalories' in data:
        calories = data.get('newCalories')
        db.execute('update User_Pref set calorie_tgt = ? where user_id = ?', (calories, userid))
        return jsonify({'message': 'Calorie target change was successful.'}), 200
        
    if 'newProtein' in data:
        protein = data.get("newProtein")
        db.execute('update User_Pref set protein_tgt = ? where user_id = ?', (protein, userid))
        return jsonify({'message': 'Protein target change was successful.'}), 200
        
    if 'newCarbs' in data:
        carbs = data.get("newCarbs")
        db.execute('update User_Pref set carb_tgt = ? where user_id = ?', (carbs, userid))
        return jsonify({'message': 'Carb target change was successful.'}), 200

    if 'newFat' in data:
        protein = data.get("newProtein")
        db.execute('update User_Pref set protein_tgt = ? where user_id = ?', (protein, userid))
        return jsonify({'message': 'Fat target change was successful.'}), 200

        
    if 'newNum_meals' in data:
        numMeals = data.get("newNum_meals")
        db.execute('update User_Pref set meal_per_day = ? where user_id = ?', (numMeals, userid))
        return jsonify({'message': 'Number of meals change was successful.'}), 200