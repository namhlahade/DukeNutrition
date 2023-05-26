import sqlite3
from flask import Blueprint, jsonify, request, session, g
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


authentication_bp = Blueprint('authentication', __name__)

def get_db():
    db = sqlite3.connect('database.db')
    return db

# Just takes in the username, password, and email and stores into the database
# This route allows the user to sign up if they have not created an account. If all the parts of the form are filled out, the email isn't already used, and the passwords match, then the user is added to the database.
@authentication_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    password2 = data.get('confirmPassword')
    email = data.get('email')


    if password != password2:
        return jsonify({'error': 'Passwords do not match.'}), 400

    db = get_db()

    emails = db.execute('select email from User_Table where email = ?', (email,))
    allemails = emails.fetchall()

    if len(allemails) != 0:
        print(f"Users with username {email}: ")
        print(allemails)
        return jsonify({'error': 'Email already used.'}), 400

    user = db.execute('select username from User_Table where username = ?', (username,))
    allusers = user.fetchall()

    if len(allusers) != 0:
        print(f"Users in allusers with username {username}")
        print(len(allusers))
        return jsonify({'error': 'Username already exists.'}), 400

    password_hash = generate_password_hash(password)
    userId = str(uuid.uuid4())
    db.execute("insert into User_Table values (?,?,?,?)", (userId, username, email, password_hash))
    db.commit()

    return jsonify({'message': 'User created successfully.'}), 201

# Allow user to log in. To do this, we check if they filled out everything. We also check if the username and it's corresponding password match that of the database, then we can say it was successfully logged in
@authentication_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    db = get_db()
    query = db.execute("select * from User_Table where username = ?", (username,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'Invalid username.'}), 401
    
    # user[3] is the password in the user tuple
    if not check_password_hash(user[3], password):
        return jsonify({'error': 'Invalid password.'}), 401
    
    # TODO: generate and return a JWT token for authenticated requests
    return jsonify({'message': 'Logged in successfully.'}), 200

# THIS IS THE SURVEY 
@authentication_bp.route('/collectUserInfo', methods=['POST'])
def collectUserInfo():
    data = request.get_json()
    userid = data.get("userid")
    calories = data.get("calories")
    protein = data.get("protein")
    carbs = data.get("carbs")
    fat = data.get("fat")
    mealsPerDay = data.get("mealsPerDay")


    db = get_db()
    query = db.execute("select * from User_Pref where user_id = ?", (userid,))
    userPref = query.fetchall()
    query = db.execute("select * from User_Table where user_id = ?", (userid,))
    users = query.fetchall()


    if len(userPref) != 0 and len(users) != 0:
        return jsonify({'error': 'User Preference already created.'}), 400
    if len(userPref) == 0 and len(users) == 0:
        return jsonify({'error': 'User has not created an account.'}), 400
    
    prefId = str(uuid.uuid4())
    db.execute("insert into User_Pref values (?,?,?,?,?,?,?)", (prefId, userid, calories, protein, carbs, fat, mealsPerDay))
    db.commit()

    query = db.execute("select * from User_Pref where user_id = ?", (userid,))
    userPref = query.fetchall()
    print(userPref)

    return jsonify({'message': f'Preferences added to user: {userid} successfully.'}), 201

@authentication_bp.route('/getUserId', methods=['POST'])
def getUserId():
    data = request.get_json() 
    username = data.get("username")

    db = get_db()
    query = db.execute("select * from User_Table where username = ?", (username,))
    user = query.fetchone()

    db.close()

    if user is None:
        return jsonify({'error': 'User does not exist'}), 404
    
    return jsonify({'userid': user[0]})


@authentication_bp.route('/deleteUser', methods=['POST'])
def deleteUser():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")
    userid = data.get("userid")
    
    db = get_db()
    query = db.execute("select * from User_Table where username = ?", (username,))
    user = query.fetchone()

    if user is None:
        return jsonify({'error': 'User not found.'}), 404

    if not check_password_hash(user[3], password):
        return jsonify({'error': 'Invalid password.'}), 401
    
    if email != user[2]:
        return jsonify({'error': 'Emails do not match'})
    
    query = db.execute("delete from User_Table where user_id = ?", (userid,))
    query = db.execute("delete from User_Pref where user_id = ?", (userid,))
    query = db.execute("delete from User_Meal where user_id = ?", (userid,))

    db.commit()

    query = db.execute("select * from User_Table where user_id = ?", (userid,))
    user = query.fetchone()
    
    if user is None:
        print(f"User: {userid} doesn't exist on User_Table")
    
    query = db.execute("select * from User_Pref where user_id = ?", (userid,))
    user = query.fetchone()
    
    if user is None:
        print(f"User: {userid} doesn't exist on User_Pref")
    
    query = db.execute("select * from User_Meal where user_id = ?", (userid,))
    user = query.fetchall()
    
    if len(user) == 0:
        print(f"User: {userid} doesn't exist on User_Meal")
    

    db.close()

    return jsonify({"message": "User has been deleted."})





    

    
