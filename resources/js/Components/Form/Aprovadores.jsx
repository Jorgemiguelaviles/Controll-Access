import React, { useState, useEffect } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodyaprov, Filter, TableAprov, TableAprovFilter } from '../index';
import useCreateTable from '../../hooks/UseCreateTable';
import { useUser } from '../../userContext';

const GrupoAprov = () => {
    const [filter, setFilter] = useState('');
    const { domain } = useUser();
    const [visible, setVisible] = useState(false);
    const getBackendData = useCreateTable();
    const [datasistemas, setDatasistemas] = useState(null);
    const [data, setData] = useState(null);
    const [aprov, setAprov] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState(null);
    const [dataFilterBool, setDataFilterBool] = useState(false);
    const [isSecondEffectCompleted, setIsSecondEffectCompleted] = useState(false);
    const [msg, setMsg] = useState();
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(20);
    const rota = `${domain}filterAprov`;
    const [valorMax, setValorMax] = useState(20);
    const [DataUser, setDataUser] = useState(null);
    const [selectedSetorId, setSelectedSetorId] = useState(null); // Estado para armazenar o id do setor selecionado

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resultSistemas, resultAprov, resultUser, resultEmail] = await Promise.all([
                    getBackendData(`${domain}getSistemas`),
                    getBackendData(`${domain}getSetores`),
                    getBackendData(`${domain}getUsuario`),
                    getBackendData(`${domain}getAprovadores`),
                ]);

                setValorMax(resultAprov['maxvalue']);
                setDatasistemas(resultSistemas);
                setAprov(resultAprov);
                setDataUser(resultUser);
                setEmail(resultEmail);
            } catch (error) {
                console.error('Erro ao obter dados do backend:', error);
            } finally {
                setIsSecondEffectCompleted(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [start, end, getBackendData, domain]);

    useEffect(() => {
        if (isSecondEffectCompleted) {
            setLoading(false);
        }
    }, [isSecondEffectCompleted, dataFilter]);

    // Função para fechar o modal e retornar para a tela anterior
    const handleCloseModal = () => {
        setVisible(false);
        // Aqui você pode adicionar lógica adicional para atualizar os dados, se necessário
    };

    // Função para abrir o modal e buscar os aprovadores associados ao setor selecionado
    const handleOpenModal = async (setorId) => {
        try {
            // Faça uma solicitação ao backend para buscar os aprovadores associados ao setor selecionado
            const response = await getBackendData(`${domain}setores/${setorId}/aprovadores`);
            // Defina os dados dos aprovadores no estado de dados (data)
            console.log('response', response)
	    setData(response);
            // Exiba o modal
            setVisible(true);
        } catch (error) {
            console.error('Erro ao buscar aprovadores:', error);
            // Exiba uma mensagem de erro
            setMsg('Erro ao buscar aprovadores');
        }
    };

    return (
        <div className="d-flex flex-column align-items-center w-75">
            <div className="mb-4">
                <Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} rota4={'/Aprovadores'} ativo1={false}
                    ativo2={false} ativo3={false} ativo4={true} />
            </div>
            <div className="mb-4">
                <Filter
                    valorMax={valorMax}
                    start={start}
                    end={end}
                    setStart={setStart}
                    setEnd={setEnd}
                    setLoading={setLoading}
                    domain={domain}
                    rotaBack={rota}
                    subtitulo={'Filtrar Setores'}
                    filter={filter}
                    setFilter={setFilter}
                    setDataFilter={setDataFilter}
                    setDataFilterBool={setDataFilterBool}
                    setMsg={setMsg}
                />
            </div>
            <div className="w-75">

                {loading && msg ? (
                    <div className="alert alert-warning mt-3" role="alert">
                        {msg}
                    </div>
                ) : loading ? (
                    <div className="text-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Carregando...</p>
                    </div>
                ) : (
                    dataFilterBool ? (
                        <>
                            <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar Grupo de Aprovadores'} titulo={'Novo Grupo Aparovador'} corpomodal={<Modalbodyaprov setVisible={handleCloseModal} visible={visible} dados={datasistemas} dadosUser={DataUser} />} />
                            <TableAprovFilter DadosSistema={datasistemas} DadosAprov={aprov} />
                        </>
                    ) : (
                        <>
                            <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar Grupo de Aprovadores'} titulo={'Novo Grupo Aparovador'} corpomodal={<Modalbodyaprov setVisible={handleCloseModal} visible={visible} dados={datasistemas} dadosUser={DataUser} />} />
                            <TableAprov DadosGrupo={data} DadosSistema={datasistemas} DadosAprov={aprov} DadosEmail={email} dadosUser={DataUser} />
                        </>
                    )
                )}
            </div>
        </div>
    );
};

export default GrupoAprov;
