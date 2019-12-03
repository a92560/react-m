import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import {
  Card,
  Button
} from 'antd'

class Bar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sales: [5, 20, 36, 10, 10, 20], // 销量的数组
      stores: [6, 10, 25, 20, 15, 10], // 库存的数组
    }
  }


  getOption = (sales, stores) => {
    return {
      title: {
        text: '测试数据'
      },
      tooltip: {},
      legend: {
        data: ['销量', '库存']
      },
      xAxis: {
        data: ["视频广告", "联盟广告", "邮件营销", "直接访问", "搜索引擎"]
      },
      yAxis: {},
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [
            { value: 235, name: '视频广告' },
            { value: 274, name: '联盟广告' },
            { value: 310, name: '邮件营销' },
            { value: 335, name: '直接访问' },
            { value: 400, name: '搜索引擎' }
          ],
          roseType: 'angle',
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store - 1)
        return pre
      }, [])
    }))
  }

  render() {
    const { stores, sales } = this.state
    echarts.registerTheme('my_theme', {
      backgroundColor: '#f4cccc'
    });
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.update}>更新</Button>
        </Card>
        <Card title="柱状图">
          <ReactEcharts
            option={this.getOption(sales, stores)}
            theme='my_theme'
          />
        </Card>
      </div>

    )
  }
}

export default Bar