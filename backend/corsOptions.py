allowed_origins = '*'

def check_origin(origin, callback):
    if origin in allowed_origins or not origin:
        callback(None, True)
    else:
        callback(Exception('Not allowed by CORS'))

cors_options = {
    'origin': check_origin,
    'options_success_status': 200
}
