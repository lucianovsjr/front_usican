import * as React from 'react';
import { memo, useMemo } from 'react';
import { useTranslate, useResourceContext, Button } from "react-admin";
import PropTypes from 'prop-types';
import { Fab, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ContentAdd from '@material-ui/icons/Add';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const CreateRelationButton = (props) => {
    const {
        resourceRelation = '',
        className,
        classes: classesOverride,
        icon = defaultIcon,
        label = 'ra.action.create',
        scrollToTop = true,
        variant = 'contained',
        record,
        tabRedirect = '',
        ...rest
    } = props;
    const classes = useStyles(props);
    const translate = useTranslate();
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('sm')
    );
    const resource = useResourceContext();
    const location = useMemo(
        () => ({
            pathname:`/${resourceRelation}/create`,
            state: {
                _scrollToTop: scrollToTop,
            },
            fatherResource: {
                resource,
                record,
                tabRedirect,
            },
        }),
        [record, resource, resourceRelation, tabRedirect, scrollToTop]
    );
    return isSmall ? (
        <Fab
            component={Link}
            color="primary"
            className={classnames(classes.floating, className)}
            to={location}
            aria-label={label && translate(label)}
            {...rest}
        >
            {icon}
        </Fab>
    ) : (
        <div>
            <Button
                component={Link}
                to={location}
                className={classnames(classes.button, className)}
                label={label}
                variant={variant}
                {...rest}
            >
                {icon}
            </Button>
        </div>
    );
};

const defaultIcon = <ContentAdd />;

const useStyles = makeStyles(
    theme => ({
        floating: {
            color: theme.palette.getContrastText(theme.palette.primary.main),
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000,
        },
        button: {
            flex: 0,
            height: 36.5,
            marginTop: theme.spacing.unit * 2,
            marginBottom: theme.spacing.unit * 3,
        },
    }),
    { name: 'RaCreateButton' }
);

CreateRelationButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    icon: PropTypes.element,
    label: PropTypes.string,
};

export default memo(CreateRelationButton, (prevProps, nextProps) => {
    return (
        prevProps.basePath === nextProps.basePath &&
        prevProps.label === nextProps.label &&
        prevProps.translate === nextProps.translate &&
        prevProps.to === nextProps.to &&
        prevProps.disabled === nextProps.disabled
    );
});
