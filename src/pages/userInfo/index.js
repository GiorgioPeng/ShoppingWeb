import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase'
import Button from '@material-ui/core/Button';
import ListProducts from './ListProducts'
// 这个页面用来展示用户的一些数据, 比如交易记录
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '10px auto',
    marginTop: theme.spacing(10),
    width: '85%'
  },
}));
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
const useButtonStyles = makeStyles((theme) => ({
  buttons: {
    height: '100%',
    width: '100%',
  }
}));
function BaseInfo() {
  const classes = useBaseInfoStyles();
  return (
    <Grid container spacing={3}>
      <Grid item>
        <ButtonBase className={classes.image}>
          <Avatar
            className={classes.large}
            alt='user'
            src={`${process.env.PUBLIC_URL}/car.png`}
          />
        </ButtonBase>
      </Grid>

      <Grid item xs={3} className={classes.usernameText}>
        <Typography
          color="textPrimary"
          variant='h6'
        >
          User name
      </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography
          color="textSecondary"
          variant='body1'
          align="right"
        >
          Tel: 12345678901
      </Typography>
      </Grid>
    </Grid>)
}
// function FourButtons() {
//   const classes = useButtonStyles();
//   return (
//     <Grid container spacing={1}>
//       <Grid item xs={3}>
//         <Typography
//           color="textPrimary"
//           variant='caption'
//           align='center'
//         >
//           <Button className={classes.buttons}>待付款</Button>
//         </Typography>
//       </Grid>
//       <Divider orientation="vertical" flexItem />
//       <Grid item xs={3}>
//         <Typography
//           color="textPrimary"
//           variant='caption'
//           align='center'
//         >
//           <Button className={classes.buttons}>待收货</Button>
//         </Typography>
//       </Grid>
//       <Divider orientation="vertical" flexItem />
//       <Grid item xs={3}>
//         <Typography
//           color="textPrimary"
//           variant='caption'
//           align='center'
//         >
//           <Button className={classes.buttons}>待评价</Button>
//         </Typography>
//       </Grid>
//       <Divider orientation="vertical" flexItem />
//       <Grid item xs={true}>
//         <Typography
//           color="textPrimary"
//           variant='caption'
//           align='center'
//         >
//           <Button className={classes.buttons}>售后</Button>
//         </Typography>
//       </Grid>
//     </Grid>)
// }

function Index() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <BaseInfo />
      <Divider />
      {/* <FourButtons /> */}
      {/* <Divider /> */}
      <ListProducts/>
    </div>
  );
}

export default Index