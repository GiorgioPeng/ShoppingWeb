import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleProduct from './SingleProduct'
// 用于展示多个商品
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(5)
    },
}));
function ProductGrid() {
    const classes = useStyles();

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={3}>
                    <SingleProduct />
                </Grid>
                <Grid item xs={3}>
                    <SingleProduct />
                </Grid>
                <Grid item xs={3}>
                    <SingleProduct />
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1} alignContent='center' alignItems='center' justify='center'>
                <Grid container item xs={12} alignContent='center' alignItems='center' justify='center'>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} alignContent='center' alignItems='center' justify='center'>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} alignContent='center' alignItems='center' justify='center'>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
    );
}

export default ProductGrid
