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
import NewProduct from './NewProduct'
import changer from '../../compents/ChangeImgUrl';
import sendPost from '../../api/sendPost';
import Typography from '@material-ui/core/Typography';
import linkTo from '../../compents/LinkTo';

// define the CSS
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px auto'
    },
    table: {
        minWidth: 650,
    },
    item: {
        cursor: 'pointer'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

// list product component
// -- 
// props: from parent component, must include sellList
// --
// return: HTML elements
function ListProducts(props) {
    const classes = useStyles();
    const { sellList } = props;
    const [open, setOpen] = React.useState(false);

    // resit the state of the component when publish a new product
    const handleClickOpen = () => {
        setProductData({
            'ItemID': '',
            'ItemName': '',
            'ItemPrice': 0,
            'ItemType': '',
            'ItemDescription': '',
            'ItemQuantity': 0,
            'ItemPicture': ''
        })
        setOpen(true);
    };

    const [productData, setProductData] = React.useState(
        {
            'ItemID': '',
            'ItemName': '',
            'ItemPrice': 0,
            'ItemType': '',
            'ItemDescription': '',
            'ItemQuantity': 0,
            'ItemPicture': ''
        }
    )

    // synchronize the data and the state of the component
    // --
    // item: the data of the item
    const modifyProduct = (item) => {
        setProductData({
            'ItemID': item.ItemID,
            'ItemName': item.ItemName,
            'ItemPrice': item.ItemPrice,
            'ItemType': item.ItemType,
            'ItemDescription': item.ItemDescription,
            'ItemQuantity': item.ItemQuantity,
            'ItemPicture': ''
        })
        setOpen(true);
    }


    // send a request to the backend to delete a item according item id and skip to the index page
    // --
    // item: Object, include the item data
    const deleteItem = async (item) => {
        await sendPost('/back_end_war_exploded/DeleteItem', `ItemID=${item.ItemID}`)
        linkTo('shoppingweb')
    }

    // close the dialog of publishing new product
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell align="left">picture</TableCell>
                            <TableCell align="right">price</TableCell>
                            <TableCell align="right">remain</TableCell>
                            <TableCell align="right">type</TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            sellList ? (
                                sellList.length !== 0 ?
                                    sellList.map((row) => (
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
                                                <Button color='secondary' onClick={() => deleteItem(row)}>delete</Button>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button color='primary' onClick={() => modifyProduct(row)}>modify</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <Typography variant="subtitle1" color="textPrimary">You publish no product yet!</Typography>
                            )
                                :
                                <Typography variant="subtitle1" color="textPrimary">You publish no product yet!</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleClickOpen} color="secondary">Publish New Product</Button>
            <NewProduct open={open} productData={productData} setProductData={setProductData} handleClose={handleClose} />
        </div>
    );
}

export default ListProducts
