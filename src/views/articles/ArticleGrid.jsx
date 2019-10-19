import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleGrid = ({ articles }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        {articles.map(article => (<ArticleCard key={article.id} article={article} />))}
    </div>
);

export default ArticleGrid;
