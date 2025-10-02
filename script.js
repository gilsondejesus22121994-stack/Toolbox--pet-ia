// --- FUNÇÃO GERAL DE NAVEGAÇÃO ENTRE FERRAMENTAS ---
function mostrarFerramenta(idFerramenta) {
    const containers = document.querySelectorAll('.ferramenta-container');
    
    containers.forEach(container => {
        if (container.id === idFerramenta) {
            container.classList.remove('hidden');
            container.classList.add('active');
        } else {
            container.classList.add('hidden');
            container.classList.remove('active');
        }
    });
}

// --- VARIÁVEIS GLOBAIS PARA UPLOAD ---
let fotoParaEnvio = null; // Para Editor IA
let fotoHashtagParaEnvio = null; // Para Gerador de Hashtags
let videoCarregado = null; // Para Editor de Vídeo

// =========================================================
// === 1. LÓGICA DO EDITOR DE FOTOS COM REMOÇÃO DE FUNDO ===
// =========================================================

function previewImagemIA(e) {
    const arquivo = e.target.files[0];
    const imgPreview = document.getElementById('imagemPreview');
    const aviso = document.getElementById('avisoPreview');

    if (arquivo) {
        fotoParaEnvio = arquivo;
        const url = URL.createObjectURL(arquivo);
        imgPreview.src = url;
        imgPreview.style.display = 'block';
        aviso.style.display = 'none';
        document.getElementById('statusIARemocao').innerText = "Status: Imagem carregada. Escolha a ação.";
    }
}

document.getElementById('acaoIA').addEventListener('change', function() {
    const acao = this.value;
    const inputCor = document.getElementById('inputCorFundo');
    
    if (acao === 'substituir_fundo') {
        inputCor.style.display = 'block';
    } else {
        inputCor.style.display = 'none';
    }
});

function enviarParaIARemocao() {
    if (!fotoParaEnvio) {
        alert("Carregue uma imagem primeiro.");
        return;
    }

    const acao = document.getElementById('acaoIA').value;
    const prompt = document.getElementById('promptRemocao').value;
    const corFundo = document.getElementById('corFundo').value;
    const statusDiv = document.getElementById('statusIARemocao');
    const loadingOverlay = document.getElementById('loadingRemocao');

    // 1. Configura a UI para Carregamento
    loadingOverlay.classList.remove('hidden');
    statusDiv.innerText = "Status: 🧠 Enviando para o servidor de IA para processamento...";
    statusDiv.style.backgroundColor = '#ffc107'; 
    statusDiv.style.color = 'black';
    
    // Simulação do envio (AQUI VOCÊ COLOCARÁ O FETCH REAL PARA SEU GATEWAY)
    setTimeout(() => {
        
        loadingOverlay.classList.add('hidden'); // ESCONDE O SPINNER

        // 2. Simulação de Resposta de Sucesso
        const linkResultado = 'https://linkdopainting.com/foto_ia_final.png';
        
        statusDiv.innerHTML = `
            Status: ✅ **PROCESSO CONCLUÍDO!** Baixe sua imagem editada pela IA: 
            <a href="${linkResultado}" target="_blank" style="color: white; font-weight: bold;">[CLIQUE PARA BAIXAR]</a>
        `;
        statusDiv.style.backgroundColor = '#28a745'; 
        statusDiv.style.color = 'white';

    }, 8000); 
}


// =========================================================
// === 2. LÓGICA DO GERADOR DE IMAGENS POR PROMPT (IA) ===
// =========================================================

