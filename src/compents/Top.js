import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import Notify from './Notify';
import CircularIndeterminate from './CircularIndeterminate';
import Button from '@material-ui/core/Button'
import sendPost from '../api/sendPost';

// define CSS
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
  },
  searchButton: {
    marginLeft: theme.spacing(1)
  }
}));

// top functionality bar component
// props: from parent component, must include link, setItemData, setLoginInfo, inputText and setInputText
// --
// return: HTML elements
function Top(props) {
  const Link = props.link;
  const setItemData = props.setItemData
  const setLoginInfo = props.setLoginInfo
  const inputText = props.inputText
  const setInputText = props.setInputText
  const classes = useStyles();
  const [notifyOpen, setNotifyOpen] = React.useState(false)

  // open notify
  const handleNotifyOpen = () => {
    if (!props.loginInfo)
      setNotifyOpen(true)
  }

  // synchronize input value and the component state
  // -- 
  // event: the input event
  const handleInput = (event) => {
    setInputText(event.target.value)
  }

  // send request to the backend to search a detail information of it
  const searchItems = async () => {
    setBackdropOpen(true)
    const res = await sendPost('/back_end_war_exploded/FindItem', 'ItemName=' + inputText)
    setItemData(res.Item)
    setBackdropOpen(false);
  }

  const [backDropOpen, setBackdropOpen] = React.useState(false);

  // close the nofity
  const handleNotifyClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotifyOpen(false);
  };

  // logout
  const logout = () => {
    setLoginInfo(null)
  }
  
  return (
    <div className={classes.root}>
      <AppBar className={classes.bar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            {props.loginInfo ? `Hello, ${props.loginInfo.AccountName}` : `Freedom Online Shopping Mart`}
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
          </div>
        </Toolbar>
      </AppBar>
      <Notify open={notifyOpen} message={'Please Login!'} type={'warning'} handleClose={handleNotifyClose} />
      <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
    </div >
  );
}
export default Top;