const customerMessages = {
    customer: {
        name: "Cliente |||| Clientes",
        fields: {
            legal_entity: 'Tipo',
            name: 'Nome',
            identity_number: 'CPF/CNPJ',
            email: 'E-mail',
            phone_number: 'Telefone 1',
            phone_number2: 'Telefone 2',
            cep: 'CEP',
            public_place: 'Endereço',
            address_number: 'Número',
            address_complement: 'Complemento',
            district: 'Bairro',
            active: 'Ativo',
            city: 'Cidade',
        },
        validation: {
            phone: 'Deve ser um número de telefone válido',
            cep: 'Deve ser um CEP válido',
        },
        messages: {
            invalidCep: 'CEP inválido',
            sucessCreate: 'Cliente criado com sucesso',
            sucessUpdate: 'Cliente alterado com sucesso',
        },
        errors: {
            protect: 'Existem registros associados ao cliente!',
        },
    },
};

export default customerMessages;