function enviarPromptParaGeracao() {
    const prompt = document.getElementById('promptImagem').value;
    const tamanho = document.getElementById('tamanhoImagem').value;
    const estilo = document.getElementById('estiloImagem').value;   
    const statusDiv = document.getElementById('statusIAGeracao');
    const visualizacaoDiv = document.getElementById('visualizacaoGeracao');
    const loadingOverlay = document.getElementById('loadingGeracao');
    
    if (!prompt.trim()) {
        alert("Por favor, escreva o prompt do que você quer criar.");
        return;
    }

    // Combina o prompt base com o estilo
    const promptFinal = `${prompt}, estilo ${estilo}`;

    // 1. Configura a UI para Carregamento
    loadingOverlay.classList.remove('hidden');
    statusDiv.innerText = "Status: 🚀 Enviando prompt para o Gateway...";
    statusDiv.style.backgroundColor = '#ffc107'; 
    statusDiv.style.color = 'black';
    visualizacaoDiv.classList.add('hidden');

    // ** SIMULAÇÃO DE FETCH (AQUI VOCÊ COLOCARÁ O FETCH REAL PARA SEU GATEWAY) **
    
    // Simula a resposta do Gateway de IA (com sucesso)
    setTimeout(() => {
        loadingOverlay.classList.add('hidden'); 

        // Resposta simulada
        const data = {
            success: true,
            url_imagem: 'https://cdn.linkdopainting.com/imagem_gerada_ia.png',
            message: 'Imagem criada com sucesso.'
        };

        if (data.success && data.url_imagem) {
            const urlFinal = data.url_imagem;
            
            document.getElementById('imagemGerada').src = urlFinal;
            document.getElementById('linkDownload').href = urlFinal;
            document.getElementById('linkDownload').style.display = 'inline-block';
            visualizacaoDiv.classList.remove('hidden');

            statusDiv.innerHTML = `
                Status: ✅ **SUCESSO!** Imagem criada.
            `;
            statusDiv.style.backgroundColor = '#28a745'; 
            statusDiv.style.color = 'white';
        } else {
            statusDiv.innerText = `Erro do Servidor/IA: ${data.message || 'Falha na geração.'}`;
            statusDiv.style.backgroundColor = '#dc3545';
            statusDiv.style.color = 'white';
        }
    }, 5000); // 5 segundos de simulação
}


// =========================================================
// === 3. LÓGICA DO GERADOR DE HASHTAGS POR IMAGEM (IA) ===
// =========================================================

function previewFotoHashtag(e) {
    const arquivo = e.target.files[0];
    const imgPreview = document.getElementById('imagemHashtagPreview');
    const aviso = document.getElementById('avisoHashtag');

    if (arquivo) {
        fotoHashtagParaEnvio = arquivo;
        const url = URL.createObjectURL(arquivo);
        imgPreview.src = url;
        imgPreview.style.display = 'block';
        aviso.style.display = 'none';
        document.getElementById('statusHashtag').innerText = "Status: Imagem carregada. Pronta para análise.";
    }
}

function enviarFotoParaAnalise() {
    if (!fotoHashtagParaEnvio) {
        alert("Carregue uma imagem para análise.");
        return;
    }

    const statusDiv = document.getElementById('statusHashtag');
    const loadingOverlay = document.getElementById('loadingHashtag');
    const resultadoDiv = document.getElementById('resultadoHashtags');
    
    // 1. Configura a UI para Carregamento
    loadingOverlay.classList.remove('hidden');
    resultadoDiv.classList.add('hidden');
    statusDiv.innerText = "Status: 🧠 Enviando para a IA para análise de conteúdo...";
    statusDiv.style.backgroundColor = '#ffc107'; 
    statusDiv.style.color = 'black';
    
    // ** SIMULAÇÃO DE FETCH (AQUI VOCÊ COLOCARÁ O FETCH REAL PARA SEU GATEWAY) **
    
    // Simula a resposta do Gateway de IA (com sucesso)
    setTimeout(() => {
        loadingOverlay.classList.add('hidden'); // Esconde o spinner

        // Resposta simulada
        const data = {
            success: true,
            hashtags: ['#cachorrofofo', '#goldenretrieverbrasil', '#petinfluencer', '#amomeupet', '#viralata'],
            message: 'Análise concluída.'
        };

        if (data.success && data.hashtags) {
            const hashtagsFormatadas = data.hashtags.join('\n');

            document.getElementById('hashtagsGeradas').value = hashtagsFormatadas;
            resultadoDiv.classList.remove('hidden');

            statusDiv.innerHTML = `
                Status: ✅ **ANÁLISE CONCLUÍDA!** Use as hashtags sugeridas.
            `;
            statusDiv.style.backgroundColor = '#28a745'; 
            statusDiv.style.color = 'white';
        } else {
            statusDiv.innerText = `Erro: ${data.message || 'Falha na análise. Tente outra imagem.'}`;
            statusDiv.style.backgroundColor = '#dc3545';
            statusDiv.style.color = 'white';
        }
    }, 3000); // 3 segundos de simulação
}

// Funções para copiar Hashtags
function copiarHashtags() {
    const textarea = document.getElementById('hashtagsGeradas');
    if (textarea.value) {
        textarea.select();
        textarea.setSelectionRange(0, 99999); 
        document.execCommand("copy");
        alert("Hashtags copiadas para a área de transferência!");
    }
}


// =========================================================
// === 4. LÓGICA DO GERADOR DE LEGENDAS (Frontend-Only) ===
// =========================================================

