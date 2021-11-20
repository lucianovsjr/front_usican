const productTypeMessages = {
    product_type: {
        name: "Tipo de Produto |||| Tipos de Produto",
        fields: {
            name: 'Nome',
            description: 'Descrição',
            active: 'Ativo',
        },
        messages: {
            sucessCreate: 'Tipo de Produto criado com sucesso',
            sucessUpdate: 'Tipo de Produto alterado com sucesso',
        },
        errors: {
            protect: 'Existem registros associados ao tipo de Produto!',
        },
    },
};

export default productTypeMessages;
