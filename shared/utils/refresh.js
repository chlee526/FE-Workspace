import { setRefreshStatus, setScrollPositionY } from '@shared/utils/auth';

import store from '@/store';
/**
 * shared 내부가 아닌 하위 project vue 영역에서 호출 하는 함수 *
 */

export const setHandleScroll = () => {
    setTimeout(() => {
        window.addEventListener('scroll', handleScroll);
        setRefreshStatus(false);
    }, 1000);
};

/**
 * 브라우저 새로고침(F5) 처리전 실행되는 함수
 * 일시적으로 쿠키 값을 변경하여 route 이동 전 새로고침으로 이동인지 단순 route 이동인지 확인 하는 용도
 */

export const windowSetReroadChck = () => {
    setRefreshStatus(true);

    // beforeunload 이벤트 발생이 간헐적으로 발생되지 않은 문제 때문에 주석처리 하였음, 쿠키값을 true로 변경하기위한 목적으로 만든것이기 때문에 코드 주석처리
    // window.addEventListener('beforeunload', handleSetReroad);
};

/**
 * shared/ui/top_search 내부의 input_form , results ref의 offsetHeigth 값을 구하는 용도
 */
const handleScroll = () => {
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    let offsetHeight = store.getters.getScrollPositionY;

    if (scrollY == 0) {
        setScrollPositionY(scrollY);
    } else {
        setScrollPositionY(scrollY + offsetHeight.inputFormOffsetHeigth - offsetHeight.resultOffsetHeigth);
    }
};
