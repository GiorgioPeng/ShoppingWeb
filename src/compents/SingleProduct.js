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
import Notify from './Notify'
import sendPost from '../api/sendPost'
import linkTo from '../compents/LinkTo'

// define CSS
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 280,
        height: '350px',
        padding: theme.spacing(2),
        '&:hover': {
            outline: 'red 1px solid'
        },
    },
    description: {
        height: '60px',
        overflow: 'hidden'
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

// single product display component
// --
// props: from parent component, must include loginInfo, img, ItemID, name, price and description
// --
// return: HTML elements
function SingleProduct(props) {
    const { loginInfo } = props
    const classes = useStyles();
    const [notifyOpen, setNotifyOpen] = React.useState(false)
    
    // open the notify
    const handleNotifyOpen = () => {
        setNotifyOpen(true)
    }

    // close the notify
    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen(false);
    };
    const { img, ItemID, name, price, description } = props

    // send request to backend, to star a item
    const star = async () => {
        if (loginInfo) {
            const data = `ItemID=${ItemID}`
            const res = await sendPost('/back_end_war_exploded/Like', data)
            if (res.answer === 'true') {
                console.log('success')
            }
        }
    }

    // display the animation of click star icon and notify whether star operation is success
    // --
    // e: click event
    const handleStar = (e) => {
        if (loginInfo) {
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
                star()
                setTimeout(() => {
                    document.body.removeChild(temp)
                }, 1500)
            }, 10, scrollTop)
        }
        else {
            handleNotifyOpen()
        }
    }

    // skip to the detail page of a product and nofity user
    // --
    // event: the click event
    const handleProduct = (event) => {
        if (loginInfo) {
            let destination = 'shoppingweb/detail/' + event.target.getAttribute('identify')
            linkTo(destination)
        }
        else{
            handleNotifyOpen()
        }
    }
    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleProduct}>
                <CardMedia
                    component="img"
                    alt={name}
                    height="180"
                    image={img}
                    title={name}
                    identify={ItemID}
                />
            </CardActionArea>

            <CardContent className={classes.description}>
                <Typography align='left' variant="subtitle1" color="textPrimary" component="p">
                    {name}
                </Typography>
                <Typography align='left' variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions className={classes.text}>
                <Typography variant="overline" className={classes.price}>
                    $
                    <Typography variant='h4'>
                        {price}
                    </Typography>
                </Typography>
                <IconButton aria-label="star" onClick={handleStar} className={classes.margin}>
                    <StarRateIcon color="secondary" />
                </IconButton>
            </CardActions>
            <Notify open={notifyOpen} message={'Please Login!'} type={'error'} handleClose={handleNotifyClose} />
        </Card>
    );
}

export default SingleProduct
