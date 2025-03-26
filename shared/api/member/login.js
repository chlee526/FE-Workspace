import request from '@shared/utils/request';

export async function API_login($param) {
    const path = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PATH_LOGIN;

    return await request({
        url: path,
        method: 'post',
        data: {
            id: $param.id,
            pw: $param.pw,
            ignrPusr: $param.ignrPusr,
        },
    });
}

export async function API_logout($param) {
    const path = process.env.VUE_APP_BASE_API + process.env.VUE_APP_API_PATH_LOGOUT;

    return await request({
        url: path,
        method: 'post',
        data: {
            dummy: '', // 빈값이라도 넣어달라는 요청 .. 헤더쪽에 토큰 있습니다
        },
    });
}
