/**
 * 공통 API(정보량/연관어/데이터목록 API) 유효성
 * @param {Object} $type API종류 (volume: 정보량, rk: 연관어, data: 데이터목록)
 * @param {Object} $param 검증에 사용될 파라미터
 * @returns {Object} 검증이 완료된 파라미터
 */
export const getCommonApiValidation = ($type, $param) => {
    var result = {};

    /**
     * 공통
     */
    // 날짜-현재기간(s_date, e_date)
    if ($param.s_date) result.s_date = $param.s_date;
    if ($param.e_date) result.e_date = $param.e_date;

    // 날짜-비교기간(ps_date, pe_date)
    if ($param.ps_date) result.ps_date = $param.ps_date;
    if ($param.pe_date) result.pe_date = $param.pe_date;

    // 감성(senti)
    if ($param.senti && $param.senti.trim().length) result.senti = $param.senti;

    // 채널(sg_seq)
    if ($param.sg_seq && $param.sg_seq.trim().length) result.sg_seq = $param.sg_seq;

    // 연관어(rk_seq)
    if ($param.rk_seq) {
        result.rk_seq = $param.rk_seq;
        if (Array.isArray(result.rk_seq)) {
            result.rk_seq.map(($item) => {
                $item.attr_type_code = $item.attr_type_code || '';
            });
        }
    }

    // 이슈코드(type_code)
    if ($param.type_code) result.type_code = $param.type_code;

    // 검색어(search_keyword)
    if ($param.search_keyword) {
        var tmp = JSON.parse(JSON.stringify($param.search_keyword));
        tmp = tmp.filter(($item, $idx, $arr) => {
            if ($item.keyword.trim().length) return $item;
        });
        if (tmp.length) {
            result.search_keyword = tmp;
        }
    }

    // 정렬(order_type)
    if ($param.order_type && $param.order_type.length) result.order_type = $param.order_type;

    // 엑셀인경우
    if ($param.excel) result.excel = $param.excel;

    /**
     * API별
     */
    // 출력수량(row_limit) => 연관어 API, 데이터목록 API
    if (($type == 'rk' || $type == 'data') && $param.row_limit) result.row_limit = $param.row_limit;

    /*
     * 정보량 API
     */
    if ($type == 'volume') {
        // 카테고리/그래프(grp/grp_sub)
        if ($param.grp) result.grp = $param.grp;
        if ($param.grp_sub) result.grp_sub = $param.grp_sub;
    }

    /*
     * 연관어 API
     */
    if ($type == 'rk') {
        // 연관어 속성
        if ($param.attr_type_code) result.attr_type_code = $param.attr_type_code;

        // 출력수량(row_limit)
        if ($param.row_limit) result.row_limit = $param.row_limit;
    }

    /*
     * 데이터 목록 API
     */
    if ($type == 'data') {
        // 출력수량(row_limit)
        if ($param.row_limit) result.row_limit = $param.row_limit;

        // 게시판종류(brd_type)
        if (!$param.brd_type) result.brd_type = 'I';
        else result.brd_type = $param.brd_type;

        // 페이지번호(page_num)
        if (!$param.page_num) result.page_num = 1;
        else result.page_num = $param.page_num;

        // 줄수
        if (!$param.row_limit) result.row_limit = 10;
        else result.row_limit = $param.row_limit;

        // 출력필드(opt_field_list)
        if ($param.opt_field_list && $param.opt_field_list.length) result.opt_field_list = $param.opt_field_list;

        // 하이라이트 키워드(chk_keyword)
        if ($param.chk_keyword && $param.chk_keyword.length) result.chk_keyword = $param.chk_keyword;

        // 본문/제목 글자수 제한(text_limit)
        if ($param.text_limit) result.text_limit = $param.text_limit;
    }

    return result;
};
