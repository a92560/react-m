import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, message } from 'antd';
import { DEVELOPMENT_IMG_BASE_URL } from '../../../utils/constants'
import { reqDeleteImg } from '../../../api';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {

  static propTypes = {
    imgs: PropTypes.array
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imgs: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // 根据传入的imgs生成符合条件的fileList
    // 更新图片不能返回原来的 prevState.imgs.length === prevState.fileList.length
    if(nextProps.imgs && nextProps.imgs.length > 0 && prevState.imgs.length === prevState.fileList.length){
      let imgs = nextProps.imgs.map((img, index) => {
        return {
          uid: - index,
          url: DEVELOPMENT_IMG_BASE_URL + img,
          status: "done",
          name: img
        }
      })
      return {
        fileList: imgs,
        imgs: nextProps.imgs
      }
    }
    return null
  }

  handleCancel = () => this.setState({ previewVisible: false });

  /* 
  进行大图预览的回调函数
  当前选中的图片对应的file
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) { // 如果file值没有图片url 只进行一次base64转换
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
  在file的状态改变时的监听回调
  给我传的是最新的fileList
  file 为当前操作的file
  */
  handleChange = async ({ fileList, file }) => {
    // 修改fileList最后一张图片
    // 即是修改当前操作的图片
    // 因为最后直接更新的是fileList
    if(file.status === 'done'){
      file = fileList[fileList.length - 1]
      const {name, url} = file.response.data
      file.name = name
      file.url = url
    }else if(file.status === 'removed'){
      // 删除图片
      const result = await reqDeleteImg(file.name)
      if(result.status === 0){
        message.success("删除图片成功")
      }else{
        message.error("服务器错误，请稍后重试。")
      }
    }
    this.setState({ fileList })
  };

  // 收集上传的图片名称
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/products/image/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall