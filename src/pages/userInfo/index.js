import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase'
import BuyerListProducts from './BuyerListProducts'
import SellerListProducts from './SellerListProducts'
import Button from '@material-ui/core/Button'
import linkTo from '../../compents/LinkTo'
import sendPost from '../../api/sendPost'
import CircularIndeterminate from '../../compents/CircularIndeterminate'

// define CSS of root component
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px auto',
    marginTop: theme.spacing(10),
    width: '85%'
  },
}));

// define CSS of base info component
const useBaseInfoStyles = makeStyles((theme) => ({
  image: {
    borderRadius: '50%',
    backgroundColor: 'black'
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  usernameText: {
    display: 'flex',
    alignItems: 'center'
  },
  telText: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
}));

// base infomation component
// --
// props: from parent component, must include loginInfo
// --
// return: HTML elements
function BaseInfo(props) {
  const classes = useBaseInfoStyles();
  const { loginInfo } = props
  return (
    <Grid container spacing={3}>
      <Grid item>
        <ButtonBase className={classes.image}>
          <Avatar
            className={classes.large}
            alt='user'
            src={`${process.env.PUBLIC_URL}/ava.png`}
          />
        </ButtonBase>
      </Grid>

      <Grid item xs={3} className={classes.usernameText}>
        <Typography
          color="textPrimary"
          variant='h6'
        >
          {loginInfo.AccountName}
        </Typography>
      </Grid>
      <Grid container item xs={7}>
        <Grid item xs={8}>
          <Typography
            color="textPrimary"
            variant='subtitle1'
            align="right"
          >
            Deposit: ${loginInfo.Deposit}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            color="textSecondary"
            variant='body1'
            align="right"
          >
            Tel: {loginInfo.PhoneNumber}
          </Typography>

          <Button onClick={() => linkTo('changepassword')} color="secondary">修改密码</Button>
        </Grid>
      </Grid>
    </Grid>)
}

function Index(props) {
  const classes = useStyles();
  const { loginInfo, setLoginInfo } = props;
  const [backDropOpen, setBackdropOpen] = React.useState(false);
  const [sellList, setSellList] = React.useState([])
  const [buyList, setBuyList] = React.useState([])
  React.useEffect(() => {
    // send three requests to the backend
    // get the information of all items which is published by current user
    // get the information of all orders of current user
    // get the information of deposit of current user
    // set the state of the component
    const getInfo = async () => {
      setBackdropOpen(true)

      const res = await sendPost('back_end_war_exploded/MyAllItem')
      setSellList(res.Item)

      const res2 = await sendPost('back_end_war_exploded/PurchaseInformation')
      setBuyList(res2.Item)

      const res3 = await sendPost('back_end_war_exploded/GetDeposit', `PhoneNumber=${loginInfo.PhoneNumber}`)
      setLoginInfo((previous) => { return { ...previous, 'Deposit': res3.deposit } })
      setBackdropOpen(false)
    }
    getInfo()
  }, [])
  return (
    <div className={classes.root}>
      <BaseInfo loginInfo={loginInfo} />
      <Divider />
      <BuyerListProducts buyList={buyList} />
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Typography variant="subtitle1" color="textSecondary">
        Published Products List
      </Typography>
      <SellerListProducts sellList={sellList} />
      <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
    </div>
  );
}

export default Index