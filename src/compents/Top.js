import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Notify from './Notify';
import CircularIndeterminate from './CircularIndeterminate';
import Button from '@material-ui/core/Button'
import sendPost from '../api/sendPost';
// TODO 监控用户登陆情况
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // 后期通过对滚动的判定将这个条吸顶 删掉 appbar 组件中的 position="static"
  root_fixed: {
    position: 'fixed',
    zIndex: '999'
  },
  bar: {
    height: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center'

  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(5),
  },
  title: {
    flexGrow: 1,
    display: 'inline-block',
    textAlign: 'left'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  buttons: {
    display: 'flex',
    maxWidth: '50%',
    minWidth: '30%',
    marginLeft: theme.spacing(3),
    justifyContent: 'space-between'
  },
  buttonsText: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '15px',
    position: 'relative',
    // '&:before': {
    //   content: `""`,
    //   width: theme.spacing(1),
    //   borderRight: '1px solid #333',
    //   position: 'absolute',
    //   left: '120%',
    //   top: '-50%',
    //   height: "200%"
    // }
  },
  searchButton: {
    marginLeft: theme.spacing(1)
  }
}));

function Top(props) {
  const Link = props.link;
  const setItemData = props.setItemData
  const setLoginInfo = props.setLoginInfo
  const classes = useStyles();
  const [notifyOpen, setNotifyOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState('')
  const handleNotifyOpen = () => {
    if (!props.loginInfo)
      setNotifyOpen(true)
  }
  const handleInput = (event) => {
    setInputText(event.target.value)
  }

  const searchItems = async () => {
    setBackdropOpen(true)
    const res = await sendPost('/back_end_war_exploded/FindItem', 'ItemName=' + inputText)
    setItemData(res.Item)
    setBackdropOpen(false);
    console.log(res.Item)
  }
  const [backDropOpen, setBackdropOpen] = React.useState(false);
  const handleNotifyClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotifyOpen(false);
  };
  const logout = () => {
    setLoginInfo(null)
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {props.loginInfo ? `Hello, ${props.loginInfo.AccountName}` : `Online shopping of Scott Piao`}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={inputText}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleInput}
            />
          </div>
          <Button onClick={searchItems} size="small" className={classes.searchButton} variant="contained" color='secondary'>Search</Button>
          <div className={classes.buttons}>
            <Link to="/">
              <span className={classes.buttonsText}>Home Page<HomeOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            <Link onClick={handleNotifyOpen} to="/userinfo">
              <span className={classes.buttonsText}>User Info<PermIdentityOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            {/* <Link onClick={handleNotifyOpen} to="/shoppingcar">
              <span className={classes.buttonsText}>Shopping Car<ShoppingCartOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link> */}
            <Link onClick={handleNotifyOpen} to="/star">
              <span className={classes.buttonsText}>Star<GradeOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            {props.loginInfo ?
              <Link to="/">
                <span className={classes.buttonsText} onClick={logout}>Logout<VpnKeyOutlinedIcon style={{ fontSize: 16 }} /></span>
              </Link>
              :
              <Link to="/login">
                <span className={classes.buttonsText}>Login<VpnKeyOutlinedIcon style={{ fontSize: 16 }} /></span>
              </Link>
            }
            {/* <Link to="/">Logout</Link>这里默认是隐藏的 */}
          </div>
        </Toolbar>
      </AppBar>
      <Notify open={notifyOpen} message={'请先登录'} type={'warning'} handleClose={handleNotifyClose} />
      <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
    </div >
  );
}
export default Top;