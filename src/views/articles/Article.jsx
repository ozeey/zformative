import React from 'react';

const Article = ({ article, match }) => (
    <div>
        <h3>{`${match.params.slug}`}</h3>
    </div>
);

export default Article;
