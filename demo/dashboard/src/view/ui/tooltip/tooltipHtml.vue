<template>
    <div :class="{ ui_help: helper }">
        <template v-if="html">
            <p>HTML <strong style="color: yellow">Content</strong> 입니다.</p>
        </template>
        <template v-if="helper">
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
            <ul>
                <li>
                    <strong>검색어</strong>
                    <ul>
                        <li>[제목 + 본문] 영역에서 검색어가 포함된 데이터를 검색합니다.</li>
                        <li>입력 가능한 결과 내 검색어 글자 수는 최대 15자입니다.</li>
                        <li>Basic에서 띄어쓰기는 AND 연산으로 인식되며, AND 이외의 키워드 연산을 지원하지 않습니다.</li>
                        <li>Advanced에서는 일반, 구문, 인접, 제외의 다양한 키워드 연산을 지원합니다.</li>
                    </ul>
                </li>
                <li>
                    <strong>최근 검색어</strong>
                    <ul>
                        <li>검색어 입력창 클릭 시, 최근 입력한 00개의 키워드(룰)에서 선택할 수 있습니다. 00개 초과 시, 오래된 순으로 자동 삭제됩니다.</li>
                    </ul>
                </li>
                <li>
                    <strong>추천 검색어</strong>
                    <ul>
                        <li>포털사이트의 실시간 급상승 검색어를 순위가 높은 순으로 보여줍니다.<br /><em>(Naver 1~20위, Daum 1~10위/ 중복 검색어 제외/ 1시간 단위 업데이트)</em></li>
                    </ul>
                </li>
                <li>
                    <strong>추천 검색어</strong>
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
        </template>
    </div>
</template>

<script>
export default {
    name: 'comp-tooltip-html',
    data() {
        return {};
    },
    props: {
        html: { type: Boolean, default: false },
        helper: { type: Boolean, default: false },
    },
};
</script>

<style></style>
