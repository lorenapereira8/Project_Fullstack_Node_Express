async function carregarListar() {
    await fetch("http://localhost:5000/usuarios")
    .then(response => response.json())
    .then(usuarios => {
    
      const lista =   document.getElementById('lista-usuario')

      usuarios.forEach(ev => {

        const li = document.createElement('li')
        
        li.innerHTML = `Nome: ${ev.nome} - Data de Nascimento:${ev.dataNascimento} - CPF: ${ev.cpf}
        
        <button onclick="prepararEdicao('${ev.idusuario}', '${ev.nome}', '${ev.dataNascimento}', '${ev.cpf}')">Editar</button>
        
        <button onclick="removerUsuario(${ev.idusuario})">Excluir</button>

        `
        lista.appendChild(li)
      });

    })
}

carregarListar()


async function cadastrarUsuario() {
    const nomeDigitado = document.getElementById('nome-usuario').value
    const dataDigitado = document.getElementById('dataNascimento-usuario').value
    const cpfDigitado = document.getElementById('cpf-usuario').value

    await fetch('http://localhost:5000/usuarios', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            nome: nomeDigitado,
            dataNascimento: dataDigitado,
            cpf: cpfDigitado
        })
        
            
            
            
        
    })

    .then(response => response.json())
    .then(dados => {
        alert("Usuário cadastrado com sucesso")
        console.log(dados);
        
    })
}

let usuarioEditando = null;

function prepararEdicao(id, nome, data, cpf) {
    document.getElementById('nome-usuario').value = nome
    document.getElementById('dataNascimento-usuario').value = data
    document.getElementById('cpf-usuario').value = cpf
    usuarioEditando = id
}

async function atualizarUsuario(){
    if(!usuarioEditando){
        alert("Primeiramene, clique no editar")
        return
    }

    const nome = document.getElementById('nome-usuario').value
    const data = document.getElementById('dataNascimento-usuario').value
    const cpf = document.getElementById('cpf-usuario').value

    await fetch(`http://localhost:5000/usuarios/${usuarioEditando}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            nome:nome,
            dataNascimento:data,
            cpf:cpf
        })
    })

    alert('Usuário atualizado com sucesso!')

    usuarioEditando = null;
}

async function removerUsuario(id){

    const confirmar = confirm("Deseja Excluir usuário?")

        if(!confirmar) return

        await fetch(`http://localhost:5000/usuarios/${id}`, {
            method:'DELETE'
        })
}
