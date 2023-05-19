import sqlite3

connection = sqlite3.connect("database.db")

cursor = connection.cursor()

cursor.execute("create table User_Table (user_id text, username text, email text, password text)")
cursor.execute("create table User_Pref (pref_id text, user_id text, calorie_tgt integer, protein_tgt integer, carb_tgt integer, fat_tgt integer, meal_per_day integer, FOREIGN KEY (user_id) REFERENCES User_Table(user_id))")
cursor.execute("create table User_Meal (user_meal_id text, user_id text, pref_id text, meal_id text, meal_date date, FOREIGN KEY (user_id) REFERENCES User_Table(user_id), FOREIGN KEY (pref_id) REFERENCES User_Pref(pref_id))")

connection.close()