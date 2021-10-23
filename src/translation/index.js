import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import customerMessages from './customer';

const resources = {
    resources: {
        ...customerMessages,
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
