<template>
    <div id="content">
        <h2 id="page_title" class="ui_invisible">Radio/Group</h2>
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
                                            <h3><span>Radio/Group</span></h3>
                                            <div class="rc_wrap">
                                                <comp-helpbox-btn id="helper_s01" :active="true"></comp-helpbox-btn>
                                            </div>
                                        </div>
                                        <div class="ui_help_box" data-for="helper_s01">
                                            <div class="wrap">
                                                <a href="https://dev.realsn.com/rnd/solution/fe/workspace/ws/-/tree/devel/shared/ui/form/radio" target="_blank" class="reference_lnk">레퍼런스 바로가기</a>
                                                <ul>
                                                    <li>
                                                        <span>Button - Button형 UI 컴포넌트</span>
                                                    </li>
                                                    <li>
                                                        <span><strong>크기</strong> : xsmall, small, normal, large, xlare의 다섯가지 크기 제공</span>
                                                    </li>
                                                    <li>
                                                        <strong>타입</strong>
                                                        <ul>
                                                            <li><strong>기본형</strong> : 기본 라디오 형태</li>
                                                            <li><strong>버튼형</strong> : 버튼형태</li>
                                                            <li><strong>그룹형</strong> : 버튼을 이어놓은 형태</li>
                                                            <li><strong>아이콘 포함</strong> : 아이콘 포함 형태</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong>색상</strong>
                                                        <ul>
                                                            <li><strong>없음</strong> : 기본 화이트/그레이 컬러</li>
                                                            <li><strong>사용자</strong> : colorpicker를 통해 컬러 설정</li>
                                                        </ul>
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
                                                <strong>크기</strong>
                                                <comp-selectbox id="set_size" v-model="set.size.value" :opts="set.size.opts" style="width: 150px"></comp-selectbox>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>타입</strong>
                                                <comp-radio-grp id="set_type" name="btnType" v-model="set.type.value" :opts="set.type.opts" :box="true"></comp-radio-grp>
                                                <comp-switch-btn id="set_type_icon" class="is-small" v-model="set.type.icon" label="아이콘 포함"></comp-switch-btn>
                                            </div>
                                            <hr />
                                            <div class="grp">
                                                <strong>색상</strong>
                                                <comp-radio-grp id="set_color" name="btnColors" v-model="set.colors.value" :opts="set.colors.opts" :box="true"></comp-radio-grp>
                                                <comp-colorpicker v-model="set.colors.fill" :useConfirm="true" :disabled="set.colors.value != 1" />
                                            </div>
                                            <hr />
                                            <comp-switch-btn id="set_disabled" class="is-small" v-model="set.disabled" label="미사용"></comp-switch-btn>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <div class="wrap" style="text-align: center">
                                            <comp-radio-grp id="radio_grp" :class="getSize" v-model="set.datas.values" :opts="getItmes" :btn="set.type.value == 1" :box="set.type.value == 2"></comp-radio-grp>
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
    name: 'component-radio',
    data() {
        return {
            set: {
                datas: {
                    values: '1',
                    value: [],
                    list: [
                        { code: '1', name: '아이템 1' },
                        { code: '2', name: '아이템 2' },
                        { code: '3', name: '아이템 3' },
                        { code: '4', name: '아이템 4' },
                        { code: '5', name: '아이템 5' },
                    ],
                },
                size: {
                    value: 2,
                    opts: [
                        { code: 0, name: 'X-Small', className: 'is-xsmall' },
                        { code: 1, name: 'Small', className: 'is-small' },
                        { code: 2, name: 'Normal', className: '' },
                        { code: 3, name: 'Large', className: 'is-large' },
                        { code: 4, name: 'X-Large', className: 'is-xlarge' },
                    ],
                },
                type: {
                    value: 0,
                    opts: [
                        { code: 0, name: '기본형', className: '' },
                        { code: 1, name: '버튼형', className: 'is-btn' },
                        { code: 2, name: '그룹형', className: 'is-box' },
                    ],
                    icon: false,
                },
                colors: {
                    value: 0,
                    opts: [
                        { code: 0, name: '없음', className: 'is-color-hl' },
                        { code: 1, name: '사용자', className: '' },
                    ],
                    fill: '#527EB8',
                },
                disabled: false,
            },
        };
    },
    computed: {
        getItmes() {
            const result = JSON.parse(JSON.stringify(this.set.datas.list));
            return result.map((item) => {
                if (this.set.type.icon) item.before = '&#xe075;';
                if (this.set.disabled) item.disabled = true;
                if (this.set.colors.value == 1) item.color = this.set.colors.fill;
                return item;
            });
        },
        getSize() {
            return this.set.size.opts.find((opt) => opt.code == this.set.size.value)?.className;
        },
        getType() {
            return this.set.type.opts.find((opt) => opt.code == this.set.type.value)?.className;
        },
    },
};
</script>

<style></style>
