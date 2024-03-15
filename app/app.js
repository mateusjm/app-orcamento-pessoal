class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        // for in
        // por meio do this conseguimos percorrer os atributos contidos no método despesa
        for(let i in this) {
            // this[i] percorre todos atributos
            if(this[i] == undefined || this[i] == '' || this[i] == null ) {
                return false
            } 
        }
        return true
        
    }

}

class Bd {

    constructor() {
        // criamos o elemento id
        let id = localStorage.getItem('id') 

        // vamos verificar se há um id
        
        if (id === null) {
            // senão existir um id, ele recebe null
            localStorage.setItem('id', 0)
            // e é criado/setado um id com o valor 0
        } // sempre iniciará um valor pra id quando essa informação não existir
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id') 
        // o retorno será null, como não há nenhum dado como 'id' em localStorage
        // getItem recupera um dado dentro de localStorage
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
        // setItem insere um dado dentro de localStorage
    }

    recuperarTodosRegistros() {

        // array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {
            // recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))

            // existe a possibilidade de haver indices que foram pulados/removidos
            // nestes casos nós vamos pular esses indices

            if(despesa === null) {
                continue
            }

            despesas.push(despesa)
            
        }
        
        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array()

        despesasFiltradas = this.recuperarTodosRegistros()

        console.log(despesa)
        
        console.log(despesasFiltradas)

        // ano

        // verifica se o campo foi preenchido e não retorna se estiver vazio
        if (despesa.ano != '') {
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano)
        }

        // mes
        
        if (despesa.mes != '') {
            console.log('filtro de mês')
            despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes)
        }

        // dia

        if (despesa.dia != '') {
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia)
        }

        // tipo

        if (despesa.tipo != '') {
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo)
        }

        // descricao

        if(despesa.descricao != ''){
            console.log('filtro de descrição')
            despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao)
        }

        // valor

        if(despesa.valor != ''){
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter( d => d.valor == despesa.valor)
        }

        console.log(despesasFiltradas)

    }

}

let bd = new Bd()

function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
    )

    if (despesa.validarDados()) {
       bd.gravar(despesa) 
       
       document.getElementById('modal-titulo').innerHTML = 'Registro inserido com sucesso'
       document.getElementById('modal-titulo-div').className = 'modal-header text-success'
       document.getElementById('modal-conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
       document.getElementById('modal-botao').innerHTML = 'Voltar'
       document.getElementById('modal-botao').className = 'btn btn-success'

        // dialog de sucesso
        $('#modalRegistraDespesa').modal('show')

        // limpando os valores após o registro
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        
        document.getElementById('modal-titulo').innerHTML = 'Erro na gravação'
        document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
        document.getElementById('modal-conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal-botao').innerHTML = 'Voltar e Corrigir'
        document.getElementById('modal-botao').className = 'btn btn-danger'
        
        // dialog de erro
        $('#modalRegistraDespesa').modal('show')
    }
    
}

function carregaListaDespesas() {
    let despesas = Array()
    // o Array despesas recebe o array despesas feito no bd.recuperarTodosRegistros
    despesas =  bd.recuperarTodosRegistros()

    let listaDespesas = document.getElementById('listaDespesas')

    /* <tr>
        <td>15/03/2024</td>
        <td>Alimentação</td>
        <td>Compras do mês</td>
        <td>444.75</td>
    </tr> */

    // percorrrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {
        // criando a linha (tr)

        let linha = listaDespesas.insertRow()
        
        //após inserir a linha, é preciso criar valores, as colunas
        // criando as colunas (td)

        // o método espera um parâmetro para saber apartir de qual colunana deve ser criada
        // as colunas são criadas de 0 até n
        // a coluna mais esquerda de uma coluna é 0
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // ajustar o tipo, mudar o retorno, que estava sendo de number para string
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo

        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })

}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(
        ano, 
        mes, 
        dia, 
        tipo, 
        descricao, 
        valor
    )

    bd.pesquisar(despesa)
    
}
