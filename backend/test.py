import sqlite3

def get_db():
    db = sqlite3.connect('database.db')
    return db

def allRestaurants():
    db = get_db()
    query = db.execute("select * from Meals")
    everything = query.fetchall()

    restaurants = {}

    for row in everything:
        # Adding a restaurant
        restaurant = row[23]
        meal_name = row[1]
        meal_id = row[0]

        if restaurant not in restaurants:
            restaurants[restaurant] = {meal_name: [meal_id]}
        else:
            if meal_name not in restaurants[restaurant]:
                restaurants[restaurant][meal_name] = [meal_id]
            else:
                restaurants[restaurant][meal_name].append(meal_id)
    
    return restaurants

print(allRestaurants())