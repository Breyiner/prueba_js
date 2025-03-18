import {URL} from './modulos/helpers/index.js';
import {getUsuarios, getUsersByUsername} from './modulos/usuarios/index.js';
import {getTareasByUserIdStatus} from './modulos/tareas/index.js';
import {getPosts, getPostsByTitle, getPostsByUserId} from './modulos/posts/index.js';
import {getCommentsByPostId} from './modulos/comments/index.js';
import {getAlbumsByUserId} from './modulos/albums/index.js';
import {getPhotosByAlbumId} from './modulos/fotos/index.js';

let opcion; URL

const solicitarParametro = indicador => {
    let respuesta;
    let regexParametro = /\D/i;
    do {
        respuesta = prompt(`Ingrese el ${indicador}:`);
    } while (!respuesta || !regexParametro.test(respuesta));

    return respuesta;
}

const getTareasPendientes = async () => {
    const usuarios = await getUsuarios(URL);

    return await Promise.all(
        usuarios.map(async user => {
            const pendings = await getTareasByUserIdStatus(URL, user.id, false);

            return {
                ...user,
                tareasPendientes: pendings
            }
        })
    )
}

const usuariosPorUsername = async () => {
    let username = solicitarParametro("username");

    const usuarios = await getUsersByUsername(URL, username);
    
    return await Promise.all(

      usuarios.map(async usuario => {

        const allAlbums = await getAlbumsByUserId(URL, usuario.id);

        let albumsConFotos = await Promise.all(
          allAlbums.map(async album => {

            const albumFotos = await getPhotosByAlbumId(URL, album.id);

            return { ...album, albumFotos };
          })
        );
        return { ...usuario, albumsConFotos };
      })
    );
}

const postPorTitulo = async () => {
    let titulo = solicitarParametro("titulo del post");

    const allPosts = await getPostsByTitle(URL, titulo);
    
    return await Promise.all(

      allPosts.map(async post => {

        const comentarios = await getCommentsByPostId(URL, post.id);

        return { ...post, comentarios };
      })
    );
}

 const nombreTelefonoUsuario = async () => {
    const usuarios = await getUsuarios(URL);

    return await Promise.all(
      usuarios.map(async usuario => {
        return { 
            nombre: usuario.name, 
            telefono: usuario.phone 
        };
      })
    );

}


const allDataUser = async () => {
    const usuarios = await getUsuarios(URL);
    
    return await Promise.all(

        usuarios.map(async usuario => {

            const allPosts = await getPostsByUserId(URL, usuario.id);
    
            let postsConComentarios = await Promise.all(
                allPosts.map(async post => {
                    const commentsPost = await getCommentsByPostId(URL, post.id);
        
                    return {...post, commentsPost};
                })
            );
  
            const allAlbums = await getAlbumsByUserId(URL, usuario.id);

            let albumsConFotos = await Promise.all(
                allAlbums.map(async album => {

                    const albumFotos = await getPhotosByAlbumId(URL, album.id);

                    return { ...album, albumFotos };
                })
            );
            // Devolvemos el usuario junto con sus posts y comentarios, y sus álbumes y fotos
            return {...usuario, postsConComentarios, albumsConFotos};
        })
    );
}


while (true) {
    
    do {
        opcion = parseInt(prompt("Ingrese el número del ejercicio que desea ejecutar (1 - 5 ó 0 para salir):")) ?? "";
    } while (Number.isNaN(opcion) || opcion > 5 || opcion < 0);
    
    if (opcion == 0) {
        alert("Programa finalizado con éxito.");
        break;
    } 

    else {
        console.log(`Ejercicio ${opcion}:`);
        switch (opcion) {
            case 1:
                await getTareasPendientes().then(data => console.log(data));
                break;
        
            case 2:
                await usuariosPorUsername().then(data => data.length != 0 ?
                    console.log(data) : console.log("No hay información relacionada")
                );
                break;
        
            case 3:
                await postPorTitulo().then(data => data.length != 0 ?
                    console.log(data) : console.log("No hay información relacionada")
                );
                break;
        
            case 4:
                await nombreTelefonoUsuario().then(data => console.log(data));
                break;
        
            case 5:
                await allDataUser().then(data => console.log(data));
                break;
        }
    }
}