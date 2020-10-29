import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import ShoppingCarList from './ShoppingCarList'
// import sendPost from '../../api/sendPost'
// 这个页面用来展示用户添加进购物车的商品
const useStyle = makeStyles(theme=>({
    root:{
        margin:'10px auto',
        marginTop:theme.spacing(10),
        width:'80%'
    }
}))
function Index() {
    React.useEffect(()=>{
        // const getShoppingCarList = async ()=>{
        //     const res = await sendPost()
        // }
    },[])
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Typography variant="h4">Shopping Car</Typography>
            <ShoppingCarList/>
        </div>
    )
}

export default Index

