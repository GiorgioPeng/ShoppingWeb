import React from 'react'
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
// 这个页面用来写登陆页面


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${process.env.PUBLIC_URL}/bgimg.jpg)`,
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
            width: '100% !important', // Overrides inline-style
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
function Index() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        tel: '',
        showPasswordInput: false,
        password: '',
        showPassword: false,
        showButton: false
    });

    const handleChange = (prop) => (event) => {
        if (event.target.value.length >= 4 && prop === 'password') {
            setValues({ ...values, [prop]: event.target.value, showButton: true });
            return;
        }
        else {
            setValues({ ...values, [prop]: event.target.value });
        }
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPasswordInput = () => {
        setValues({ ...values, showPasswordInput: !values.showPasswordInput });
    };

    const handleMouseDownPasswordInput = (event) => {
        event.preventDefault();
    };
    return (
        <div className={classes.root}>
            <div className={classes.bgdrop}>
                <form className={classes.rootForm} noValidate autoComplete="on">
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="tel">Phone number</InputLabel>
                        <OutlinedInput
                            id="tel"
                            placeholder="phone number"
                            variant="outlined"
                            value={values.tel}
                            onChange={handleChange('tel')}
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
                        className={clsx(classes.margin,
                            classes.textField,
                            values.showPasswordInput ? classes.showPasswordInput : classes.noneShowPasswordInput)}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            placeholder="password"
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
                        type='submit'
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
                </form>
            </div>
        </div>
    )
}

export default Index
