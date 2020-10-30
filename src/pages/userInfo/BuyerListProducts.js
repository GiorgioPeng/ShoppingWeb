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
import sendPost from '../../api/sendPost';
import Notify from '../../compents/Notify';
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
    const classes = useStyles();
    const { buyList } = props;
    const [notifyOpen,setNotifyOpen] = React.useState(false)
    const [notifyOpen2,setNotifyOpen2] = React.useState(false)
    const handleNotifyClose = ()=>{
        setNotifyOpen(false)
    }
    const handleNotifyClose2 = ()=>{
        setNotifyOpen2(false)
    }
    const refund = async (itemID,createTime) => {
        const res = await sendPost('/back_end_war_exploded/Refund', `ItemID=${itemID}&CreateTime=${createTime}`)
        if (res.answer === 'true') {
            // 退款成功
            setNotifyOpen(true)
            setTimeout(()=>linkTo('shoppingweb'),500)
        }
        else {
            // 退款失败
            setNotifyOpen2(true)
        }
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
                            <TableCell align="right">商品类型</TableCell>
                            <TableCell align="right">物流信息</TableCell>
                            <TableCell align="right">购买时间</TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            buyList ? (
                                buyList.length !== 0 ?
                                    buyList.map((row, index) => (
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
                                            <TableCell align="right">{row.ItemType}</TableCell>
                                            <TableCell align="right">
                                                {row.TransportationState}
                                            </TableCell>
                                            <TableCell align="right">
                                                {new Date(row.PurchaseTime).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                {
                                                    row.TransportationState === "Goods arrived" ?
                                                        <Button color='primary' onClick={() => refund(row.ItemID,row.PurchaseTime)}>申请退货</Button>
                                                        :
                                                        <Button color='primary' disabled>申请退货</Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <p>您还未购买任何商品</p>
                            )
                                :
                                <p>您还未购买任何商品</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Notify open={notifyOpen} message={'退款成功'} type={'success'} handleClose={handleNotifyClose} />
            <Notify open={notifyOpen2} message={'退款失败'} type={'error'} handleClose={handleNotifyClose2} />
        </div>
    );
}

export default ListProducts
