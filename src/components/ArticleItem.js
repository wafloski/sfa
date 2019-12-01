import React from 'react';

const wrapperStyles = {
    display: 'flex'
};

const imageColStyles = {
    width: '25%'
};

const contentColStyles = {
    width: '75%'
};

const imageStyles = {
    maxWidth: '100%'
};

const ArticleItem = ({id, date, image, preamble, title}) => (
    <div className="wrapper" style={wrapperStyles}>
        <div className="image" style={imageColStyles}>
            <img src={image} alt={id} style={imageStyles}/>
        </div>
        <div className="content" style={contentColStyles}>
            <h2>{title}</h2>
            <p>{preamble}</p>
            <p>{date}</p>
        </div>
    </div>
);

export default ArticleItem;