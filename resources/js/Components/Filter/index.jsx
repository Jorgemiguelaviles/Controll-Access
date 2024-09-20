import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../index';
import enviarDadosParaBackend from '../../hooks/functions/submitbackend/submitbackend';
import { useUser } from '../../userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const Filter = ({ setLoading, domain, rotaBack, subtitulo, filter, setFilter, setDataFilter, setDataFilterBool, setMsg, start, end, setStart, setEnd, valorMax }) => {
    const { mobile, setMobile } = useUser();

    function filtrarandLoading() {
        setMsg('');
        setLoading(true); // Inicia o estado de loading
        filtrar(); // Chama a função filtrar para processar os dados
    }

    async function filtrar() {
        try {
            if (!filter) {
                console.log('Filtro não existe. Definindo valores padrão.');
                setStart(0);
                setEnd(20);
                setLoading(false); // Define o estado de dados filtrados como true
            } else {
                const data = { filter: filter };
                let response = await enviarDadosParaBackend(rotaBack, data, domain);
                setDataFilter(response);
                setDataFilterBool(true); // Define o estado de dados filtrados como true após a resposta
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            if (error.response && error.response.data && error.response.data.message === 'The filter field is required.') {
                setMsg('O filtro precisa ser preenchido');
            }
        } finally {
            setLoading(false); // Finaliza o estado de loading após o processamento
        }
    }

    // Função para avançar
    const avancar = () => {
        if (end <= valorMax) {
            setStart(start + 20);
            setEnd(end + 20);
        }
    };

    // Função para voltar
    const voltar = () => {
        if (start - 20 >= 0) {
            setStart(start - 20);
            setEnd(end - 20);
        }
    };

    useEffect(() => {
        // Lógica aqui se necessário
    }, []);

    return (
        <div className="d-flex flex-column">
            <div className="row">
                <div className="col">
                    <Input
                        obrigatorio={false}
                        etiqueta={'Filtrar'}
                        desativado={false}
                        input={filter}
                        setinput={setFilter}
                        tipo={'text'}
                        subtitulo={subtitulo}
                    />
                </div>
            </div>
            <div className="row d-flex justify-content-between">
                <div className="col-auto">
                    <button className="btn btn-outline-primary" onClick={voltar}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="mr-1" />

                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-outline-success" onClick={filtrarandLoading}>
                        Filtrar dados
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-outline-primary" onClick={avancar}>

                        <FontAwesomeIcon icon={faArrowAltCircleRight} className="ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

Filter.propTypes = {
    setLoading: PropTypes.func.isRequired,
    domain: PropTypes.string.isRequired,
    rotaBack: PropTypes.string.isRequired,
    subtitulo: PropTypes.string.isRequired,
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    setDataFilter: PropTypes.func.isRequired,
    setDataFilterBool: PropTypes.func.isRequired,
    setMsg: PropTypes.func.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    setStart: PropTypes.func.isRequired,
    setEnd: PropTypes.func.isRequired,
};

export default Filter;
