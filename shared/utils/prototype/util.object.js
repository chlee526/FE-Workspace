/*!
 *
 * @author: RSN R&D Team LHS(GUNI)
 *			h2dlhs@realsn.com
 *
 *
 **/
const isObject = function (item) {
    return item && typeof item === 'object' && !Array.isArray(item);
};

export const deepMergeJSON = function (target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                deepMergeJSON(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return deepMergeJSON(target, ...sources);
};

/**
 * 고급검색 키워드 룰 생성
 */
export const combinationRule = ($obj) => {
    const andSplitChar = ' ';
    const orSplitChar = '\n';

    //키워드
    let generalTxt = $obj.keyword_normal; //일반조건
    let sentenceTxt = $obj.keyword_construction; //구문조건
    let adjacentTxt = $obj.keyword_adjacency; //인접조건
    let excludeTxt = $obj.keyword_except; //제외조건

    let eachQuery = '';
    let totalQuery = '';

    //일반 조건 키워드
    if (generalTxt != '') {
        generalTxt = generalTxt.split(orSplitChar);
        for (let i = 0; i < generalTxt.length; i++) {
            if (generalTxt[i].length == 0) continue;
            generalTxt[i] = generalTxt[i].trim().split(andSplitChar);
            eachQuery += '(';
            for (let j = 0; j < generalTxt[i].length; j++) {
                if (generalTxt[i][j].length == 0) continue;
                eachQuery += '\\"' + generalTxt[i][j] + '\\" AND ';
            }
            eachQuery = eachQuery.slice(0, -5);
            eachQuery += ') OR ';
        }
        if (eachQuery.length > 0) {
            totalQuery += '(' + eachQuery.slice(0, -4) + ') OR ';
        }
    }

    //구문 조건 키워드
    if (sentenceTxt != '') {
        sentenceTxt = sentenceTxt.split(orSplitChar);
        eachQuery = '';
        for (let i = 0; i < sentenceTxt.length; i++) {
            const keyword = sentenceTxt[i].trim();
            if (keyword.length == 0) continue;
            eachQuery += '(\\"' + keyword + '\\") OR ';
        }
        totalQuery += '(' + eachQuery.slice(0, -4) + ') OR ';
    }

    //인접 조건 키워드
    if (adjacentTxt != '') {
        adjacentTxt = adjacentTxt.split(orSplitChar);
        eachQuery = '';
        for (let i = 0; i < adjacentTxt.length; i++) {
            const keyword = adjacentTxt[i].trim();
            if (keyword.length == 0) continue;
            eachQuery += '(\\"' + keyword + '\\"~15) OR ';
        }
        totalQuery += '(' + eachQuery.slice(0, -4) + ') OR ';
    }

    //제외 조건 키워드
    if (excludeTxt != '') {
        excludeTxt = excludeTxt.split(orSplitChar);
        eachQuery = '';
        for (let i = 0; i < excludeTxt.length; i++) {
            if (excludeTxt[i].length == 0) continue;
            excludeTxt[i] = excludeTxt[i].trim().split(andSplitChar);
            eachQuery += '(';
            for (let j = 0; j < excludeTxt[i].length; j++) {
                if (excludeTxt[i][j].length == 0) continue;
                eachQuery += '\\"' + excludeTxt[i][j] + '\\" AND ';
            }
            eachQuery = eachQuery.slice(0, -5);
            eachQuery += ') OR ';
        }

        if (eachQuery.length > 0) {
            totalQuery = '(' + totalQuery.slice(0, -4) + ') NOT (' + eachQuery.slice(0, -4) + ')';
        }
    } else {
        totalQuery = totalQuery.slice(0, -4);
    }

    //입력 키워드 길이 체크 - 사용자 권한 비교
    // var query = removeNotQueryChar(totalQuery);
    // if (query.length > commonUserAuth.com_keyword_rule) {
    //     var msg = "입력한 키워드룰 : " + query.length + "자\n입력 가능 키워드룰 : " + commonUserAuth.com_keyword_rule + "자 (연산문자 제거)";
    //     msgMngr.send(msg, "키워드룰 길이 초과", 0, 1, function ($result) {
    //     });
    //     return new Promise(function (resolve, reject) {
    //         resolve(false);
    //     });
    // }

    return totalQuery;
};

/**
 * datalist 하이라이트
 * @param {Object} searchOpts  검색조건
 * @param {Array} list  DataList
 * @param {Array} targets  변경될 필드명(default: ['TITLE', 'CONTENT'])
 * @returns {Array} 하이라이트 처리된 DataList
 */
export const dataListHighlight = (searchOpts, list, targets = ['TITLE', 'CONTENT']) => {
    if (list.length <= 0) return [];

    let colKeywords = []; // 분석대상 col-keyword
    let inputKeywords = []; // 검색어 inputkeyword
    let rKeywords = []; // 연관어 rkeyword

    let result = [];

    // ==================================================
    // 관련정보 팝업
    if (searchOpts.title) {
        searchOpts.title.forEach((item) => {
            if (item.type === 'rkeyword' && !colKeywords.includes(item.name) && item.name.length) colKeywords.push(item.name);
        });
    }
    if (searchOpts.subTitle) {
        searchOpts.subTitle.forEach((item) => {
            if (item.type === 'rkeyword' && !colKeywords.includes(item.name) && item.name.length) colKeywords.push(item.name);
        });
    }

    if (searchOpts.additionalCondition) {
        // 팝업 내 검색어
        const inputKeyword = searchOpts.additionalCondition.inputKeyword.trim().strEscape();
        if (!inputKeywords.includes(inputKeyword) && inputKeyword.length) inputKeywords.push(inputKeyword);

        // 팝업 내 연관어
        if (searchOpts.additionalCondition.selectRk) {
            const word = searchOpts.additionalCondition.selectRk.word;
            if (word.length) {
                rKeywords.push(searchOpts.additionalCondition.selectRk);
            }
        }
    }
    // ===============================================================

    // 고급검색이 없고 관련정보 팝업이 아닐때 분석대상 추가
    if (!searchOpts.advs && !searchOpts.additionalCondition) {
        // 분석대상
        if (searchOpts.analsList) {
            searchOpts.analsList.forEach((item) => {
                if (!colKeywords.includes(item) && item.name.length) colKeywords.push(item.name);
            });
        }
    }

    // 고급검색
    if (searchOpts.advs) {
        for (let $key in searchOpts.advs) {
            const advs = searchOpts.advs[$key];
            const keywords = {
                normal: advs.keyword_normal.replaceAll(' ', '\n').split('\n'),
                construction: advs.keyword_construction.split('\n'),
                adjacency: advs.keyword_adjacency.replaceAll(' ', '\n').split('\n'),
            };
            Object.values(keywords).forEach((arr) => {
                arr.forEach((item) => {
                    if (!colKeywords.includes(item) && item.length) colKeywords.push(item);
                });
            });
        }
    }

    // 공통 검색어
    if (searchOpts.search_keyword) {
        searchOpts.search_keyword.forEach((item) => {
            const inputKeyword = item.keyword.trim().strEscape();
            if (!inputKeywords.includes(inputKeyword) && inputKeyword.length) inputKeywords.push(inputKeyword);
        });
    }

    // 검색어
    if (searchOpts.inputKeyword) {
        const inputKeyword = searchOpts.inputKeyword.trim().strEscape();
        if (!inputKeywords.includes(inputKeyword) && inputKeyword.length) inputKeywords.push(inputKeyword);
    }

    // 연관어
    if (searchOpts.rk_seq) {
        const rks = !Array.isArray(searchOpts.rk_seq) ? searchOpts.rk_seq.split(',') : searchOpts.rk_seq;
        rks.forEach((rkeyword) => {
            if (rkeyword.name && !rKeywords.includes(rkeyword)) {
                const keyword = { ...rkeyword };
                keyword.word = keyword.name;
                rKeywords.push(keyword);
            }
        });
    }

    result = list.map((data) => {
        // 수집키워드
        const tmpColKeyword = [...colKeywords]; // 원본 colKeywords 백업
        if (data.c_keyword) {
            data.c_keyword.forEach((item) => {
                if (!colKeywords.includes(item) && item.length) colKeywords.push(item);
            });
        }

        targets.forEach((target) => {
            // 분석대상
            if (colKeywords.length > 0) {
                const colReg = new RegExp(colKeywords.join('|'), 'gi');
                data[target] = String(data[target]).replace(colReg, (word) => `<span class="is-hl-colKeyword">${word}</span>`);
            }

            // 검색어
            if (inputKeywords.length > 0) {
                const inputReg = new RegExp(inputKeywords.join('|'), 'gi');
                data[target] = String(data[target]).replace(inputReg, (word) => `<span class="is-hl-inputkeyword">${word}</span>`);
            }

            // 연관어
            if (rKeywords.length > 0) {
                rKeywords.forEach((rKeyword) => {
                    const rReg = new RegExp(rKeyword.word, 'gi');
                    const style = `border-color:${rKeyword.color ? rKeyword.color : '#666'}; background:${rKeyword.color ? rKeyword.color : '#666'}; color: #ffffff;`;

                    data[target] = String(data[target]).replace(rReg, (word) => `<span class="is-hl-rkeyword" style="${style}">${word}</span>`);
                });
            }
        });

        // 수집 키워드가 포함되지않은 분석대상으로 초기화
        colKeywords = tmpColKeyword;
        return data;
    });
    return result;
};

/**
 * 다중 깊이의 Json데이터에서 key가 되는 값을 찾음
 * @param {*} seq
 * @param {*} node
 * @returns
 */
export const findNodeBySeq = function (seq, node) {
    if (node.seq === seq) {
        return node;
    }

    if (node.children) {
        if (Array.isArray(node.children)) {
            for (const child of node.children) {
                const result = findNodeBySeq(seq, child);
                if (result) return result;
            }
        } else {
            return findNodeBySeq(seq, node.children);
        }
    }

    return null;
};

/**
 * Json형태의 Array나 Object 데이터에서 props(Json 조건)에 만족하는 노드를 찾아 반환
 * @param {*} node 데이터(Array or Json)
 * @param {*} props 찾을 속성 Json
 * @param {*} childNodeName 자식 노드도 뒤져야 할 경우 자식 노드 속성 이름(기본 'children')
 * @returns {Object} 최종적으로 찾은 Json Object, 없으면 null
 */
export const findNodeByProps = function (node, props, childNodeName) {
    const children = childNodeName || 'children';

    if (Array.isArray(node)) {
        for (const item of node) {
            const result = findNodeByProps(item, props, children);
            if (result) return result;
        }
    } else if (typeof node === 'object') {
        const propsMatch = Object.keys(props).every((prop) => node[prop] === props[prop]);

        if (propsMatch) {
            return node;
        }

        if (node[children]) {
            if (Array.isArray(node[children])) {
                for (const child of node[children]) {
                    const result = findNodeByProps(child, props, children);
                    if (result) return result;
                }
            } else {
                return findNodeByProps(node[children], props, children);
            }
        }
    }

    return null;
};

/**
 * Json형태의 Array나 Object 데이터에서 Propertie 이름을 props에서 지정된 대로 변경
 * @param {JSON} node 데이터
 * @param {JSON} props 변경 항목 { 변경전이름: 변경후 이름, 변경전이름: 변경후 이름, ... }
 * @param {String} childNodeName
 * @returns {JSON} 변경 된 데이터
 */
export const renameProperties = function (node, props, childNodeName) {
    const childPropertyName = childNodeName ? childNodeName : 'children';
    function renameObjectProperties(obj) {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            if (key === childPropertyName && Array.isArray(obj[key])) {
                newObj[key] = obj[key].map((item) => renameObjectProperties(item));
            } else {
                const newKey = props[key] || key;
                newObj[newKey] = obj[key];
            }
        });
        return newObj;
    }

    if (Array.isArray(node)) {
        return node.map((item) => renameObjectProperties(item));
    } else if (typeof node === 'object') {
        return renameObjectProperties(node);
    } else {
        return node;
    }
};
