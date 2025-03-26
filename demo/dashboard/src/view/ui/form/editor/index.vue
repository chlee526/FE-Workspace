<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible"></h2>
        <div class="wrap">
            <comp-location></comp-location>
            <div class="contents">
                <div class="wrap">
                    <div class="ui_row">
                        <div class="wrap">
                            <div class="ui_col">
                                <div class="ui_box">
                                    <div class="header">
                                        <div class="wrap">
                                            <h3><span>에디터</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/editor" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <strong>Editor UI 컴포넌트</strong>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>기본(Basic)</strong> : vue-quill-editor</li>
                                                            <li><strong>Jodit</strong> : Jodit Editor</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>색상</strong>
                                                        <ul>
                                                            <li><strong>기본(Basic)</strong> : ToolBar 배경색 변경</li>
                                                            <li><strong>Jodit</strong> : ToolBar 배경/글자 색 변경</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>PlaceHolder</strong>
                                                        <ul>
                                                            <li>Place Holder 값 유무에 따라 적용 처리</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>Style (크기, 색상 등) 관련 사항</strong>
                                                        <ul>
                                                            <li>두 에디터 타입 모두 인라인 스타일 적용 가능</li>
                                                            <li>크기(가로, 세로)는 인라인 스타일 전달 , 색상(글자색, 배경색)은 toolOpts 으로 객체 {color : 글자색, background : 배경색} 전달</li>
                                                            <li>이 외 상세 스타일링 설정은 클래스 별 설정 된 css 강제 수정</li>
                                                            <li>기본 높이 값 300px , 기본 최소 높이 300px, 기본 최소 넓이 500px</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui_function">
                                        <div class="rc">
                                            <div class="grp">
                                                <strong>크기</strong>
                                                <comp-input-box id="set_width" type="number" v-model="set.size.width" placeholder="가로(px)" label="가로크기 입력" min="50" style="width: 90px"></comp-input-box>

                                                <comp-input-box id="set_height" type="number" v-model="set.size.height" placeholder="세로(px)" label="세로크기 입력" min="50" style="width: 90px"></comp-input-box>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>배경색</strong>
                                                <comp-colorpicker v-model="set.colors.fill" :color.sync="set.colors.fill" :useConfirm="true" />
                                                <strong>색상</strong>
                                                <comp-colorpicker v-model="set.colors.color" :color.sync="set.colors.color" :useConfirm="true" :disabled="set.type.value == 0" />
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>placeholder</strong>
                                                <comp-input-box v-model="placeholder"></comp-input-box>
                                            </div>
                                            <hr />
                                            <comp-button @click="evt_click">적용</comp-button>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap">
                                            <comp-editor v-if="set.type.value === 0" ref="editor_1" key="demo_1" id="demo" v-model="inputData" :placeholder="basicPlaceHolder" :toolOpts="editStyle" :style="editStyle"></comp-editor>

                                            <comp-editor v-else ref="joditEditor" key="demo_2" id="demo_2" v-model="inputData" jodit :placeholder="basicPlaceHolder" :toolOpts="editStyle" :style="editStyle"></comp-editor>
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
</template>

<script>
export default {
    name: 'EditorPage',

    data() {
        return {
            set: {
                size: {
                    width: null,
                    height: 300,
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '기본(Basic)' },
                        { code: 1, name: 'Jodit' },
                    ],
                    wid: null,
                },
                colors: {
                    color: null,
                    fill: null,
                },
            },
            basicColor: null,
            basicBackground: null,
            basicWidth: null,
            basicHeight: 300,
            basicPlaceHolder: '',

            inputData: '',
            placeholder: '',
        };
    },

    computed: {
        editStyle() {
            return { width: this.basicWidth + 'px', height: this.basicHeight + 'px', background: this.basicBackground, color: this.basicColor };
        },
    },
    mounted() {},
    watch: {},

    methods: {
        evt_click() {
            this.basicBackground = this.set.colors.fill;
            this.basicColor = this.set.colors.color;

            this.basicWidth = this.set.size.width;
            this.basicHeight = this.set.size.height;

            this.basicPlaceHolder = this.placeholder;
        },
    },
};
</script>

<style lang="scss" scoped></style>
