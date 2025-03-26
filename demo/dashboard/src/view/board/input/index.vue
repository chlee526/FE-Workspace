<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">asdasd</h2>
        <div class="wrap">
            <!-- Location -->
            <comp-location></comp-location>
            <!-- // Location -->

            <!-- 본문 컨텐츠 -->
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>기본</span></h3>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd_input">
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 200px" />
                                                        <col />
                                                        <col style="width: 100px" />
                                                        <col />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th><strong>제목</strong></th>
                                                            <td><comp-input-box id="inputbox_01" class="is-wid100p" v-model="input_01" placeholder="입력하세요." label="입력창"></comp-input-box></td>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>2018-01-01 00:00:00</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>알에스엔</span></td>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>2018-01-01 00:00:00</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>알에스엔</span></td>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>2018-01-01 00:00:00</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>탭</span></h3>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="lc">
                                            <button type="button" class="ui_btn"><span class="txt">버튼</span></button>
                                        </div>
                                        <div class="rc">
                                            <button type="button" class="ui_btn"><span class="txt">버튼</span></button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="ui_brd_input">
                                            <div class="tab">
                                                <!-- 게시판 탭 -->
                                                <comp-tab id="board_tab" class="is-board" :opts="tabOpts" v-model="tabIdx"></comp-tab>
                                                <!-- // 게시판 탭 -->
                                            </div>
                                            <div class="wrap">
                                                <table>
                                                    <colgroup>
                                                        <col style="width: 200px" />
                                                        <col />
                                                        <col style="width: 100px" />
                                                        <col />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <th><strong>제목</strong></th>
                                                            <td><comp-input-box id="inputbox_01" class="is-wid100p" v-model="input_01" placeholder="입력하세요." label="입력창"></comp-input-box></td>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>2018-01-01 00:00:00</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>알에스엔</span></td>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>2018-01-01 00:00:00</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>알에스엔</span></td>
                                                            <th><span>알에스엔</span></th>
                                                            <td><span>2018-01-01 00:00:00</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'page-board-input',
    data() {
        return {
            input_01: '',
            tabOpts: [
                { value: '1', name: 'Board Tab 1' },
                { value: '2', name: 'Board Tab 2' },
                { value: '3', name: 'Board Tab 3' },
            ],
            tabIdx: 1,
            topSearchInputDatas: {},
            topSearchDatas: {},
        };
    },
};
</script>

<style></style>