const legendasDatabase = {
    brincando: {
        divertido: (pet, kw) => `A energia do ${pet || 'meu pet'} tá insana! Partiu destruir a ${kw || 'bolinha'}! 🤪`,
        fofo: (pet, kw) => `O ${pet || 'meu anjinho'} brincando deixa o meu dia mais feliz. 💖`,
    },
    dormindo: {
        divertido: (pet, kw) => `Missão impossível: acordar o ${pet || 'dorminhoco'}! 😴 Tá sonhando comendo um ${kw || 'petisco'}?`,
        fofo: (pet, kw) => `Momento de paz. Meu ${pet || 'bebê'} recarregando as baterias. Shhh! 🌙`,
    },
    comendo: {
        divertido: (pet, kw) => `Não me julgue, eu mereço esse ${kw || 'petisco delicioso'}! 🤤 O ${pet || 'pet'} aqui não tá de brincadeira.`,
        fofo: (pet, kw) => `A melhor parte do dia: a hora de comer! ${pet || 'Meu pet'} saboreando o ${kw || 'melhor prato'}.`,
    },
    aventureiro: {
        divertido: (pet, kw) => `Pronto para a próxima aventura! ${pet || 'Meu pet'} explorador está em busca do ${kw || 'tesouro escondido'}. 🧭`,
        fofo: (pet, kw) => `Não há montanha alta demais nem ${kw || 'trilha longa'} demais para o ${pet || 'nosso time'}. Aventura de casal!`,
    },
    aniversario: {
        divertido: (pet, kw) => `Mais um ano de caos e lambidas! Feliz aniversário, ${pet || 'meu doguinho'}. Bora comer o ${kw || 'bolo de pet'}! 🥳`,
        fofo: (pet, kw) => `Meu coração não aguenta! ${pet || 'Meu pet'} faz aniversário hoje. Que venham muitos anos de ${kw || 'felicidade'}. ❤️`,
    }
};

function gerarLegenda() {
    const pet = document.getElementById('pet').value || 'meu pet';
    const tema = document.getElementById('tema').value;
    const humor = document.getElementById('humor').value;
    const kw = document.getElementById('palavra-chave').value;
    
    const resultadoDiv = document.getElementById('resultadoLegenda');
    const textarea = document.getElementById('legendaGerada');

    let legenda = "Ainda não temos essa combinação, mas aqui está uma genérica: Que dia incrível com o meu melhor amigo! ❤️";

    if (legendasDatabase[tema] && legendasDatabase[tema][humor]) {
        legenda = legendasDatabase[tema][humor](pet, kw);
    } else {
        // Fallback genérico se faltar a combinação
        legenda = legendasDatabase['brincando']['fofo'](pet, kw); 
    }

    textarea.value = legenda + '\n\n#petlover #vidapet #influencerpet #' + tema;
    resultadoDiv.classList.remove('hidden');
}

function copiarLegenda() {
    const textarea = document.getElementById('legendaGerada');
    if (textarea.value) {
        textarea.select();
        document.execCommand("copy");
        alert("Legenda copiada!");
    }
}

// =========================================================
// === 5. LÓGICA DO EDITOR DE VÍDEOS (Frontend-Only) ===
// =========================================================

function carregarVideo(e) {
    const arquivo = e.target.files[0];
    const videoElement = document.getElementById('videoPreview');
    const aviso = document.getElementById('avisoVideo');

    if (arquivo) {
        videoCarregado = arquivo;
        const url = URL.createObjectURL(arquivo);
        videoElement.src = url;
        videoElement.style.display = 'block';
        aviso.style.display = 'none';
        // Aplica o formato padrão ao carregar
        aplicarFormatoVideo(); 
        aplicarFiltroVideo();
    }
}

function aplicarFiltroVideo() {
    const videoElement = document.getElementById('videoPreview');
    const filtro = document.getElementById('filtroVideo').value;
    
    // CSS filter
    if (videoElement.src) {
        videoElement.style.filter = filtro;
    }
}

function aplicarFormatoVideo() {
    const videoElement = document.getElementById('videoPreview');
    const tamanho = document.getElementById('tamanhoVideo').value;
    
    // Remove classes anteriores
    videoElement.style.width = 'auto';
    videoElement.style.height = 'auto';

    // Aplica o novo formato
    if (tamanho === 'vertical') {
        videoElement.style.height = '500px';
        videoElement.style.width = '280px';
    } else if (tamanho === 'square') {
        videoElement.style.width = '400px';
        videoElement.style.height = '400px';
    } else {
        videoElement.style.maxWidth = '100%';
    }
}

function simularDownloadVideo() {
    if (!videoCarregado) {
        alert("Carregue um vídeo primeiro!");
        return;
    }
    alert(`Download simulado do vídeo: ${videoCarregado.name} com filtros e formato aplicados! (No código real, isso requer um servidor para processamento)`);
}
