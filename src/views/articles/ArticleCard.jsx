import React from 'react';
import {Link } from "react-router-dom";

const ArticleCard = ({ article }) => (
    <div>
        <Link to={`r/${article.slug}`}>
            <img style={{ width: '300px', height: '300px' }} src={article.imageUrl} alt={article.title} />
            <h3>{article.title}</h3>
        </Link>
        <Link to={`e/${article.slug}`}>Edit</Link>
    </div>
);

export default ArticleCard;
