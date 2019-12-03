import React, { Component } from 'react'
import {
  Form,
  Input,
  Icon,
  Select,
  Card,
  Button,
  message
} from 'antd'
import { reqProductDetail } from '../../../api'
import LinkButton from '../../../component/link-button/link-button'
import { reqCategorys, reqUpdateProduct, reqAddProduct } from '../../../api'
import PicturesWall from '../pictures-wall'
import RichTextEditor from '../rich-text-editor'

const Item = Form.Item
const Option = Select.Option
class ProductAddUpdate extends Component {

  constructor(props) {
    super(props)
    this.pwRef = React.createRef()
    this.editorRef = React.createRef()
    this.state = {
      categorys: [],
      product: {},
      isUpdate: false
    }
  }

  async componentWillMount() {
    // 第一次进入
    if (this.props.location.state) {
      if (this.props.location.state.product) {
        this.isUpdate = !!this.props.location.state.product._id
        this.product = this.props.location.state.product
      }
    }
  }

  async componentDidMount() {
    this.getCategorys()
    if (!this.props.location.state && this.props.match.params.id) {
      const result = await reqProductDetail(this.props.match.params.id)
      if (result.status === 0) {
        this.setState({
          product: result.data[0],
          isUpdate: true
        })
      } else {
        message.error(result.message)
      }
    }
  }

  getCategorys = async () => {
    const result = await reqCategorys()
    if (result.status === 0) {
      this.setState({
        categorys: result.data
      })
    } else {
      message.error(result.message)
    }
  }

  // 对价格进行自定义验证
  validatePrice = (rule, value, callback) => {
    if ((value * 1) <= 0) {
      callback("价格必须大于0")
    } else {
      callback()
    }
  }

  // 提交表单
  handleSubmit = (e) => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { name, price, desc, categoryId } = values

        // 收集上传的图片文件名的数组
        const imgs = this.pwRef.current.getImgs()

        // 收集富文本编辑器的内容
        const detail = this.editorRef.current.getDetail()

        const product = { name, price, desc, categoryId, detail, imgs }
        let result = null
        if (this.isUpdate || this.state.isUpdate) {
          // 更新商品数据
          result = await reqUpdateProduct(((this.product && this.product._id) || this.state.product._id), product)
          if (result.status === 0) {
            message.success("更新商品信息成功")
            this.props.history.replace("/product")
          } else {
            message.error(result.message)
          }
        } else {
          result = await reqAddProduct(product)
          if (result.status === 0) {
            message.success("添加商品信息成功")
            this.props.history.replace("/product")
          } else {
            message.error(result.message)
          }
        }
      } else {
        message.error("必填项缺失！")
      }
    })
  }


  render() {

    let { isUpdate, product = {} } = this

    // 解决刷新的问题
    if (!product._id) {
      product = this.state.product
      isUpdate = this.state.isUpdate
    }

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.replace({ pathname: "/product", state: { page: Number(this.props.match.params.page) } })}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>
          {
            isUpdate ? "更新商品" : "添加商品"
          }
        </span>
      </span>
    )

    const { getFieldDecorator } = this.props.form


    const formLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title} style={{ marginBottom: 20 }}>
        <Form {...formLayout} onSubmit={this.handleSubmit}>
          <Item label="商品名称">
            {
              getFieldDecorator("name", {
                initialValue: product.name || "",
                rules: [
                  {
                    required: true,
                    message: "商品名称为必选项"
                  }
                ]
              })(<Input type="text" placeholder="请输入商品名称" />)
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator("desc", {
                initialValue: product.desc || "",
                rules: [
                  {
                    required: true,
                    message: "商品描述为必选项"
                  }
                ]
              })(<Input type="text" placeholder="请输入商品描述" />)
            }
          </Item>
          <Item label="商品价格">
            {
              getFieldDecorator("price", {
                initialValue: product.price || "",
                rules: [
                  {
                    validator: this.validatePrice
                  },
                  {
                    required: true,
                    message: "商品价格为必选项"
                  }
                ]
              })(<Input type="number" placeholder="请输入商品价格" addonAfter="元" />)
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator("categoryId", {
                initialValue: product.categoryId || "",
                rules: [
                  {
                    required: true,
                    message: "商品分类为必选项"
                  }
                ]
              })(
                <Select>
                  <Option value="">未选择</Option>
                  {
                    this.state.categorys.length > 0 && this.state.categorys.map(category => (
                      <Option value={category._id} key={category._id}>{category.name}</Option>
                    ))
                  }
                </Select>
              )
            }
          </Item>
          <Item label="商品图片">
            <div>
              {/* 将容器交给需要标记的标签对象 在解析时就会自动将标签对象保存到容器中 (属性名为current 属性值为标签对象) */}
              <PicturesWall ref={this.pwRef} imgs={product.imgs || this.state.product.imgs} />
            </div>
          </Item>
          <Item label="商品详情" wrapperCol={{ span: 20 }}>
            <div>
              <RichTextEditor ref={this.editorRef} detail={product.detail || this.state.product.detail} />
            </div>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
const WrapperProductAddUpdate = Form.create()(ProductAddUpdate)
export default WrapperProductAddUpdate