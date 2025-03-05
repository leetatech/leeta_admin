import { post, get } from '../../network/https';
import apiRoutes from '../../route/api_route';

export default class LoginService {
  static async signin(data: Record<string, string>) {
    // remove token from local storage
    LoginService._removeToken();
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

  static async userInfo() {
    // remove token from local storage
    const response = await get({
      url: apiRoutes.getUserInfo,
    });
    if (response.data.error_reference) {
      throw new Error(response.data.message as string);
    }
    if (response.data) {
      return response.data as Record<string, string>;
    }
  }

  static _saveToken(data: string) {
    localStorage.setItem('leeta_token', JSON.stringify(data));
  }

  static _removeToken() {
    localStorage.removeItem('leeta_token');
  }
}
