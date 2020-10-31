import React from 'react'
import ProductGrid from '../../compents/ProductGrid'
import Kind from '../../compents/Kind'
import sendPost from '../../api/sendPost'
import CircularIndeterminate from '../../compents/CircularIndeterminate'

// the index page of the system 
// --
// props: from parent component, must include itemData, setItemData, searchText, setSearchText and loginInfo
// --
// return: HTML elements
function Index(props) {

    const [backDropOpen, setBackdropOpen] = React.useState(false);

    const {itemData, setItemData, searchText, setSearchText, loginInfo} = props

    React.useEffect(() => {
        // get all item infomation from backend and set state of the component
        const getProductsInfo = async () => {
            setBackdropOpen(true)
            const res = await sendPost('back_end_war_exploded/AllItems')
            if (res) {
                const temp = res.Item
                setItemData((previous) => { previous.push(...temp); return previous })
            }
            setBackdropOpen(false)
        }
        getProductsInfo()
    }, [])


    return (
        <div>
            <Kind setItemData={setItemData} setSearchText={setSearchText} searchText={searchText}/>
            <ProductGrid loginInfo={loginInfo} itemData={itemData} />
            <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
        </div>
    )
}

export default Index

