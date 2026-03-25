async function getFilme() {
    let paginaAleatoria = Math.floor(Math.random() * 500) + 1;
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=97e04d7b4002f6f52d324eeb83e82c14&language=pt-BR&page=${paginaAleatoria}`;
    
    try {
        let response = await fetch(url);
        let data = await response.json();
        
        let indexAleatorio = Math.floor(Math.random() * data.results.length);
        let filme = data.results[indexAleatorio];
        
        console.log(filme);
        
        let imgUrl = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
        
        document.getElementById("filme").innerHTML = `
            <h3>${filme.title}</h3>
            <img src="${imgUrl}" alt="Pôster do filme ${filme.title}">
            <p>${filme.overview || "Sinopse não disponível em português para este filme."}</p>
        `
        document.getElementById("filme").style.display = "flex";
    } catch (error) {
        console.error("Erro ao buscar o filme:", error);
        document.getElementById("receita").innerHTML = "<p>Erro ao buscar o filme. Tente novamente.</p>";
    }
}