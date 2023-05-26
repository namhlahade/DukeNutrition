import csv
import sqlite3

# Inserted Ginger and Soy
# Inserted Bella Union
# Inserted Pitchforks


csv_file = 'backend/Restaurants/Pitchforks.csv'

data = []
with open(csv_file, 'r') as file:
    csv_reader = csv.reader(file)
    next(csv_reader)  # Skip header row
    data = list(csv_reader)

# Establish connection to the database
def get_db():
    db = sqlite3.connect('backend/database.db')
    return db

db = get_db()

# Inserting everything into the Meals Table from the GingerAndSoy csv file
# Iterate over the data and insert into the database
'''for row in data:
    db.execute("insert into Meals (Name, Calories_Cal, Fat_Cal, Fat_g, Fat_percentage, Sat_Fat_g, Sat_Fat_percentage, Trans_Fat_percentage, Chol_mg, Chol_percentage, Sodium_mg, Sodium_Percentage, Potassium_mg, Potassium_percentage, Carbs_g, Carbs_percentage, Dietary_Fiber_g, Dietary_Fiber_percentage, Sugars_g, Protein_g, Calcium_percentage, Iron_percentage, Restaurant) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", row)
'''
query = db.execute("select * from Meals where Restaurant = ?", ("Pitchforks",))
allItems = query.fetchall()
print(allItems)
print(len(allItems))
# Commit the changes and close the connection
db.commit()

db.close()