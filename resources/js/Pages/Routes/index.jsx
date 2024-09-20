import React, { useState } from 'react';
import LoginPage from '../LoginPage';
import Home from '../Home';
import Sistemas from '../Sistemas';
import Grupo from '../Grupo';
import Usuarios from '../Usuarios';
import Aprovadores from '../Aprovadores';

const useRoutes = () => {
    const [routes, setRoutes] = useState([
        {
            path: '/',
            element: <LoginPage />,
        },
        {
            path: '/Home',
            element: <Home />,
        },
        {
            path: '/Sistemas',
            element: <Sistemas />,
        },
        {
            path: '/Grupo',
            element: <Grupo />,
        },
        {
            path: '/Aprovadores',
            element: <Aprovadores />,
        },
        {
            path: '/Usuarios',
            element: <Usuarios />,
        },
        // Adicione mais rotas conforme necessário
    ]);

    return { routes, setRoutes };
};

export default useRoutes;
