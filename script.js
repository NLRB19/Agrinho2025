const form = document.getElementById('schoolForm');
const tableBody = document.querySelector('#schoolTable tbody');
const modal = document.getElementById('imageModal');
const closeModal = document.querySelector('.close');
const imageGallery = document.getElementById('imageGallery');
const imageURLInput = document.getElementById('imageURL');
const addImageBtn = document.getElementById('addImageBtn');

let escolas = JSON.parse(localStorage.getItem('escolas')) || [];
let escolaSelecionada = null;

function salvarEscolas() {
  localStorage.setItem('escolas', JSON.stringify(escolas));
}

function renderizarTabela() {
  tableBody.innerHTML = '';

  escolas.forEach((escola, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${escola.nome}</td>
      <td>${escola.endereco}</td>
      <td>${escola.diretoria}</td>
      <td>${escola.alunos}</td>
      <td><button onclick="removerEscola(${index})">Excluir</button></td>
      <td><button onclick="abrirModal(${index})">📷 Ver Ações</button></td>
    `;
    tableBody.appendChild(row);
  });
}

function removerEscola(index) {
  if (confirm("Deseja realmente excluir esta escola?")) {
    escolas.splice(index, 1);
    salvarEscolas();
    renderizarTabela();
  }
}

function abrirModal(index) {
  escolaSelecionada = index;
  modal.style.display = 'block';
  imageGallery.innerHTML = '';

  const imagens = escolas[index].imagens || [];

  imagens.forEach((url) => {
    const img = document.createElement('img');
    img.src = url;
    imageGallery.appendChild(img);
  });
}

closeModal.onclick = () => {
  modal.style.display = 'none';
  imageURLInput.value = '';
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    imageURLInput.value = '';
  }
};

addImageBtn.onclick = () => {
  const url = imageURLInput.value;
  if (!url) return;

  if (!escolas[escolaSelecionada].imagens) {
    escolas[escolaSelecionada].imagens = [];
  }

  escolas[escolaSelecionada].imagens.push(url);
  salvarEscolas();
  abrirModal(escolaSelecionada);
  imageURLInput.value = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const novaEscola = {
    nome: document.getElementById('nome').value,
    endereco: document.getElementById('endereco').value,
    diretoria: document.getElementById('diretoria').value,
    alunos: parseInt(document.getElementById('alunos').value),
    imagens: []
  };

  escolas.push(novaEscola);
  salvarEscolas();
  renderizarTabela();
  form.reset();
});

renderizarTabela();
