import sqlite3
from flask import Blueprint, jsonify, request
from flask import Blueprint, jsonify

dashboard_bp = Blueprint('dashboard', __name__)

def get_db():
    db = sqlite3.connect('database.db')
    return db

# NOT FINISHED
@dashboard_bp.route('/overallTodaysStats', methods=['POST'])
def overallTodaysStats():
    data = request.get_json()
    userid = data.get("userid")
    mealdate = data.get("mealDate")

    db = get_db()
    query = db.execute("select calorie_tgt, protein_tgt, carb_tgt, fat_tgt from User_Pref where user_id = ?", (userid,))
    targets = query.fetchone()

    calorieTgt, proteinTgt, carbTgt, fatTgt = targets

    query = db.execute("select * from User_Meal where user_id = ? and meal_date = ?", (userid, mealdate,))
    todaysMeals = query.fetchall()

    print("Looking more into Today's meal")
    print(type(todaysMeals))
    print(todaysMeals)

    return jsonify({"message": "THIS IS A TEST"})





# NOT FINISHED
@dashboard_bp.route('/todaysInfo', methods=['POST'])
def todaysInfo():
    data = request.get_json()
    userid = data.get("userid")
    mealdate = data.get("mealDate")

    db = get_db()
    query = db.execute("select * from User_Meal where user_id = ? and meal_date = ?", (userid, mealdate,))
    user = query.fetchall()

    db.close()

    if user is None:
        return jsonify({'error': 'User not found'}), 404
