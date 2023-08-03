import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/unauthorized.css'


export const UnauthorizedPage = () => {


    return (
        <section>
            <div>
                <h1>Unauthorized Access</h1>
                <p>
                    You are not authorized to view this page. Please{' '}
                    <span className="line">
                        <Link to="/duke-net-nutrition/sign-up">Sign Up</Link>
                    </span>
                    {' '}or{' '}
                    <span className="line">
                        <Link to="/duke-net-nutrition/sign-in">Sign In</Link>
                    </span>
                </p>
            </div>
        </section>
    )
}