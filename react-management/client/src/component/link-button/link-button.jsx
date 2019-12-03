import React, { Component } from 'react'
import './link-button.less'
function LinkButton(props){
  return (
    <button {...props} className="link-button"/>
  )
}

export default LinkButton