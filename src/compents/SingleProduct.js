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
    price: {
        display: 'inline-flex',
        justifyContent: 'center'
    }
}));
function SingleProduct(props) {
    const classes = useStyles();

    // 点击收藏的动画
    const handleStar = (e) => {
        let temp = document.createElement('div');
        let event = e;
        temp.style = `position:absolute;
                    top:${event.pageY}px;
                    left:${event.pageX}px;
                    width:10px;
                    height:10px;
                    background-color:red;
                    transition:all 1.5s`
        document.body.appendChild(temp)
        let scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
        setTimeout((position) => {
            temp.style.top = `${position}px`
            temp.style.left = `95vw`
            setTimeout(() => {
                document.body.removeChild(temp)
            }, 1500)
        }, 10, scrollTop)
    }
    // 点击商品
    const handleProduct = (event) => {
        console.log(event.target)
        console.log(event.target.getAttribute('identify'))
        let current = window.location.href
        let destination = current+'/detail/'+event.target.getAttribute('identify')
        console.log(destination)
        let w = window.open('about:blank');
        w.location.href = destination
        
    }
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleProduct}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="180"
                    image={props.img}
                    title="Contemplative Reptile"
                    identify = {props.id}
                />
            </CardActionArea>

            <CardContent>
                    <Typography align='left' variant="body2" color="textSecondary" component="p">
                        here is the description of the products.
                    </Typography>
                </CardContent>
            <CardActions className={classes.text}>
                <Typography variant="overline" className={classes.price}>
                    ¥
                    <Typography variant='h4'>
                        {parseInt(Math.random() * 100)}
                    </Typography>
                </Typography>
                <IconButton aria-label="delete" onClick={handleStar} className={classes.margin}>
                    <StarRateIcon color="secondary" />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default SingleProduct
