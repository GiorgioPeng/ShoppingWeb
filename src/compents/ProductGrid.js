import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleProduct from './SingleProduct'

import data from '../pages/index/tileData'
// 用于展示多个商品
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin:'10px auto',
        marginTop: theme.spacing(5),
        backgroundColor:'white',
        width:'80%',//到时候这里可以按照图片宽度的四倍设置
    },
}));
function ProductGrid() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={3} justify="space-between">
                    <SingleProduct img={data[parseInt(data.length*Math.random())].img}/>
                </Grid>
                <Grid item xs={3} justify="space-between">
                    <SingleProduct img={data[parseInt(data.length*Math.random())].img}/>
                </Grid>
                <Grid item xs={3} justify="space-between">
                    <SingleProduct img={data[parseInt(data.length*Math.random())].img}/>
                </Grid>
                <Grid item xs={3} justify="space-between">
                    <SingleProduct img={data[parseInt(data.length*Math.random())].img}/>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1} alignContent='center' alignItems='center' justify='center'>
                <Grid container item xs={12} spacing={1} alignContent='center' alignItems='center' justify='center'>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={1} alignContent='center' alignItems='center' justify='center'>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={1} alignContent='center' alignItems='center' justify='center'>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
    );
}

export default ProductGrid
