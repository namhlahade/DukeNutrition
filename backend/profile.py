import sqlite3
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

profile_bp = Blueprint('profile', __name__)


def get_db():
    db = sqlite3.connect('database.db')
    return db

# Can only change 1 thing at a time, so we will have to make a request per change that they want.


@profile_bp.route('/userInfo', methods=['POST'])
def userInfo():
    data = request.get_json()
    userid = '86a75215-6fb8-4d9e-8d89-960a71288ff6'

    if not userid:
        print("Why am I not working")
        return jsonify({'error': 'Need userid to change profile'}), 400

    db = get_db()

    if "newUsername" in data:
        print("Username was chosen")
        username = data.get('username')
        db.execute(
            'update User_Table set username = ? where user_id = ?', (username, userid))
        db.commit()

        query = db.execute(
            "select * from User_Table where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Username change was successful.'}), 200

    if 'newPassword' in data:
        print("Password was chosen")
        password = data.get('newPassword')
        password_hash = generate_password_hash(password)
        db.execute('update User_Table set password = ? where user_id = ?',
                   (password_hash, userid))
        db.commit()

        query = db.execute(
            "select * from User_Table where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Password change was successful.'}), 200

    if 'newCalories' in data:
        print("Calories were chosen")
        calories = data.get('newCalories')
        db.execute(
            'update User_Pref set calorie_tgt = ? where user_id = ?', (calories, userid))
        db.commit()

        query = db.execute(
            "select * from User_Pref where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Calorie target change was successful.'}), 200

    if 'newProtein' in data:
        print("Protein was chosen")
        protein = data.get("newProtein")
        db.execute(
            'update User_Pref set protein_tgt = ? where user_id = ?', (protein, userid))
        db.commit()

        query = db.execute(
            "select * from User_Pref where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Protein target change was successful.'}), 200

    if 'newCarbs' in data:
        print("Carbs was chosen")
        carbs = data.get("newCarbs")
        db.execute(
            'update User_Pref set carb_tgt = ? where user_id = ?', (carbs, userid))
        db.commit()

        query = db.execute(
            "select * from User_Pref where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Carb target change was successful.'}), 200

    if 'newFat' in data:
        print("Fat was chosen")
        fat = data.get("newFat")
        print(fat)
        db.execute(
            'update User_Pref set fat_tgt = ? where user_id = ?', (fat, userid))
        db.commit()

        query = db.execute(
            "select * from User_Pref where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Fat target change was successful.'}), 200

    if 'newNum_meals' in data:
        print("Number of meals was chosen")
        numMeals = data.get("newNum_meals")
        db.execute(
            'update User_Pref set meal_per_day = ? where user_id = ?', (numMeals, userid))
        db.commit()

        query = db.execute(
            "select * from User_Pref where user_id = ?", (userid,))
        userPref = query.fetchall()
        print(userPref)

        return jsonify({'message': 'Number of meals change was successful.'}), 200

    db.close()
