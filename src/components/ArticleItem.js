import React from 'react';
import styled from 'styled-components';

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
    width: 280px;
`;

const ArticleContentWrapper = styled.div`
    padding: 0;
    margin: 0 20px;
    width: calc(100% - 280px);
`;

const StyledImage = styled.img`
    width: 280px;
`;

const StyledNotFound = styled.p`
    text-align: center;
    width: 280px;
    margin-top: 4rem;
`;

const ArticleHeading = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ArticleTitle = styled.h2`
    margin-top: 0;
`;

const ArticleDate = styled.p`
    text-align: right;
    margin: 0 0 0 3rem;
    white-space: nowrap;
`;

const ArticlePreamble = styled.p`
    font-size: 1.5rem;
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