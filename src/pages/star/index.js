import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import StarList from './StarList'
import sendGet from '../../api/sendGet'

// define CSS
const useStyle = makeStyles(theme => ({
    root: {
        margin: '10px auto',
        marginTop: theme.spacing(10),
        width: '80%'
    }
}))

// star list component
// --
// props: from parent component, must include loginInfo
// --
// return: HTML elements
function Index(props) {
    const { loginInfo } = props;
    const classes = useStyle()
    const [starList,setStarList] = React.useState([])
    React.useEffect(() => {
        // send a request to the backend to get star list information when the login state is changed
        const getStarList = async () => {
            if (loginInfo) {
                const res = await sendGet('/back_end_war_exploded/AllCollections')
                setStarList(res.Collet)
            }
        }
        getStarList()
    }, [loginInfo])
    React.useEffect(()=>{
        // re-render the page if the starlist is changed
    },[starList])
    return (
        <div className={classes.root}>
            <Typography variant="h4">Star List</Typography>
            <StarList starList={starList}/>
        </div>
    )
}

export default Index

