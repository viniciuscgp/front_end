// URL da API RESTful
const API_URL = 'http://localhost:5000/pets';

const petInfo = {
  "Labrador Retriever": {
    info: "O Labrador Retriever é um cão amigável e inteligente, que adora brincar e estar perto da família. Eles geralmente vivem cerca de 10 a 12 anos.",
    image: "labrador.jpg"
  },
  "Golden Retriever": {
    info: "O Golden Retriever é um cão carinhoso e leal, que adora brincar e é muito inteligente. Eles geralmente vivem cerca de 10 a 12 anos.",
    image: "golden.jpg"
  },
  "Pastor Alemão": {
    info: "O Pastor Alemão é um cão inteligente e corajoso, que é comumente usado como cão de trabalho ou guarda. Eles geralmente vivem cerca de 9 a 13 anos.",
    image: "pastor_alemao.jpg"
  },
  "Buldogue": {
    info: "O Buldogue é um cão afetuoso e amigável, que adora estar perto da família. Eles geralmente vivem cerca de 8 a 10 anos.",
    image: "buldogue.jpg"
  },
  "Beagle": {
    info: "O Beagle é um cão enérgico e amigável, que é frequentemente usado para caça. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "beagle.jpg"
  },
  "Poodle": {
    info: "O Poodle é um cão inteligente e obediente, que é frequentemente usado em competições de beleza. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "poodle.jpg"
  },
  "Rottweiler": {
    info: "O Rottweiler é um cão leal e protetor, que é frequentemente usado como cão de guarda. Eles geralmente vivem cerca de 8 a 10 anos.",
    image: "rottweiler.jpg"
  },
  "Boxer": {
    info: "O Boxer é um cão enérgico e amigável, que adora estar perto da família. Eles geralmente vivem cerca de 10 a 12 anos.",
    image: "boxer.jpg"
  },
  "Dachshund": {
    info: "O Dachshund é um cão inteligente e corajoso, que é frequentemente usado como cão de caça. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "dachshund.jpg"
  },
  "Chihuahua": {
    info: "O Chihuahua é um cão pequeno e alerta, que é frequentemente usado como cão de companhia. Eles geralmente vivem cerca de 12 a 20 anos.",
    image: "chihuahua.jpg"
  },
  "Shih Tzu": {
    info: "O Shih Tzu é um cão de companhia leal e afetuoso, que é conhecido por seu longo pelo sedoso. Eles geralmente vivem cerca de 10 a 18 anos.",
    image: "shih_tzu.jpg"
  },
  "Lhasa Apso": {
    info: "O Lhasa Apso é um cão calmo e amigável, que é conhecido por seu longo pelo sedoso. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "lhasa_apso.jpg"
  },
  "Maltês": {
    info: "Em resumo, o Maltês é uma raça de cão pequeno e elegante, conhecida por sua pelagem branca e sedosa, bem como por seu temperamento afetuoso e gentil. Eles são cães de companhia populares e podem viver até 12-15 anos com cuidados adequados.",
    image: "maltes.jpg"
  },
  "Yorkshire Terrier": {
    info: "O Yorkshire Terrier é uma raça pequena e enérgica, conhecida por seu pelo sedoso e personalidade brincalhona. Eles geralmente vivem cerca de 11 a 15 anos.",
    image: "yorkshire_terrier.jpg"
  },
  "Persa": {
    info: "O gato Persa é conhecido por seu pelo longo e sedoso e sua personalidade tranquila e afetuosa. Eles geralmente vivem cerca de 12 a 16 anos.",
    image: "persa.jpg"
  },
  "Maine Coon": {
    info: "O gato Maine Coon é uma raça grande e majestosa, conhecida por seu pelo longo e densamente emaranhado e sua personalidade gentil. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "maine_coon.jpg"
  },
  "Siamês": {
    info: "O gato Siamês é uma raça elegante e inteligente, conhecida por sua personalidade extrovertida e faladora. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "siames.jpg"
  },
  "Ragdoll": {
    info: "O gato Ragdoll é uma raça grande e gentil, conhecida por sua personalidade relaxada e afetuosa. Eles geralmente vivem cerca de 12 a 17 anos.",
    image: "ragdoll.jpg"
  },
  "Bengal": {
    info: "O gato Bengal é uma raça ativa e brincalhona, conhecida por sua pelagem marcada e manchada e sua personalidade curiosa. Eles geralmente vivem cerca de 10 a 16 anos.",
    image: "bengal.jpg"
  },
  "Abissínio": {
    info: "O gato Abissínio é uma raça elegante e atlética, conhecida por sua pelagem ruiva e personalidade ativa e extrovertida. Eles geralmente vivem cerca de 12 a 15 anos.",
    image: "abissinio.jpg"
  },
  "Sphynx": {
    info: "O gato Sphynx é uma raça sem pelos, conhecida por sua aparência única e personalidade afetuosa e extrovertida. Eles geralmente vivem cerca de 8 a 14 anos.",
    image: "sphynx.jpg"
  },
  "Birmanês": {
    info: "O gato Birmanês é uma raça elegante e pacífica, conhecida por sua pelagem macia e personalidade afetuosa. Eles geralmente vivem cerca de 12 a 16 anos.",
    image: "birmanes.jpg"
  }
}


