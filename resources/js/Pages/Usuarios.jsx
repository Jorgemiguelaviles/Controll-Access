import Main from '../Layouts/main';
import { Usuarios } from '../Components/index'
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useCookies } from 'react-cookie';
import { useUser } from '../userContext'



const UsersPage = () => {
    const [cookies] = useCookies(['user']);
    const { statusSideBar, setstatusSideBar } = useUser();


    const valorDoCookie = cookies['user'];



    const encaminharPara = useEncaminhar();
    if (valorDoCookie === 1) {
        return (
            <div>
                <Main statusSideBar={statusSideBar} setStatusSideBar={setstatusSideBar} titulo={'Usuários'} conteudoPrincipal={<Usuarios />} />
            </div>
        )
    } else {
        console.log('ui entrou');
        encaminharPara('/');
        return null; // Certifique-se de retornar algo na ramifica��o else

    }





}

export default UsersPage;
