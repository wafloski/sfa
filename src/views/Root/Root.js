import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GlobalStyle from '../../theme/GlobalStyle';
import ArticleItem from '../../components/ArticleItem';
import Checkbox from '../../components/Checkbox';
import dateTransformer from '../../helpers/dateTransformHelper'

const PageWrapper = styled.div`
    margin: 3rem auto 0;
    max-width: 1280px;
`;

const HeadWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const MainWrapper = styled.div`
    display: flex;
`;

const ArticlesWrapper = styled.div`
    width: calc(100% - 200px);
`;

const FiltersWrapper = styled.div`
    width: 200px;
`;

const SortWrapper = styled.div`
    width: 200px;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
`;

const StyledText = styled.p`
    margin-bottom: 2rem;
`;

const StyledButton = styled.button`
    display: block;
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
        console.log(sortType);
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
                <HeadWrapper>
                    <SortWrapper>
                        <StyledText>Sort by date: </StyledText>
                        <StyledButton active={ sortType === 'newest'} onClick={() => sortChangeHandler('newest')}> Newest </StyledButton>
                        <StyledButton active={ sortType === 'oldest'} onClick={() => sortChangeHandler('oldest')}> Oldest </StyledButton>
                    </SortWrapper>
                </HeadWrapper>
                <MainWrapper>
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
                </MainWrapper>
            </PageWrapper>
        </>
    );
};

export default Root;