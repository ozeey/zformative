import React from "react";

function contentEditable(WrappedComponent) {
  return class extends React.Component {
    state = {
      editing: false
    };

    toggleEdit = e => {
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel();
      } else {
        this.edit();
      }
    };

    edit = () => {
      this.setState(
        {
          editing: true
        },
        () => {
          this.domElm.focus();
        }
      );
    };

    save = () => {
      this.setState(
        {
          editing: false
        },
        () => {
          if (this.props.onSave && this.isValueChanged()) {
            this.props.onSave(this.domElm.textContent);
          }
        }
      );
    };

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent;
    };

    handleKeyDown = e => {
      const { key } = e;
      switch (key) {
        case "Enter":
        case "Escape":
          this.save();
          break;
        default:
          return null;
      }
    };

    render() {
      let editOnClick = true;
      const { editing } = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick;
      }
      return (
        <WrappedComponent
          className={editing ? "editing" : ""}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={domNode => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          suppressContentEditableWarning={true}
          placeholder="Write your title"
          style={{ width: "100%" }}
        >
          {this.props.value}
        </WrappedComponent>
      );
    }
  };
}

export default contentEditable;
