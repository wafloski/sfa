import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GlobalStyle from '../../theme/GlobalStyle';
import ArticleItem from '../../components/ArticleItem';
import Checkbox from '../../components/Checkbox';
import dateTransformer from '../../helpers/dateTransformHelper'

const mobileWidth = '768px';

const filtersWrapperWidth = '200px';

const PageWrapper = styled.div`
    margin: 1rem auto 0;
    max-width: 1280px;
    display: flex;
    flex-wrap: wrap;
`;

const ArticlesWrapper = styled.div`
    width: 100%;
    padding: 2rem;
    @media ( min-width: ${mobileWidth} ) {
        width: calc(100% - ${filtersWrapperWidth});
        order: 3;
    }
`;

const FiltersWrapper = styled.div`
    width: 50%;
    padding-left: 2rem;
    @media ( min-width: ${mobileWidth} ) {
        width: ${filtersWrapperWidth};
        order: 2;
    }
`;

const SortWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: flex-end;
    padding: 0 2rem 3rem 0;
    @media ( min-width: ${mobileWidth} ) {
        width: 100%; 
        margin-right: 2rem;
    }
`;

const SortItem = styled.div`
    width: 160px;
`;

const StyledText = styled.p`
    margin-bottom: 2rem;
`;

const StyledButton = styled.button`
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    border: 1px solid #777;
    border-radius: 0.5rem;
    background-color: ${({active}) => ( active ? '#777' : 'transparent')};
    color: ${({active}) => ( active ? '#fff' : '#777')};
    cursor: ${({active}) => ( active ? '' : 'pointer')};
    padding: 1rem;
    transition: .2s;
    outline: 0;
    &:hover {
        opacity: ${({active}) => ( active ? '' : '0.8')};
    }
`;

const defaultFilters = ['fashion','sport'];

const Root = () => {
    const [ articles, setArticles ] = useState([]);
    const [ activeFilters, setActiveFilters ] = useState(defaultFilters);
    const [ sortType, setSortType ] = useState('');

    useEffect(() => {
        fetchArticles()
    }, []);

    const fetchArticles = () => {
        axios
            .all([
                axios.get(`http://localhost:6010/articles/fashion`),
                axios.get(`http://localhost:6010/articles/sports`)
            ])
            .then(axios.spread((res1, res2) => {
                setArticles(
                    [...res1.data.articles, ...res2.data.articles]
                );
            }))
            .catch(err => {
                console.log(err);
            })
    };

    const checkboxChangeHandler = (isChecked, name) => isChecked ? setActiveFilters([...activeFilters, name]) : setActiveFilters(activeFilters.filter(item => item !== name));

    const sortChangeHandler = (sortType) => {
        if (sortType === 'oldest') {
            articles.sort((a, b) => (Date.parse(dateTransformer(a.date))) - (Date.parse(dateTransformer(b.date))));
            setSortType('oldest');
        } else {
            articles.sort((a, b) => (Date.parse(dateTransformer(b.date))) - (Date.parse(dateTransformer(a.date))));
            setSortType('newest');
        }
        setArticles([...articles]);
    };

    return (
        <>
            <GlobalStyle/>
            <PageWrapper>
                <FiltersWrapper>
                    <StyledText>Data sources: </StyledText>
                    { defaultFilters.map((item) => (
                        <Checkbox
                            key={item}
                            name={item}
                            onChange={checkboxChangeHandler}
                        >
                            {item}
                        </Checkbox>
                    ))}
                </FiltersWrapper>
                <SortWrapper>
                    <SortItem>
                        <StyledText>Sort by date: </StyledText>
                        <StyledButton active={ sortType === 'newest'} onClick={() => sortChangeHandler('newest')}>Newest </StyledButton>
                        <StyledButton active={ sortType === 'oldest'} onClick={() => sortChangeHandler('oldest')}>Oldest </StyledButton>
                    </SortItem>
                </SortWrapper>
                <ArticlesWrapper>
                { articles.length ? articles.map(({id, date, image, preamble, title, category}) => (
                    activeFilters.includes(category) &&
                    <ArticleItem
                        key={id}
                        id={id}
                        date={date}
                        image={image}
                        preamble={preamble}
                        title={title}
                    />
                )) : <><h2>loading...</h2><h3>Please refresh the page if the application will not respond for a long time...</h3></> }
                { !activeFilters.length && <h3>Please choose correct data source...</h3> }
                </ArticlesWrapper>
            </PageWrapper>
        </>
    );
};

export default Root;