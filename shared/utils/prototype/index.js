/*!
 *
 * @author: RSN R&D Team LHS(GUNI)
 *			h2dlhs@realsn.com
 *
 *
 **/

/**
 * Sleep
 * 강제 딜레이
 * await sleep(...)
 * @param {*} delayTime 딜레이 시간(1/1000)
 * @returns {Promise}
 */
const sleep = (delayTime) => new Promise((res) => setTimeout(res, delayTime));
export { sleep };
