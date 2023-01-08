import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const Home = (): JSX.Element => (
    <Fragment>
        <h3>Welcome</h3>
        <p>Have a look at our <Link to='/books'>books</Link> or visit our <Link to='/authors'>authors</Link>.</p>
    </Fragment>
)
