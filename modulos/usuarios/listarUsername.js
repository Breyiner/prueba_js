import * as help from "../helpers/index.js";

export const getUsersByUsername = async (url,username) => {

    return await help.solicitud(`${url}/users?username=${username}`);

}