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
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import sendPost from '../../api/sendPost'
import Notify from '../../compents/Notify'
import linkTo from '../../compents/LinkTo'
import encrypt from '../../compents/Encrypt'

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
    input:{
        marginTop:theme.spacing(2)
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

function Index(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        OldPassword: '',
        NewPassword: '',
        showPassword: false,
    });
    const [notifyOpen, setNotifyOpen] = React.useState(false);
    const [notifyOpen2, setNotifyOpen2] = React.useState(false);

    const handleNotifyOpen = () => {
        setNotifyOpen(true)
    }

    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen(false);
    };

    const handleNotifyOpen2 = () => {
        setNotifyOpen2(true)
    }

    const handleNotifyClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen2(false);
    };
    const submit = async () => {
        const data = `OldPassword=${encrypt(values.OldPassword)}&NewPassword=${encrypt(values.NewPassword)}`
        const res = await sendPost('/back_end_war_exploded/ChangePassword', data)
        console.log(res)
        if (res.answer === 'true') {
            handleNotifyOpen2()
            setTimeout(()=>linkTo('shoppingweb'),1500)
        }
        else {
            handleNotifyOpen();
        }
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <div className={classes.bgdrop}>
                <div className={classes.rootForm}>
                    <FormControl
                        variant="outlined"
                        className={classes.input}
                    >
                        <InputLabel htmlFor="OldPassword">Old Password</InputLabel>
                        <OutlinedInput
                            id="OldPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={values.OldPassword}
                            onChange={handleChange('OldPassword')}
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
                            labelWidth={130}
                        />
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        className={classes.input}
                    >
                        <InputLabel htmlFor="NewPassword">New Password</InputLabel>
                        <OutlinedInput
                            id="NewPassword"
                            type={values.showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={values.NewPassword}
                            onChange={handleChange('NewPassword')}
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
                            labelWidth={140}
                        />
                    </FormControl>
                    <ButtonBase
                        focusRipple
                        key="changePassword"
                        onClick={submit}
                        className={clsx(classes.image)}
                        focusVisibleClassName={classes.focusVisible}
                    >
                        <span className={classes.imageButton}>
                            <Typography
                                component="span"
                                variant="subtitle1"
                                color="inherit"
                                className={classes.imageTitle}
                            >
                                <b>确定更改</b>
                                <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                </div>
            </div>
            <Notify open={notifyOpen} message={'密码错误'} type={'error'} handleClose={handleNotifyClose} />
            <Notify open={notifyOpen2} message={'修改密码成功'} type={'success'} handleClose={handleNotifyClose2} />
        </div>
    )
}

export default Index
