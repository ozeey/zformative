import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// Redux components
import { getArticle, postArticle } from "state/articles/actions";
import { createSlug } from "lib/helpers/Helpers";

// local components
import contentEditable from "./contentEditable";
import ArticleContainer from "views/containers/ArticleContainer";

import AddEditor from "../editor/index";
import withMessages from "../loader";

import profile from "assets/img/faces/christian.jpg";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function ArticlePage({
  article,
  getArticleDispatch,
  postArticleDispatch,
  history,
  ...rest
}) {
  var initialPost = {
    id: null,
    title: "Title...",
    slug: null,
    excerpt: null,
    body: null,
    conclusion: null,
    excerpt_image: null,
    image_paths: null,
    paraCount: null,
    published_at: null,
    status: "inactive",
    tags: [],
    updated_at: null
  };

  const [editedPost, setEditedPost] = useState(initialPost);

  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const {
    match: {
      params: { slug }
    }
  } = rest;

  useEffect(() => {
    getArticleDispatch({ slug });
  }, [slug, getArticleDispatch]);

  useEffect(() => {
    setEditedPost(article);
  }, [article]);

  const onChangeTitle = title => {
    setEditedPost({ ...editedPost, title, slug: createSlug(title) });
  };

  const onChangeExcerpt = excerpt => {
    setEditedPost({ ...editedPost, excerpt });
  };

  const onChangeBody = body => {
    setEditedPost({ ...editedPost, body });
  };

  const saveIt = () => {
    let restType = "post";

    if (slug !== undefined && editedPost && editedPost.id) {
      restType = "put";
    }

    postArticleDispatch({ restType, data: editedPost });
    // make it callback of postArticleDispatch

    if (slug !== editedPost.slug) {
      history.push(editedPost.id ? editedPost.slug : `e/${editedPost.slug}`);
    }
  };

  const getEditorState = field => {
    console.log("field", editedPost);
    return editedPost && editedPost[field] !== undefined
      ? editedPost[field]
      : null;
  };

  const Editor = withMessages(AddEditor);
  let EditableH3 = contentEditable("h2");
  const editorStateExcerpt = getEditorState("excerpt");
  const editorStateBody = getEditorState("body");

  return (
    <ArticleContainer>
      {editedPost && (
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.profile}>
                <div>
                  <img src={profile} alt="..." className={imageClasses} />
                </div>
                <div className={classes.name}>
                  <EditableH3
                    className={classes.title}
                    value={editedPost.title}
                    onSave={val => onChangeTitle(val)}
                  />
                  <Button justIcon link className={classes.margin5}>
                    <i className={"fa fa-twitter"} />
                  </Button>
                  <Button justIcon link className={classes.margin5}>
                    <i className={"fa fa-instagram"} />
                  </Button>
                  <Button justIcon link className={classes.margin5}>
                    <i className={"fa fa-facebook"} />
                  </Button>
                </div>
              </div>
            </GridItem>
          </GridContainer>
          <div className={classes.description}>
            <Editor
              key={"excerpt"}
              saveIt={onChangeExcerpt}
              editorState={editorStateExcerpt}
              article={editedPost}
              {...rest}
            />
          </div>

          <div className={classes.description}>
            <Editor
              key={"body"}
              saveIt={onChangeBody}
              editorState={editorStateBody}
              article={editedPost}
              {...rest}
            />
          </div>
          <GridContainer justify="center">
            <Button color="primary" size="lg" onClick={saveIt}>
              {"Save It"}
            </Button>
          </GridContainer>
        </div>
      )}
    </ArticleContainer>
  );
}

const mapStateToProps = ({
  root: { articles: { article, error, isLoading } = [] } = []
}) => {
  return {
    article,
    error,
    isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticleDispatch: payload => dispatch(getArticle(payload)),
    postArticleDispatch: payload => dispatch(postArticle(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage);
