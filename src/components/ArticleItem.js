import React from 'react';

const ArticleItem = ({id, date, image, preamble, title}) => (
    <div className="wrapper">
        <div className="image">
            <img src={image} alt={id}/>
        </div>
        <div className="content">
            <h2>{title}</h2>
            <p>{preamble}</p>
            <p>{date}</p>
        </div>
    </div>
);

export default ArticleItem;