import request from '@shared/utils/request';
import { getCommonApiValidation } from '@/api/validation';

export function API_datalist($id, $param) {
    const path = process.env.VUE_APP_BASE_API + '/api/data/getRawDataList' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('data', $param),
    });
}
