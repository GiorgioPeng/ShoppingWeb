import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import sendPost from '../api/sendPost';
import CircularIndeterminate from './CircularIndeterminate';
// 这个页面用于分类
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

function Kind(props) {
    const {setItemData,setSearchText } = props
    const classes = useStyles();
    const arr = ['clothes', 'toy', 'digital', 'medicine', 'car', 'baby', 'house', 'book', 'snack', 'tool']
    const [backDropOpen, setBackdropOpen] = React.useState(false);
    const [states, setStates] = useState(
        arr.map(i => { return { name: i, value: false } })
    )


    const findItem = async (i) => {
        setSearchText('')
        await setStates(
            states.map(el => {
                if (el.name === i) {
                    el.value = !el.value
                }
                return el
            })
        )
        let temp = arr.map((i,index)=>states[index].value?i:'')
        temp = temp.join(',')
        setBackdropOpen(true)
        const res = await sendPost('/back_end_war_exploded/FindItem', 'ItemType=' + temp)
        setBackdropOpen(false);
        console.log(res.Item)
        setItemData(res.Item)
    }

    //此处后端需要给一个图片的url
    const createKind = (arr) => {
        return arr.map((i) => {
            return <Chip size="small" label={i}
                avatar={<Avatar alt={i} src={`${process.env.PUBLIC_URL}/${i}.png`} />}
                clickable
                color={states.filter((el) => el.name === i)[0].value ? "primary" : "default"}
                // 这里是点击标签的逻辑
                onClick={() => findItem(i)}
                key={i}
            />
        })
    }

    return (
        <div className={classes.root}>
            {createKind(arr)}
            <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
        </div>
    );
}

export default Kind
