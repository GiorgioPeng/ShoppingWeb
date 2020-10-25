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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputAdornment from '@material-ui/core/InputAdornment';
import Notify from '../../compents/Notify'
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

const useBackDropStyles = makeStyles((theme) => ({
    root: {
        height: '70vmin',
        width: '70vmin',
        backgroundColor: 'white',
    },
    input: {
        display: 'none',
    },
    previewImg: {
        display: 'none'
    },
    content: {
        display: 'flex',
        justifyContent: 'center'
    }
}))
const NewProduct = (props) => {
    const classes = useBackDropStyles()
    const [productData,setProductData] = React.useState(
        {
            'ItemName':'',
            'ItemPrice':0,
            'ItemType':'',
            'ItemDescription':'',
            'ItemQuantity':0,
            'ItemPicture':''
        }
    )
    const imgRef = React.createRef()
    const displayRef = React.createRef()
    const preview = () => {
        // console.log(imgRef.current.files)
        const file = imgRef.current.files[0]
        if (file) {
            displayRef.current.src = window.URL.createObjectURL(file)
            setProductData({ ...productData, 'ItemPicture': file });
        }
    }
    
    const handleLoad = () => {
        displayRef.current.style.display = 'block'
        window.URL.revokeObjectURL(displayRef.current.src)
    }
    const [notifyOpen, setNotifyOpen] = React.useState(false)
    const handleNotifyOpen = () => {
        setNotifyOpen(true)
    }

    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen(false);
    };
    const ensurePublish = async () => {
        const data = `ItemName=${productData.ItemName}&ItemType=${productData.ItemType}&ItemPrice=${productData.ItemPrice}&ItemPicture=${productData.ItemPicture}&ItemDescription=${productData.ItemDescription}&ItemQuantity=${productData.ItemQuantity}`
        const res = await sendPost('back_end/add', data)
        console.log(res)
        if (res.ItemID !== 'false') {
            handleNotifyOpen(true)
            props.handleClose()
        }

    }
    const handleChange = (prop) => (event) => {
        setProductData({ ...productData, [prop]: event.target.value });
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            >
                <DialogTitle >发布新商品</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid className={classes.content} item xs={12}>
                            <TextField value={productData.ItemName} onChange={handleChange('ItemName')} variant="outlined" label="商品名称" size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField value={productData.ItemType} onChange={handleChange('ItemType')} variant="outlined" label="商品类型" size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField value={productData.ItemDescription} onChange={handleChange('ItemDescription')} label="商品描述" size="large" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField value={productData.ItemQuantity} onChange={handleChange('ItemQuantity')} type='number' variant="outlined" label="商品数量" size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField
                                type='number'
                                variant="outlined"
                                label="商品价格"
                                value={productData.ItemPrice}
                                onChange={handleChange('ItemPrice')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="img-upload"
                                type="file"
                                onChange={preview}
                                ref={imgRef}
                            />
                            <label htmlFor="img-upload">
                                <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                                    Upload image
                            </Button>
                            </label>
                        </Grid>

                        <Grid className={classes.content} item xs={12}>
                            <img alt="upload img" className={classes.previewImg} onLoad={handleLoad} ref={displayRef}></img>
                        </Grid>
                        <Grid item container xs={12}>
                            <Grid className={classes.content} item xs={6}>
                                <Button variant="contained" onClick={props.handleClose}>取消</Button>
                            </Grid>
                            <Grid className={classes.content} item xs={6}>
                                <Button variant="contained" color="secondary" onClick={ensurePublish}>确认发布</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Notify open={notifyOpen} message={'发布成功'} type={'success'} handleClose={handleNotifyClose} />
        </div>
    )
}

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
