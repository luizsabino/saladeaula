const hoje = new Date();
const opcoes = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};

const dataExtenso = hoje.toLocaleDateString('pt-BR', opcoes);
document.getElementById('data-hoje').textContent = "Hoje é " + dataExtenso;

//  PREVISÃO DO TEMPO
// ****************************************************************************************

// Mapeamento de condições climáticas para emojis/ícones descritivos
const condicaoMap = {
    'pn': { descricao: 'Parcialmente Nublado', emoji: '⛅', cor: '#FDB813' },
    'c': { descricao: 'Chuva', emoji: '🌧️', cor: '#4A90E2' },
    'n': { descricao: 'Nublado', emoji: '☁️', cor: '#95A5A6' },
    'pt': { descricao: 'Pouca Chuva', emoji: '🌦️', cor: '#3498DB' },
    'cm': { descricao: 'Chuva pela Manhã', emoji: '🌧️', cor: '#2980B9' },
    'ct': { descricao: 'Chuva à Tarde', emoji: '🌧️', cor: '#2980B9' },
    'pp': { descricao: 'Possibilidade de Chuva', emoji: '🌧️', cor: '#5DADE2' },
    'pc': { descricao: 'Possibilidade de Chuva', emoji: '🌧️', cor: '#5DADE2' },
    'cl': { descricao: 'Céu Claro', emoji: '☀️', cor: '#F39C12' },
    'nv': { descricao: 'Nevoeiro', emoji: '🌫️', cor: '#BDC3C7' },
    'ne': { descricao: 'Neve', emoji: '❄️', cor: '#ECF0F1' },
    'nd': { descricao: 'Não Definido', emoji: '❓', cor: '#95A5A6' }
};

// Função para formatar a data
function formatarData(dataString) {
    const data = new Date(dataString + 'T00:00:00');
    // Formato dd/MM
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
}

// Função para buscar dados da API e criar os cards
async function carregarPrevisaoTempo() {
    const container = document.getElementById('weather-cards-container');

    try {
        // Buscar dados da API BrasilAPI
        const response = await fetch('https://brasilapi.com.br/api/cptec/v1/clima/previsao/3192/3');

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const dados = await response.json();

        // Limpar o container
        container.innerHTML = '';

        // Criar um card para cada dia de previsão
        dados.clima.forEach((dia, index) => {
            const condicao = condicaoMap[dia.condicao] || condicaoMap['nd'];
            const dataFormatada = formatarData(dia.data);

            // Criar o HTML do card
            const card = document.createElement('div');
            card.className = 'card';
            // card.style.backgroundColor = '#f9f9f9';
            card.innerHTML = `
                <div class="card-body">
                    <div style="width: 100%; text-align: center;">
                        <h5 class="card-title" style="color: #4a90e2; margin-bottom: 0.5rem;">
                            ${dataFormatada}
                        </h5>
                        <p style="margin: 0; font-size: 0.85rem; color: #7f8c8d;">${index === 0 ? 'Hoje' : (index === 1 ? 'Amanhã' : 'Depois')}</p>
                        <div style="font-size: 3rem; margin: 0.5rem 0;">
                            ${condicao.emoji}
                        </div>
                        <p class="card-text" style="font-weight: bold; color: #333; margin-bottom: 0.5rem;">
                            ${dia.condicao_desc}
                        </p>
                        <div style="display: flex; justify-content: space-around; margin: 1rem 0; font-size: 0.95rem;">
                            <div>
                                <span style="color: #e74c3c; font-weight: bold;">🌡️ ${dia.max}°C</span>
                                <p style="margin: 0; font-size: 0.85rem; color: #7f8c8d;">Máxima</p>
                            </div>
                            <div>
                                <span style="color: #3498db; font-weight: bold;">❄️ ${dia.min}°C</span>
                                <p style="margin: 0; font-size: 0.85rem; color: #7f8c8d;">Mínima</p>
                            </div>
                        </div>
                        
                        <!-- A API CPTEC/BrasilAPI não fornece diretamente o volume de chuva (precipitação), mas a condição climática (condicao_desc) já indica chuva. -->
                    </div>
                </div>
            `;
            // Índice UV retornando zerado, aguardando correção do CPTEC
            // <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #7f8c8d;">
            //     <span>☀️ Índice UV: ${dia.indice_uv}</span>
            // </div>
            container.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao carregar previsão do tempo:', erro);
        container.innerHTML = `
            <div class="alert alert-warning" role="alert">
                Desculpe, não foi possível carregar a previsão do tempo. Tente novamente mais tarde.
            </div>
        `;
    }
}

// Carregar a previsão quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarPrevisaoTempo);

// Recarregar a previsão a cada 30 minutos (opcional)
setInterval(carregarPrevisaoTempo, 30 * 60 * 1000);

