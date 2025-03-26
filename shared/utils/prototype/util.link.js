/**
 * 원문링크를 buzms통해서 리다이렉션
 * @returns {String} buzzms와 연결된 새로운 링크 주소 반환
 */
String.prototype.buzmsLink = function () {
    return 'http://hub.buzzms.co.kr?url=' + encodeURIComponent(this);
};

/**
 * 링크에 POST로 배개변수 담아서 호출할수 있음
 * form태그 임시로 만들어서 submit으로 링크 전달
 * @param {Object} params - POST 매개변수
 * @param {Boolean} newWindow - 새창 여부(기본은 새창)
 */
String.prototype.formSubmit = function (params, newWindow) {
    if (newWindow == undefined) newWindow = true;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this; // Replace with your desired non-API link

    if (params) {
        Object.keys(params).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key] || '';
            form.appendChild(input);
        });
    }

    if (newWindow) {
        const newWindow = window.open('', '_blank');
        newWindow.document.body.appendChild(form);
        form.submit();
    } else {
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
};

/**
 * 엑셀 패스 받아서 다운로드 처리
 * @param {*} link 엑셀 패스
 */
export const excelDownload = function (link) {
    if (!link) return;
    const el = document.createElement('a');
    el.href = link;
    el.download = 'example.xlsx';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
};