$(document).ready(function () {

  $('#modal-erro').modal({
    show: false
  });

  preparaShowPetInfo();
  preparaMostrarFormulario();
  preparaLinksRodape();
  exibirCookie();
  listarPets();
});

// LISTAR TODOS OS PETS
//---------------------------------------------------------------
function listarPets() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      // Limpa a tabela de pets
      const tbody = document.querySelector('#table-pets tbody');
      tbody.innerHTML = '';

      // Preenche a tabela de pets com os dados da API
      data.pets.forEach(pet => {
        const newRow = tbody.insertRow();
        newRow.innerHTML = `
          <td>${pet.nome}</td>
          <td><a href="#" onclick="clicouRaca(this);">${pet.raca}</a></td>
          <td>${pet.idade}</td>
          <td>
            <button class="btn btn-info btn-editar" data-pet="${pet}" data-id="${pet.id}"><i class="fas fa-pencil-alt" title="Edita as informações deste Pet"></i></button>
            <button class="btn btn-danger btn-excluir" data-id="${pet.id}"><i class="fas fa-trash-alt" title="Exclui este Pet"></i></button>
          </td>
        `;

      });
    })
    .catch(error => mostraErro(error));
}

// GET Pet By ID
//--------------------------------------------------------------
async function getPetById(id) {
  var url = API_URL + `/${id}`
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    mostraErro(error);
  }

}

// CADASTRAR
//---------------------------------------------------------------

function cadastrarPet(pet) {
  $.ajax({
    url: API_URL,
    method: 'POST',
    data: pet,
    success: function () {
      listarPets();
      mostraAviso("Adicionado com sucesso!")
    },
    error: function (xhr, status, error) {
      mostraErro("Erro ao adicionar: " + error)
    }
  });
  $('#form-pet')[0].reset();
}

// ALTERAR
//---------------------------------------------------------------

function alterarPet(pet, pet_id) {
  $.ajax({
    url: API_URL + `/${pet_id}`,
    method: 'PUT',
    data: pet,
    success: function () {
      listarPets();
      mostraAviso("Alterado com sucesso!")
    },
    error: function (xhr, status, error) {
      mostraErro("Erro ao atualizar: " + error)
    }
  });
  $('#form-pet')[0].reset();

  btn = document.getElementById("btn_cadastrar");
  btn.innerText = "Cadastrar";
}


// Evento SUBMIT do Form
//---------------------------------------------------------------
$('#form-pet').submit(function (event) {
  event.preventDefault();

  const pet_id = $('#form-pet #pet-id').val();

  var pet = {
    nome: $('#nome').val(),
    raca: $('#raca').val(),
    idade: $('#idade').val(),
    tutor_email: $('#tutor-email').val(),
    tutor_telefone: $('#tutor-telefone').val(),
  };

  if (!pet_id)
    cadastrarPet(pet);
  else
    alterarPet(pet, pet_id);
});

// EXCLUIR
//-----------------------------------------------------------------
$('#table-pets').on('click', '.btn-excluir', function () {
  var id = $(this).data('id');
  confirmaExclusaoPet(id);
});

function excluiPet(id) {
  $.ajax({
    url: API_URL + '/' + id,
    method: 'DELETE',
    success: function () {
      // Lista os pets atualizados
      listarPets();
    }
  });

}

function confirmaExclusaoPet(id) {
  $('#modal-pergunta').modal('show');

  $('#btn-modal-pergunta-excluir').off().on('click', function () {
    excluiPet(id);
    $('#modal-pergunta').modal('hide');
  });
}

