import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputAdornment from '@material-ui/core/InputAdornment';
import Notify from '../../compents/Notify'
import Button from '@material-ui/core/Button';
import sendPost from '../../api/sendPost'
import sendImgPost from '../../api/senImgPost'
// 这个组件用来发布新商品

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
    },
    description:{
        width:'80%',
        textAlign:'center'
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
        const data = `ItemName=${productData.ItemName}&ItemType=${productData.ItemType}&ItemPrice=${productData.ItemPrice}&ItemDescription=${productData.ItemDescription}&ItemQuantity=${productData.ItemQuantity}`
        const res = await sendPost('back_end/add', data)
        console.log(res)
        if (res.ItemID !== 'false') {
            const formdata = new FormData();
            formdata.append('pic', productData.ItemPicture);
            formdata.append('ItemID', res.ItemID);
            console.log(formdata)
            const res2 = await sendImgPost('back_end/Image',formdata)
            console.log(res2)
            // if(res2.)
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
                            <TextField className={classes.description} value={productData.ItemDescription} onChange={handleChange('ItemDescription')} variant="outlined" label="商品描述" size="large" />
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
export default NewProduct;