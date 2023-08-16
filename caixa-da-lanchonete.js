class CaixaDaLanchonete {
    cardapio = {
        'cafe': { descricao: 'Café', valor: 3.00 },
        'chantily': { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        'suco': { descricao: 'Suco Natural', valor: 6.20 },
        'sanduiche': { descricao: 'Sanduíche', valor: 6.50 },
        'queijo': { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        'salgado': { descricao: 'Salgado', valor: 7.25 },
        'combo1': { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        'combo2': { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
    };

    formasDePagamento = ['dinheiro', 'debito', 'credito'];

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let total = 0;

        for (const itemQuantidade of itens) {
            const [itemCodigo, quantidade] = itemQuantidade.split(',');
            const item = this.cardapio[itemCodigo];
            
            if (!item) {
                return 'Item inválido!';
            }
        
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }
        
            if (itemCodigo.endsWith('extra')) {
                const itemPrincipalCodigo = itemCodigo.replace(' extra', '');
                const itemPrincipal = this.cardapio[itemPrincipalCodigo];
                if (!itens.includes(`${itemPrincipalCodigo},${quantidade}`)) {
                    return 'Item extra não pode ser pedido sem o principal';
                }
            }
            
            total += item.valor * quantidade;
        }
        if (formaDePagamento === 'dinheiro') {
            total *= 0.95; 
        } else if (formaDePagamento === 'credito') {
            total *= 1.03; 
        }

        return `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };
