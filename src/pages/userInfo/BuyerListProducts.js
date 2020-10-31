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
// props: from parent component, must include buyList
// --
// return: HTML elements
function ListProducts(props) {
    const classes = useStyles();
    const { buyList } = props;
    const [notifyOpen,setNotifyOpen] = React.useState(false)
    const [notifyOpen2,setNotifyOpen2] = React.useState(false)

    // close notify of refund success
    const handleNotifyClose = ()=>{
        setNotifyOpen(false)
    }

    // close notify of refund success
    const handleNotifyClose2 = ()=>{
        setNotifyOpen2(false)
    }

    // send a request to the backend if the user choose to refund of a item
    // and notify whether the operator is success
    // and according macro-task queue to skip to the index pages
    // --
    // itemID: string, the item id of a item
    // createTime: string, the create time of the order
    //
    const refund = async (itemID,createTime) => {
        const res = await sendPost('/back_end_war_exploded/Refund', `ItemID=${itemID}&CreateTime=${createTime}`)
        if (res.answer === 'true') {
            setNotifyOpen(true)
            setTimeout(()=>linkTo('shoppingweb'),500)
        }
        else {
            setNotifyOpen2(true)
        }
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
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Logistics Information</TableCell>
                            <TableCell align="right">Time of Purchase</TableCell>
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
                                                        <Button color='primary' onClick={() => refund(row.ItemID,row.PurchaseTime)}>Refund</Button>
                                                        :
                                                        <Button color='primary' disabled>Refund</Button>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    ))
                                    :
                                    <Typography variant="subtitle1" color="textPrimary">There is no record!</Typography>
                            )
                                :
                                <Typography variant="subtitle1" color="textPrimary">There is no record!</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Notify open={notifyOpen} message={'Success!'} type={'success'} handleClose={handleNotifyClose} />
            <Notify open={notifyOpen2} message={'Refund Failed!'} type={'error'} handleClose={handleNotifyClose2} />
        </div>
    );
}

export default ListProducts
