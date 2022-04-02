import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Menu as raMenu, MenuItemLink, getResources, useTranslate } from 'react-admin';

import { useSelector } from 'react-redux';
import get from 'lodash/get';

import makeStyles from '@material-ui/styles/makeStyles'
import DefaultIcon from '@material-ui/icons/ViewList';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import StorageIcon from '@material-ui/icons/Storage';

import SubMenu from './SubMenu'

const MODULES = [
    { key: 'inventory', name: 'Estoque', icon: StorageIcon },
    { key: 'sales', name: 'Vendas', icon: BusinessCenterIcon }
]

const useStyles = makeStyles(theme => ({
        rootMenu: {
            marginTop: '1em',
        },
        rootItem: {
            borderLeft: `${theme.spacing.unit / 2}px solid ${theme.palette.common.white}`,
        },
        activeItem: {
            borderLeft: `${theme.spacing.unit / 2}px solid ${theme.palette.primary.main}`,
            color: theme.palette.text.primary,
        }
    })
);

const ModuleMenu = ({items, keyModule, title, Icon, open, subMenuIsOpen, handleToggle, dense}) => {
    const classes = useStyles();
    const translate = useTranslate();

    return (
        <SubMenu
            handleToggle={() => handleToggle(keyModule)}
            isOpen={subMenuIsOpen}
            name={title}
            icon={<Icon />}
            dense={dense}
        >
            {items.map(item => item.hasList && (
                <MenuItemLink
                    key={item.name}
                    to={{
                            pathname: `/${item.name}`,
                            state: { _scrollToTop: true },
                        }}
                    primaryText={item.options.label || translate(`resources.${item.name}.name`, { smart_count: 2 })}
                    leftIcon={item.icon ? <item.icon /> : <DefaultIcon />}
                    sidebarIsOpen={open}
                    className={classes.rootItem}
                    activeClassName={classes.activeItem}
                />
            ))}
        </SubMenu>
    );
};

const Menu = (props) => {
    const { dense = false } = props;
    const classes = useStyles();
    const resources = useSelector(getResources);
    const open = useSelector(state => state.admin.ui.sidebarOpen)

    const [openMenus, setOpenMenus] = useState({});

    const moduleResources = useMemo(() => MODULES.map(
        module => resources.filter(
            resource => get(resource, 'options.module') === module.key
        ).sort((a, b) => get(a, 'options.order', 0) - get(b, 'options.order', 0))
    ), [resources]);

    useEffect(() => {
        const menus = {};
        MODULES.forEach(module => menus[module.key] = true)
        setOpenMenus(menus)
    }, [])

    const handleToggle = (menu) => {
        setOpenMenus(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <raMenu className={classes.rootMenu} {...props}>
            {
                MODULES.map(
                    (module, i) =>
                        moduleResources[i].length > 0
                            && (
                                <ModuleMenu
                                    items={moduleResources[i]}
                                    keyModule={module.key}
                                    title={module.name}
                                    Icon={module.icon}
                                    open={open}
                                    subMenuIsOpen={openMenus[module.key]}
                                    handleToggle={handleToggle}
                                    dense={dense}
                                />
                            )
                )
            }
        </raMenu>
    );
};

export default Menu;
