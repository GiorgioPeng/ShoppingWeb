import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import changer from '../../compents/ChangeImgUrl';
import sendPost from '../../api/sendPost'
import linkTo from '../../compents/LinkTo';
import Typography from '@material-ui/core/Typography';

// define CSS
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px auto'
    },
    table: {
        minWidth: 650,
    },
    item: {
        cursor: 'pointer'
    }
}));

// list product component
// --
// props: from the parent component, must include starList
// --
// return: HTML elements.
function ListProducts(props) {
    const { starList } = props
    const classes = useStyles();

    // send a request to the backend
    // if the user remove a product from his star list
    // and skip to the index page
    // --
    // item: Object, the item information
    const dislike = async (item) => {
        await sendPost("/back_end_war_exploded/Dislike", `ItemID=${item.ItemID}`)
        linkTo('shoppingweb')
    }

    // skip to the detail page of a product
    const handleBuy = (itemID) => {
        let destination = 'shoppingweb/detail/' + itemID
        linkTo(destination)
    }

    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Picture</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Remain</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {starList ?
                            (
                                starList.length !== 0 ? (
                                    starList.map((row) => (
                                        <TableRow hover className={classes.item} key={row.ItemID}>
                                            <TableCell component="th" scope="row">
                                                {row.ItemName}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Avatar
                                                    className={classes.large}
                                                    alt='user'
                                                    variant="square"
                                                    src={changer(row.Picture)}
                                                />
                                            </TableCell>
                                            <TableCell align="right">${row.ItemPrice}</TableCell>
                                            <TableCell align="right">{row.ItemQuantity}</TableCell>
                                            <TableCell align="right">{row.ItemType}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" onClick={() => handleBuy(row.ItemID)}>Buy</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained" color='secondary' onClick={() => dislike(row)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                                    :
                                    <Typography  variant="subtitle1" color="textPrimary">There is no record!</Typography>
                            )
                            :
                            <Typography  variant="subtitle1" color="textPrimary">There is no record!</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListProducts
