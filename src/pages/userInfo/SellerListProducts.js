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

function createData(name, img, price, count, date) {
    return { name, img, price, count, date };
}

const rows = [
    createData('高的钱包', `${process.env.PUBLIC_URL}/book.png`, 6.0, 24, '2020-13-32'),
    createData('高的💻', `${process.env.PUBLIC_URL}/digital.png`, 9.0, 37, '2020-13-32'),
    createData('高的女友', `${process.env.PUBLIC_URL}/baby.png`, 16.0, 24, '2020-13-32'),
    createData('高的🏠', `${process.env.PUBLIC_URL}/house.png`, 3.7, 67, '2020-13-32'),
    createData('高的美食', `${process.env.PUBLIC_URL}/snack.png`, 16.0, 49, '2020-13-32'),
];


function ListProducts() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

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
                            <TableCell align="right">发布日期</TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="right"> </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover className={classes.item} key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">
                                    <Avatar
                                        className={classes.large}
                                        alt='user'
                                        variant="square"
                                        src={row.img}
                                    />
                                </TableCell>
                                <TableCell align="right">¥{row.price}</TableCell>
                                <TableCell align="right">{row.count}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">
                                    <Button color='secondary'>取消售卖</Button>
                                </TableCell>
                                <TableCell align="right">
                                    <Button color='primary'>设置商品属性</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleClickOpen} color="secondary">发布新商品</Button>
            <NewProduct open={open} handleClose={handleClose} />
        </div>
    );
}

export default ListProducts
