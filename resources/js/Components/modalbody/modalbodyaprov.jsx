import React, { useState, useEffect, useCallback } from 'react';
import { Input, Textarea } from '../index'; // Importação dos componentes personalizados
import useCreate from '../../hooks/UseCreate'; // Hook para enviar dados ao backend
import { useUser } from '../../userContext'; // Contexto do usuário

const ModalBodyAprov = ({ setVisible, visible, dadosUser, handleSuccess }) => {
    const { domain } = useUser();
    const [msg, setMsg] = useState('');
    const [nome, setNome] = useState('');
    const [descricaoDepartamento, setDescricaoDepartamento] = useState('');
    const [state, setState] = useState('danger');
    const [successMsgVisible, setSuccessMsgVisible] = useState(false);
    const [filtro, setFiltro] = useState('');
    const { enviarDadosParaBackend } = useCreate();
    const [selectedAprovadores, setSelectedAprovadores] = useState([]);
    const [selectedComuns, setSelectedComuns] = useState([]);
    
    const handleSave = useCallback(async () => {
        const hasInvalidUsers = selectedAprovadores.some(user => !user.id || !user.Nome || !user.Email);

        console.log('Selected Aprovadores:', selectedAprovadores);
        console.log('Selected Comuns:', selectedComuns);
        console.log('Nome:', nome);
        console.log('DescricaoDepartamento:', descricaoDepartamento);

        if ((selectedAprovadores.length === 0 && selectedComuns.length === 0) || hasInvalidUsers) {
            setMsg('Por favor, Preencha os Campos Obrigatórios, Selecione Usuário Aprovador e Comum.');
            setState('danger');
            return;
        }

        try {
            const dataSetor = {
                nome,
                DescricaoDepartamento: descricaoDepartamento,
                aprovadores: selectedAprovadores.map(user => ({
                    id_user: user.id,
                    nome: user.Nome,
                    email: user.Email,
                    isAprovador: true
                })),
                comuns: selectedComuns.map(user => ({
                    id_user: user.id,
                    nome: user.Nome,
                    email: user.Email,
                    isAprovador: false
                }))
            };

            console.log('Dados enviados para o backend:', dataSetor);
            const rotaCadastro = `${domain}cadastro`;
            const responseCadastro = await enviarDadosParaBackend(rotaCadastro, dataSetor, domain);

            console.log('Resposta recebida do backend:', responseCadastro);
            if (responseCadastro.status === 201) {
                setMsg(responseCadastro.message);
                setState('success');
                setSuccessMsgVisible(true);
                handleSuccess();
            } else {
                setMsg(responseCadastro.message);
                setState('success');
            }
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            setMsg('Erro durante o cadastro: ' + (error.response?.data || error.message));
            setState('danger');
        }
    }, [nome, descricaoDepartamento, selectedAprovadores, selectedComuns, domain, enviarDadosParaBackend, handleSuccess]);

    useEffect(() => {
        setMsg('');
    }, [nome, descricaoDepartamento]);

    useEffect(() => {
        if (!visible) {
            setNome('');
            setDescricaoDepartamento('');
            setSelectedAprovadores([]);
            setSelectedComuns([]);
            setFiltro('');
            setMsg('');
            setState('danger');
            setSuccessMsgVisible(false);
        }
    }, [visible]);

    const handleUserAdd = (user, type) => {
        if (type === 'aprovador') {
            if (!selectedAprovadores.some(selectedUser => selectedUser.Nome === user.Nome)) {
                setSelectedAprovadores(prevSelectedAprovadores => [...prevSelectedAprovadores, user]);
            }
        } else if (type === 'comum') {
            if (!selectedComuns.some(selectedUser => selectedUser.Nome === user.Nome)) {
                setSelectedComuns(prevSelectedComuns => [...prevSelectedComuns, user]);
            }
        }
    };

    const handleUserRemove = useCallback((userToRemove, type) => {
        if (type === 'aprovador') {
            setSelectedAprovadores(prevSelectedAprovadores => prevSelectedAprovadores.filter(user => user.Nome !== userToRemove.Nome));
        } else if (type === 'comum') {
            setSelectedComuns(prevSelectedComuns => prevSelectedComuns.filter(user => user.Nome !== userToRemove.Nome));
        }
    }, []);

    const filteredUsers = dadosUser && dadosUser.message ? dadosUser.message.filter(user =>
        user.Nome.toLowerCase().includes(filtro.toLowerCase())
    ) : [];

    const renderSelectedAprovadores = () => (
        <div>
            <h6 className="mt-4">Aprovadores Selecionados:</h6>
            <ul className="list-group">
                {selectedAprovadores.map((user, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center border border-primary bg-transparent text-primary">
                        {user.Nome} - {user.Email}
                        <button onClick={() => handleUserRemove(user, 'aprovador')} className="btn btn-outline-danger btn-sm">Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderSelectedComuns = () => (
        <div>
            <h6 className="mt-4">Comuns Selecionados:</h6>
            <ul className="list-group">
                {selectedComuns.map((user, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center border border-secondary bg-transparent text-secondary">
                        {user.Nome} - {user.Email}
                        <button onClick={() => handleUserRemove(user, 'comum')} className="btn btn-outline-danger btn-sm">Remover</button>
                    </li>
                ))}
            </ul>
        </div>
    );

    const renderFilteredUsers = () => (
        <div className="mt-3" style={{ maxHeight: '520px', overflowY: 'auto' }}>
            <div className="card-deck">
                {filteredUsers.map((user, index) => (
                    <div key={index} className="card mb-3" style={{ minWidth: '18rem' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h6 className="card-title mb-1">{user.Nome}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">{user.Email}</h6>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button onClick={() => handleUserAdd(user, 'aprovador')} className="btn btn-primary btn-sm">Adicionar Aprovador</button>
                                <button onClick={() => handleUserAdd(user, 'comum')} className="btn btn-secondary btn-sm">Adicionar Comum</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <>
            {visible && (
                <div className="modal-body">
                    <div className="container">
                        <Input
                            etiqueta="Digite o nome do novo grupo"
                            desativado={false}
                            input={nome}
                            setinput={setNome}
                            tipo="text"
                            personalizacao="Novo grupo"
                            subtitulo="Novo grupo"
                            obrigatorio
                        />
                        <Textarea
                            etiqueta="Descreva o grupo"
                            input={descricaoDepartamento}
                            setInput={setDescricaoDepartamento}
                        />
                        {renderSelectedAprovadores()}
                        {renderSelectedComuns()}
                    </div>

                    {msg && (
                        <div className={`alert alert-${state} mt-3`} role="alert">
                            {msg}
                        </div>
                    )}

                    {successMsgVisible && (
                        <div className="alert alert-success" role="alert">
                            Cadastro realizado com sucesso!
                        </div>
                    )}

                    <div className="container mt-3">
                        <h6>Filtrar Usuários:</h6>
                        <Input
                            etiqueta="Filtrar Usuários"
                            desativado={false}
                            input={filtro}
                            setinput={setFiltro}
                            tipo="text"
                            personalizacao="Filtrar"
                            subtitulo="Filtrar Usuários"
                            obrigatorio={false}
                        />
                        <h6>Usuários Disponíveis:</h6>
                        {renderFilteredUsers()}
                    </div>
                </div>
            )}

            {visible && (
                <div className="modal-footer">
                    <button type="button" className="btn btn-success" onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            )}
        </>
    );
};

export default ModalBodyAprov;
