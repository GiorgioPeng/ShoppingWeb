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
// 这个页面用来展示商品的详情信息, 比如淘宝点击进去一个鞋子,可以进行选择大小
// TODO OneItem 接口没有返回ItemID
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
  const [quantity, setQuantity] = React.useState(0)
  const handleClick = async() => {
      const data = `ItemID=${id}`
      const res = await sendPost('/back_end_war_exploded/Like', data)
      if (res.answer === 'true') {
        setNotifyOpen(true);
      }
      else{
        setNotifyOpen4(true)
      }
  };


  const handleNotifyClose = ()=>{
    setNotifyOpen(false)
  }


  const handleNotifyClose2 = ()=>{
    setNotifyOpen2(false)
  }


  const handleNotifyClose3 = ()=>{
    setNotifyOpen3(false)
  }

  const handleNotifyClose4 = ()=>{
    setNotifyOpen4(false)
  }

  const buy = async () => {
    const data = `ItemID=${id}&ItemQuantity=${quantity}`
    const res = await sendPost('/back_end_war_exploded/Purchase', data)
    console.log(res)
    if(res.answer==='true'){
      setNotifyOpen2(true)
    }
    else{
      setNotifyOpen3(true)
    }
    // setProduct(res)
  }

  React.useEffect(() => {
    const getItemInfo = async () => {
      setBackdropOpen(true)
      const data = `ItemID=${id}`
      const res = await sendPost('/back_end_war_exploded/OneItem', data)
      console.log(res)
      setBackdropOpen(false)
      setProduct(res)
    }
    getItemInfo()
  }, [])

  React.useEffect(() => {
    setIdentify(id)
    // setProduct(tileData.filter((e) => e.title === identify)[0])
  }, [identify, id])
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
                  defaultValue="0"
                  className={classes.textField}
                  helperText="Purchase quantity"
                  margin="normal"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    if (e.target.value >= 0)
                      setSumPrice(e.target.value * (product ? product.ItemPrice : 0))
                    else {
                      e.target.value = 0
                    }
                    setQuantity(e.target.value)
                  }}
                />
                <Typography variant="subtitle1" color='error'>
                  单个价格: ${product?.ItemPrice}
                </Typography>
                <br />
                <br />

                <Typography variant="subtitle1" color='error'>
                  剩余数量: {product?.ItemQuantity}
                </Typography>
                <br />
                <Typography variant="subtitle2" color='error'>
                  总价: ${sumPrice}
                </Typography>
              </Grid>

              <Grid item container>
                <Grid item xs={8}>
                  <Button variant='contained' color='secondary' onClick={buy}>
                    立即购买
                    </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant='contained' onClick={()=>handleClick()}>
                    加入收藏
                  </Button>
                </Grid>
              </Grid>
            </Grid>


          </Grid>
        </Grid>
      </Paper>
      <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
      <Notify open={notifyOpen} message={'加入收藏成功!'} type={'success'} handleClose={handleNotifyClose} />
      <Notify open={notifyOpen4} message={'加入收藏失败!'} type={'error'} handleClose={handleNotifyClose4} />
      <Notify open={notifyOpen2} message={'购买成功!'} type={'success'} handleClose={handleNotifyClose2} />
      <Notify open={notifyOpen3} message={'购买失败!'} type={'error'} handleClose={handleNotifyClose3} />
    </div>
  );
}

export default Index;