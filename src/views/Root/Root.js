import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalStyle from '../../theme/GlobalStyle';
import ArticleItem from '../../components/ArticleItem';

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

    const handleCheckboxChange = event => {
        const currentFilter = filters.map(obj => {
            if (obj.name === event.target.name) {
                return {
                    name: event.target.name,
                    checked: !obj.checked
                }
            } else {
                return obj
            }
        });
        setFilters(
            [...currentFilter]
        )
    };

    const Checkbox = ({children, ...props}) => {
        console.log(props);
        return (
            <label>
                <input type="checkbox" {...props} />
                {children}
            </label>
        )
    };

    return (
        <>
            <GlobalStyle/>
            { defaultFilterSettings.map(({name, checked}) => (
                <Checkbox
                    name={name}
                    key={name}
                    checked={checked}
                    onChange={(event) => handleCheckboxChange(event)}
                >
                    {name}
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
}

export default Root;