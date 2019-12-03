import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GlobalStyle from '../../theme/GlobalStyle';
import ArticleItem from '../../components/ArticleItem';
import Checkbox from '../../components/Checkbox';
import dateTransformer from '../../helpers/dateTransformHelper'

const PageWrapper = styled.div`
  display: flex;
`;

const ArticlesWrapper = styled.div`
  
`;

const FiltersWrapper = styled.div`
  width: 240px;
`;

const SortWrapper = styled.div`

`;

const defaultFilters = ['fashion','sport'];

const Root = () => {
    const [ articles, setArticles ] = useState([]);
    const [ activeFilters, setActiveFilters ] = useState(defaultFilters);
    const [ sort, setSort ] = useState('newest');

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

    return (
        <>
            <GlobalStyle/>
            <PageWrapper>
                <FiltersWrapper>
                    <p>Data source:</p>
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
                </ArticlesWrapper>
                <SortWrapper>

                </SortWrapper>
            </PageWrapper>
        </>
    );
};

export default Root;