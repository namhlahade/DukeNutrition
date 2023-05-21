import sqlite3

connection = sqlite3.connect("backend/database.db")

cursor = connection.cursor()

'''cursor.execute("create table User_Table (user_id text, username text, email text, password text)")
cursor.execute("create table User_Pref (pref_id text, user_id text, calorie_tgt integer, protein_tgt integer, carb_tgt integer, fat_tgt integer, meal_per_day integer, FOREIGN KEY (user_id) REFERENCES User_Table(user_id))")
cursor.execute("create table User_Meal (user_meal_id text, user_id text, pref_id text, meal_id text, name text, calories integer, protein integer, carbs integer, fat integer, meal_date date, FOREIGN KEY (user_id) REFERENCES User_Table(user_id), FOREIGN KEY (pref_id) REFERENCES User_Pref(pref_id))")
cursor.execute("create table Meals (Name text, Calories_Cal integer, Fat_Cal integer, Fat_g integer, Fat_percentage real, Sat_Fat_g integer, Sat_Fat_percentage real, Trans_Fat_percentage real, Chol_mg integer, Chol_percentage real, Sodium_mg integer, Sodium_Percentage real, Potassium_mg integer, Potassium_percentage real, Carbs_g integer, Carbs_percentage real, Dietary_Fiber_g integer, Dietary_Fiber_percentage real, Sugars_g integer, Protein_g integer, Calcium_percentage real, Iron_percentage real, Restaurant text)")'''

'''cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")

# Fetch all the table names
table_names = cursor.fetchall()

# Count the number of tables
num_tables = len(table_names)

# Print the number of tables
print(f"There are ____ tables in the database.")'''



connection.close()
