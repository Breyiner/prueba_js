import * as users from './modulos/usuarios/';
import * as help from './modulos/helpers/';
import * as tasks from './modulos/tareas/';

const getTareasPendings = () => {
    const usuarios = users.getUsuarios(help.URL);

    let respuesta = Promise.all(
        usuarios.map(async user => {
            const pendings = tasks.getTareasByUserIdStatus(help.URL, user.id, false);

            return {
                ...user,
                tareasPendientes: pendings
            }
        })
    )
}

getTareasPendings().then(data => console.log(data));