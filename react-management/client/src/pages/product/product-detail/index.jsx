import React, { Component } from 'react'
import {
  Card,
  List,
  Icon,
  message
} from 'antd'
import LinkButton from '../../../component/link-button/link-button'
import './index.less'
import { DEVELOPMENT_IMG_BASE_URL } from '../../../utils/constants'
import { reqProductDetail, reqCategoryName } from '../../../api'
const Item = List.Item

class ProductDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      product: {},
      categoryName: ""
    }
  }

  async componentWillMount() {
    if (this.props.location.state) {
      this.page = this.props.location.state.page
      this.setState({
        product: this.props.location.state.product
      })
      this.getCategoryName(this.props.location.state.product.categoryId)
    }
  }

  async componentDidMount() {
    let product = this.state.product
    if (!product || !product._id) {
      // 没数据 重新获取
      const { id } = this.props.match.params
      await this.initGetProductDetail(id)
    } else {
      // 有数据 直接获取
      this.getCategoryName(product.categoryId)
    }
  }


  getCategoryName = async (_id) => {
    // 有数据
    // 把分类ID转换成分类名称
    const result = await reqCategoryName(_id)
    if (result.status === 0) {
      this.setState({
        categoryName: result.data[0].name
      })
    } else {
      message.error(result.message)
    }
  }

  initGetProductDetail = async (_id) => {
    const result = await reqProductDetail(_id)
    if (result.status === 0) {
      this.setState({
        product: result.data[0]
      }, () => {
        this.getCategoryName(this.state.product.categoryId)
      })
    } else {
      this.props.history.replace("/product")
      message.error(result.message)
    }
  }

  render() {
    // card title
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.replace({ pathname: "/product", state: { page: this.page } })}>
          <Icon type="arrow-left" />
        </LinkButton>
        <span>商品详情</span>
      </span>
    )


    const { name, desc, price, categoryId, detail, imgs } = this.state.product


    return (
      <Card title={title} className="detail">
        <List>
          <Item>
            <span className="detail-left">商品名称：</span>
            <span>{name}</span>
          </Item>
          <Item>
            <span className="detail-left">商品描述：</span>
            <span>{desc}</span>
          </Item>
          <Item>
            <span className="detail-left">商品价格：</span>
            <span>{price}</span>
          </Item>
          <Item>
            <span className="detail-left">所属分类：</span>
            <span>{this.state.categoryName}</span>
          </Item>
          <Item>
            <span className="detail-left">商品图片：</span>
            <span>
              {
                (imgs && imgs.length > 0) && imgs.map((image, index) => (
                  <img src={DEVELOPMENT_IMG_BASE_URL + image} key={index} className="detail-img" alt="product img" />
                ))
              }
            </span>
          </Item>
          <Item>
            <span className="detail-left">商品详情：</span>
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </Item>
        </List>
      </Card>
    )
  }
}

export default ProductDetail