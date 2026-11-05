/ Captura o formulário de login do seu index.html
document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar ao enviar o formulário

    // Captura o que o usuário digitou
    let loginDigitado = document.getElementById('username').value.trim();
    let senhaDigitada = document.getElementById('password').value;

    // Busca a lista de usuários do LocalStorage
    let listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Procura na lista se existe alguém com esse Nome/CPF E essa Senha
    let usuarioEncontrado = listaUsuarios.find(usuario => {
        // Aceita login tanto pelo Nome formatado (Maiúsculo) quanto pelo CPF digitado
        return (usuario.nome === loginDigitado.toUpperCase() || usuario.cpf === loginDigitado) 
               && usuario.senha === senhaDigitada;
    });

    if (usuarioEncontrado) {
        alert(`Bem-vindo de volta, ${usuarioEncontrado.nome}!`);
        // Aqui você redirecionaria para a página interna do sistema
    } else {
        alert("Usuário ou senha incorretos. Tente novamente ou cadastre-se!");
    }
});