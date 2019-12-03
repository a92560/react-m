import React, { Component } from 'react'
import { Form, Button, Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
class AddUpdateForm extends Component {

  static propTypes = {
    setForm: PropTypes.func.isRequired,
    categoryName: PropTypes.string
  }

  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { categoryName } = this.props
    const { getFieldDecorator } = this.props.form

    return (
      <Form>
        <Item>
          {
            getFieldDecorator("categoryName", {
              initialValue: categoryName || "",
              rules: [
                {
                  required: true, message: "请输入分类名称"
                }
              ]
            })(<Input placeholder="请输入分类" />)
          }
        </Item>
      </Form>
    )
  }
}

const WrapperAddUpdateForm = Form.create()(AddUpdateForm)

export default WrapperAddUpdateForm