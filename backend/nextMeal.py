import sqlite3
from flask import Blueprint, jsonify, request
import uuid
from datetime import date
from authentication import getUserIdentification



nextMeal_bp = Blueprint('nextMeal', __name__)

def get_db():
    db = sqlite3.connect('database.db')
    return db

def mealID(restaurant, calories, protein, carb, fat):
    stringID = f"{restaurant}{calories}{protein}{carb}{fat}".replace(" ", "_" )
    return stringID


def quickAdd():
    data = request.get_json()
    userid = data.get("userid")

    db = get_db()
    query = db.execute("SELECT * FROM User_Meal WHERE user_id = ? AND meal_id = (SELECT meal_id FROM User_Meal WHERE date_column >= DATE('now', '-7 days') GROUP BY meal_id ORDER BY COUNT(*) DESC LIMIT 1)", (userid,))
    row = query.fetchone()

    if row is None:
        return jsonify({"message": "User hasn't documented anything eaten yet"})

    return jsonify({
        "name": row[4],
        "calories": row[5],
        "protein": row[6],
        "carbs": row[7],
        "fat": row[8]
    })

@nextMeal_bp.route('/allRestaurants', methods=['GET'])
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
    
    return jsonify(restaurants), 200

@nextMeal_bp.route('/selectMeal', methods=['POST'])
def selectMeal():
    data = request.get_json()
    #userid = data.get('userid')
    userid = '348e271d-5500-4e3d-99ac-39f584f5a3fe'
    print(f"This is userid: {userid}")

    if userid is None:
        return jsonify({"error": "Unauthorized Access"}), 401

    restaurant_mapping = {
        'Ginger_and_Soy': {
            'class': Ginger_and_Soy,
            'variables': {
                'build_your_own': ['rice', 'meat', 'addons', 'sauces'],
                'california': ['rice', 'numMeatServings'],
                'tokyo': ['rice', 'numMeatServings'],
                'seoul': ['rice', 'numMeatServings'],
                'hong_kong': ['rice', 'numMeatServings'],
                'shanghai': ['rice', 'numMeatServings']
            },
            'methods': {
                'build_your_own': 'buildYourOwn',
                'california': 'california',
                'tokyo': 'tokyo',
                'seoul': 'seoul',
                'hong_kong': 'hong_kong',
                'shanghai': 'shanghai'
            }
        },
        'Bella_Union': {
            'class': Bella_Union,
            'variables': {
                'add_item': ['addons'] # Should be ['item_name', 'addons']
            },
            'methods': {
                'add_item': 'addItem'
            }
        },

        'Pitchforks': {
            'class': Pitchforks,
            'variables': {
                'add_item': ['main', 'addon', 'side']
            },
            'methods': {
                'add_item': 'addItem'
            }
        }
        # Add more restaurants here
    }

    restaurant_name = data['restaurant']
    print(f"Restaurant Name: {restaurant_name}")
    meal_type = data['meal_type']
    print(f"Meal Type: {meal_type}")

    restaurant_data = restaurant_mapping[restaurant_name]
    print(f"Restaurant Data: {restaurant_data}")
    restaurant_class = restaurant_data['class']
    print(f"Restaurant Class: {restaurant_class}")
    variables = restaurant_data['variables']
    print(f"Variables: {variables}")
    methods = restaurant_data['methods']
    print(f"Methods: {methods}")

    meal = restaurant_class()

    method_name = methods[meal_type]

    method_args = {var: data[var] for var in variables[meal_type]}
    method = getattr(meal, method_name)

    result = method(**method_args)
    mealid = mealID(result[0], result[1], result[2], result[3], result[4])
    print(f"Meal ID: {mealid}")

    print("These are the results:")
    for i in range(len(result)):
        print(result[i])
    
    db = get_db()
    
    query = db.execute("select * from User_Pref where user_id = ?", (userid,))
    row = query.fetchone()


    if row is None:
        return jsonify({f"error": "No user preference was created."}), 400
    
    prefid = row[0]
    print(f"Pref Id: {prefid}")

    userMealid = str(uuid.uuid4())
    current_date = date.today()

    query = db.execute("insert into User_Meal values (?,?,?,?,?,?,?,?,?,?)", (userMealid, userid, prefid, mealid, result[0], result[1], result[2], result[3], result[4], current_date.isoformat()))

    db.commit()
    query = db.execute("select * from User_Meal where user_id = ?", (userid,))
    
    allMeals = query.fetchall()
    print(f"All the meals by user: {userid}")
    print(allMeals)

    db.close()
    print("Meal Statistics:")
    print(result[0], result[1], result[2], result[3], result[4])
    print("It works!")

    return jsonify({f"message": f"Successfully added meal with mealid: {mealid} to user: {userid}"}), 200


