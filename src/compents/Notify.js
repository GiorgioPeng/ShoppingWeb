import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

// define CSS
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

// alert component
// --
// props: from parent component
// --
// return: HTML elements
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


// Notify component
// --
//props: from parent component, must inlude type,open,handleClose and message
// --
// return: HTML elements
function Notify(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={props.open} autoHideDuration={1000} onClose={props.handleClose}>
        <Alert onClose={props.handleClose} severity={props.type}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Notify;