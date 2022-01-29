import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import customerMessages from './customer';
import contactMessages from './contact';
import budgetRequestMessages from './budgetRequest';
import productTypeMessages from './productType';
import productMessages from './product';

const resources = {
    resources: {
        ...customerMessages,
        ...contactMessages,
        ...productTypeMessages,
        ...productMessages,
        ...budgetRequestMessages,
    }
};
const messages = {
    'pt-br': {
        ...ptBrMessages,
        ...resources,
    },
};

const i18nProvider = polyglotI18nProvider(locale => messages[locale], 'pt-br');

export default i18nProvider;
