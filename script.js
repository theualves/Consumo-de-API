async function getFilme() {

  if ("vibrate" in navigator) {
    navigator.vibrate(100); 
  }

  let paginaAleatoria = Math.floor(Math.random() * 500) + 1;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=97e04d7b4002f6f52d324eeb83e82c14&language=pt-BR&page=${paginaAleatoria}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    let indexAleatorio = Math.floor(Math.random() * data.results.length);
    let filme = data.results[indexAleatorio];

    console.log(filme);

    let imgUrl = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
    let linkFilme = `https://www.themoviedb.org/movie/${filme.id}`;

    document.getElementById("filme").innerHTML = `
            <h3>${filme.title}</h3>
            <img src="${imgUrl}" alt="Pôster do filme ${filme.title}">
            <p>${filme.overview || "Sinopse não disponível em português para este filme."}</p>
            <h5>Se liga nesse novo recurso abaixo</h5>
            <button id="btn-compartilhar">
            Compartilhar Dica de Filme
            </button>
            <a href="#" id="link-topo">
                Ou clique e sorteie novamente ↑
            </a>
        `;
    document.getElementById("filme").style.display = "flex";

    const btnCompartilhar = document.getElementById("btn-compartilhar");
    const linkTopo = document.getElementById("link-topo")

    btnCompartilhar.addEventListener("click", async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: filme.title,
            text: `Olha essa dica de filme: ${filme.title}!\n\nSinopse: ${filme.overview}`,
            url: linkFilme,
          });
          console.log("Filme compartilhado com sucesso!");
        } catch (error) {
          console.error("Erro ao compartilhar ou o usuário cancelou:", error);
        }
      } else {
        alert(
          "O recurso de compartilhamento nativo não é suportado neste navegador. Copie o link manualmente: " +
            linkFilme,
        );
      }
    });

    linkTopo.addEventListener("click", (event) => {
      event.preventDefault(); 
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  } catch (error) {
    console.error("Erro ao buscar o filme:", error);
    document.getElementById("receita").innerHTML =
      "<p>Erro ao buscar o filme. Tente novamente.</p>";
  }
}
