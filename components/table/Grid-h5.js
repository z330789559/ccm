import { useState, useEffect, useLayoutEffect } from 'react'
import React, { Component } from 'react'
import Styled from 'styled-components'
import http from '../../utils/http'
import { injectIntl } from 'react-intl'
import { Empty } from 'antd'

const GridH5 = injectIntl(({ url, columns, otherParam = '', isShow, intl }) => {
  const [gridData, setGridData] = useState([])
  const ps = 6
  const [pn, setPn] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [first, setFirst] = useState(true)

  const init = (number, type) => {
    http.get(`${url}?pn=${number || pn}&ps=${ps}${otherParam}`, (data) => {
      const number = data.total % ps === 0 ? data.total / ps : Math.ceil(data.total / ps)
      setTotalPage(number)
      setGridData(type === 'concat' ? gridData.concat(data.rows) : data.rows)
    })
  }

  useEffect(() => {
    isShow && init()
  }, [])

  useEffect(() => {
    if (first) {
      setFirst(false)
    } else {
      setPn(1)
      init(1)
    }
  }, [otherParam])

  const handleNextPage = () => {
    setPn(pn + 1)
    init(pn + 1, 'concat')
  }

  return (
    <Box>
      {gridData.map((item) => (
        <GridList key={item._id}>
          <div className="rs-h5-grid-title">
            {columns[0].title} # {columns[0].render(item[columns[0].dataIndex], item)}
          </div>
          {columns.slice(1).map((col) =>
            col.h5 ? (
              <div className="rs-h5-table-li" key={col.dataIndex}>
                <span>{col.title}:</span>
                <p>{col.render(item[col.dataIndex], item)}</p>
              </div>
            ) : (
              ''
            )
          )}
        </GridList>
      ))}
      {gridData.length === 0 && <Empty style={{ paddingTop: 20 }} />}
      {totalPage !== 0 && pn < totalPage && (
        <div className="next-page" onClick={() => handleNextPage()}>
          {intl.messages.lang63}
        </div>
      )}
    </Box>
  )
})
const Box = Styled.div`
  padding-bottom:30px;
  .next-page{
    margin-top: 20px;
    text-align: center;
    color: #1890ff;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }
`
const GridList = Styled.div`
  box-shadow: 0 0 8px 0 hsla(0,0%,40%,.11);
  background:#fff;
  padding: 10px;
  margin-bottom:10px;
  border-radius: 6px;
  .rs-h5-grid-title{
    height:30px;
    line-height: 30px;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .rs-h5-table-li{
    display:flex;
    line-height:25px;
     > span{
      text-align:right;
      color:rgb(119, 130, 177);
      padding-right:10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p{
      flex:1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin:0;
    }
  }
`

export default GridH5
