import React, { Component } from "react";
import { connect } from "react-redux";
import { getArticle, postArticle } from "../../state/articles/actions";
import AddEditor from "../editor/index";
import withMessages from "../loader";
import contentEditable from "./contentEditable";

class Editor extends Component {
  state = {
    title: "Title...",
    slug: null
  };

  // reason why its separate is infinite loop by editor
  stateData = {
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

  componentDidMount() {
    const {
      match: {
        params: { slug }
      },
      article
    } = this.props;
    if (slug !== undefined) {
      this.props.getArticleDispatch({ slug });
    }

    if (article) {
      this.stateData = {
        ...article
      };
      this.setState({ title: article.title });
    }
  }

  createSlug = string => {
    const a =
      "àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;";
    const b =
      "aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------";
    const p = new RegExp(a.split("").join("|"), "g");

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  onChangeTitle = title => {
    this.setState((state, props) => {
      return { title: title, slug: this.createSlug(title) };
    });
  };

  onChangeExcerpt = excerpt => {
    this.stateData = { ...this.stateData, excerpt };
  };

  onChangeBody = body => {
    this.stateData = { ...this.stateData, body };
  };

  saveIt = () => {
    let restType = "post";

    const {
      history,
      match: {
        params: { slug }
      }
    } = this.props;

    if (slug !== undefined) {
      restType = "put";
    }

    this.stateData = {
      ...this.stateData,
      title: this.state.title,
      slug: this.createSlug(this.state.title)
    };
    this.props.postArticleDispatch({ restType, data: this.stateData });

    if (this.state.slug) {
      history.push(this.state.slug);
    }
  };

  getEditorState = field => {
    const {
      article,
      match: { params }
    } = this.props;
    if (
      article == null ||
      article === undefined ||
      params === undefined ||
      params === null
    )
      return null;
    const { slug } = params;
    const { slug: articleSlug } = article;

    if (slug !== null && articleSlug === slug) return article[field];

    return null;
  };

  render() {
    const Editor = withMessages(AddEditor);
    const editorStateBody = this.getEditorState("body");
    const editorStateExcerpt = this.getEditorState("excerpt");
    let EditableH1 = contentEditable("h1");

    return (
      <div className="add-editor-wrapper">
        <EditableH1
          value={this.state.title}
          onSave={val => this.onChangeTitle(val)}
        />
        <br />
        <small>{this.state.slug}</small>
        <Editor
          onChange={this.onChangeExcerpt}
          {...this.props}
          editorState={editorStateExcerpt}
        />
        <Editor
          onChange={this.onChangeBody}
          {...this.props}
          editorState={editorStateBody}
        />
        <button onClick={this.saveIt}>Save It</button>
      </div>
    );
  }
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
)(Editor);
