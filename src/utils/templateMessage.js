import {testeMsg} from "./mock.js";

export const templateMessage = () => {

    const data = testeMsg
    let allOrders = ''
    data.dadosPedido.pedidos.forEach((i) => {
        allOrders += `*${i.qtd}x *${i.pedido} (${i.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })})\n`
    })

    return `Pedido ${data.dadosLoja.nomeLoja} (21:59): 42680045
    Estimativa: 60-80 minutos\n
    *Tipo de entrega:* Delivery
    *Nome:* ${data.dadosPessoais.nome}
    *Fone:* ${data.dadosPessoais.tel}
    *Endereço:* ${data.endereco.rua}
    *Bairro:* ${data.endereco.bairro}
    Complemento: ${data.endereco.complemento}
    *---------------------*\n${allOrders}
    *---------------------*
    *Itens:* ${data.dadosPedido.valorPedidos.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })}
    *Entrega:* ${data.dadosPedido.entrega.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })}\n
    *TOTAL:* ${data.dadosPedido.totalPedido.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    })}
    *---------------------*
    *Pagamento:* ${data.dadosPedido.tipoPgto}`;
}
