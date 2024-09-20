import Main from '../Layouts/main';
import { Aprovadores } from '../Components/index';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useCookies } from 'react-cookie';
import { useUser } from '../userContext'

const AprovadoresPage = () => {

    const { statusSideBar, setstatusSideBar } = useUser();
    const [cookies] = useCookies(['user']);

    const valorDoCookie = cookies['user'];
    const encaminharPara = useEncaminhar();
   if (valorDoCookie === 1) {
 return (
        <div>
            <Main statusSideBar={statusSideBar} setStatusSideBar={setstatusSideBar} titulo={'Aprovadores'} conteudoPrincipal={<Aprovadores />} />
        </div>
    );
} else{

    encaminharPara('/');
    return null; // Certifique-se de retornar algo na ramifica��o else

}



}

export default AprovadoresPage;
