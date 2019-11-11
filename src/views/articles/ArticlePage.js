import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// Redux components
import { getArticle, postArticle, deleteArticle } from "state/articles/actions";
import { createSlug } from "lib/helpers/Helpers";

// local components
import contentEditable from "./contentEditable";
import ArticleContainer from "views/containers/ArticleContainer";

import AddEditor from "../editor/index";
import withMessages from "../loader";

import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

function ArticlePage({
  article,
  getArticleDispatch,
  postArticleDispatch,
  deleteArticleDispatch,
  history,
  isDeleted,
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

  useEffect(() => {
    if (isDeleted === true) history.push("/");
  }, [isDeleted, history]);

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

  const toggleStatus = f => {
    setEditedPost({
      ...editedPost,
      status: editedPost.status === "active" ? "inactive" : "active"
    });
  };

  const togglePublish = f => {
    setEditedPost({
      ...editedPost,
      published_at: editedPost.published_at ? null : "published"
    });
  };

  const getEditorState = field => {
    return editedPost && editedPost[field] !== undefined
      ? editedPost[field]
      : null;
  };

  const removeArticle = () => {
    deleteArticleDispatch({ data: editedPost });
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
            <GridItem xs={12} sm={12} md={12} className={classes.title}>
              <EditableH3
                className={classes.title}
                value={editedPost.title}
                onSave={val => onChangeTitle(val)}
              />
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
              {"Save"}
            </Button>
            <Button
              color="primary"
              onClick={() => {
                togglePublish();
              }}
            >
              {editedPost.published_at === null ? "un published" : "published"}
            </Button>
            <Button
              color="primary"
              onClick={() => {
                toggleStatus();
              }}
            >
              {editedPost.status}
            </Button>
            <Button
              color="primary"
              onClick={() => {
                removeArticle();
              }}
            >
              Permanent Delete
            </Button>
          </GridContainer>
        </div>
      )}
    </ArticleContainer>
  );
}

const mapStateToProps = ({
  root: { articles: { article, error, isLoading, isDeleted } = [] } = []
}) => {
  return {
    article,
    error,
    isLoading,
    isDeleted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArticleDispatch: payload => dispatch(getArticle(payload)),
    postArticleDispatch: payload => dispatch(postArticle(payload)),
    deleteArticleDispatch: payload => dispatch(deleteArticle(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePage);
