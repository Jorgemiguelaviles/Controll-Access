import axios from 'axios';

// Função para obter o token CSRF
const obterCSRFToken = async () => {
    try {
        const response = await axios.get('/csrf-token');
        return response.data.token;
    } catch (error) {
        console.error('Erro ao obter o token CSRF:', error);
        throw error;
    }
};

// Função para enviar os dados para o backend, incluindo o token CSRF
const enviarDadosParaBackend = async (rotaBack, dados, domain, file = null) => {
    try {
        // Obtém o token CSRF
        const csrfToken = await obterCSRFToken();

        // Adiciona o token CSRF ao cabeçalho da solicitação
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken,
        };

        // Continua com a lógica para enviar os dados para o backend
        const response = await axios.post(rotaBack, dados, {
            withCredentials: true,
            headers: headers,
        });

        // Verifica se o status da resposta é 201 (Created)
        if (response.status === 201) {
            console.log('Requisição bem-sucedida: Status 201');
            console.log(response)
        }

        return response.data;
    } catch (error) {
        console.error('Erro durante a solicitação:', error);
        throw error;
    }
};

export default enviarDadosParaBackend;
