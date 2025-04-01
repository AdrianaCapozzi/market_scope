async function carregarDados() {
    const resposta = await fetch("http://127.0.0.1:5000/api/dados");
    const dados = await resposta.json();

    const regioes = [...new Set(dados.map(d => d["Região"]))];
    const seguradoras = [...new Set(dados.map(d => d["Seguradora"]))];

    const datasets = seguradoras.map(seguradora => {
        return {
            label: seguradora,
            data: regioes.map(regiao => {
                const dado = dados.find(d => d["Região"] === regiao && d["Seguradora"] === seguradora);
                return dado ? dado["Valor (%)"] : 0;
            }),
            backgroundColor: `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.7)`
        };
    });

    new Chart(document.getElementById("grafico"), {
        type: "bar",
        data: {
            labels: regioes,
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

carregarDados();
