import { post } from "../../network/https";
import apiRoutes from "../../route/api_route";

export default class LoginService {
  static async signin(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.login,
      data: { ...data },
    });
    if (response.data.error_reference) {
      throw new Error(response.data.message as string);
    }
    if (response.data) {
      LoginService._saveToken(response.data.auth_token);
      return response.data as Record<string, string>;
    }
  }

  static _saveToken(data:string) {
    localStorage.setItem("leeta_token", JSON.stringify(data));
  }
}
