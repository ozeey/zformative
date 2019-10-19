import PropTypes from "prop-types";
import React from "react";
import { ImageSideButton, Block, addNewBlock } from "medium-draft";
import "isomorphic-fetch";
import Network from "lib/net/network";
import { connect } from "react-redux";

class ImageButton extends ImageSideButton {
  onChange(e) {
    const file = e.target.files[0];

    if (file.type.indexOf("image/") === 0) {
      const formData = new FormData();
      const { article } = this.props;

      formData.append("image", e.target.files[0]);
      formData.append("id", article ? article.id : 0);
      formData.append("title", article ? article.title : '');
      formData.append("indication", "e");

      const network = new Network();
      network.secureAxios(`/blog/add-image`, formData).then(response => {
        if (response.status === 200) {
          const { data } = response;
          if (data) {
            this.props.setEditorState(
              addNewBlock(this.props.getEditorState(), Block.IMAGE, {
                src: data.url
              })
            );
          }
        }
      });
    }
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        onClick={this.onClick}
        title="Add an Image"
      >
        <i className="fa fa-image" />
        <input
          type="file"
          accept="image/*"
          ref={c => {
            this.input = c;
          }}
          onChange={this.onChange}
          style={{ display: "none" }}
        />
      </button>
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

export default connect(
  mapStateToProps,
  null
)(ImageButton);
