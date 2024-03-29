import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
// import ProductSection from "./Sections/ProductSection";
import ArticlesSection from "./Sections/ArticlesSection";
// import WorkSection from "./Sections/WorkSection";

// store connection
import { connect } from "react-redux";
import { getCSRF } from "state/csrf/actions";
import { parseExcerpt, parseExcerptImage } from "state/articles/selectors";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function LandingPage(props) {
  // useEffect(() => {
  // props.getCSRFDispatch();
  // },[]);

  // const fetchArticles = () => {
  //   props.getArticlesDispatch({});
  // };

  // const postArticle = data => {
  //   const articleData = {
  //     slug: "slug-" + Math.floor(Math.random() * 100 + 1),
  //     title: "My Temp title",
  //     published_at: null,
  //     excerpt: data
  //   };

  //   this.props.postArticleDispatch(articleData);
  // };

  const classes = useStyles();
  const { articles, ...rest } = props;
  const first = articles && articles.length > 0 ? articles[0] : null;

  const { excerpt } = first;
  const excerptJson = parseExcerpt(excerpt);
  const excerptImage = parseExcerptImage(excerpt);

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="zFormative"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      {first && (
        <Parallax filter image={ excerptImage ? excerptImage : require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>{first.title}</h1>
                <h4>{excerptJson}</h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href={`e/${first.slug}`}
                  rel="noopener noreferrer"
                >
                  Read more
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
      )}
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* <ProductSection /> */}
          <ArticlesSection />
          {/* <WorkSection /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({
  root: {
    csrf: { csrf },
    articles: { articles, error, isLoading } = []
  }
}) => {
  return {
    csrf,
    articles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCSRFDispatch: payload => dispatch(getCSRF())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
