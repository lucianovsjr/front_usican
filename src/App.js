import React from 'react';
import { Admin, Resource } from 'react-admin';
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import InboxIcon from '@material-ui/icons/Inbox';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import uniq from 'lodash/uniq';

import dataProvider from './dataProvider';
import authProvider from './authProvider';
import i18nProvider from './translation';
import LoginPage from './Login';
import Layout from './Layout';
import theme from './theme';

import Customer from './resource/Customer';
import Contact from './resource/Contact';
import BudgetRequest from './resource/BudgetRequest';
import ProductType from './resource/ProductType';
import Product from './resource/Product';

const resourcesWithPerms = {
    // Inventory
    producttype: {
        Component: ProductType,
        name: 'product_type',
        icon: AllInboxIcon,
        moduleName: 'inventory',
        order: 1,
    },
    product: {
        Component: Product,
        name: 'product',
        icon: InboxIcon,
        moduleName: 'inventory',
        order: 2,
    },
    // Sales
    customer: {
        Component: Customer,
        name: 'customer',
        icon: PeopleIcon,
        moduleName: 'sales',
        order: 1,
    },
    contact: {
        Component: Contact,
        name: 'contact',
        moduleName: 'sales',
        order: 2,
    },
    budgetrequest: {
        Component: BudgetRequest,
        name: 'budget_request',
        icon: LibraryBooksIcon,
        moduleName: 'sales',
        order: 3,
    },
};

const resourcesWithoutPerms = [
    //Configurator
    <Resource name="custom_option" />,
    <Resource name="custom_option_item" />,
];

const App = () => {    
    return (
        <Admin
            title="Usican App"
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            loginPage={LoginPage}
            layout={Layout}
            theme={theme}
        >
        {permissions => {
            const models = uniq(permissions.map(({ content_type__model }) => content_type__model));
            const resources = models.map(resource => {
                const viewPerm = permissions.findIndex(({ codename }) => codename === `view_${resource}`) >= 0;
                if (!viewPerm || !resourcesWithPerms[resource]) {
                    return null;
                }

                const changePerm = permissions.findIndex(({ codename }) => codename === `change_${resource}`) >= 0;
                const addPerm = permissions.findIndex(({ codename }) => codename === `add_${resource}`) >= 0;                
                const { name, icon, moduleName, order, Component } = resourcesWithPerms[resource];

                return (
                    <Resource
                        name={name}
                        icon={icon && icon}
                        options={{ module: moduleName, order: order }}
                        list={Component.List}
                        edit={changePerm && Component.Edit}
                        create={addPerm && Component.Create}
                    />
                );
            })
            return resources.concat(resourcesWithoutPerms);
        }}
        </Admin>
    );
}


export default App;
