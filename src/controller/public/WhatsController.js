import axios from 'axios'

export class WhatsController {
  async whatsInit(req, res) {
    axios.get(`http://localhost:3333/instance/init`, {
      params: {
        webhook: "true",
        key: "1",
        token: "bfb3fae6eb422c0603ebe23cc17bbca4"
      },
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(resposta => {
        return res.status(200).json(resposta.data);
      })
      .catch(error => {
        return res.status(403).json(error);
      });
  }

  async whatsMessage(req, res) {
    const testeMsg = {
      dadosLoja: {
        nomeLoja: "Buno Pizza's",
        numeroLoja: "11986413385"
      },
      dadosPessoais: {
        nome: "Bruno",
        email: "Bruno teste",
        tel: "11986413385",
      },
      endereco: {
        rua: "Rua testando123",
        complemento: '',
        cep: "09331110",
        bairro: "Vila Ferreira",
        cidade: "São Bernardo do Campo",
      },
      dadosPedido: {
        pedidos: [
          {
            pedido: "Pizza Grande - 2 sabores ",
            descricao: "meia mexicana & meia a moda do pizzaolo",
            qtd: 1,
            valor: 35,
          },
          {
            pedido: "Hamburger - 2 sabores ",
            descricao: "meia mexicana & meia a moda do pizzaolo",
            qtd: 10,
            valor: 29,
          }
        ],
        valorPedidos: 35,
        entrega: 2,
        totalPedido: 37,
        tipoPgto: "Cartão de Débito - Trazer máquina"
      }
    }
    const { dadosLoja, dadosPessoais, endereco, dadosPedido } = testeMsg


    let allOrders = ''
    dadosPedido.pedidos.forEach((i) => {
      allOrders += `    *#${i.qtd}x ${i.pedido} (${i.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })})\n`
    })

    const message = `Pedido ${dadosLoja.nomeLoja} (21:59): 42680045
    Estimativa: 60-80 minutos\n
    *Tipo de entrega:* Delivery
    *Nome:* ${dadosPessoais.nome}
    *Fone:* ${dadosPessoais.tel}
    *Endereço:* ${endereco.rua}
    *Bairro:* ${endereco.bairro}
    Complemento: ${endereco.complemento}
    *---------------------*\n${allOrders}
    *---------------------*
    *Itens:* ${dadosPedido.valorPedidos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
    *Entrega:* ${dadosPedido.entrega.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}\n
    *TOTAL:* ${dadosPedido.totalPedido.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 })}
    *---------------------*
    *Pagamento:* ${dadosPedido.tipoPgto}`


    axios.post('http://localhost:3333/message/text',
      {
        id: `55${dadosPessoais.tel}`,
        message: message
      },
      {
        params: {
          key: "1"
        },
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then(resposta => {
        if (!resposta.data.error) return res.status(200).json(resposta.data);
        return res.status(200).json('erro');
      })
      .catch(error => {
        return res.status(403).json(error);
      });
  }

  async whatsTeste(req, res) {
    const testeMsg = {
      nome: "Bruno",
      email: "Bruno teste",
      tel: "11987888488",
      rua: "Rua testando123",
      cep: "09331110",
      bairro: "Vila Ferreira",
      cidade: "São Bernardo do Campo",
    }
    const { nome, email, tel, rua, cep, bairro, cidade } = req.params

    return res.json(`Teste API Whats Code nome: ${nome} email: ${email} tel: ${tel} rua: ${rua} cep: ${cep} bairro: ${bairro} cidade: ${cidade}`)

  }
}