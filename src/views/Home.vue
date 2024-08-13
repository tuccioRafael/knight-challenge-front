<template>
  <div class="home-container">
    <h1 class="title">Bem-vindo ao Gerenciador de Fichas de Personagem de RPG</h1>
    <p class="intro-text">
      Explore e gerencie as fichas técnicas dos seus personagens com facilidade. Nosso sistema oferece uma visão detalhada de todos os aspectos do seu cavaleiro, incluindo atributos, armas e status de herói. Utilize nossa interface intuitiva para criar, editar e visualizar as informações essenciais dos seus personagens, garantindo que você esteja sempre preparado para suas aventuras.
    </p>
    <h2 class="features-title">Funcionalidades Principais:</h2>
    <ul class="features-list">
      <li><strong>Cadastro de Personagens:</strong> Adicione novos personagens ao seu grupo, incluindo nome, apelido, atributos e muito mais.</li>
      <li><strong>Gerenciamento de Armas:</strong> Mantenha o inventário de armas de cada personagem atualizado, com detalhes sobre atributos e status de equipamento.</li>
      <li><strong>Acompanhamento de Progresso:</strong> Veja a evolução dos seus personagens com cálculos automáticos de idade, experiência e poder de ataque.</li>
      <li><strong>Transformação em Herói:</strong> Eleve seus cavaleiros ao status de herói com um simples clique, tornando-os lendas em suas aventuras.</li>
    </ul>
    <p class="closing-text">
      Navegue pelas opções no menu para começar a gerenciar suas fichas técnicas e mantenha suas campanhas sempre organizadas e prontas para a próxima jornada!
    </p>
  </div>
</template>

<style scoped>
.home-container {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.intro-text {
  font-size: 1.2em;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;
  text-align: justify;
}

.features-title {
  font-size: 2em;
  color: #7159c1;
  margin-bottom: 15px;
}

.features-list {
  list-style-type: none;
  padding: 0;
  font-size: 1.1em;
  color: #333;
}

.features-list li {
  margin-bottom: 15px;
}

.features-list strong {
  color: #7159c1;
}

.closing-text {
  margin-top: 30px;
  font-size: 1.2em;
  color: #555;
  text-align: center;
  line-height: 1.6;
}
</style>