class DukeMeal():
    def __init__(self):
        self.name = ""
        self.calories = 0
        self.protein = 0
        self.carbs = 0
        self.fat = 0

    
# rice variable is a string, meat variable is a dictionary where key is meat and value is # of servings, addons is a list (list of vegetables), sauces is a list (list of sauces)
class Ginger_and_Soy(DukeMeal):
    def __init__(self):
        super().__init__()
        self.rice = ""
        self.meat = {"": 0}
        self.addons = []
        self.sauces = []

    def buildYourOwn(self, rice, meat, addons, sauces):
        self.rice = rice
        self.meat = meat
        self.addons = addons
        self.sauces = sauces

        self.calories = 0
        self.protein = 0
        self.carbs = 0
        self.fat = 0

        self.name = ""
        theName = "Build you own bowl with"
        for typeOfMeat in self.meat:
            theName = theName + " " + typeOfMeat
        
        for typeOfRice in rice:
            self.name = theName + " and " + typeOfRice

        db = get_db()
        for typeOfRice in self.rice:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (typeOfRice, "Ginger_and_Soy"))
            riceInfo = query.fetchone()
            print("Information about rice:")
            print(riceInfo)

            self.calories += 0 if isinstance(riceInfo[2], str) else riceInfo[2]
            self.protein += 0 if isinstance(riceInfo[20], str) else riceInfo[20]
            self.carbs += 0 if isinstance(riceInfo[15], str) else riceInfo[15]
            self.fat += 0 if isinstance(riceInfo[4], str) else riceInfo[4]
        
        print("This is self.meat")
        print(self.meat)
        for key in self.meat:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (key, "Ginger_and_Soy"))
            meatInfo = query.fetchone()
            print("Information about meat:")
            print(meatInfo)

            self.calories += 0 if isinstance(meatInfo[2], str) else meatInfo[2]
            self.protein += 0 if isinstance(meatInfo[20], str) else meatInfo[20]
            self.carbs += 0 if isinstance(meatInfo[15], str) else meatInfo[15]
            self.fat += 0 if isinstance(meatInfo[4], str) else meatInfo[3]

        for addon in self.addons:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (addon, "Ginger_and_Soy"))
            addonInfo = query.fetchone()
            print("Information about addon:")
            print(addonInfo)
            
            self.calories += 0 if isinstance(addonInfo[2], str) else addonInfo[2]
            self.protein += 0 if isinstance(addonInfo[20], str) else addonInfo[20]
            self.carbs += 0 if isinstance(addonInfo[15], str) else addonInfo[15]
            self.fat += 0 if isinstance(addonInfo[4], str) else addonInfo[4]

        for sauce in self.sauces:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (sauce, "Ginger_and_Soy"))
            sauceInfo = query.fetchone()
            print("Information about sauce:")
            print(sauceInfo)

            self.calories += 0 if isinstance(sauceInfo[2], str) else sauceInfo[2]
            self.protein += 0 if isinstance(sauceInfo[20], str) else sauceInfo[20]
            self.carbs += 0 if isinstance(sauceInfo[15], str) else sauceInfo[15]
            self.fat += 0 if isinstance(sauceInfo[4], str) else sauceInfo[4]


        db.close()

        return self.name, self.calories, self.protein, self.carbs, self.fat
    
    # Have to specify white or brown rice and number of servings of meat
    def california(self, rice, numMeatServings):
        notName, cals, prot, carb, fats = self.buildYourOwn(rice, {"Teriyaki Tofu": numMeatServings}, ["Kale Salad", "Seasoned Broccoli", "Seasoned Corn", "Stir-Fried Zucchini", "Cilantro"], ["Cusabi Sauce"])
        name = "California Bowl"
        if numMeatServings > 1:
            name = name + " with Extra Protein"

        return name, cals, prot, carb, fats
    
    def tokyo(self, rice, numMeatServings):
        notName, cals, prot, carb, fats = self.buildYourOwn(rice, {"Grilled Teriyaki Chicken": numMeatServings}, ["Kale Salad", "Shelled Edamame", "Seasoned Corn", "Green Onion", "Bubu Arare"], ["Eel Sauce", "Spicy Mayo", "Sesame Seeds"])
        name = "Tokyo Bowl"
        if numMeatServings > 1:
            name = name + " with Extra Protein"

        return name, cals, prot, carb, fats
    
    def seoul(self, rice, numMeatServings):
        notName, cals, prot, carb, fats = self.buildYourOwn(rice, {"Beef Bulgogi": numMeatServings}, ["Kale Salad", "Fried Egg", "Green Onion", "Kimchi Slaw", "Pickled Carrot", "Pickled Radish", "Stir-Fried Zucchini"], ["White Sauce", "Gochujang Sauce", "Sesame Seeds"])
        name = "Seoul Bowl"
        if numMeatServings > 1:
            name = name + " with Extra Protein"

        return name, cals, prot, carb, fats
        
    def hong_kong(self, rice, numMeatServings):
        notName, cals, prot, carb, fats = self.buildYourOwn(rice, {"Spicy Pork": numMeatServings}, ["Cilantro", "Pickled Radish", "Seasoned Broccoli", "Spicy Cucumber", "Bubu Arare", "Stir-Fried Cabbage & Red Pepper"], ["Eel Sauce", "Sambal Sauce", "Sesame Seeds"])
        name = "Hong Kong Bowl"
        if numMeatServings > 1:
            name = name + " with Extra Protein"

        return name, cals, prot, carb, fats

    def shanghai(self, rice, numMeatServings):
        notName, cals, prot, carb, fats = self.buildYourOwn(rice, {"Ginger Chicken": numMeatServings}, ["Cilantro", "Stir-Fried Cabbage & Red Pepper", "Stir-Fried Zucchini", "Bubu Arare"], ["White Sauce", "Sesame Seeds"])
        name = "Shanghai Bowl"
        if numMeatServings > 1:
            name = name + " with Extra Protein"

        return name, cals, prot, carb, fats

