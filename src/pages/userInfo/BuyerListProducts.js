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
    const [transportState, setTransportState] = React.useState([])
    React.useEffect(() => {
        const getProductInfo = async (itemID) => {
            const res = await sendPost('/back_end_war_exploded/TransportState', `ItemID=${itemID}`)
            // console.log(res2.answer)
            return res.answer
        }
        const getTransportState = async () => {
            let tempArr = []
            if (buyList && buyList.length !== 0) {
                for (let i of buyList) {
                    tempArr.push(await getProductInfo(i.ItemID))
                }

            }
            return tempArr
        }

        getTransportState()
            .then((res) => setTransportState(res))

    }, [buyList])

    React.useEffect(() => {
        console.log(transportState)
    }, [transportState])

    const refund = async (itemID) => {
        const res = await sendPost('/back_end_war_exploded/Refund', `ItemID=${itemID}`)
        if (res.answer === 'true') {
            // 退款成功
        }
        else {
            // 退款失败
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
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
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
                                            {transportState.length === 0 ? '' : transportState[index]}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                transportState.length === 0 ?
                                                    ''
                                                    :
                                                    transportState[index] === "Goods arrived" ?
                                                        <Button color='primary' onClick={() => refund(row.ItemID)}>申请退款</Button>
                                                        :
                                                        <Button color='primary' disabled>申请退款</Button>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <p>您还未购买任何商品</p>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ListProducts
