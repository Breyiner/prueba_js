import * as help from "../helpers/";

export const getUsersById = async (url,username) => {

    return await help.solicitud(`${url}/users?username=${username}`);

}