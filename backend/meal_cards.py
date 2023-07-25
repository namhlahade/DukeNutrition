import sqlite3
from flask_httpauth import HTTPBasicAuth
from flask import Blueprint, jsonify, request, session, g
import json

mealcards_bp = Blueprint('meal-cards', __name__)


def get_db():
    db = sqlite3.connect('database.db')
    return db


@mealcards_bp.route('/addMealCard', methods=['POST'])
def addMealCardToDatabase():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    user_id = data.get('user_id')
    meal_card_id = data.get('meal_card_id')
    meal_card = data.get('meal_card')

    # Serialize the meal_card dictionary as a JSON string
    meal_card_json = json.dumps(meal_card)

    # Make sure to use the correct SQL syntax for the insert query
    cursor.execute('INSERT INTO user_meal_cards (user_id, meal_card_id, meal_card) VALUES (?, ?, ?)',
                   (user_id, meal_card_id, meal_card_json))
    db.commit()
    cursor.close()
    return jsonify({'success': 'Meal Card Added'}), 200


@mealcards_bp.route('/getMealCards', methods=['POST'])
def getMealCards():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    user_id = data.get('user_id')
    meal_cards = cursor.execute(
        'SELECT meal_card FROM user_meal_cards WHERE user_id = ?', (user_id,))
    meal_cards_json = [json.loads(meal_card[0])
                       for meal_card in meal_cards.fetchall()]
    cursor.close()
    return jsonify(meal_cards_json), 200


@mealcards_bp.route('/deleteMealCard', methods=['DELETE'])
def deleteMealCard():
    db = get_db()
    cursor = db.cursor()
    data = request.get_json()
    user_id = data.get('user_id')
    meal_card_id = data.get('meal_card_id')
    cursor.execute('DELETE FROM user_meal_cards WHERE user_id = ? AND meal_card_id = ?',
                   (user_id, meal_card_id))
    db.commit()
    cursor.close()
    return jsonify({'success': 'Meal Card Deleted'}), 200
