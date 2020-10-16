import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import StarRateIcon from '@material-ui/icons/StarRate';
import IconButton from '@material-ui/core/IconButton';
// 用于显示单个商品的卡片
// TODO 一般而言需要接受父组件传过来的数据
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 280,
        padding: theme.spacing(2),
        // transform:'scale(0.8)',
        '&:hover': {
            outline: 'red 1px solid'
        },
    },
    text: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    price:{
        display:'inline-flex',
        justifyContent:'center'
    }
}));
function SingleProduct(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={props.img}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Android
                    </Typography>
                    <Typography align='left' variant="body2" color="textSecondary" component="p">
                        Android is developed by GSW
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.text}>
                <Typography variant="overline" className={classes.price}>
                    ¥
                    <Typography variant='h4'>
                        {parseInt(Math.random() * 100)}
                    </Typography>
                </Typography>
                <IconButton aria-label="delete" className={classes.margin}>
                    <StarRateIcon color="secondary" fontSize="medium" />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default SingleProduct
