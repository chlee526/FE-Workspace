/**
 * 도움말
 * 모든 도움말은 해당 모듈을 통해서 관리
 * 공용: helpers > 공용
 * 컨텐츠별: helpers > 메뉴 > 섹션 > 컨텐츠 or helpers > 메뉴 > 컨텐츠
 */

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * State
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
const state = {
    helpers: {
        // 샘플
        sample: `
            <ul>
                <li>
                    <ol>
                        <li>급상승 해시태그에서 표시하고 싶지 않은 해시태그를 제외어로 설정합니다.</li>
                        <li>최대 100개의 해시태그를 제외할 수 있습니다.</li>
                        <li>
                            입력한 그대로의 해시태그만 제외됩니다.
                            <br />
                            <span class="ex">#<span style="color: #ffaf1c">광고</span> ▶ #유료<span style="color: #ffaf1c">광고</span>(X), #<span style="color: #ffaf1c">광고</span>임(X) 등의 해시태그 제외 안됨</span>
                            <br />
                            <span class="ex">
                                <table>
                                    <colgroup>
                                        <col style="width: 120px" />
                                        <col style="width: 100px" />
                                        <col style="width: 100px" />
                                        <col style="width: 170px" />
                                        <col style="width: 100px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>블로그</th>
                                            <th>카페</th>
                                            <th>유튜브</th>
                                            <th>인스타그램</th>
                                            <th>트위터</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>누적 방문자 수</td>
                                            <td>회원 수</td>
                                            <td>구독자 수</td>
                                            <td>게시물 좋아요 수 + 댓글 수</td>
                                            <td>팔로워 수</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                        </li>
                    </ol>
                </li>
                <li>
                    <strong>타이틀</strong>
                    <ul>
                        <li>설명 + 설명 + 설명</li>
                        <li>설명 + 설명 + 설명</li>
                    </ul>
                </li>
                <li>
                    <strong>타이틀</strong>
                    <ul>
                        <li>설명 + 설명 + 설명</li>
                        <li>
                            설명 + 설명 + 설명
                            <br />
                            <em>(Naver 1~20위, Daum 1~10위/ 중복 검색어 제외/ 1시간 단위 업데이트)</em>
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>타이틀</strong>
                    <ul>
                        <li>
                            설명 + 설명 + 설명
                            <br />
                            <span class="ex">#<span style="color: #ffaf1c">광고</span> ▶ #유료<span style="color: #ffaf1c">광고</span>(X), #<span style="color: #ffaf1c">광고</span>임(X) 등의 해시태그 제외 안됨</span>
                            <br />
                            <span class="ex">
                                <table>
                                    <colgroup>
                                        <col style="width: 120px" />
                                        <col style="width: 100px" />
                                        <col style="width: 100px" />
                                        <col style="width: 170px" />
                                        <col style="width: 100px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>블로그</th>
                                            <th>카페</th>
                                            <th>유튜브</th>
                                            <th>인스타그램</th>
                                            <th>트위터</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>누적 방문자 수</td>
                                            <td>회원 수</td>
                                            <td>구독자 수</td>
                                            <td>게시물 좋아요 수 + 댓글 수</td>
                                            <td>팔로워 수</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>타이틀</strong>
                    <ul>
                        <li>
                            설명 + 설명 + 설명
                            <br />
                            <span class="ex">
                                <table>
                                    <colgroup>
                                        <col style="width: 120px" />
                                        <col style="width: 100px" />
                                        <col style="width: 100px" />
                                        <col style="width: 170px" />
                                        <col style="width: 100px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>블로그</th>
                                            <th>카페</th>
                                            <th>유튜브</th>
                                            <th>인스타그램</th>
                                            <th>트위터</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>누적 방문자 수</td>
                                            <td>회원 수</td>
                                            <td>구독자 수</td>
                                            <td>게시물 좋아요 수 + 댓글 수</td>
                                            <td>팔로워 수</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                        </li>
                    </ul>
                </li>
                <li>
                    <strong>타이틀</strong>
                    <ul>
                        <li class="is-no-hypen">
                            <span class="ex">
                                <table>
                                    <colgroup>
                                        <col style="width: 120px" />
                                        <col style="width: 100px" />
                                        <col style="width: 100px" />
                                        <col style="width: 170px" />
                                        <col style="width: 100px" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>블로그</th>
                                            <th>카페</th>
                                            <th>유튜브</th>
                                            <th>인스타그램</th>
                                            <th>트위터</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>누적 방문자 수</td>
                                            <td>회원 수</td>
                                            <td>구독자 수</td>
                                            <td>게시물 좋아요 수 + 댓글 수</td>
                                            <td>팔로워 수</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </span>
                        </li>
                    </ul>
                </li>
            </ul>
        `,
        sample2: `
            <ul>
                <li>
                    <strong>타이틀</strong>
                    <ul>
                        <li>
                            설명 + 설명 + 설명
                        </li>
                    </ul>
                </li>
            </ul>
        `,
        // 제외 키워드
        exptKeyword: {
            // 해시태그
            hashtag: `
                <ol>
                    <li>급상승 해시태그에서 표시하고 싶지 않은 해시태그를 제외어로 설정합니다.</li>
                    <li>최대 100개의 해시태그를 제외할 수 있습니다.</li>
                    <li>
                        입력한 그대로의 해시태그만 제외됩니다.
                        <br /><span class="ex"><span style="color: #ffaf1c">#광고</span> ▶ #유료<span style="color: #ffaf1c">광고</span>(X), #<span style="color: #ffaf1c">광고</span>임(X) 등의 해시태그 제외 안됨</span>
                    </li>
                </ol>
            `,
            // 키워드
            keyword: `
                <ol>
                    <li>급상승 키워드에서 표시하고 싶지 않은 키워드를 제외어로 설정합니다.</li>
                    <li>최대 100개의 키워드를 제외할 수 있습니다.</li>
                    <li>
                        입력한 그대로의 키워드만 제외됩니다.
                        <br /><span class="ex"><span style="color: #ffaf1c">제품 협찬</span> ▶ <span style="color: #ffaf1c">제품협찬</span>(X), <span style="color: #ffaf1c">협찬제품</span>(X), <span style="color: #ffaf1c">협찬</span>환영(X) 등의 키워드 제외 안됨</span>
                    </li>
                </ol>
            `,
        },
    },
};

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Mutation
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
const mutations = {};

/* ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
 * Action
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ */
const actions = {};

export default {
    state,
    mutations,
    actions,
};
