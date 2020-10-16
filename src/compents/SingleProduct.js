import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import img from '../asset/img1.jpg'
// 用于显示单个商品的卡片
// TODO 一般而言需要接受父组件传过来的数据
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 280,
        padding:theme.spacing(3),
        transform:'scale(0.8)',
        '&:hover': {
            outline:'red 1px solid'
        },
    },
}));
function SingleProduct() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={img}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Android
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Android is developed by GSW
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary">
                Price: {parseInt(Math.random()*100)}$
        </Button>
                <Button size="small" color="primary">
                    Star
        </Button>
            </CardActions>
        </Card>
    );
}

export default SingleProduct
