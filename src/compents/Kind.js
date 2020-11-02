import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import sendPost from '../api/sendPost';
import CircularIndeterminate from './CircularIndeterminate';

// define the CSS
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

// Classification Component
// -- 
// props: from parent component, must inlude setItemData and setSearchText
// --
// return: HTML elements
function Kind(props) {
    const { setItemData, setSearchText } = props
    const classes = useStyles();
    const [backDropOpen, setBackdropOpen] = React.useState(false);

    // type labels array
    const arr = ['clothes', 'toy', 'digital', 'medicine', 'car', 'baby', 'house', 'book', 'snack', 'tool']

    const [states, setStates] = useState(
        arr.map(i => { return { name: i, value: false } })
    )

    // get a item information based on product type
    // --
    // typeLabel: string, a type label
    const findItem = async (typeLabel) => {
        setSearchText('')
        await setStates(
            states.map(el => {
                if (el.name === typeLabel) {
                    el.value = !el.value
                }
                return el
            })
        )
        let temp = arr.map((typeLabel, index) => states[index].value ? typeLabel : '')
        temp = temp.join(',')
        setBackdropOpen(true)
        let res;
        if (temp.length === 0) {
            res = await sendPost('/back_end_war_exploded/FindItem',`ItemName=`)
        }
        else {
            res = await sendPost('/back_end_war_exploded/FindItem', 'ItemType=' + temp)
        }
        setBackdropOpen(false);
        setItemData(res.Item)
    }

    // create HTML elements of each type label
    // -- 
    // arr: type label array
    // --
    // return: HTML elements
    const createKind = (arr) => {
        return arr.map((i) => {
            return <Chip size="small" label={i}
                avatar={<Avatar alt={i} src={`${process.env.PUBLIC_URL}/${i}.png`} />}
                clickable
                color={states.filter((el) => el.name === i)[0].value ? "primary" : "default"}
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
