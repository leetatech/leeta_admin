import { put } from '../../network/https';
import apiRoutes from '../../route/api_route';

export default class OrderService {
  static async getOrderList(data: Record<string, string>) {
    const response = await put({
      url: apiRoutes.orderList,
      data: { ...data },
    });
    if (response.data.error_reference) {
      throw new Error(response.data.message as string);
    }
    if (response.data) {
      return response.data as Record<string, string | Record<string, string>[]>;
    }
  }

  static async updateOder(data: Record<string, string>) {
    const response = await put({
      url: apiRoutes.orderUpdate,
      data: { ...data },
    });
    if (response.data.error_reference) {
      throw new Error(response.data.message as string);
    }
    if (response.data) {
      return response.data as Record<string, string | Record<string, string>[]>;
    }
  }
}