class Bella_Union(DukeMeal):
    def __init__(self):
        super().__init__()
    
    def addItem(self, addons):
        db = get_db()
        '''query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (name, "Bella_Union"))
        itemInfo = query.fetchone()
        print("Information about item:")
        print(itemInfo)

        self.name = itemInfo[0]
        self.calories += 0 if isinstance(itemInfo[1], str) else itemInfo[1]
        self.protein += 0 if isinstance(itemInfo[19], str) else itemInfo[19]
        self.carbs += 0 if isinstance(itemInfo[14], str) else itemInfo[14]
        self.fat += 0 if isinstance(itemInfo[3], str) else itemInfo[3]'''

        self.name = ""

        for elem in addons:
            self.name = self.name + elem + " "
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (elem, "Bella_Union"))
            addonInfo = query.fetchone()
            print("Information about add on:")
            print(addonInfo)

            self.calories += 0 if isinstance(addonInfo[1], str) else addonInfo[2]
            self.protein += 0 if isinstance(addonInfo[19], str) else addonInfo[20]
            self.carbs += 0 if isinstance(addonInfo[14], str) else addonInfo[15]
            self.fat += 0 if isinstance(addonInfo[3], str) else addonInfo[4]

        db.close()

        return self.name, self.calories, self.protein, self.carbs, self.fat

class Pitchforks(DukeMeal):
    def __init__(self):
        super().__init__()
    
    def addItem(self, main, addon, side):
        db = get_db()
        for item in main:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (item, "Pitchforks"))
            itemInfo = query.fetchone()
            print("Information about item:")
            print(itemInfo)

            self.name = itemInfo[0]
            self.calories += 0 if isinstance(itemInfo[2], str) else itemInfo[2]
            self.protein += 0 if isinstance(itemInfo[20], str) else itemInfo[20]
            self.carbs += 0 if isinstance(itemInfo[15], str) else itemInfo[15]
            self.fat += 0 if isinstance(itemInfo[4], str) else itemInfo[4]

        for elem in addon:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (elem, "Pitchforks"))
            addonInfo = query.fetchone()
            print("Information about add on:")
            print(addonInfo)

            self.calories += 0 if isinstance(addonInfo[2], str) else addonInfo[2]
            self.protein += 0 if isinstance(addonInfo[20], str) else addonInfo[20]
            self.carbs += 0 if isinstance(addonInfo[15], str) else addonInfo[15]
            self.fat += 0 if isinstance(addonInfo[4], str) else addonInfo[4]

        for elem in side:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (elem, "Pitchforks"))
            sideInfo = query.fetchone()
            print("Information about side:")
            print(sideInfo)

            self.calories += 0 if isinstance(sideInfo[2], str) else sideInfo[2]
            self.protein += 0 if isinstance(sideInfo[20], str) else sideInfo[20]
            self.carbs += 0 if isinstance(sideInfo[15], str) else sideInfo[15]
            self.fat += 0 if isinstance(sideInfo[4], str) else sideInfo[4]

        db.close()
        return self.name, self.calories, self.protein, self.carbs, self.fat