import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SingleProduct from './SingleProduct'
import changer from '../compents/ChangeImgUrl'
import data from '../pages/index/tileData'
// 用于展示多个商品
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: '10px auto',
        marginTop: theme.spacing(5),
        backgroundColor: 'white',
        width: '80%',//到时候这里可以按照图片宽度的四倍设置
    },
}));


const CreateItem = (props) => {
    const { itemData } = props
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
    console.log(tempArr)
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


function ProductGrid(props) {
    const { itemData } = props
    const classes = useStyles();

    function FormRow() {
        const arr = []
        for (let i = 0; i < 4; i++)
            arr.push(parseInt(data.length * Math.random()))
        return (
            <React.Fragment>
                <Grid item xs={3}>
                    <SingleProduct id={data[arr[0]].title} img={itemData ? changer(itemData[8].Picture) : data[arr[0]].img} />
                </Grid>
                <Grid item xs={3}>
                    <SingleProduct id={data[arr[1]].title} img={data[arr[1]].img} />
                </Grid>
                <Grid item xs={3}>
                    <SingleProduct id={data[arr[2]].title} img={data[arr[2]].img} />
                </Grid>
                <Grid item xs={3}>
                    <SingleProduct id={data[arr[3]].title} img={data[arr[3]].img} />
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            {
                itemData != null ?
                    <CreateItem itemData={itemData} />
                    :
                    ''
            }
        </div>
    );
}

export default ProductGrid
