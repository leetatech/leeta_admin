import { post } from '../../network/https';
import apiRoutes from '../../route/api_route';

export default  class VendorService {
  static async getVendorList(data: Record<string, string>) {
    const response = await post({
      url: apiRoutes.vendorList,
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
