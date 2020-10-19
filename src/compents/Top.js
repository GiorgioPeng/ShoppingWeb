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
    '&:before': {
      content: `""`,
      width: theme.spacing(1),
      borderRight: '1px solid #333',
      position: 'absolute',
      left: '100%',
      top: '-50%',
      height: "200%"
    }
  }
}));

function Top(props) {
  const Link = props.link;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Online shopping of Municipal party committee
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.buttons}>
            <Link to="/">
              <span className={classes.buttonsText}>Home Page<HomeOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            <Link to="/userinfo">
              <span className={classes.buttonsText}>User Info<PermIdentityOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            <Link to="/shoppingcar">
              <span className={classes.buttonsText}>Shopping Car<ShoppingCartOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            <Link to="/star">
              <span className={classes.buttonsText}>Star<GradeOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            <Link to="/login">
              <span className={classes.buttonsText}>Login<VpnKeyOutlinedIcon style={{ fontSize: 16 }} /></span>
            </Link>
            {/* <Link to="/">Logout</Link>这里默认是隐藏的 */}
          </div>
        </Toolbar>
      </AppBar>
    </div >
  );
}
export default Top;