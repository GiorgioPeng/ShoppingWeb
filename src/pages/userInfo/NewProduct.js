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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// define CSS
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
        display: 'none',
        maxWidth: '80%'
    },
    content: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    description: {
        width: '80%',
        textAlign: 'center'
    },
    inner: {
        width: '60%'
    }
}))


// publish new product component
// --
// props: from parent component, must include handleClose, productData and setProductData
// --
// return: HTML elements
const NewProduct = (props) => {
    const classes = useBackDropStyles()
    const { productData, setProductData } = props
    const imgRef = React.createRef()
    const displayRef = React.createRef()

    // receive the image which is uploaded by the current user
    const preview = () => {
        const file = imgRef.current.files[0]
        if (file) {
            displayRef.current.src = window.URL.createObjectURL(file)
            setProductData({ ...productData, 'ItemPicture': file });
        }
    }

    // when the image finish loading, show the image
    const handleLoad = () => {
        displayRef.current.style.display = 'block'
        window.URL.revokeObjectURL(displayRef.current.src)
    }
    const [notifyOpen, setNotifyOpen] = React.useState(false)
    const [notifyOpen2, setNotifyOpen2] = React.useState(false)

    // open the nofity of publishing success
    const handleNotifyOpen = () => {
        setNotifyOpen(true)
    }

    // close the nofity of publishing success
    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen(false);
    };

    // open the nofity if the user does not upload a image of the product
    const handleNotifyOpen2 = () => {
        setNotifyOpen2(true)
    }

    // open the nofity if the user does not upload a image of the product
    const handleNotifyClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen2(false);
    };

    // send a request to the backend
    // first try to remove current product by the item id, it is a idempotent operation.
    // second publish the product and get the item id
    // third send the image of the product to the backend
    // and then update the state of the component
    const ensurePublish = async () => {
        console.log(productData.ItemPicture)
        if (productData.ItemPicture) {
            await sendPost('back_end_war_exploded/DeleteItem', `ItemID=${productData.ItemID}`)
            const data = `ItemName=${productData.ItemName}&ItemType=${productData.ItemType}&ItemPrice=${productData.ItemPrice}&ItemDescription=${productData.ItemDescription}&ItemQuantity=${productData.ItemQuantity}`
            const res = await sendPost('back_end_war_exploded/add', data)
            if (res.ItemID !== 'false') {
                const formdata = new FormData();
                formdata.append('pic', productData.ItemPicture);
                formdata.append('ItemID', res.ItemID);
                console.log(formdata)
                await sendImgPost('back_end_war_exploded/Image', formdata)
                handleNotifyOpen()
                props.handleClose()
                setProductData(
                    {
                        'ItemName': '',
                        'ItemPrice': 0,
                        'ItemType': '',
                        'ItemDescription': '',
                        'ItemQuantity': 0,
                        'ItemPicture': ''
                    }
                )
            }
        }
        else {
            handleNotifyOpen2()
        }


    }
    // synchronize the input value and the state of the component
    const handleChange = (prop) => (event) => {
        setProductData({ ...productData, [prop]: event.target.value });
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            >
                <DialogTitle>Publish New Product</DialogTitle>
                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid className={classes.content} item xs={12}>
                            <TextField className={classes.inner} required value={productData.ItemName} onChange={handleChange('ItemName')} variant="outlined" label="Name" size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <FormControl className={classes.inner} required>
                                <InputLabel htmlFor="age-native-required">Type</InputLabel>
                                <Select
                                    native
                                    variant='outlined'
                                    value={productData.ItemType}
                                    onChange={handleChange('ItemType')}
                                    name="Type"
                                    inputProps={{
                                        id: 'type-native-required',
                                    }}
                                >
                                    <option aria-label="None" value="" />
                                    <option value={'clothes'}>clothes</option>
                                    <option value={'toy'}>toy</option>
                                    <option value={'digital'}>digital</option>
                                    <option value={'medicine'}>medicine</option>
                                    <option value={'car'}>car</option>
                                    <option value={'baby'}>baby</option>
                                    <option value={'house'}>house</option>
                                    <option value={'book'}>book</option>
                                    <option value={'snack'}>snack</option>
                                    <option value={'tool'}>tool</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField className={classes.inner} required value={productData.ItemQuantity} onChange={handleChange('ItemQuantity')} type='number' variant="outlined" label="Quantity" size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField
                                className={classes.inner}
                                required
                                type='number'
                                variant="outlined"
                                label="Price"
                                value={productData.ItemPrice}
                                onChange={handleChange('ItemPrice')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                size="small" />
                        </Grid>
                        <Grid className={classes.content} item xs={12}>
                            <TextField required className={classes.description} value={productData.ItemDescription} onChange={handleChange('ItemDescription')} variant="outlined" label="Description" size="large" />
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
                                <Button variant="contained" onClick={props.handleClose}>Cancel</Button>
                            </Grid>
                            <Grid className={classes.content} item xs={6}>
                                <Button variant="contained" color="secondary" onClick={ensurePublish}>Publish</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Notify open={notifyOpen} message={'Success'} type={'success'} handleClose={handleNotifyClose} />
            <Notify open={notifyOpen2} message={'Please upload image of the product!'} type={'error'} handleClose={handleNotifyClose2} />
        </div>
    )
}
export default NewProduct;