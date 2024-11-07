const apikey = '2a6a2e538b7cb0af0947db4a';
const apiURL = `https://v6.exchangerate-api.com/v6/${apikey}/latest/`;

// Função para buscar taxa de câmbio via API
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// Função para buscar taxa de câmbio da API
async function getExchangeRate(daMoeda, paraMoeda) {
    try {
        const response = await fetch(`${apiURL}${daMoeda}`);
        const data = await response.json();
       
        if (data.result === "success") {
            return data.conversion_rates[paraMoeda];
        } else {
            throw new Error("Erro ao buscar as taxas de câmbio");
        }
    } catch (error) {
        console.error("Erro:", error);
        return null;
    }
}


document.getElementById('currency-form').addEventListener('submit', async function(event) {
    event.preventDefault();


    // Obter valores de entrada
    const valor = parseFloat(document.getElementById('amount').value);
    const daMoeda = document.getElementById('daMoeda').value;
    const paraMoeda = document.getElementById('paraMoeda').value;


    // Buscar taxa de câmbio da API
    const exchangeRate = await getExchangeRate(daMoeda, paraMoeda);


    if (exchangeRate) {
        const convertedValue = valor * exchangeRate;


        // Exibir resultado
        const conversao = document.getElementById('result');
        conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${paraMoeda}`;
    } else {
        alert("Erro ao buscar a cotação. Tente novamente.");
    }
});