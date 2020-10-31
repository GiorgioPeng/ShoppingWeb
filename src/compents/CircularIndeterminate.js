import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';


// define the CSS
const useCircularIndeterminateStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

// Progress Circular compnent 
// -- 
// props: from parent component
// --
// return: HTML elements
function CircularIndeterminate(props) {
    const classes = useCircularIndeterminateStyles();
  
    return (
      <Backdrop className={classes.backdrop} open={props.backDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
}
export default CircularIndeterminate