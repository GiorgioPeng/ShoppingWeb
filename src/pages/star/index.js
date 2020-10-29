import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import StarList from './StarList'
import sendGet from '../../api/sendGet'
// 这个页面用来显示用户收藏的商品
const useStyle = makeStyles(theme => ({
    root: {
        margin: '10px auto',
        marginTop: theme.spacing(10),
        width: '80%'
    }
}))
function Index(props) {
    const { loginInfo } = props;
    const classes = useStyle()
    const [starList,setStarList] = React.useState([])
    React.useEffect(() => {
        const getStarList = async () => {
            if (loginInfo) {
                const res = await sendGet('/back_end_war_exploded/AllCollections')
                setStarList(res.Collet)
            }
        }
        getStarList()
    }, [loginInfo])
    React.useEffect(()=>{
        console.log(starList)
    },[starList])
    return (
        <div className={classes.root}>
            <Typography variant="h4">Star List</Typography>
            <StarList starList={starList}/>
        </div>
    )
}

export default Index

