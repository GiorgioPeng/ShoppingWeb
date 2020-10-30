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
import linkTo from '../../compents/LinkTo'
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
    }
}));


function ListProducts(props) {
    const { starList } = props
    const classes = useStyles();

    const dislike = async (item) => {
        const res = await sendPost("/back_end_war_exploded/Dislike", `ItemID=${item.ItemID}`)
        linkTo('shoppingweb')
        console.log(res)
    }

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
                            <TableCell>商品名称</TableCell>
                            <TableCell align="left">商品图片</TableCell>
                            <TableCell align="right">商品价格</TableCell>
                            <TableCell align="right">数量</TableCell>
                            <TableCell align="right">类型</TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {starList.length !== 0 ?
                            starList?.map((row) => (
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
                                        <Button variant="contained" onClick={() => handleBuy(row.ItemID)}>立即购买</Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color='secondary' onClick={() => dislike(row)}>删除</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                            :
                            <p>您还未收藏任何商品</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListProducts
