import sqlite3
from flask import Blueprint, jsonify, request
from flask import Blueprint, jsonify
from datetime import date
from datetime import datetime as datetime2, timedelta
import datetime
import random


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
    cursor = db.cursor()
    query = cursor.execute(
        "select * from User_Table where user_id = ?", (userid,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    query = cursor.execute(
        "select calorie_tgt, protein_tgt, carb_tgt, fat_tgt from User_Pref where user_id = ?", (userid,))
    targets = query.fetchone()

    calorieTgt, proteinTgt, carbTgt, fatTgt = targets

    print(f"Daily Meal Statistic goals for user: {userid}")
    print(calorieTgt, proteinTgt, carbTgt, fatTgt)

    # return jsonify({"message": "Test works out so far!"})

    query = cursor.execute("select * from User_Meal where user_id = ? and meal_date = ?",
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

    cursor.close()

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

    current_date = datetime2.now()

    start_date = current_date - timedelta(days=6)

    dates = [(start_date + timedelta(days=d)).date() for d in range(7)]
    meal_date = []
    # Print the dates
    for date in dates:
        meal_date.append(date.strftime('%Y-%m-%d'))\

    db = get_db()
    cursor = db.cursor()
    calories = 0
    protein = 0
    carbs = 0
    fats = 0

    for date in meal_date:
        query = cursor.execute(
            "select * from User_Meal where meal_date = ? and user_id = ?", (date, userid,))
        results = query.fetchall()

        for row in results:
            print(row)

        for meal in results:
            calories += meal[5]
            protein += meal[6]
            carbs += meal[7]
            fats += meal[8]

    cursor.close()

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
    cursor = db.cursor()
    query = cursor.execute(
        "select * from User_Table where user_id = ?", (userid,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    query = cursor.execute(
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
    cursor = db.cursor()

    # Query to fetch meals from different restaurants
    query = cursor.execute(
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


@dashboard_bp.route('/getPieChartData', methods=['POST'])
def getPieChartData():
    data = request.get_json()
    userid = data.get("userid")
    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()

    query = cursor.execute(
        "SELECT restaurant, COUNT(*) AS occurrence FROM User_Meal WHERE user_id = ? GROUP BY restaurant",
        (userid,)
    )
    rows = cursor.fetchall()

    restaurant_occurrences = {}
    for row in rows:
        restaurant_name = row[0]
        occurrence_count = row[1]
        restaurant_occurrences[restaurant_name] = occurrence_count

    cursor.close()
    connection.close()

    return jsonify(restaurant_occurrences)


@dashboard_bp.route('/getNextSuggestedMeal', methods=['POST'])
def getNextSuggestedMeal():
    data = request.get_json()
    user_id = data.get("userid")
    restaurant = data.get("restaurant")
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute(
        "SELECT calorie_tgt, protein_tgt, carb_tgt, fat_tgt FROM User_pref WHERE user_id = ?", (user_id,))
    user_pref = cursor.fetchone()
    if user_pref is None:
        return jsonify(error="User preferences not found"), 404

    calorie_tgt, protein_tgt, carb_tgt, fat_tgt = user_pref
    print(isinstance(restaurant, str))
    print(restaurant)
    # Execute the query
    cursor.execute(
        "SELECT Name, Type, Calories_Cal, Fat_g, Carbs_g, Protein_g FROM Meals WHERE restaurant = ?",
        (restaurant,))

    meals = cursor.fetchall()
    matching_meals = []

    for meal in meals:
        if all(isinstance(value, (int, float)) for value in meal[2:]):
            if meal[2] <= calorie_tgt and meal[3] <= fat_tgt and meal[4] <= carb_tgt and meal[5] <= protein_tgt:
                matching_meals.append(meal)

    if not matching_meals:
        return jsonify(error="No matching meals found"), 404

    result_meal = random.choice(matching_meals)
    macros = {"Calories": result_meal[2], "Fat": result_meal[3],
              "Carbs": result_meal[4], "Protein": result_meal[5]}
    meal_details = {result_meal[1]: result_meal[0]}

    cursor.close()
    conn.close()

    return jsonify(meal_details=meal_details, macros=macros)


@dashboard_bp.route('/getRestaurantsList', methods=['POST'])
def getRestaurantsList():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    cursor.execute("select distinct Restaurant FROM Meals")
    restaurants = cursor.fetchall()

    cursor.close()
    conn.close()

    return restaurants


@dashboard_bp.route('/getLineChartData', methods=['POST'])
def getLineChartData():
    data = request.get_json()
    user_id = data.get("userid")
    time_period = data.get("timePeriod")
    macro = data.get("macro")

    connection = sqlite3.connect('database.db')
    cursor = connection.cursor()

    # Retrieve the macro target for the specified user
    cursor.execute(
        "SELECT {}_tgt FROM User_Pref WHERE user_id = ?".format(
            macro_formatted(macro)),
        (user_id,)
    )
    macro_target = cursor.fetchone()[0]  # Fetch the macro target value

    # Determine the date range based on the selected time period
    today = datetime.date.today()
    start_date = today - datetime.timedelta(days=time_period)
    end_date = today

    # Retrieve the data from the User_Meal table for the specified user, macro, and date range
    query = """
        SELECT meal_date, {} 
        FROM User_Meal 
        WHERE user_id = ? 
            AND meal_date >= ? 
            AND meal_date <= ?
    """.format(macro_formatted_usermeal_table(macro))
    cursor.execute(query, (user_id, start_date, end_date))
    rows = cursor.fetchall()

    # Extract the dates and macro values from the retrieved data
    dates = [row[0] for row in rows]
    macro_values = [row[1] for row in rows]

    cursor.close()
    connection.close()

    # Prepare the data in the desired format for the chart

    actual_data = {
        "labels": dates,
        "datasets": [
            {
                "label": 'Actual',
                "data": macro_values,
                "fill": False,
                "borderColor": "rgb(255, 99, 132)",
                "backgroundColor": "rgba(255, 99, 132, 0.5)",
            },
            {
                "label": 'Goal',
                "data": [macro_target] * len(dates),
                "fill": False,
                "borderColor": "rgb(53, 162, 235)",
                "backgroundColor": "rgba(53, 162, 235, 0.5)",
                "borderDash": [10, 5]
            }
        ]
    }

    return jsonify(actual_data)


def macro_formatted(macro):
    if macro == "Calories":
        return "calorie"
    elif macro == "Fat (g)":
        return "fat"
    elif macro == "Carbs (g)":
        return "carb"
    elif macro == "Protein (g)":
        return "protein"
    else:
        return None


def macro_formatted_usermeal_table(macro):
    if macro == "Calories":
        return "calories"
    elif macro == "Fat (g)":
        return "fat"
    elif macro == "Carbs (g)":
        return "carbs"
    elif macro == "Protein (g)":
        return "protein"
    else:
        return None
