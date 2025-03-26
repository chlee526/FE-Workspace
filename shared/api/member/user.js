import request from '@shared/utils/request';

// 비밀번호 수정
export async function API_SET_PW($param) {
    const path = process.env.VUE_APP_BASE_API + '/api/user/setpw.jsp';
    let data = {};
    if ($param.id) {
        // 첫 비밀번호 변경
        data.id = $param.id;
        data.newPw = $param.newPw;
    } else {
        // 일반 비밀번호 변경
        data.newPw = $param.newPw;
        data.curPw = $param.curPw;
    }

    let result = await request({
        url: path,
        method: 'post',
        data: data,
    });
    return result;
}
