<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
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
                                            <h3><span>Dialog</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/function/dialog" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Dialog UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>제목</strong> : Dialog 제목(없는경우 빈칸)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>내용</strong> : Dialog 내용(내용필수)</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>제목</strong>
                                                <comp-input-box id="set_title" type="text" v-model="set.title" placeholder="제목" label="제목 입력" style="width: 200px"></comp-input-box>
                                                <strong>내용</strong>
                                                <comp-input-box id="set_txt" type="text" v-model="set.txt" placeholder="내용" label="내용 입력" :minlength="0" style="width: 200px"></comp-input-box>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <div class="ui_brd is-data is-multiline is-size-auto">
                                                <div class="wrap">
                                                    <table>
                                                        <colgroup>
                                                            <col style="width: 150px" />
                                                            <col style="width: 150px" />
                                                            <col style="width: 150px" />
                                                            <col style="width: 150px" />
                                                            <col style="width: 150px" />
                                                        </colgroup>
                                                        <thead>
                                                            <tr>
                                                                <th rowspan="2"><strong>아이콘 종류</strong></th>
                                                                <th colspan="4"><strong>버튼타입</strong></th>
                                                            </tr>
                                                            <tr>
                                                                <th v-for="item in set.btn.opts" :key="item.code">
                                                                    <strong>{{ item.name }}</strong>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="trItem in set.icon.opts" :key="trItem.code">
                                                                <th>
                                                                    <strong>{{ trItem.name }}</strong>
                                                                </th>
                                                                <td v-for="tdItem in set.btn.opts" :key="tdItem.code">
                                                                    <button @click="$store.dispatch(trItem.code, [set.txt, set.title, tdItem.code]).then(message_callback)"><span class="txt">메세지</span></button>
                                                                </td>
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
            </div>
            <!-- // 본문 컨텐츠 -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'funciton-dialog',
    data() {
        return {
            set: {
                title: 'Dialog 제목',
                txt: 'Dialog 내용',
                icon: {
                    opts: [
                        { code: 'DIALOG', name: '-' },
                        { code: 'DIALOG_ERR', name: '에러' },
                        { code: 'DIALOG_WRN', name: '경고' },
                        { code: 'DIALOG_INFO', name: '정보' },
                        { code: 'DIALOG_QST', name: '질문' },
                        { code: 'DIALOG_COM', name: '완료' },
                    ],
                },
                btn: {
                    opts: [
                        { code: 0, name: '확인' },
                        { code: 1, name: '확인/취소' },
                        { code: 2, name: '예/아니오' },
                        { code: 3, name: '예/아니오/취소' },
                    ],
                },
            },
        };
    },
    methods: {
        message_callback: function ($res) {
            console.log('Return  >>  ' + $res);
        },
    },
};
</script>

<style></style>
