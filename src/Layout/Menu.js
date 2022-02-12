import React from 'react';
import { Menu as raMenu, MenuItemLink, getResources, useTranslate } from 'react-admin';

import { useSelector } from 'react-redux';
import get from 'lodash/get';

import makeStyles from '@material-ui/styles/makeStyles'
import MenuItem from '@material-ui/core/MenuItem';
import DefaultIcon from '@material-ui/icons/ViewList';

const MODULES = [
    { key: 'inventory', name: 'Estoque' },
    { key: 'sales', name: 'Vendas' }
]

const useStyles = makeStyles({
    rootMenu: {
        marginTop: '1.5em',
    },
    titleMenuItem: {
        fontSize: 18,
    },
});

const ModuleMenu = ({items, title, open, ...rest}) => {
    const classes = useStyles();
    const translate = useTranslate()

    return (
        <React.Fragment>
            <MenuItem button={false} classes={{ root: classes.titleMenuItem }} {...rest}>
                {title}
            </MenuItem>
            {items.map(item => item.hasList && (
                <MenuItemLink
                    key={item.name}
                    to={{
                            pathname: `/${item.name}`,
                            state: { _scrollToTop: true },
                        }}
                    primaryText={item.options.label || translate(`resources.${item.name}.name`, { smart_count: 1 })}
                    leftIcon={item.icon ? <item.icon /> : <DefaultIcon />}
                    sidebarIsOpen={open}
                />
            ))}
        </React.Fragment>
    );
};

const Menu = (props) => {
    const classes = useStyles();
    const resources = useSelector(getResources);
    const open = useSelector(state => state.admin.ui.sidebarOpen)

    const moduleResources = MODULES.map(module => resources.filter(resource => get(resource, 'options.module') === module.key))

    return (
        <raMenu className={classes.rootMenu} {...props}>
            {
                MODULES.map(
                    (module, i) =>
                        moduleResources[i]
                            && (
                                <ModuleMenu
                                    items={moduleResources[i]}
                                    title={module.name}
                                    open={open}
                                />
                            )
                )
            }
        </raMenu>
    );
};

export default Menu;
