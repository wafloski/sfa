import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStyle from '../../theme/GlobalStyle';
import ArticleItem from '../../components/ArticleItem';
import Checkbox from '../../components/Checkbox';

const Root = () => {
    const defaultFilterSettings = ['fashion','sports'];

    const [ articles, setArticles ] = useState([]);

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

    return (
        <>
            <GlobalStyle/>
            { defaultFilterSettings.map((type) => (
                <Checkbox
                    name={type}
                    key={type}
                >
                    {type}
                </Checkbox>
            ))}
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
        </>
    );
};

export default Root;