// EDITAR
//-----------------------------------------------------------------
$('#table-pets').on('click', '.btn-editar', async function () {
  var pet_id = $(this).data('id');
  var pet = await getPetById(pet_id)

  // Exibe o formulário de edição se estiver oculto
  if ($('#div-cadastro').hasClass('d-none')) {
    $('#mostrar-formulario').trigger('click');
  }

  document.getElementById('nome').focus();

  $('#form-pet #pet-id').val(pet.id); // Para podermos atualizar os dados do Pet. (hidden)
  $('#form-pet #nome').val(pet.nome);
  $('#form-pet #raca').val(pet.raca);
  $('#form-pet #idade').val(pet.idade);
  $('#form-pet #tutor-email').val(pet.tutor_email);
  $('#form-pet #tutor-telefone').val(pet.tutor_telefone);

  btn = document.getElementById("btn_cadastrar");
  btn.innerText = "Alterar";

});

// EVENTO change da LIST 'raca'
//-------------------------------------------------------------
function preparaShowPetInfo() {
  const select = document.getElementById('raca');

  select.addEventListener('change', (event) => {
    let raca = event.target.value;
    let adiv = document.getElementById("breed-info");

    adiv.innerHTML = `
          <h3>${raca}</h3>
          <p>${petInfo[raca].info}</p>
          <img src="images/pets/${petInfo[raca].image}" alt="${raca}" class="img-fluid">
      `;
  });
}

// EVENTO Click do Botao "Mostrar Formulario..."
//-------------------------------------------------------------
function preparaMostrarFormulario() {
  const btnMostrarFormulario = document.getElementById('mostrar-formulario');
  const divCadastro = document.getElementById('div-cadastro');
  const divDadosRaca = document.getElementById('mostrar-dados-raca');

  btnMostrarFormulario.addEventListener('click', function () {
    divCadastro.classList.toggle('d-none');
    divDadosRaca.classList.toggle('d-none');

    if (divCadastro.classList.contains('d-none')) {
      btnMostrarFormulario.textContent = 'Cadastrar um Novo Pet';
    } else {
      btnMostrarFormulario.textContent = 'Esconder formulário de cadastro';
    }
  });
}

// EVENTO Click dos links do rodape
//-------------------------------------------------------------

function preparaLinksRodape() {
  document.getElementById('linkPoliticaPrivacidade').addEventListener('click', function (event) {
    event.preventDefault();
    mostraMensagem('Política de Privacidade', 'static/politica_privacidade.html');
  });

  document.getElementById('linkTermosDeUso').addEventListener('click', function (event) {
    event.preventDefault();
    mostraMensagem('Termos de Uso', 'static/termos_uso.html');
  });
}

const clicouRaca = (event) => {
  var raca = event.innerText;
  var html = `
        <h3>${raca}</h3>
        <p>${petInfo[raca].info}</p>
        <img src="images/pets/${petInfo[raca].image}" alt="${raca}" class="img-fluid">`;

  mostraConteudoHtml(html);
};


//------------------------------------------------------------
// FUNÇÕES AUXILIARES - Exibe uma mensagem de erro em um MODAL
//------------------------------------------------------------
function mostraErro(mensagem) {
  $('#modal-erro-mensagem').text(mensagem);
  $('#modal-erro').modal('show');
}

function mostraConteudoHtml(mensagem) {
  $('#modal-html-mensagem').html(mensagem);
  $('#modal-html').modal('show');
}


function mostraAviso(mensagem) {
  $('#modal-aviso-mensagem').text(mensagem);
  $('#modal-aviso').modal('show');

  let counter = 5;

  const countdownInterval = setInterval(() => {
    counter--;
    $('#countdown').text(counter);
    if (counter === 0) {
      clearInterval(countdownInterval);
      $('#modal-aviso').modal('hide');
    }
  }, 1000);
}

async function mostraMensagem(title, url) {
  const modalElement = document.getElementById('modal-message');
  const modal = new bootstrap.Modal(modalElement);

  document.getElementById('modalLabel').innerText = title;

  try {
    const response = await fetch(url);
    const text = await response.text();
    document.getElementById('modalText').innerHTML = text;
  } catch (error) {
    console.error('Erro ao buscar o arquivo:', error);
    document.getElementById('modalText').innerText = 'Ocorreu um erro ao carregar o conteúdo. Por favor, tente novamente mais tarde.';
  }

  modal.show();
}


let cookieModal;

function exibirCookie() {
  if (!localStorage.getItem('cookieSeen')) {
    const cookieElement = document.getElementById('cookie-modal');
    cookieModal = new bootstrap.Modal(cookieElement, { backdrop: 'static', keyboard: false });
    cookieModal.show();
  }
}

function fecharMensagem() {
  cookieModal.hide();
  localStorage.setItem('cookieSeen', 'true');
}