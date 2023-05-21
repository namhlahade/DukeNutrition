import sqlite3
from flask import Blueprint, jsonify, request
from flask import Blueprint, jsonify
from datetime import date

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

    print(f"Daily Meal Statistic goals for user: {userid}")
    print(calorieTgt, proteinTgt, carbTgt, fatTgt)

    #return jsonify({"message": "Test works out so far!"})

    query = db.execute("select * from User_Meal where user_id = ? and meal_date = ?", (userid, date.today().isoformat(),))
    todaysMeals = query.fetchall()

    print(f"Today's meals for user: {userid}")
    print(todaysMeals)

    calories, protein, carbs, fat = 0, 0, 0, 0
    for meal in todaysMeals:
        calories += meal[5]
        protein += meal[6]
        carbs += meal[7]
        fat += meal[8]

    return jsonify({
        'caloriesToday': calories,
        'proteinToday': protein,
        'carbsToday': carbs,
        'fatToday': fat,
        'caloriesTgt': calorieTgt,
        'proteinTgt': proteinTgt,
        'carbsTgt': carbTgt,
        'fatTgt': fatTgt
    }), 200




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

