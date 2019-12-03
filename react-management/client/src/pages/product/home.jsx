import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Product from './product'
import ProductDetail from './product-detail'
import WrapperProductAddUpdate from './product-add-update'
import './product.less'
class ProductHome extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" exact component={Product}/>
        <Route path="/product/detail/:id" component={ProductDetail}/>
        <Route path="/product/addupdate/:id/:page" component={WrapperProductAddUpdate}/>
        <Route path="/product/addupdate/:page" component={WrapperProductAddUpdate}/>
        <Redirect to="/product"/>
      </Switch>
    )
  }
}

export default ProductHome