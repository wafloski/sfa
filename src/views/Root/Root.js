import React, { Component } from 'react';
import axios from 'axios';
import ArticleItem from '../../components/ArticleItem';

class Root extends Component {
    state = {
        articles: []
    };

    componentDidMount() {
        this.fetchArticles('fashion');
    }

    fetchArticles = (type) => {
        axios
            .get(`http://localhost:6010/articles/${type}`)
            .then(({data}) => {
                console.log(data.articles);
                this.setState({
                    articles: data.articles
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <>
                { this.state.articles.map(({id, date, image, preamble, title}) => (
                    <ArticleItem
                        id={id}
                        date={date}
                        image={image}
                        preamble={preamble}
                        title={title}
                    />
                )) }
            </>
        );
    };
}

export default Root;