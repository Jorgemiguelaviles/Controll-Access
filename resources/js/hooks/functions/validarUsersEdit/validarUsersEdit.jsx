const validarUsersEdit = async (
    nome,
    chapa,
    horarioDoAlmoco,
    grupo,
    usuario,
    CPF,
    senha,
    gestorResponsavel,
    setGestorResponsavel,
    isGestor
) => {
    const mensagens = {
        nome: 'O nome precisa ser preenchido',
        chapa: 'A chapa precisa ser preenchida e deve conter pelo menos 5 n�meros',
        horarioAlmoco: 'O hororio de almoco precisa ser preenchido',
        grupo: 'O grupo precisa ser selecionado',
        usuarioEsenha: 'Se o usuario for criado, ele precisa de uma senha',
        gestorResponsavel: 'O gestor responsavel precisa ser preenchido',
        CPFFormat: 'CPF no formato invalido',
    };

    const listmsg = [];

    if (!nome) {
        listmsg.push(mensagens.nome);
    }
    if (!chapa || chapa.length < 5 || !/^\d+$/.test(chapa)) {
        listmsg.push(mensagens.chapa);
    }
    if (!horarioDoAlmoco) {
        listmsg.push(mensagens.horarioAlmoco);
    }
    if (!grupo) {
        listmsg.push(mensagens.grupo);
    }

    if (!isGestor && !gestorResponsavel) {
        listmsg.push(mensagens.gestorResponsavel);
    }

    if (CPF && !validarCPF(CPF)) {
        listmsg.push(mensagens.CPFFormat);
    }

    // Retornar um objeto consistente
    return {
        sucesso: listmsg.length === 0,
        mensagens: listmsg,
    };
};


const validarCPF = (cpf) => {
    cpf = cpf.replace(/(?=[^xX]*$)/g, ''); // Remove caracteres n�o num�ricos, exceto 'x' e 'X'

    return cpf.length === 11; // Verifica se o CPF tem exatamente 11 d�gitos
};



export default validarUsersEdit;
