import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
// 这个组件是加载时候的一个环形进度条

const useCircularIndeterminateStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

function CircularIndeterminate(props) {
    const classes = useCircularIndeterminateStyles();
  
    return (
    <Backdrop className={classes.backdrop} open={props.backDropOpen} onClick={props.handle}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
}
export default CircularIndeterminate