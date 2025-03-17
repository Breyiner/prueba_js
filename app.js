import * as help from './modulos/helpers/index.js';
import * as users from './modulos/usuarios/index.js';
import * as tasks from './modulos/tareas/index.js';
import * as posts from './modulos/posts/index.js';
import * as comment from './modulos/comments/index.js';
import * as albums from './modulos/albums/index.js';
import * as photos from './modulos/fotos/index.js';

let opcion, resultado, url = help.URL;

const solicitarParametro = indicador => {
    let respuesta;
    let regexParametro = /\D/i;
    do {
        respuesta = prompt(`Ingrese el ${indicador}:`);
    } while (!respuesta || !regexParametro.test(respuesta));

    return respuesta;
}

const getTareasPendientes = async () => {
    const usuarios = await users.getUsuarios(url);

    return await Promise.all(
        usuarios.map(async user => {
            const pendings = await tasks.getTareasByUserIdStatus(url, user.id, false);

            return {
                ...user,
                tareasPendientes: pendings
            }
        })
    )
}

const usuariosPorUsername = async () => {
    let username = solicitarParametro("username");

    const usuarios = await users.getUsersByUsername(url, username);
    
    return await Promise.all(

      usuarios.map(async usuario => {

        const allAlbums = await albums.getAlbumsByUserId(url, usuario.id);

        let albumsConFotos = await Promise.all(
          allAlbums.map(async album => {

            const albumFotos = await photos.getPhotosByAlbumId(url, album.id);

            return { ...album, albumFotos };
          })
        );
        return { ...usuario, albumsConFotos };
      })
    );
}

const postPorTitulo = async () => {
    let titulo = solicitarParametro("titulo del post");

    const allPosts = await posts.getPostsByTitle(url, titulo);
    
    return await Promise.all(

      allPosts.map(async post => {

        const comentarios = await comment.getCommentsByPostId(url, post.id);

        return { ...post, comentarios };
      })
    );
}

 const nombreTelefonoUsuario = async () => {
    const usuarios = await users.getUsuarios(url);

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
    const usuarios = await users.getUsuarios(url);
    
    return await Promise.all(

        usuarios.map(async usuario => {

            const allPosts = await posts.getPostsByUserId(url, usuario.id);
    
            let postsConComentarios = await Promise.all(
                allPosts.map(async post => {
                    const commentsPost = await comment.getCommentsByPostId(url, post.id);
        
                    return {...post, commentsPost};
                })
            );
  
            const allAlbums = await albums.getAlbumsByUserId(url, usuario.id);

            let albumsConFotos = await Promise.all(
                allAlbums.map(async album => {

                    const albumFotos = await photos.getPhotosByAlbumId(url, album.id);

                    return { ...album, albumFotos };
                })
            );
            // Devolvemos el usuario junto con sus posts y comentarios, y sus álbumes y fotos
            return {...usuario, postsConComentarios, albumsConFotos};
        })
    );
}


do {
    opcion = parseInt(prompt("Ingres el número del ejercicio que desea ejecutar (1 - 5):"));
} while (typeof opcion != "number" || opcion > 5 || opcion < 1);

switch (opcion) {
    case 1:
        resultado = getTareasPendientes();
        break;

    case 2:
        resultado = usuariosPorUsername();
        break;

    case 3:
        resultado = postPorTitulo();
        break;

    case 4:
        resultado = nombreTelefonoUsuario();
        break;

    case 5:
        resultado = allDataUser();
        break;
}

resultado.then(datos => datos.length != 0 ? 
    console.log(datos) : 
    console.log("No se encontró información relacionada"));