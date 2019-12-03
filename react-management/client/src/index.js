/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-20 12:45:59
 * @LastEditors: Darren
 * @LastEditTime: 2019-11-21 14:49:38
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './api'
import * as serviceWorker from './serviceWorker';

ReactDOM.render( < App / > , document.getElementById('root'));
serviceWorker.unregister();