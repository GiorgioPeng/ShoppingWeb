import React from 'react';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import sendLoginPost from '../../api/sendLoginPost';
import Notify from '../../compents/Notify';
import Button from '@material-ui/core/Button';
import linkTo from '../../compents/LinkTo'
import encrypt from '../../compents/Encrypt'
import CircularIndeterminate from '../../compents/CircularIndeterminate'

// define CSS
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${process.env.PUBLIC_URL}/login.jpeg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
    },
    rootForm: {
        position: 'absolute',
        top: `calc(50vh - 100px)`,
        left: `calc(50vw - 12.5ch)`,
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& > *': {
            width: '25ch',
        },
        padding: theme.spacing(3),
        backgroundColor: 'rgb(244, 244, 244)',
        boxShadow: '5px 5px 5px',
        borderRadius: '10px',
        opacity: '0.8'
    },
    noneShowPasswordInput: {
        marginTop: theme.spacing(5),
        transition: 'all 0.5s linear',
        opacity: '0'
    },
    showPasswordInput: {
        marginTop: theme.spacing(5),
        transition: 'all 0.5s linear',
        opacity: '1'
    },
    image: {
        position: 'relative',
        height: 100,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    noneButton: {
        display: 'none'
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#f66'
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: '#f44',
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

// login component
// --
// props: from parent component, must include setLoginInfo
// --
// return: HTML elements
function Index(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        PhoneNumber: '',
        showPasswordInput: false,
        password: '',
        showPassword: false,
        showButton: false
    });

    const [backDropOpen, setBackdropOpen] = React.useState(false);

    const [notifyOpen, setNotifyOpen] = React.useState(false);

    // open notify of incorrect password or phone number
    const handleNotifyOpen = () => {
        setNotifyOpen(true)
    }

    // close notify of incorrect password or phone number
    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotifyOpen(false);
    };

    // send request to backend when user submit the form, notify user and skip to the index page of the system
    const submit = async () => {
        setBackdropOpen(true)
        const data = `PhoneNumber=${values.PhoneNumber}&Password=${encrypt(values.password)}`
        const res = await sendLoginPost('/back_end_war_exploded/Login', data)
        setBackdropOpen(false);
        if (res.answer === 'true') {
            linkTo('shoppingweb', () => { props.setLoginInfo(res.AccountInformation[0]) })
        }
        else {
            handleNotifyOpen();
        }
    }

    // synchronize the value and state of the component
    // --
    // prop: the name of one state of the component, which should be modify
    const handleChange = (prop) => (event) => {
        if (event.target.value.length >= 3 && prop === 'password') {
            setValues({ ...values, [prop]: event.target.value, showButton: true });
            return;
        }
        else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };

    // change the state of whether show password
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    // prevent the default which is defined by the browser
    // --
    // event: the event 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // change the state of whether show password input dialog
    const handleClickShowPasswordInput = () => {
        setValues({ ...values, showPasswordInput: !values.showPasswordInput });
    };

    // prevent the default which is defined by the browser
    // --
    // event: the event
    const handleMouseDownPasswordInput = (event) => {
        event.preventDefault();
    };

    // go to the register page
    const register = () => {
        linkTo('register')
    }
    
    return (
        <div className={classes.root}>
            <div className={classes.bgdrop}>
                <div className={classes.rootForm}>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="PhoneNumber">Phone number</InputLabel>
                        <OutlinedInput
                            id="PhoneNumber"
                            variant="outlined"
                            value={values.PhoneNumber}
                            onChange={handleChange('PhoneNumber')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordInput}
                                        onMouseDown={handleMouseDownPasswordInput}
                                        edge="end"
                                    >
                                        <KeyboardReturnIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            onBlur={() => { setValues({ ...values, showPasswordInput: true }) }}
                            labelWidth={130}
                        />
                    </FormControl>

                    <FormControl
                        className={clsx(values.showPasswordInput && classes.showPasswordInput, !values.showPasswordInput && classes.noneShowPasswordInput)}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={90}
                        />
                    </FormControl>
                    <ButtonBase
                        focusRipple
                        key="login"
                        onClick={submit}
                        className={clsx(classes.image, values.showButton ? '' : classes.noneButton)}
                        focusVisibleClassName={classes.focusVisible}
                    >
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                <b>LOGIN</b>
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                    <Typography variant='subtitle2' color="textSecondary">
                        Do not have an account?
                        <Button onClick={register} setLoginInfo={props.setLoginInfo}>regist</Button>
                    </Typography>
                </div>
            </div>
            <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
            <Notify open={notifyOpen} message={'Incorrect Phone Number or Password'} type={'error'} handleClose={handleNotifyClose} />
        </div>
    )
}

export default Index
