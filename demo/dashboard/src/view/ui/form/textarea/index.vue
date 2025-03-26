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
                                            <h3><span>Textarea</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/main/shared/ui/form/textarea" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Textarea - Textarea UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <strong>크기</strong>
                                                        <ul>
                                                            <li>
                                                                <span><strong>글자수</strong> : 가로 크기를 글자수로 지정</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>줄수</strong> : 세로 크기를 줄수로 지정</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>가로</strong> : 가로 크기를 px 지정(설정하게 되면 글자수 무시)</span>
                                                            </li>
                                                            <li>
                                                                <span><strong>세로</strong> : 세로 크기를 px 지정(설정하게 되면 줄수 무시)</span>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <span><strong>입력제외문자</strong> : 입력되지 않고 제외. 이미 입력된 문자는 제거.(공백 넣어서 다수설정 가능)</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>미사용</strong> : 사용할수 없는 상태</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>글자수</strong>
                                                <comp-input-box id="set_cols" type="number" v-model="set.size.cols" placeholder="줄수" label="줄수 입력" style="width: 70px" :disabled="!getRows"></comp-input-box>
                                                <strong>줄수</strong>
                                                <comp-input-box id="set_rows" type="number" v-model="set.size.rows" placeholder="글자수" label="글자수 입력" style="width: 70px" :disabled="!getCols"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>가로</strong>
                                                <comp-input-box id="set_wid" type="number" v-model="set.size.wid" placeholder="가로" label="가로크기 입력" style="width: 70px"></comp-input-box>
                                                <strong>세로</strong>
                                                <comp-input-box id="set_hgt" type="number" v-model="set.size.hgt" placeholder="세로" label="세로크기 입력" style="width: 70px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>입력제외문자</strong>
                                                <comp-input-box id="set_expt_word" type="text" v-model="set.expt" placeholder="입력제외문자" label="입력제외문자 입력" style="width: 200px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap ui_ac">
                                            <comp-textarea id="ta_01" v-model="textareaVal" :cols="getCols" :rows="getRows" :disabled="set.disabled" :forbiddenChars="getForbbiden" :style="getStyle"></comp-textarea>
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
    name: 'component-textarea',
    data() {
        return {
            set: {
                size: {
                    wid: null,
                    hgt: null,
                    cols: 50,
                    rows: 20,
                },
                expt: '',
                disabled: false,
            },
            textareaVal: '',
        };
    },
    computed: {
        getStyle() {
            return (this.getCols ? '' : `width: ${this.set.size.wid ? this.set.size.wid + 'px' : 'auto'};`) + (this.getRows ? '' : `height: ${this.set.size.hgt ? this.set.size.hgt + 'px' : 'auto'};`);
        },
        getCols() {
            return !this.set.size.wid ? this.set.size.cols : null;
        },
        getRows() {
            return !this.set.size.hgt ? this.set.size.rows : null;
        },
        getForbbiden() {
            return this.set.expt.split(' ');
        },
    },
};
</script>

<style></style>
