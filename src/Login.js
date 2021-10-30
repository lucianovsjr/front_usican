import React, {
    createElement,
    useRef,
    useEffect,
    useMemo,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
// import LockIcon from '@material-ui/icons/Lock';
import { useHistory } from 'react-router-dom';
import { useCheckAuth } from 'ra-core';

import { defaultTheme, createMuiTheme, Notification as DefaultNotification } from 'react-admin';
import DefaultLoginForm from './LoginForm';

const styles = (theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        height: '1px',
        alignItems: 'center',
        // justifyContent: 'flex-start',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        // backgroundImage:
        //     'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
        backgroundColor: "#fffafa",
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',        
    },
    // icon: {
    //     backgroundColor: defaultTheme.palette.secondary[500],
    // },
    icon: {
        minWidth: 80,
        minHeight: 80,
    },
});

const useStyles = makeStyles(theme => styles(theme));

const Login = props => {
    const {
        theme,
        title,
        classes: classesOverride,
        className,
        children,
        notification,
        staticContext,
        backgroundImage,
        ...rest
    } = props;
    const containerRef = useRef();
    const classes = useStyles();
    const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);
    let backgroundImageLoaded = false;
    const checkAuth = useCheckAuth();
    const history = useHistory();
    useEffect(() => {
        checkAuth({}, false)
            .then(() => {
                // already authenticated, redirect to the home page
                history.push('/');
            })
            .catch(() => {
                // not authenticated, stay on the login page
            });
    }, [checkAuth, history]);

    const updateBackgroundImage = () => {
        if (!backgroundImageLoaded && containerRef.current) {
            containerRef.current.style.backgroundImage = `url(${backgroundImage})`;
            backgroundImageLoaded = true;
        }
    };

    // Load background image asynchronously to speed up time to interactive
    const lazyLoadBackgroundImage = () => {
        if (backgroundImage) {
            const img = new Image();
            img.onload = updateBackgroundImage;
            img.src = backgroundImage;
        }
    };

    useEffect(() => {
        if (!backgroundImageLoaded) {
            lazyLoadBackgroundImage();
        }
    });

    return (
        <ThemeProvider theme={muiTheme}>
            <div
                className={classnames(classes.main, className)}
                {...rest}
                ref={containerRef}
            >
                <Card className={classes.card}>
                    <div className={classes.avatar}>
                        {/* <Avatar className={classes.icon}>
                            <LockIcon />
                        </Avatar> */}
                        <Avatar
                            src="logo.jpeg"
                            className={classes.icon}
                        />
                    </div>
                    {children}
                </Card>
                {notification ? createElement(notification) : null}
            </div>
        </ThemeProvider>
    );
};

Login.propTypes = {
    backgroundImage: PropTypes.string,
    children: PropTypes.node,
    classes: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.object,
    staticContext: PropTypes.object,
};

Login.defaultProps = {
    theme: defaultTheme,
    children: <DefaultLoginForm />,
    notification: DefaultNotification,
};

export default Login;