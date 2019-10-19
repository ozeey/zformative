import React, { Component } from "react";
import "medium-draft/lib/index.css";
import { Editor, createEditorState } from "medium-draft";
import { convertToRaw } from "draft-js";
import { getDefaultKeyBinding, KeyBindingUtil, EditorState, AtomicBlockUtils } from "draft-js";

import ImageButton from './ImageButton'

const { hasCommandModifier } = KeyBindingUtil;

class SeparatorSideButton extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let editorState = this.props.getEditorState();
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('separator', 'IMMUTABLE', {});
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    this.props.setEditorState(
      AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        '-'
      )
    );
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        title="Add a separator"
        onClick={this.onClick}
      >
        <i className="fa fa-minus" />
      </button>
    );
  }
}

class AddEditor extends Component {
  constructor(props) {
    super(props);
    
    this.sideButtons = [{
      title: 'Image',
      component: ImageButton,
    },
    {
      title: 'Separator',
      component: SeparatorSideButton,
    }];

    this.state = {
      editorState: createEditorState(this.parseIt(props.editorState)),
    };

    this.onChange = editorState => {
      this.setState({ editorState });
    };

    this.refsEditor = React.createRef();
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  myKeyBindingFn = e => {
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      this.saveIt()
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  };

  handleKeyCommand = command => {
    if (command === "myeditor-save") {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.      
      return "handled";
    }
    return "not-handled";
  }

  componentDidMount() {
    this.refsEditor.current.focus();
  }

  parseIt(data) {
    console.log(data)
    return JSON.parse(data);
  }

  saveIt = () => {
    const editorData = convertToRaw(this.state.editorState.getCurrentContent());
    this.props.saveIt(JSON.stringify(editorData));
  };

  render() {
    const { editorState } = this.state;

    return (
      <div className="editor" onClick={this.focus}>
        <Editor
          ref={this.refsEditor}
          editorState={editorState}
          onChange={this.onChange}
          keyBindingFn={this.myKeyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          sideButtons={this.sideButtons}
          // onBlur={this.saveIt}
        />
      </div>
    );
  }
}

export default AddEditor;
