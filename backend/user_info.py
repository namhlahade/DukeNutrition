import sqlite3
from flask import Blueprint, jsonify, request
import uuid

user_info_bp = Blueprint('user-info', __name__)


def get_db():
    db = sqlite3.connect('database.db')
    return db


@user_info_bp.route('/collectUserInfo', methods=['POST'])
def collectUserInfo():
    data = request.get_json()
    userid = data.get("userid")
    calories = data.get("calories")
    protein = data.get("protein")
    carbs = data.get("carbs")
    fat = data.get("fat")
    mealsPerDay = data.get("mealsPerDay")

    if not (calories and protein and carbs and fat and mealsPerDay):
        print("All questions need to be answered")
        return jsonify({'error': 'All questions need to be answered'})

    db = get_db()
    cursor = db.cursor()
    query = cursor.execute(
        "select * from User_Pref where user_id = ?", (userid,))
    userPref = query.fetchall()
    query = cursor.execute(
        "select * from User_Table where user_id = ?", (userid,))
    users = query.fetchall()

    if len(userPref) != 0 and len(users) != 0:
        print("User preferences already created")
        print(users[0])
        print(userPref[0])
        return jsonify({'error': 'User Preference already created.'}), 400
    if len(userPref) == 0 and len(users) == 0:
        print("User Account has not been created")
        return jsonify({'error': 'User has not created an account.'}), 400

    prefId = str(uuid.uuid4())
    cursor.execute("insert into User_Pref values (?,?,?,?,?,?,?)",
                   (prefId, userid, calories, protein, carbs, fat, mealsPerDay))
    query = cursor.execute(
        "select * from User_Pref where user_id = ?", (userid,))
    userPref = query.fetchall()
    db.commit()
    cursor.close()
    return jsonify({'message': f'Preferences added to user: {userid} successfully.'}), 201


@user_info_bp.route('/getUserInfo', methods=['POST'])
def getUserInfo():
    data = request.get_json()
    userid = data.get("userid")

    if not (userid):
        print("User ID is required")
        return jsonify({'error': 'User ID is required'})

    db = get_db()
    cursor = db.cursor()
    query = cursor.execute(
        "SELECT calorie_tgt, protein_tgt, carb_tgt, fat_tgt, meal_per_day FROM User_Pref WHERE user_id = ?", (userid,))
    userPref = query.fetchall()
    query = cursor.execute(
        "select * from User_Table where user_id = ?", (userid,))
    users = query.fetchall()

    if len(userPref) == 0 and len(users) == 0:
        print("User Account has not been created")
        return jsonify({'error': 'User has not created an account.'}), 400

    if len(userPref) == 0:
        print("User preferences have not been created")
        return jsonify({'error': 'User preferences have not been created.'}), 400

    print(userPref)
    return jsonify({'message': f'Preferences retrieved for user: {userid} successfully.', 'userPref': userPref[0]}), 201
