import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import sendPost from '../../api/sendPost'
import Notify from '../../compents/Notify'
import encrypt from '../../compents/Encrypt'
import linkTo from '../../compents/LinkTo'
import CircularIndeterminate from '../../compents/CircularIndeterminate'

// define CSS
const useStyles = makeStyles((theme) => ({
    root: {
        margin: '10px auto',
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexGrow: 1,
        width: '60vw',
        height: '80vh'
    },
    formInput: {
        flexFlow: 1,
        width: '100%'
    }
}));

// register component
// --
// props: from parent component, must include setLoginInfo
// --
// return: HTML elements
function Index(props) {
    const classes = useStyles();

    const [backDropOpen, setBackdropOpen] = React.useState(false);

    const [notifyOpen, setNotifyOpen] = React.useState(
        {
            open: false,
            message: ''
        }
    );

    // open nofity
    const handleNotifyOpen = (message) => {
        setNotifyOpen(
            {
                open: true,
                message: message
            }
        )
    }
    // close nofity
    const handleNotifyClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setNotifyOpen(
            {
                open: false,
                message: ''
            }
        );
    };
    const [values, setValues] = React.useState({
        PhoneNumber: '',
        Name: '',
        AccountName: '',
        Password: '',
        Deposit: '',
        showPassword: false
    });
    
    // synchronize input value and the state of the component
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // change whether show the password
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    // prevent the default which is defined by the browser
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // send a request to the backend, when user choose submit the form
    // if the regist is success, then login and skip to the index page
    // if the regist is failed, notify the reason to the user
    const handleSubmit = async () => {
        setBackdropOpen(true)
        const data = `PhoneNumber=${values.PhoneNumber}&Name=${values.Name}&AccountName=${values.AccountName}&Password=${encrypt(values.Password)}&Deposit=${values.Deposit}`
        const res = await sendPost('back_end_war_exploded/regist', data)
        setBackdropOpen(false)
        if (res.answer === 'true') {
            const data2 = `PhoneNumber=${values.PhoneNumber}&Password=${encrypt(values.Password)}`
            const res2 = await sendPost('back_end_war_exploded/Login', data2)
            if (res2.answer === 'true') {
                linkTo('shoppingweb', () => { props.setLoginInfo(res2.AccountInformation[0]) })
            }
        }
        else if (res.answer === 'exist') {
            handleNotifyOpen('The phone number is already registed!');
        }
        else {
            handleNotifyOpen('Illegal password!');
        }
    }
    return (
        <div className={classes.root}>
            <FormControl className={classes.formInput} variant="outlined">
                <InputLabel htmlFor="PhoneNumber">Phone number</InputLabel>
                <OutlinedInput
                    id="PhoneNumber"
                    variant="outlined"
                    value={values.PhoneNumber}
                    onChange={handleChange('PhoneNumber')}
                    labelWidth={130}
                />
            </FormControl>

            <FormControl
                className={classes.formInput}
                variant="outlined"
            >
                <InputLabel htmlFor="Password">Password</InputLabel>
                <OutlinedInput
                    id="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    variant="outlined"
                    value={values.Password}
                    onChange={handleChange('Password')}
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
            <FormControl
                className={classes.formInput}
                variant="outlined"
            >
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput
                    id="Name"

                    variant="outlined"
                    value={values.Name}
                    onChange={handleChange('Name')}
                    labelWidth={50}
                />
            </FormControl>
            <FormControl
                className={classes.formInput}
                variant="outlined"
            >
                <InputLabel htmlFor="AccountName">Account Name</InputLabel>
                <OutlinedInput
                    id="AccountName"
                    variant="outlined"
                    value={values.AccountName}
                    onChange={handleChange('AccountName')}
                    labelWidth={150}
                />
            </FormControl>
            <FormControl
                className={classes.formInput}
                variant="outlined"
            >
                <InputLabel htmlFor="Deposit">Deposit</InputLabel>
                <OutlinedInput
                    id="Deposit"
                    variant="outlined"
                    type='number'
                    value={values.Deposit}
                    onChange={handleChange('Deposit')}
                    labelWidth={70}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}

                />
            </FormControl>
            <Button onClick={handleSubmit} color='secondary' variant='contained'>Regist</Button>
            <Notify open={notifyOpen.open} message={notifyOpen.message} type={'error'} handleClose={handleNotifyClose} />
            <CircularIndeterminate backDropOpen={backDropOpen} handle={() => setBackdropOpen(false)} />
        </div>
    )
}

export default Index
