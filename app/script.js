// getElement e EventListener padrão
document.getElementById("btnBuscar").addEventListener("click", function()
{
    const titulo = document.getElementById("tituloInput").value;
    const idioma = document.getElementById("idiomaSelect").value;
    const data = document.getElementById("dataInput").value;
    const fonte = document.getElementById("fonteInput").value;

    const url_padrao = 'https://newsapi.org/v2/everything?';
    
    // manipulação da url
    let url = url_padrao;
    switch(true)
    {
        case titulo.length > 0:
            
            // encodeURIComponent para tratamento automatico dentro do html
            const encodedTitulo = encodeURIComponent(titulo);
            url += `q=${encodedTitulo}`; // tem que usar crase para concatenar

            const searchInFields = "title,description"; // limita a busca da palavra filtrada apenas para titulo e descrição
            url += `&searchIn=${searchInFields}`;
            break;
        default:
            url += `q=tempo`;
            break;
    }

    if (data)
    {
        url += `&from=${data}`;
    }

    if (fonte)
    {
        url += `&sources=${fonte}`;
    }

    switch(true)
    {
        case idioma.length > 1:
            url += `&language=${idioma}`;
            break;
        default:
            break;
    }

    url += `&apikey=c4de65e108b34595bee261de67aeb421`;
    //console.log(url); se der erro

    fetch(url)
    .then(response => response.json())
    .then(data =>
    {
        const app_div = document.getElementById("app"); // mais fácil transformar a div "app" em variavel pra referir melhor

        app_div.innerHTML = ''; // limpar antes de buscar, se não vira spam

        // condição para ver se acha notícia com a palavra-chave, pois tava difícil de testar sem mandar um sinal
        // troquei o .filter pra .isArray pra verificar se existe artigo com os filtros aplicado
        if (data && Array.isArray(data.articles) && data.articles.length === 0)
        {
            app_div.innerText = "Irmão, achei não hein";
        }
        else if (data && Array.isArray(data.articles))
        {
            data.articles.forEach(artigo =>
            {
                const artigoDiv = criarArtigo(artigo.title, artigo.description); // insere o titulo e a descrição em um array para eu usar na "function criarArtigo"
                app_div.appendChild(artigoDiv);
            });
        } 
        else
        {
            app_div.innerText = "Provavelmente Error 400";
        }
    })
    .catch(error => console.error(error));
    //console.log(url);
});

// createElement para cada artigo
function criarArtigo(titulo, descricao)
{
    const boxArtigo = document.createElement("div");
    const tituloArtigo = document.createElement("h2");
    const descricaoArtigo = document.createElement("p");

    tituloArtigo.innerText = titulo;
    boxArtigo.appendChild(tituloArtigo);
    descricaoArtigo.innerText = descricao;
    boxArtigo.appendChild(descricaoArtigo);

    return boxArtigo; 
}
