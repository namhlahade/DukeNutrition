from flask import Blueprint, jsonify, request

authentication_bp = Blueprint('authentication', __name__)

@authentication_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    password2 = data.get('password2')

    if not (username and password and password2):
        return jsonify({'error': 'All fields are required.'}), 400

    if password != password2:
        return jsonify({'error': 'Passwords do not match.'}), 400

    db = get_db()
    user = db.execute('SELECT id FROM users WHERE username = ?', (username,)).fetchone()

    if user is not None:
        return jsonify({'error': 'Username already exists.'}), 400

    password_hash = generate_password_hash(password)
    db.execute('INSERT INTO users (username, password_hash) VALUES (?, ?)', (username, password_hash))
    db.commit()

    return jsonify({'message': 'User created successfully.'}), 201


@authentication_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not (username and password):
        return jsonify({'error': 'All fields are required.'}), 400

    db = get_db()
    user = db.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()

    if user is None:
        return jsonify({'error': 'Invalid username or password.'}), 401

    if not check_password_hash(user['password_hash'], password):
        return jsonify({'error': 'Invalid username or password.'}), 401

    # TODO: generate and return a JWT token for authenticated requests

    return jsonify({'message': 'Logged in successfully.'}), 200
