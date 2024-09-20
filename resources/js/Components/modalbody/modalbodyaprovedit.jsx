import React, { useState, useEffect, useCallback } from 'react';
import { Input, Textarea, Checkbox } from '../index'; // Importação dos componentes personalizados
import useCreate from '../../hooks/UseCreate'; // Hook para enviar dados ao backend
import { useUser } from '../../userContext';

const Modalbodyaprovedit = ({ setVisible, visible, dadossistema, dadosacesso, dadosaprov, dadosemail, dadosUser }) => {
    const { domain } = useUser();
    const [msg, setMsg] = useState('');
    const [nomeDoGrupo, setNomeDoGrupo] = useState('');
    const [descricaoDoGrupo, setDescricaoDoGrupo] = useState('');
    const [state, setState] = useState('danger');
    const [selectedAprovadores, setSelectedAprovadores] = useState([]);
    const [selectedComuns, setSelectedComuns] = useState([]);
    const [allUsers, setAllUsers] = useState([]); // Lista de todos os usuários disponíveis
    const { validarGroup, enviarDadosParaBackend } = useCreate();
    const [filtroUsuario, setFiltroUsuario] = useState('');
    const [grupoactive, setGrupoactive] = useState(false);
    const [visibleGroupActive, setVisibleGroupActive] = useState(false);

    useEffect(() => {
        // Limpar a mensagem após 3 segundos
        const timer = setTimeout(() => {
            setMsg('');
        }, 3000);

        // Limpar o timer quando o componente desmontar
        return () => clearTimeout(timer);
    }, [msg]);

    useEffect(() => {
        // Limpa o estado quando o modal não está mais visível
        if (!visible) {
            resetState();
        }
    }, [visible]);

    const resetState = () => {
        // Resetar o estado para os valores iniciais
        setNomeDoGrupo('');
        setDescricaoDoGrupo('');
        setSelectedAprovadores([]);
        setSelectedComuns([]);
        setFiltroUsuario('');
    };

    useEffect(() => {
        if (dadosUser && dadosUser.message) {
            // Mapear os dados de dadosUser para criar uma lista de nome e email
            const usersList = dadosUser.message.map(user => ({
                id_user: user.id,
                Nome: user.Nome,
                Email: user.Email
            }));
            setAllUsers(usersList);
        }
    }, [dadosUser]);

    useEffect(() => {
        if (dadosaprov) {
            console.log('dadosaprov', dadosaprov)
            setGrupoactive(dadosaprov.status)
            setNomeDoGrupo(dadosaprov.nome || '');
            setDescricaoDoGrupo(dadosaprov.DescricaoDepartamento || '');

            // Filtrar os aprovadores com base no setor_id correspondente ao departamento selecionado
            const usuariosDoSetor = dadosemail.filter(user => user.setor_id === dadosaprov.id);

            const aprovadoresDoSetor = usuariosDoSetor.filter(user => user.isAprovador);
            const comunsDoSetor = usuariosDoSetor.filter(user => !user.isAprovador);

            setSelectedAprovadores(aprovadoresDoSetor.map(aprovador => ({
                id_user: aprovador.id_user,
                Nome: aprovador.nome,
                Email: aprovador.email,
                isAprovador: true
            })));

            setSelectedComuns(comunsDoSetor.map(comum => ({
                id_user: comum.id_user,
                Nome: comum.nome,
                Email: comum.email,
                isAprovador: false
            })));
        }
    }, [dadosaprov]);

    const handleSave = async () => {
        try {
            const result = await validarGroup(nomeDoGrupo);
            if (result.sucesso) {
                const data = {
                    id: dadosaprov.id,
                    nome: nomeDoGrupo,
                    grupoactive: grupoactive,
                    DescricaoDepartamento: descricaoDoGrupo,
                    aprovadores: selectedAprovadores.map(user => ({
                        id_user: user.id_user,
                        nome: user.Nome,
                        email: user.Email,
                        isAprovador: true
                    })),
                    comuns: selectedComuns.map(user => ({
                        id_user: user.id_user,
                        nome: user.Nome,
                        email: user.Email,
                        isAprovador: false
                    }))
                };
                const rota = `/update-setor`;
                const mensagem = await enviarDadosParaBackend(rota, data, domain);
                setState('success');
                setMsg(mensagem.message);
            } else {
                const errorMessage = 'Falha na validação: ' + result.mensagens.join(', ');
                setMsg(errorMessage);
                setState('warning');
            }
        } catch (error) {
            console.error('Erro durante a validação ou chamada para o backend:', error);
            if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.aprovadores) {
                const errorMessage = error.response.data.errors.aprovadores[0];
                setMsg(errorMessage);
            } else {
                setMsg('Falha ao enviar, revise se existe campos vazio, se o problema persitir entre em contato no helpdesk');
            }
            setState('danger');
        }
    };



    const handleUserRemove = useCallback((userToRemove, type) => {
        if (type === 'aprovador') {
            setSelectedAprovadores(prevSelectedAprovadores => prevSelectedAprovadores.filter(user => user.Nome !== userToRemove.Nome));
        } else if (type === 'comum') {
            setSelectedComuns(prevSelectedComuns => prevSelectedComuns.filter(user => user.Nome !== userToRemove.Nome));
        }
    }, []);

    const handleUserAdd = useCallback((userToAdd, type) => {
        if (type === 'aprovador') {
            const isUserAlreadySelected = selectedAprovadores.some(user => user.Nome === userToAdd.Nome);
            if (!isUserAlreadySelected) {
                setSelectedAprovadores(prevSelectedAprovadores => [...prevSelectedAprovadores, { ...userToAdd, isAprovador: true }]);
            } else {
                console.log("Usuário já está na lista de aprovadores selecionados.");
            }
        } else if (type === 'comum') {
            const isUserAlreadySelected = selectedComuns.some(user => user.Nome === userToAdd.Nome);
            if (!isUserAlreadySelected) {
                setSelectedComuns(prevSelectedComuns => [...prevSelectedComuns, { ...userToAdd, isAprovador: false }]);
            } else {
                console.log("Usuário já está na lista de comuns selecionados.");
            }
        }
    }, [selectedAprovadores, selectedComuns]);

    const handleFiltroChange = (event) => {
        setFiltroUsuario(event.target.value);
    };

    const usuariosFiltrados = allUsers.filter(user =>
        user.Nome.toLowerCase().includes(filtroUsuario.toLowerCase())
    );

    const handleChange = () => {
        if (!grupoactive) {
            setVisibleGroupActive(true);
        } else {
            setGrupoactive(false);
        }

    };

    const handleConfirmation = () => {
        setVisibleGroupActive(false);
    };

    const handleafterConfirmation = () => {
        //retirar todo  mundo do grupo e armazenar um estado x
        setGrupoactive(true);
        setVisibleGroupActive(false);
        setSelectedAprovadores([])
        setSelectedComuns([])
    };
    return (
        <>
            {visibleGroupActive && (
                <div className="modal-wrapper d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 10 }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Atenção</h5>
                                <button type="button" onClick={handleConfirmation} className="btn-close"></button>
                            </div>
                            <div className="modal-body">
                                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
                                    Deseja realmente desativar este grupo? Lembre-se de que após a desativação, todos os usuários serão removidos automaticamente.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={handleafterConfirmation}>Desativar</button>
                                <button type="button" className="btn btn-secondary" onClick={handleConfirmation}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {visible && (
                <div className="modal-body">
                    <div className="container">
                        <Input
                            etiqueta="Digite o nome do grupo"
                            desativado={grupoactive}
                            input={nomeDoGrupo}
                            setinput={setNomeDoGrupo}
                            tipo="text"
                            personalizacao="Nome do Grupo"
                            subtitulo="Nome do Grupo"
                            obrigatorio
                        />

                        <Textarea
                            etiqueta="Descreva o grupo"
                            input={descricaoDoGrupo}
                            setInput={setDescricaoDoGrupo}
                            status={grupoactive}
                        />

                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={grupoactive}
                                onChange={handleChange}
                            />
                            Desativar grupo de aprovadores
                        </label>
                    </div>
                    {selectedAprovadores.length > 0 && (
                        <div>
                            <h6 className="mt-3">Aprovadores:</h6>
                            <ul className="list-group">
                                {selectedAprovadores.map((user, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center border border-primary bg-transparent text-primary">
                                        {user.Nome} - {user.Email}
                                        <button onClick={() => handleUserRemove(user, 'aprovador')} className="btn btn-outline-danger btn-sm">Remover</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {selectedComuns.length > 0 && (
                        <div>
                            <h6 className="mt-3">Comuns:</h6>
                            <ul className="list-group">
                                {selectedComuns.map((user, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center border border-secondary bg-transparent text-secondary">
                                        {user.Nome} - {user.Email}
                                        <button onClick={() => handleUserRemove(user, 'comum')} className="btn btn-outline-danger btn-sm">Remover</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <h6 className="mt-3" active={grupoactive}>Filtro:</h6>
                        <input
                            type="text"
                            value={filtroUsuario}
                            onChange={handleFiltroChange}
                            placeholder="Buscar colaborador..."
                            className="form-control mt-2"
                            disabled={grupoactive}
                        />
                    </div>
                    <h6 className="mb-3 mt-3">Colaboradores:</h6>
                    {usuariosFiltrados.length > 0 && (
                        <div className="mt-3" style={{ maxHeight: '520px', overflowY: 'auto' }}>
                            <div className="card-deck">
                                {usuariosFiltrados.map((user, index) => (
                                    <div key={index} className="card mb-3" style={{ minWidth: '18rem' }}>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="card-title mb-1">{user.Nome}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted">{user.Email}</h6>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                {!grupoactive && (
                                                    <button onClick={() => handleUserAdd(user, 'aprovador')} className="btn btn-primary btn-sm">
                                                        Adicionar Aprovador
                                                    </button>
                                                )}
                                                {!grupoactive && (
                                                    <button onClick={() => handleUserAdd(user, 'comum')} className="btn btn-secondary btn-sm">
                                                        Adicionar Comum
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {msg && (
                        <div className={`alert alert-${state}`} role="alert">
                            {msg}
                        </div>
                    )}
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

export default Modalbodyaprovedit;
