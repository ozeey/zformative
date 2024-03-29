import React, { useEffect } from "react";
// nodejs library that concatenates classes
import { connect } from "react-redux";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import SmartImage from "components/SmartImage";

// Redux store components
import { getArticles, postArticle } from "state/articles/actions";
import { parseExcerpt, parseExcerptImage } from "state/articles/selectors";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);


const ArticleCard = ({ imageClasses, classes, article }) => {
  const { excerpt } = article;
  const excerptJson = parseExcerpt(excerpt);
  const excerptImage = parseExcerptImage(excerpt);

  return (
    <Card plain>
      <Link to={`e/${article.slug}`}>
        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
          <SmartImage src={excerptImage} width="150" />
        </GridItem>
        <h4 className={classes.cardTitle}>{article.title}</h4>
        <CardBody>
          <p className={classes.description}>{excerptJson}</p>
        </CardBody>
      </Link>
    </Card>
  );
};

function ArticlesSection({ articles, getArticlesDispatch }) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid
  );

  useEffect(() => {
    getArticlesDispatch({});
  }, [getArticlesDispatch]);

  return (
    <div className={classes.section}>
      <GridContainer>
        {articles.map((article, i) => {
          return (
            <GridItem
              xs={12}
              sm={4}
              md={4}
              key={article.id}
              className={classes.flex}
            >
              <ArticleCard
                article={article}
                imageClasses={imageClasses}
                classes={classes}
              />
            </GridItem>
          );
        })}
      </GridContainer>
    </div>
  );
}

const mapStateToProps = ({
  root: { articles: { articles, error, isLoading } = [] } = []
}) => {
  return {
    articles,
    error,
    isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticlesDispatch: () => dispatch(getArticles()),
    postArticleDispatch: payload => dispatch(postArticle(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesSection);
