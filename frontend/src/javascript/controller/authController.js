const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

import { sign } from 'jsonwebtoken';
require('dotenv').config();
import { promises as fsPromises } from 'fs';
import { join } from 'path';

const createJWT = async ( user, res) => {
    if (match) {
        // create JWTs
        const accessToken = sign(
            {
                "UserInfo": {
                    "username": user.username,
                    "roles": 2001
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5000s' }
        );
        const refreshToken = sign(
            { "username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== user.username);
        const currentUser = { ...user, refreshToken };
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

export default { createJWT };