const hoje = new Date();
  const opcoes = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }; 

  const dataExtenso = hoje.toLocaleDateString('pt-BR', opcoes);
  document.getElementById('data-hoje').textContent = "Hoje é "+dataExtenso;