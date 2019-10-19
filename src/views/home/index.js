import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCSRF } from '../../state/csrf/actions'
import { getArticles, postArticle } from '../../state/articles/actions'
import ArticleGrid from '../articles/ArticleGrid'
import Nav from '../nav'
import withMessages from '../loader'

class Home extends Component {

  componentDidMount() {
    this.props.getCSRFDispatch()
    this.props.getArticlesDispatch({})
  }

  fetchArticles = () => {
    this.props.getArticlesDispatch({})
  }
  
  postArticle = (data) => {

    const articleData = {
      slug: "slug-" + Math.floor((Math.random() * 100) + 1),
      title: "My Temp title",
      published_at: null,
      excerpt: data
    }

    this.props.postArticleDispatch(articleData)
  }

  render() {

    const Articles = withMessages(ArticleGrid)

    return (
      <div >
        <Nav />
        <Articles {...this.props}/>
      </div>
    )
  }
}

const mapStateToProps = ({root: {articles: {articles, error, isLoading} = []} = []}) => {
  return {
    articles, error, isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCSRFDispatch: payload => dispatch(getCSRF()),
    getArticlesDispatch: payload => dispatch(getArticles()),
    postArticleDispatch: payload => dispatch(postArticle(payload)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
