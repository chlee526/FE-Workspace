import request from '@shared/utils/request';
import { getCommonApiValidation } from '@/api/validation';

const apiPath = process.env.VUE_APP_BASE_API;
// 속성 미사용 연관키워드
export function API_volume($id, $param) {
    /**
     * $param(필수)
     * s_date.date: 시작날짜
     * e_date.date: 종료날짜
     *
     * * $param(추가)
     * grp.type: 그룹종류('date': 날짜별, 'sg': 채널별, 'code': 분류체계별)
     * grp.code: grp.type이 'sg', 'code'인 경우 해당 요청 code값
     * ps_date.date: 시작날짜(비교기간)
     * pe_date.date: 종료날짜(비교기간)
     * senti: 감성 코드
     * sg_seq: 채널 코드
     * rk_seq: 연관어 코드
     * or_type_code: 분석대상 타입_코드
     * attr_type_code: 분류체계 타입_코드
     * search_keyword.type: 검색키워드 타입(A:제목+본문,T:제목,C:본문)
     *
     */

    const path = process.env.VUE_APP_BASE_API + '/api/data/getVolume' + (!$param.excel ? '.jsp' : '_excel.jsp');

    return request({
        id: $id,
        url: path,
        method: 'post',
        data: getCommonApiValidation('volume', $param),
    });
}
