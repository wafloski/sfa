import React from 'react';
import styled from 'styled-components';

const mobileWidth = '768px';

const ArticleWrapper = styled.div`
    display: flex;
    margin-bottom: 3rem;
    transition: .2s;
    min-height: 180px;
    &:hover {
        opacity: 0.9;
    }
`;

const ArticleImageWrapper = styled.div`
    width: 25%;
`;

const ArticleContentWrapper = styled.div`
    padding: 0;
    margin: 0 2rem;
    width: 75%;
`;

const StyledImage = styled.img`
    max-width: 100%;
    min-height: 160px;
    object-fit: cover;
`;

const StyledNotFound = styled.p`
    text-align: center;
    width: 100%;
    margin-top: 4rem;
`;

const ArticleHeading = styled.div`
    display: block;
    justify-content: space-between;
    @media ( min-width: ${mobileWidth} ) {
        display: flex;
    }
`;

const ArticleTitle = styled.h2`
    margin-top: 0;
    font-size: 2rem;
    @media ( min-width: ${mobileWidth} ) {
        display: flex;
        font-size: 2.4rem;
    }
`;

const ArticleDate = styled.p`
    text-align: right;
    margin: 0.8rem 0 0 3rem;
    white-space: nowrap;
`;

const ArticlePreamble = styled.p`
    display: none;
    font-size: 1.5rem;
    @media ( min-width: ${mobileWidth} ) {
        display: block;
    }
`;

const ArticleItem = ({id, date, image, preamble, title}) => (
    <ArticleWrapper>
        <ArticleImageWrapper>
            { image ? <StyledImage src={image} alt={id} /> : <StyledNotFound>image not found :(</StyledNotFound> }
        </ArticleImageWrapper>
        <ArticleContentWrapper>
            <ArticleHeading>
                <ArticleTitle>{title}</ArticleTitle>
                <ArticleDate>{date}</ArticleDate>
            </ArticleHeading>
            <ArticlePreamble>{preamble}</ArticlePreamble>
        </ArticleContentWrapper>
    </ArticleWrapper>
);

export default ArticleItem;