import React  from 'react';
import { Link } from "react-router-dom";

const Nav = ()  =>  (
    <div>
        <Link to={`/`}>Articles</Link>
        <Link to={`e`}>Editor</Link>
    </div>
)

export default Nav
