const budgetRequestMessages = {
    budget_request: {
        name: "Solic. Orçamento |||| Solic. Orçamentos",
        fields: {
            customer: 'Cliente',
            contact: 'Contato',
            deadline: 'Prazo de Resposta',
            deadline__gt: 'Prazo de Resposta (De)',
            deadline__lt: 'Prazo de Resposta (Até)',
            observation: 'Observação',
            reason_decline: 'Motivo do Declínio',
            observation_reason: 'Observação do Declínio',
            means_receipt: 'Meio de Recebimento',
            informed_customer_decline: 'Declínio informado ao Cliente?',
            status: 'status',
        },
        tabs: {
            general: 'Geral',
            decline: 'Declínio',
        },
        messages: {
            sucessCreate: 'Solicitação de Orçamento criado com sucesso',
            sucessUpdate: 'Solicitação de Orçamento alterado com sucesso',
            sucessDelete: 'Solicitação de Orçamento removido com sucesso',
            cancelInvalid: 'Orçamento não está Aberto |||| Orçamentos não estão Abertos',
            cancelSuccess: 'Orçamento cancelado com sucesso |||| Orçamentos cancelados com sucesso',
            cancelFailure: 'Ocorreu um erro ao cancelar Orçamento |||| Ocorreu um erro ao cancelar os Orçamentos',
            reopenInvalid: 'Orçamento não está Cancelado ou Declinado |||| Orçamentos não estão Cancelados ou Declinados',
            reopenSuccess: 'Orçamento Aberto com sucesso |||| Orçamentos Abertos com sucesso',
            reopenFailure: 'Ocorreu um erro ao Abrir Orçamento |||| Ocorreu um erro ao Abrir os Orçamentos',
        },
        helper_text: {
            deadline: 'Prazo em dias',
        },
        buttons: {
            cancel: 'Cancelar',
            reopen: 'Abrir',
        },
    },
};

export default budgetRequestMessages;
