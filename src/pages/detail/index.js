import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Notify from '../../compents/Notify'
import CircularIndeterminate from '../../compents/CircularIndeterminate'
import sendPost from '../../api/sendPost'
import changer from '../../compents/ChangeImgUrl'

// define CSS
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px auto',
    width: '85%',
    marginTop: theme.spacing(10)
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '70vw'
  },
  image: {
    width: '75vmin',
    height: '75vmin'
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: '75vmin',
    height: '75vmin',
    border: '0.5px solid #ccc'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

// show detail of a product component
// --
// props: from parent component
// --
// return: HTML elements
function Index(props) {
  const classes = useStyles();
  const id = props.match.params.identify
  const [identify, setIdentify] = React.useState('');
  const [product, setProduct] = React.useState(null)
  const [sumPrice, setSumPrice] = React.useState(0)
  const [notifyOpen, setNotifyOpen] = React.useState(false);
  const [notifyOpen2, setNotifyOpen2] = React.useState(false);
  const [notifyOpen3, setNotifyOpen3] = React.useState(false);
  const [notifyOpen4, setNotifyOpen4] = React.useState(false);
  const [backDropOpen, setBackdropOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1)

  // send a request to backend to star a product and nofity user
  const handleClick = async () => {
    const data = `ItemID=${id}`
    const res = await sendPost('/back_end_war_exploded/Like', data)
    if (res.answer === 'true') {
      setNotifyOpen(true);
    }
    else {
      setNotifyOpen4(true)
    }
  };

  // close notify  when star success
  const handleNotifyClose = () => {
    setNotifyOpen(false)
  }

  // close notify when star failed
  const handleNotifyClose2 = () => {
    setNotifyOpen2(false)
  }

  // close notify when buying success
  const handleNotifyClose3 = () => {
    setNotifyOpen3(false)
  }

  // close notify when buying failed
  const handleNotifyClose4 = () => {
    setNotifyOpen4(false)
  }

  // send a request to backend when user buy a product and notify user
  const buy = async () => {
    const data = `ItemID=${id}&ItemQuantity=${quantity}`
    const res = await sendPost('/back_end_war_exploded/Purchase', data)
    console.log(res)
    if (res.answer === 'true') {
      setNotifyOpen2(true)
    }
    else {
      setNotifyOpen3(true)
    }
  }

  React.useEffect(() => {
    // get item infor when load the page at first time, and set the state of the component
    const getItemInfo = async () => {
      setBackdropOpen(true)
      const data = `ItemID=${id}`
      const res = await sendPost('/back_end_war_exploded/OneItem', data)
      setBackdropOpen(false)
      setProduct(res)
    }
    getItemInfo()
  }, [])

  React.useEffect(() => {
    setIdentify(id)
  }, [identify, id])

  React.useEffect(() => {
    if (product?.ItemPrice)
      setSumPrice(product.ItemPrice)
  }, [product])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>

          <Grid item>
            <ButtonBase disabled className={classes.image}>
              <img className={classes.img} alt="complex" src={product ? changer(product.ItemPicture) : ''} />
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>

              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {product?.ItemName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {
                    product?.ItemDescription
                  }
                </Typography>
                <TextField
                  label="Quantity"
                  id="quantity"
                  defaultValue="1"
                  className={classes.textField}
                  helperText="Purchase quantity"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value >= 0)
                      setSumPrice(e.target.value * (product ? product.ItemPrice : 1))
                    else {
                      e.target.value = 0
                    }
                    setQuantity(e.target.value)
                  }}
                />
                <Typography variant="subtitle1" color='error'>
                  price: ${product?.ItemPrice}
                </Typography>
                <br />
                <br />

                <Typography variant="subtitle1" color='error'>
                  remain: {product?.ItemQuantity}
                </Typography>
                <br />
                <Typography variant="subtitle2" color='error'>
                  total price: ${sumPrice}
                </Typography>
              </Grid>

              <Grid item container>
                <Grid item xs={8}>
                  <Button variant='contained' color='secondary' onClick={buy}>
                    Buy
                    </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant='contained' onClick={() => handleClick()}>
                    Star
                  </Button>
                </Grid>
              </Grid>
            </Grid>


          </Grid>
        </Grid>
      </Paper>
      <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
      <Notify open={notifyOpen} message={'Star success!'} type={'success'} handleClose={handleNotifyClose} />
      <Notify open={notifyOpen4} message={'Star failed!'} type={'error'} handleClose={handleNotifyClose4} />
      <Notify open={notifyOpen2} message={'Buy success!'} type={'success'} handleClose={handleNotifyClose2} />
      <Notify open={notifyOpen3} message={'Buy failed!'} type={'error'} handleClose={handleNotifyClose3} />
    </div>
  );
}

export default Index;