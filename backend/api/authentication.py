import sqlite3
from flask import Blueprint, jsonify, request, session, g
from werkzeug.security import generate_password_hash, check_password_hash
import uuid


authentication_bp = Blueprint('authentication', __name__)

def get_db():
    db = sqlite3.connect('database.db')
    return db

# This route allows the user to sign up if they have not created an account. If all the parts of the form are filled out, the email isn't already used, and the passwords match, then the user is added to the database.
@authentication_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    password2 = data.get('password2')
    email = data.get('email')


    if not (username and password and password2):
        return jsonify({'error': 'All fields are required.'}), 400

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

    print("This is the variable type for password")
    print(type(password))

    if not (username and password):
        return jsonify({'error': 'All fields are required.'}), 400

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