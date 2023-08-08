import sqlite3
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash

profile_bp = Blueprint('profile', __name__)


def get_db():
    db = sqlite3.connect('database.db')
    return db


@profile_bp.route('/verifyPassword', methods=['POST'])
def verifyPassword():
    print("Verifying password")
    data = request.get_json()
    userid = data.get("userid")
    password = data.get("password")
    if not (userid and password):
        return jsonify({'error': 'Need userid and password to verify password'}), 400

    db = get_db()
    cursor = db.cursor()
    query = cursor.execute(
        "select * from User_Table where user_id = ?", (userid,))
    users = query.fetchall()
    cursor.close()

    if len(users) == 0:
        return jsonify({'error': 'User does not exist.'}), 400
    if not check_password_hash(users[0][3], password):
        return jsonify({'error': 'Incorrect password.'}), 400

    return jsonify({'message': 'Password verified.'}), 200


@profile_bp.route('/getProfile', methods=['POST'])
def getProfile():
    data = request.get_json()
    userid = data.get("userid")
    if not userid:
        return jsonify({'error': 'Need userid to get profile'}), 400

    db = get_db()
    cursor = db.cursor()
    query = cursor.execute(
        "select * from User_Table where user_id = ?", (userid,))
    users = query.fetchall()
    cursor.close()

    if len(users) == 0:
        return jsonify({'error': 'User does not exist.'}), 400

    return jsonify({'username': users[0][1], 'email': users[0][2], 'password': users[0][1]}), 200


@profile_bp.route('/updateProfile', methods=['POST'])
def updateProfile():
    try:
        data = request.get_json()
        userid = data.get('userid')

        if not userid:
            return jsonify({'error': 'Need userid to change profile'}), 400

        db = get_db()
        cursor = db.cursor()

        if "newUsername" in data:
            print("Username was chosen")
            username = data.get('username')
            cursor.execute(
                'update User_Table set username = ? where user_id = ?', (username, userid))
            db.commit()

        if 'newPassword' in data:
            print("Password was chosen")
            password = data.get('newPassword')
            password_hash = generate_password_hash(password)
            cursor.execute('update User_Table set password = ? where user_id = ?',
                           (password_hash, userid))
            db.commit()

        if 'newEmail' in data:
            print("Email was chosen")
            email = data.get('newEmail')
            cursor.execute(
                'update User_Table set email = ? where user_id = ?', (email, userid))
            db.commit()

        cursor.close()
    except Exception as e:
        return jsonify({'error': f'{e}'}), 400
