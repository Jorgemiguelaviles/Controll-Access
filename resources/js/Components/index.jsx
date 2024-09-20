import Filter from './Filter'
import Checkbox from './Checkbox'
import ModalWebCam from './Photos'
import Dropdown from './Dropdown'
import Date from './Date'
import Modalbodysistems from './modalbody/modalbodysistems'
import Modalbodyaprovedit from './modalbody/modalbodyaprovedit'
import Modalbodysistemsedit from './modalbody/modalbodysistemsedit'
import Modalbodygroupsedit from './modalbody/modalbodygroupedit'
import Modalbodyusersedit from './modalbody/modalbodyuseredit'
import Modalbodygroup from './modalbody/modalbodygroup'
import Modalbodyusers from './modalbody/modalbodyusers'
import Modalbodyaprov from './modalbody/modalbodyaprov'
import { ModalSelectCorpos, ModalSelectCorposEdit } from './Modals'
import TelaPrincipal from './Form/Main'
import Sidebar from './Sidebar'
import Imagens from './Imagens'
import Input from './Input'
import RandomBarChart from './RandomBarChart'
import { Steppers2passos, Steppers3passos } from './Steppers'
import Sistemas from './Form/Sistemas';
import Grupo from './Form/Grupo';
import Usuarios from './Form/Usuarios';
import Aprovadores from './Form/Aprovadores';
import Textarea from './textarea/index'
import Gerenciamento from './Gerenciamento'
import GerenciamentoGroup from './GerenciamentoGroup'
import GerenciamentoUserEdit from './GerenciamentoUserEdit'
import GerenciamentoUser from './GerenciamentoUser'
import GerenciamentoAprov from './GerenciamentoApro'
// ... (importações existentes)
import { TableSystem, TableGroup,TableAprov, TableUsers, TableSystemFilter, TableGroupFilter, TableAprovFilter, TableUserFilter } from './Tables/index'
import Submit from './Button/index';
import Deslogin from './Button/index'

export {
    TableUserFilter,
    TableGroupFilter,
    TableAprovFilter,
    TableSystemFilter,
    Filter,
    Deslogin,
    GerenciamentoUserEdit,
    GerenciamentoUser,
    Modalbodyusersedit,
    Modalbodyaprovedit,
    Modalbodygroupsedit,
    Modalbodysistemsedit,
    TableSystem,
    TableGroup,
    TableUsers,
    TableAprov,
    GerenciamentoGroup,
    GerenciamentoAprov,
    Submit, // Renomeado para evitar conflitos de nome
    Checkbox,
    Gerenciamento,
    ModalWebCam,
    Textarea,
    Dropdown,
    Date,
    Modalbodysistems,
    Modalbodygroup,
    Modalbodyusers,
    Modalbodyaprov,
    ModalSelectCorpos,
    ModalSelectCorposEdit,
    TelaPrincipal,
    Sistemas,
    Grupo,
    Usuarios,
    Aprovadores,
    Input,
    RandomBarChart,
    Sidebar,
    Imagens,
    Steppers2passos,
    Steppers3passos,
}

