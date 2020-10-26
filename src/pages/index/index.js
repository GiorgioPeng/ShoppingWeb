import React from 'react'
import TodayRecommand from './todayRecommand'
import ProductGrid from '../../compents/ProductGrid'
import Kind from '../../compents/Kind'
import sendGet from '../../api/sendGet'
import CircularIndeterminate from '../../compents/CircularIndeterminate'
// 这个是这个项目的首页
function Index() {
    
    const [backDropOpen, setBackdropOpen] = React.useState(false);

    const [itemData, setItemData] = React.useState(null)

    React.useEffect(()=>{
        const getProductsInfo = async ()=> {
            setBackdropOpen(true)
            const res = await sendGet('back_end/AllItems')
            console.log(res)
            if(res){
                setItemData(res.Item)
            }
            setBackdropOpen(false)
        }
        getProductsInfo()
    },[])

    return (
        <div>
            <Kind/>
            <TodayRecommand/>
            <ProductGrid itemData={itemData}/>
            <CircularIndeterminate backDropOpen={backDropOpen} handle={()=>setBackdropOpen(false)}/>
        </div>
    )
}

export default Index

