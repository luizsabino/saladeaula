function openTab(evt, tabName) {
    // Esconde todos os conteúdos
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(c => c.classList.remove("active"));

    // Remove classe 'active' de todos os botões
    const buttons = document.querySelectorAll(".tab-button");
    buttons.forEach(b => b.classList.remove("active"));

    // Mostra o conteúdo selecionado e ativa o botão
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
  }