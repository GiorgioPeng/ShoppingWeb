import React from 'react'
import ProductGrid from '../../compents/ProductGrid'
import Kind from '../../compents/Kind'
import sendPost from '../../api/sendPost'
import CircularIndeterminate from '../../compents/CircularIndeterminate'
// 这个是这个项目的首页
function Index(props) {

    const [backDropOpen, setBackdropOpen] = React.useState(false);

    const {itemData, setItemData, loginInfo} = props

    React.useEffect(() => {
        const getProductsInfo = async () => {
            setBackdropOpen(true)
            const res = await sendPost('back_end_war_exploded/AllItems')
            if (res) {
                console.log('in Index ')
                const temp = res.Item
                console.log(temp)
                setItemData((previous) => { previous.push(...temp); return previous })
                // setItemData('abc')
            }
            setBackdropOpen(false)
        }
        // setItemData(getProductsInfo())
        getProductsInfo()
    }, [])


    return (
        <div>
            <Kind />
            {/* <TodayRecommand /> */}
            <ProductGrid loginInfo={loginInfo} itemData={itemData} />
            <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
        </div>
    )
}

export default Index

