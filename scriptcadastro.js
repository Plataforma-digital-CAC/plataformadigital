let listaUsuariosGeral = JSON.parse(localStorage.getItem("usuarios")) || []; 
let dadosUsuarioTemporario = null;
let nomeUsuarioGeral = "";

 function Validar() {
  // Captura dos elementos e valores
  let campoNome = document.getElementById('nome');
  let campoCpf = document.getElementById('cpf');
  let campoEmail = document.getElementById('email');
  let campoAno = document.getElementById('ano');
  let radiosGenero = document.getElementsByName('radgen');
  let campoSenha = document.getElementById('senha');
  let campoConfirmaSenha = document.getElementById('confirmaSenha');

  let nome = campoNome.value.trim().toUpperCase().replace(/\s+/g, ' ');
  let cpfNumeros = campoCpf.value.replace(/\D/g, '');
  let email = campoEmail.value.trim();
  let anoNascimento = Number(campoAno.value);
  let senha = campoSenha.value;
  let confirmaSenha = campoConfirmaSenha.value;
  // 1. Validação do Nome
  if (nome === "") {
    alert('Por favor, digite seu nome!');
    campoNome.value="";
    campoNome.focus();
    return;
  }
  campoNome.value = nome; // Devolve o nome formatado para o campo

  // 2. Validação do CPF
  if (!validarCPF(cpfNumeros)) {
    alert("Por favor, digite um CPF válido!");
    campoCpf.value="";
    campoCpf.focus();
    return;
  }
  let cpfFormatado = cpfNumeros.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  campoCpf.value = cpfFormatado;
  // 3. Validação do E-mail
  let regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    alert('Por favor, digite um e-mail válido!');
    campoEmail.value="";
    campoEmail.focus();
    return;
  }

  // 4. Validação do Ano de Nascimento
  let anoAtual = new Date().getFullYear();
  if (campoAno.value.length === 0 || anoNascimento < 1900 || anoNascimento > anoAtual) {
    alert(`Por favor, digite um ano de nascimento válido (entre 1900 e ${anoAtual})!`);
    campoAno.value="";
    campoAno.focus();
    return;
  }
  // 5. Validação do Gênero
  let generoSelecionado = "";
  for (let i = 0; i < radiosGenero.length; i++) {
    if (radiosGenero[i].checked) {
      generoSelecionado = radiosGenero[i].value; // Certifique-se de que cada radio no HTML tem o atributo value
      break;
    }
  }
  if (generoSelecionado === "") {
    alert('Por favor, selecione seu gênero!');
    return;
  }
  // 6. Validação do Tamanho da Senha (deve ter exatamente 6 caracteres)
  if (senha.length !== 6) {
    alert('A senha deve conter exatamente 6 caracteres!');
    campoSenha.value="";
    campoConfirmaSenha.value = "";
    campoSenha.focus();
    return;
  }
  // 7. Validação da Confirmação de Senha
  if (senha !== confirmaSenha) {
    alert('As senhas digitadas não coincidem. Por favor, tente novamente!');
    campoSenha.value="";
    campoConfirmaSenha.value="";
    campoConfirmaSenha.focus();
    return;
  }

  // Guarda o nome para usar na mensagem final
  nomeUsuarioGeral = nome;

   // Prepara e Exibe a Tela de Confirmação
  let idade = anoAtual - anoNascimento;
  document.getElementById('resumo-dados').innerHTML = `
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>CPF:</strong> ${cpfFormatado}</p>
    <p><strong>E-mail:</strong> ${email}</p>
    <p><strong>Idade:</strong> ${idade} anos (${anoNascimento})</p>
    <p><strong>Gênero:</strong> ${generoSelecionado}</p>
    <p><strong>Senha:</strong> ****** (6 dígitos)</p>
  `;

  // Oculta o formulário e exibe a tela de revisão
  document.getElementById('secao-formulario').style.display = 'none';
  document.getElementById('secao-confirmacao').style.display = 'block';
   // NOVA ADIÇÃO: Guardamos todos os dados organizados em um objeto temporário
    dadosUsuarioTemporario = {
    nome: nome,
    cpf: cpfFormatado,
    email: email,
    anoNascimento: anoNascimento,
    genero: generoSelecionado,
    senha: senha // Em um sistema real, senhas nunca são salvas em texto limpo, mas para o aprendizado atual serve perfeitamente!
    };

  // Guarda o nome para usar na mensagem final (seu código original)
    nomeUsuarioGeral = nome;
}
// Botão "Refazer Cadastro": Limpa o formulário e volta à tela inicial de cadastro
function corrigirCadastro() {
  // Limpa todos os campos
  document.getElementById('nome').value = "";
  document.getElementById('cpf').value = "";
  document.getElementById('email').value = "";
  document.getElementById('ano').value = "";
  document.getElementById('senha').value = "";
  document.getElementById('confirmaSenha').value = "";

  // Desmarca os botões de gênero
  let radiosGenero = document.getElementsByName('radgen');
  for (let i = 0; i < radiosGenero.length; i++) {
    radiosGenero[i].checked = false;
  }
// Alterna as telas de volta para o formulário limpo
  document.getElementById('secao-confirmacao').style.display = 'none';
  document.getElementById('secao-formulario').style.display = 'block';
  
  // Coloca o cursor no primeiro campo
  document.getElementById('nome').focus();
}

/*// Botão "Confirmar Cadastro": Exibe o alert final e redireciona
function confirmarCadastroFinal() {
  alert(`Cadastro de ${nomeUsuarioGeral} realizado com sucesso! Você será redirecionado para a tela de login.`);
  window.location.href = "index.html";
  // Botão "Confirmar Cadastro": Salva na lista, exibe o alert e redireciona
function confirmarCadastroFinal() {
  
  // SE SEGURANÇA: Verifica se existem dados temporários antes de salvar
  if (dadosUsuarioTemporario !== null) {
    // Adiciona o novo usuário na lista sem apagar os anteriores!
    listaUsuariosGeral.push(dadosUsuarioTemporario);
    // Limpa a variável temporária para o próximo cadastro
    dadosUsuarioTemporario = null;
  }

  alert(`Cadastro de ${nomeUsuarioGeral} realizado com sucesso! Você será redirecionado para a tela de login.`);
  window.location.href = "index.html";
}
}*/
function confirmarCadastroFinal() {
  if (dadosUsuarioTemporario !== null) {
    listaUsuariosGeral.push(dadosUsuarioTemporario);
    
    // Transforma a lista em texto e salva no LocalStorage
    localStorage.setItem("usuarios", JSON.stringify(listaUsuariosGeral));
    
    dadosUsuarioTemporario = null;
  }

  alert(`Cadastro de ${nomeUsuarioGeral} realizado com sucesso! Você será redirecionado para a tela de login.`);
  window.location.href = "index.html";
}
 
// Função para validar o cálculo real do CPF
function validarCPF(cpf) {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Cálculo do 1º Dígito Verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;
  // Cálculo do 2º Dígito Verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;
  return true;
}
function alternarVisibilidade(idCampo, botao) {
  let campo = document.getElementById(idCampo);

  if (campo.type === "password") {
    campo.type = "text";
    botao.textContent = "🙈"; // Altera o ícone quando a senha está visível
  } else {
    campo.type = "password";
    botao.textContent = "👁️"; // Volta ao ícone padrão quando a senha está oculta
  }
}