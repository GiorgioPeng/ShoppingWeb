import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
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

function Kind() {
    const classes = useStyles();
    const arr = ['clothes', 'toy', 'digital', 'medicine', 'car', 'baby', 'house', 'book', 'snack', 'tool']
    const [states, setStates] = useState(
        arr.map(i => { return { name: i, value: false } })
    )

    //此处后端需要给一个图片的url
    const createKind = (arr) => {
        return arr.map((i) => {
            return <Chip size="small" label={i}
                avatar={<Avatar alt={i} src={`${process.env.PUBLIC_URL}/${i}.png`} />}
                clickable
                color={states.filter((el) => el.name === i)[0].value ? "primary" : "default"}
                // 这里是点击标签的逻辑
                onClick={() => {
                    setStates(
                        states.map(el => {
                            if (el.name === i) {
                                el.value = !el.value
                            }
                            return el
                        })
                    )
                }
                }
                key={i}
            />
        })
    }

    return (
        <div className={classes.root}>
            {createKind(arr)}
        </div>
    );
}

export default Kind
