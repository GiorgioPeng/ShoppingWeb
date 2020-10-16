import React from 'react'
import TodayRecommand from './todayRecommand'
import ProductGrid from '../../compents/ProductGrid'
import Kind from '../../compents/Kind'
// 这个是这个项目的首页
function index() {
    return (
        <div>
            <Kind/>
            <TodayRecommand/>
            <ProductGrid/>
        </div>
    )
}

export default index

