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
// store connection
import { connect } from "react-redux";
import { getCSRF } from "state/csrf/actions";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

function Main(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { children } = props;

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
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = ({ root: { csrf: { csrf } } = [] }) => {
  return {
    csrf
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
)(Main);
