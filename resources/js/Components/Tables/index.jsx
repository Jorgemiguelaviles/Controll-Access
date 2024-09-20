import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalSelectCorposEdit, Modalbodysistemsedit, Modalbodyusersedit, Modalbodygroupsedit, Modalbodyaprovedit } from '../index';
import useCreateTable from '../../hooks/functions/getbackend/getbackend'
import { useUser } from '../../userContext';

function TableSystem({ Dados }) {
    const [visible, setVisible] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState(Dados.message[0]);

    const handleSystemClick = (system) => {
        setSelectedSystem(system);
        setVisible(true);
    };

    const modalContent = (

        <Modalbodysistemsedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={selectedSystem}
            dadosacesso={Dados.message[1]}
        />
    );


    return (
        <>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome do sistema</th>
                        <th scope="col">Data de cria&ccedil;&atilde;o</th>
                    </tr>
                </thead>
                <tbody>
                    {Dados.message[0].map((item, index) => (
                        <tr key={index} >
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.id}</td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">

                                <ModalSelectCorposEdit
                                    onClick={() => handleSystemClick(item)}
                                    descricao={item.nome_do_sistema}
                                    titulo={'Atualizacao de sistemas'}
                                    corpomodal={modalContent}
                                />
                            </td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{formatarData(item.created_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>


    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Voc� pode ajustar o formato conforme desejado
    }
}



function TableSystemFilter({ Dados }) {
    const [visible, setVisible] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState(Dados.message[0]);

    const handleSystemClick = (system) => {
        setSelectedSystem(system);
        setVisible(true);
    };

    const modalContent = (
        <Modalbodysistemsedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={selectedSystem}
            dadosacesso={Dados.message[1]}
        />
    );


    return (
        <>
            <div className="table-responsive">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome do sistema</th>
                            <th scope="col">Data de cria&ccedil;&atilde;o</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Dados.message[0].map((item, index) => (
                            <tr key={index} >
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.id}</td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">

                                    <ModalSelectCorposEdit
                                        onClick={() => handleSystemClick(item)}
                                        descricao={item.nome_do_sistema}
                                        titulo={'Atualizacao de sistemas'}
                                        corpomodal={modalContent}
                                    />
                                </td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{formatarData(item.created_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Voc� pode ajustar o formato conforme desejado
    }
}



function TableGroup({ DadosSistema, DadosGrupo }) {
    console.log('DadosGrupo')

    const [visible, setVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);



    const handleGroupClick = (item) => {
        setSelectedGroup(item); // Ajuste aqui
        setVisible(true);
    };



    const modalContent = (
        <Modalbodygroupsedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={DadosSistema.message[0]}
            dadosacesso={DadosSistema.message[1]}
            dadosgrupo={selectedGroup}
        />
    );

    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome do grupo</th>
                            <th scope="col">Data de cria&ccedil;&atilde;o</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DadosGrupo.message.map((item, index) =>
                        (
                            <tr key={index}>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">
                                    {item.id}</td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">
                                    <ModalSelectCorposEdit
                                        onClick={() => handleGroupClick(item)}
                                        descricao={item.NomeDoSetor}
                                        titulo={'Atualizacao de grupos'}
                                        corpomodal={modalContent}
                                    />
                                </td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{formatarData(item.updated_at)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Voc� pode ajustar o formato conforme desejado
    }
}












function TableAprov({ DadosSistema, DadosAprov, DadosEmail, dadosUser }) {
    console.log('DadosAprov', DadosAprov)
    
    const [visible, setVisible] = useState(false);
    const [selectedAprov, setSelectedAprov] = useState(null);


    const handleAprovClick = (item) => {
        setSelectedAprov(item);
        setVisible(true);
    };

    const modalContent = visible && (
        <Modalbodyaprovedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={DadosSistema.message[0]}
            dadosacesso={DadosSistema.message[1]}
            dadosaprov={selectedAprov}
            dadosemail={DadosEmail} // Passando o email selecionado
            dadosUser={dadosUser}
        />
    );


    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome do grupo</th>
                            <th scope="col">Descrição do Departamento</th>
                            <th scope="col">Data de criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DadosAprov.map((item, index) => (
                            <tr key={index}>
                                <td
                                    style={
                                        item.status === 1
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    {item.id}
                                </td>
                                <td
                                    style={
                                        item.status === 1
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    <ModalSelectCorposEdit
                                        onClick={() => handleAprovClick(item)}
                                        descricao={item.nome}
                                        titulo={'Atualizacao de grupos'}
                                        corpomodal={modalContent}
                                    />
                                </td>
                                <td
                                    style={
                                        item.status === 1
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    {item.DescricaoDepartamento}
                                </td>
                                <td
                                    style={
                                        item.status === 1
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    {formatarData(item.updated_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Ajuste o formato conforme desejado
    }
}




























function TableUsers({ DadosSistema, DadosGrupo, DadosUser }) {
    const { getBackendData } = useCreateTable()
    const [visible, setVisible] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [gestores, setgestores] = useState(null);
    const { domain } = useUser();



    const handleGroupClick = (user) => {
        setSelectedGroup(DadosGrupo)
        setSelectedUser(user)
        setVisible(true);
    };

    const modalContent = (
        <Modalbodyusersedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={DadosSistema.message[0]} // Agora voc� pode passar diretamente selectedGroup
            dadosacesso={DadosSistema.message[1]}
            dadosgrupo={DadosGrupo}
            dadosuser={selectedUser}
            infoGestores={gestores}
        />
    );

    useEffect(() => {

        const fetchData = async () => {
            try {


                let list = []



                DadosUser.message.forEach((element, index) => {

                    if (element.GestorCheck && element.status) {
                        list.push(element.Nome)
                    }

                });

                const rota = `${domain}getGestores`; // Defina a rota da API
                const valores = await getBackendData(rota);


                setgestores(valores.message)

            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);





    return (
        <>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Chapa</th>
                            <th scope="col">Grupo</th>
                            <th scope="col">Gestor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DadosUser.message.map((item, index) => (
                            <tr key={index}>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.id}</td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">
                                    <ModalSelectCorposEdit
                                        onClick={() => handleGroupClick(item)}
                                        descricao={item.Nome}
                                        titulo={'Atualizacao de Usuarios'}
                                        corpomodal={modalContent}
                                    />
                                </td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.Chapa}</td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.Departamento}</td>
                                <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.Gestor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Voc� pode ajustar o formato conforme desejado
    }
}

TableSystem.propTypes = {
    Dados: PropTypes.node.isRequired,
};

TableGroup.propTypes = {
    Dados: PropTypes.node.isRequired,
};

TableUsers.propTypes = {
    Dados: PropTypes.node.isRequired,
};






































function TableGroupFilter({ DadosSistema, DadosGrupo }) {

    const [visible, setVisible] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);



    const handleGroupClick = (item) => {
        setSelectedGroup(item); // Ajuste aqui
        setVisible(true);
    };



    const modalContent = (
        <Modalbodygroupsedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={DadosSistema.message[0]} // Agora voc� pode passar diretamente selectedGroup
            dadosacesso={DadosSistema.message[1]}
            dadosgrupo={selectedGroup}
        />
    );

    return (
        <>

            <table className="table table-responsive ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome do grupo</th>
                        <th scope="col">Data de cria&ccedil;&atilde;o</th>
                    </tr>
                </thead>
                <tbody>
                    {DadosGrupo.message.map((item, index) =>
                    (
                        <tr key={index}>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">
                                {item.id}</td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">
                                <ModalSelectCorposEdit
                                    onClick={() => handleGroupClick(item)}
                                    descricao={item.NomeDoSetor}
                                    titulo={'Atualizacao de grupos'}
                                    corpomodal={modalContent}
                                />
                            </td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{formatarData(item.updated_at)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Voc� pode ajustar o formato conforme desejado
    }
}





















function TableAprovFilter({ DadosSistema, DadosAprov }) {

    const [visible, setVisible] = useState(false);
    const [selectedAprov, setSelectedAprov] = useState(null);



    const handleAprovClick = (item) => {
        setSelectedAprov(item);
        setVisible(true);
    };



    const modalContent = (
        <Modalbodyaprovedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={DadosSistema.message[0]}
            dadosacesso={DadosSistema.message[1]}
            dadosaprov={selectedAprov}

        />
    );

    return (
        <>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome do grupo</th>
                            <th scope="col">Descrição do Departamento</th>
                            <th scope="col">Data de criação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DadosAprov.map((item, index) => (
                            <tr key={index}>
                                <td
                                    style={
                                        item.status === 0
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    {item.id}
                                </td>
                                <td
                                    style={
                                        item.status === 0
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    <ModalSelectCorposEdit
                                        onClick={() => handleAprovClick(item)}
                                        descricao={item.nome}
                                        titulo={'Atualizacao de grupos'}
                                        corpomodal={modalContent}
                                    />
                                </td>
                                <td
                                    style={
                                        item.status === 0
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    {item.DescricaoDepartamento}
                                </td>
                                <td
                                    style={
                                        item.status === 0
                                            ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' }
                                            : { backgroundColor: 'rgb(255, 255, 255)' }
                                    }
                                    scope="row"
                                >
                                    {formatarData(item.updated_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Ajuste o formato conforme desejado
    }
}


















function TableUserFilter({ DadosSistema, DadosGrupo, DadosUser }) {
    console.log('DadosSistema', DadosSistema)
    console.log('DadosGrupo', DadosGrupo)
    console.log('DadosUser', DadosUser)



    /*const [visible, setVisible] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [gestores, setgestores] = useState(null);


    const handleGroupClick = (user) => {
        setSelectedGroup(DadosGrupo)
        setSelectedUser(user)
        setVisible(true);
    };

    const modalContent = (
        <Modalbodyusersedit
            setVisible={setVisible}
            visible={visible}
            dadossistema={DadosSistema.message[0]} // Agora voc� pode passar diretamente selectedGroup
            dadosacesso={DadosSistema.message[1]}
            dadosgrupo={DadosGrupo}
            dadosuser={selectedUser}
            infoGestores={gestores}
        />
    );

    useEffect(() => {

        const fetchData = async () => {
            try {


                let list = []
                DadosUser.message.forEach((element, index) => {

                    if (element.GestorCheck && element.status) {
                        list.push(element.Nome)
                    }

                });


                setgestores(list)

            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);



    // dadosUser, dadosSystem, dadosGroup

    return (
        <>

            <table className="table table-responsive ">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Chapa</th>
                        <th scope="col">Grupo</th>
                        <th scope="col">Gestor</th>
                    </tr>
                </thead>
                <tbody>
                    {DadosUser.message.map((item, index) => (
                        <tr key={index}>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.id}</td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">
                                <ModalSelectCorposEdit
                                    onClick={() => handleGroupClick(item)}
                                    descricao={item.Nome}
                                    titulo={'Atualizacao de Usuarios'}
                                    corpomodal={modalContent}
                                />
                            </td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.Chapa}</td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.Departamento}</td>
                            <td style={item.status === 0 ? { backgroundColor: 'rgba(204, 0, 0, 0.5)' } : { backgroundColor: 'rgb(255, 255, 255)' }} scope="row">{item.Gestor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </>
    );

    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleString(); // Voc� pode ajustar o formato conforme desejado
    }*/
}

TableSystem.propTypes = {
    Dados: PropTypes.node.isRequired,
};

TableGroup.propTypes = {
    Dados: PropTypes.node.isRequired,
};

TableAprov.propTypes = {
    Dados: PropTypes.node.isRequired,
};

TableUsers.propTypes = {
    Dados: PropTypes.node.isRequired,
};

export { TableSystem, TableGroup, TableAprov, TableUsers, TableSystemFilter, TableGroupFilter, TableUserFilter, TableAprovFilter };


