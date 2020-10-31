import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleProduct from './SingleProduct'
import changer from '../compents/ChangeImgUrl'

// define CSS
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '10px auto',
        marginTop: theme.spacing(5),
        backgroundColor: 'white',
        width: '80%',
    },
}));

// create HTML elements to display each product
// --
// props: from parent component, must include itemData and loginInfo
// -- 
// return: HTML elements
const CreateItem = (props) => {
    const { itemData,loginInfo } = props
    let tempArr = []
    let i = 0;
    let tempTempArr = []
    while (itemData.length !== 0) {
        tempTempArr.push(itemData.shift())
        i++;
        if (i % 4 === 0) {
            tempArr.push(tempTempArr)
            tempTempArr = []
        }
    }
    tempArr.push(tempTempArr)
    return (
        <Grid container spacing={1} alignContent='center' alignItems='center' justify='center'>
            {
                tempArr.map((fourItems, index) => {
                    return (
                        <Grid container key={index} item xs={12} spacing={1} alignContent='center' alignItems='center' justify='center'>
                            {
                                fourItems.map((e, index) => {
                                    return (
                                        <Grid key={index} item xs={3}>
                                            <SingleProduct
                                                ItemID={e.ItemID}
                                                img={e.Picture?changer(e.Picture):e.Picture}
                                                name={e.ItemName}
                                                price={e.ItemPrice}
                                                description={e.ItemDescription}
                                                quantity={e.ItemQuantity}
                                                type={e.ItemType}
                                                loginInfo={loginInfo}
                                            />
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

// Product Grid component
// --
// props: from parent component, must include itemData and loginInfo
// --
// return: HTML element
function ProductGrid(props) {
    const { itemData,loginInfo } = props
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                itemData != null ?
                    <CreateItem loginInfo={loginInfo} itemData={itemData} />
                    :
                    ''
            }
        </div>
    );
}

export default ProductGrid
