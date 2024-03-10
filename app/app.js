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
       // dialog de sucesso
        $('#sucessoGravacao').modal('show')
    } else {
        // dialog de erro
        $('#erroGravacao').modal('show')
    }
    

}