import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import GlobalStyle from '../../theme/GlobalStyle';
import ArticleItem from '../../components/ArticleItem';
import Checkbox from '../../components/Checkbox';

const ArticlesWrapper = styled.div`
  
`;

const Root = () => {
    const defaultFilterSettings = [
        {
            name: 'fashion',
            checked: true
        },
        {
            name: 'sports',
            checked: true
        }
    ];

    const [ articles, setArticles ] = useState([]);
    const [ filters, setFilters ] = useState(defaultFilterSettings);
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

    const checkboxChangeHandler = (isChecked, name) => {
        const newFilters = filters.map(item => {
            if ( item.name === name ) {
                return {
                    name,
                    checked: isChecked
                }
            } else {
                return item;
            }
        });
        setFilters(newFilters);
    };

    return (
        <>
            <GlobalStyle/>
            { defaultFilterSettings.map(({name}) => (
                <Checkbox
                    key={name}
                    name={name}
                    onChange={checkboxChangeHandler}
                >
                    {name}
                </Checkbox>
            ))}
            <ArticlesWrapper>
            { articles.length ? articles.map(({id, date, image, preamble, title}) => (
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
        </>
    );
};

export default Root;