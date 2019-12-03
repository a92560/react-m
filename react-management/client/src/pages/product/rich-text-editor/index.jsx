import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { API_BASE_URL } from '../../../utils/constants'

class RichTextEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }

  state = {
    editorState: EditorState.createEmpty(),
    detail: ""
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.detail && nextProps.detail !== prevState.detail){
      // 根据detail生成一个editorState
      const contentBlock = htmlToDraft(nextProps.detail)
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      // 更新状态
      return {
        editorState,
        detail: nextProps.detail
      }
    }
    return null
  }
  

  onEditorStateChange = debounce((editorState) => {
    this.setState({
      editorState,
    });
  }, 0);

  // 上传图片
  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', "/api/products/image/upload");
        const data = new FormData();
        data.append('file', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText); // {status: 0, data: {}}
          debugger
          resolve({ data: { link: response.data.url } })
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  // 方便ref获取我们富文本编辑器的内容
  getDetail = () => {
    const { editorState } = this.state
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  render() {

    const { editorState } = this.state;

    return (
      <div>

        <Editor
          editorState={editorState}
          toolbar={{
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorStyle={{ height: 400, overflow: "auto", lineHeight: 1, border: "1px solid #000", padding: "0 0 10px 10px", margin: 10 }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          style={{ height: 200 }}
        /> */}
      </div>
    )
  }
}

export default RichTextEditor

