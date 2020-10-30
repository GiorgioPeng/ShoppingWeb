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
import linkTo from '../../compents/LinkTo';
// 用来展示商品列表
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

function ListProducts(props) {
    const classes = useStyles();
    const { sellList } = props;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        // 每次发布新商品的时候需要重置一下表单
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

    const deleteItem = async (item) => {
        const res = await sendPost('/back_end_war_exploded/DeleteItem', `ItemID=${item.ItemID}`)
        linkTo('shoppingweb')
        console.log(res)
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>商品名称</TableCell>
                            <TableCell align="left">商品图片</TableCell>
                            <TableCell align="right">商品价格</TableCell>
                            <TableCell align="right">剩余数量</TableCell>
                            <TableCell align="right">商品类型</TableCell>
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
                                            {/* <TableCell align="right">{row.date}</TableCell> */}
                                            <TableCell align="right">
                                                <Button color='secondary' onClick={() => deleteItem(row)}>取消售卖</Button>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button color='primary' onClick={() => modifyProduct(row)}>设置商品属性</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <p>您还未发布任何商品</p>
                            )
                                :
                                <p>您还未发布任何商品</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleClickOpen} color="secondary">发布新商品</Button>
            <NewProduct open={open} productData={productData} setProductData={setProductData} handleClose={handleClose} />
        </div>
    );
}

export default ListProducts
