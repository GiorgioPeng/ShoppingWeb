import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import StarList from './StarList'
// 这个页面用来显示用户收藏的商品
const useStyle = makeStyles(theme=>({
    root:{
        margin:'10px auto',
        marginTop:theme.spacing(10),
        width:'80%'
    }
}))
function Index() {
    const classes = useStyle()
    return (
        <div className={classes.root}>
            <Typography variant="h4">Star List</Typography>
            <StarList/>
        </div>
    )
}

export default Index

