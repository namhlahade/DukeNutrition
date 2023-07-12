import sqlite3
from flask import Blueprint, jsonify, request
from flask import Blueprint, jsonify
from datetime import date
from datetime import datetime, timedelta


dashboard_bp = Blueprint('dashboard', __name__)


def get_db():
    db = sqlite3.connect('database.db')
    return db

# NOT FINISHED


@dashboard_bp.route('/overallTodaysStats', methods=['POST'])
def overallTodaysStats():
    data = request.get_json()
    userid = data.get("userid")

    db = get_db()

    query = db.execute("select * from User_Table where user_id = ?", (userid,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    query = db.execute(
        "select calorie_tgt, protein_tgt, carb_tgt, fat_tgt from User_Pref where user_id = ?", (userid,))
    targets = query.fetchone()

    calorieTgt, proteinTgt, carbTgt, fatTgt = targets

    print(f"Daily Meal Statistic goals for user: {userid}")
    print(calorieTgt, proteinTgt, carbTgt, fatTgt)

    # return jsonify({"message": "Test works out so far!"})

    query = db.execute("select * from User_Meal where user_id = ? and meal_date = ?",
                       (userid, date.today().isoformat(),))
    todaysMeals = query.fetchall()

    print(f"Today's meals for user: {userid}")
    print(todaysMeals)

    calories, protein, carbs, fat = 0, 0, 0, 0
    for meal in todaysMeals:
        calories += meal[5]
        protein += meal[6]
        carbs += meal[7]
        fat += meal[8]

    db.close()

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


@dashboard_bp.route('/todaysInfo', methods=['POST'])
def todaysInfo():
    data = request.get_json()
    userid = data.get("userid")

    db = get_db()

    query = db.execute("select * from User_Table where user_id = ?", (userid,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    query = db.execute("select name, calories, protein, carbs, fat from User_Meal where user_id = ? and meal_date = ?",
                       (userid, date.today().isoformat(),))
    meals = query.fetchall()

    allMeals = []
    for meal in meals:
        name, calories, protein, carbs, fat = meal
        allMeals.append([name, calories, protein, carbs, fat])

    db.close()
    return jsonify({'message': allMeals}), 200


@dashboard_bp.route('/stattttttts', methods=['POST'])
def stattttttttts():

    data = request.get_json()
    userid = data.get("userid")
    time_period = data.get("time_period")

    current_date = datetime.now()

    start_date = current_date - timedelta(days=6)

    dates = [(start_date + timedelta(days=d)).date() for d in range(7)]
    meal_date = []
    # Print the dates
    for date in dates:
        meal_date.append(date.strftime('%Y-%m-%d'))\

    db = get_db()
    calories = {}
    protein = {}
    carbs = {}
    fats = {}

    for date in meal_date:
        query = db.execute(
            "select * from User_Meal where meal_date = ? and user_id = ?", (date, userid,))
        results = query.fetchall()

        for row in results:
            print(row)

        cals, prot, car, fat = 0, 0, 0, 0
        for meal in results:
            cals += meal[5]
            prot += meal[6]
            car += meal[7]
            fat += meal[8]

        calories[date] = cals
        protein[date] = prot
        carbs[date] = car
        fats[date] = fat

    db.close()

    return jsonify({
        'caloriesWeek': calories,
        'proteinWeek': protein,
        'carbsWeek': carbs,
        'fatWeek': fats
    }), 200


@dashboard_bp.route('/thisWeeksStats', methods=['POST'])
def thisWeeksStats():
    data = request.get_json()
    userid = data.get("userid")
    # time_period = data.get("time_period")

    current_date = datetime.now()

    start_date = current_date - timedelta(days=6)

    dates = [(start_date + timedelta(days=d)).date() for d in range(7)]
    meal_date = []
    # Print the dates
    for date in dates:
        meal_date.append(date.strftime('%Y-%m-%d'))\

    db = get_db()
    calories = 0
    protein = 0
    carbs = 0
    fats = 0

    for date in meal_date:
        query = db.execute(
            "select * from User_Meal where meal_date = ? and user_id = ?", (date, userid,))
        results = query.fetchall()

        for row in results:
            print(row)

        for meal in results:
            calories += meal[5]
            protein += meal[6]
            carbs += meal[7]
            fats += meal[8]

    db.close()

    return jsonify({
        'Calories': calories/7,
        'Protein (g)': protein/7,
        'Carbs (g)': carbs/7,
        'Fat (g)': fats/7
    }), 200


@dashboard_bp.route('/thisWeeksTargets', methods=['POST'])
def thisWeeksTargets():
    data = request.get_json()
    userid = data.get("userid")

    db = get_db()

    query = db.execute("select * from User_Table where user_id = ?", (userid,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    query = db.execute(
        "select calorie_tgt, protein_tgt, carb_tgt, fat_tgt from User_Pref where user_id = ?", (userid,))
    targets = query.fetchone()

    calorieTgt, proteinTgt, carbTgt, fatTgt = targets

    return jsonify({
        'Calories': calorieTgt,
        'Protein (g)': proteinTgt,
        'Carbs (g)': carbTgt,
        'Fat (g)': fatTgt
    }), 200


@dashboard_bp.route('/getScatterPlotData', methods=['POST'])
def getScatterPlotData():
    data = request.get_json()
    userid = data.get("userid")
    db = get_db()

    # Query to fetch meals from different restaurants
    query = db.execute(
        "select * from User_Meal where user_id = ?",
        (userid,)
    )
    meals = query.fetchall()

    # Create a dictionary to store the meals by restaurant
    restaurantMeals = {}

    # Iterate over the meals and organize them by restaurant
    for meal in meals:
        user_meal_id, calories, protein, carbs, fat, restaurant_name = meal[
            0], meal[5], meal[6], meal[7], meal[8], meal[10]

        # Create a new meal object with calories, protein, carbs, and fat
        mealObj = {
            'calories': calories,
            'protein': protein,
            'carbs': carbs,
            'fat': fat
        }

        # If the restaurant is already in the dictionary, append the meal to its list
        if restaurant_name in restaurantMeals:
            restaurantMeals[restaurant_name][user_meal_id] = mealObj
        # Otherwise, create a new key-value pair for the restaurant and the meal
        else:
            restaurantMeals[restaurant_name] = {user_meal_id: mealObj}

    # Return the restaurant meals as a JSON response
    return jsonify(restaurantMeals)
