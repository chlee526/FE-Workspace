<template>
    <div style="position: relative" class="set_header_environment">
        <button ref="userLabel" class="ui_btn is-small is-icon-only" title="환경설정" :class="{ 'is-active': active }" @click="active = !active">
            <span class="icon">&#xe057;</span>
        </button>
        <transition :name="!getUseageLNB ? 'fade_posy' : 'fade_posx'">
            <div v-if="active" class="pass_mdfy" :style="`left: ${getUseageLNB ? '50%' : 'auto'}; margin-left: ${userLabelWid / 2 + 10}px`" v-click-outside="evt_docClick">
                <span class="arrow" :style="getArrowStyle"></span>
                <strong>
                    환경 설정
                    <button class="ui_btn is-xsmall is-icon-only" title="초기화" @click="resetSetting">
                        <span class="icon">&#xe020;</span>
                    </button>
                </strong>

                <template v-if="getEnvUseageLNB">
                    <h3>LNB/GNB 설정</h3>
                    <comp-radio-grp
                        id="lnb_gnb_radio"
                        class="is-small"
                        name="lnb_gnb_radio"
                        :opts="[
                            { code: true, name: 'LNB' },
                            { code: false, name: 'GNB' },
                        ]"
                        v-model="set.useLNB"
                        box></comp-radio-grp>
                    <hr />
                </template>

                <h3>색상 설정</h3>
                <ul>
                    <li>
                        <span>- <strong>primary : </strong> 헤더 그라디언트 색상1, LNB 헤더 메뉴 active</span>
                    </li>
                    <li>
                        <span>- <strong>secondary : </strong> 헤더 그라디언트 색상2</span>
                    </li>
                    <li>
                        <span>- <strong>tertiary : </strong> 포인트 컬러, GNB 헤더 서브메뉴 active, ui_box 헤더 before</span>
                    </li>
                </ul>
                <table>
                    <tr>
                        <th>primary</th>
                        <th>secondary</th>
                        <th>tertiary</th>
                    </tr>
                    <tr>
                        <td><comp-colorpicker v-model="set.primary" setPosition :useConfirm="false" /></td>
                        <td><comp-colorpicker v-model="set.secondary" setPosition :useConfirm="false" /></td>
                        <td><comp-colorpicker v-model="set.tertiary" setPosition :useConfirm="false" /></td>
                    </tr>
                </table>
                <div class="btns">
                    <button type="button" @click="active = false" class="ui_btn"><span>닫기</span></button>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getItemLocalStorage, setItemLocalStorage } from '@shared/utils/localStorage';
import { setPrimaryColor, setSecondaryColor, setTertiaryColor } from '@shared/utils/prototype/util.colors';

export default {
    name: 'comp-header_environment_set',
    data() {
        return {
            active: false,
            userLabelWid: 0,
            set: {
                primary: '',
                secondary: '',
                tertiary: '',
                useLNB: null,
            },
        };
    },
    created() {
        const data = getItemLocalStorage('headerSetting');
        if (data) {
            Object.keys(data).forEach((key) => {
                if (key !== 'useLNB') {
                    this.set[key] = data[key] ? data[key] : this.getColors(`--${key}`);
                } else {
                    this.set[key] = data[key] !== null ? data[key] : this.getDefaultHeader;
                }
            });
        } else {
            this.setDefaultSetting();
        }
    },
    watch: {
        set: {
            deep: true,
            handler(val) {
                const saveData = structuredClone(val);
                if (!this.getEnvUseageLNB) delete saveData.useLNB;
                setItemLocalStorage('headerSetting', saveData);
            },
        },
        'set.primary'(newVal, oldVal) {
            if (newVal !== oldVal) {
                setPrimaryColor(newVal);
            }
        },
        'set.secondary'(newVal, oldVal) {
            if (newVal !== oldVal) {
                setSecondaryColor(newVal);
            }
        },
        'set.tertiary'(newVal, oldVal) {
            if (newVal !== oldVal) {
                setTertiaryColor(newVal);
            }
        },
        'set.useLNB'(val) {
            this.$store.commit('setting/SET_USEAGELNB', val);
        },
        active(val) {
            if (this.userLabelWid == 0 && val) {
                this.userLabelWid = this.$refs.userLabel.offsetWidth;
            }
        },
    },
    computed: {
        ...mapGetters(['getUseageLNB', 'getUseageDefaultGNB']),
        /**
         * 헤더 레이아웃 GNB/LNB
         * false : GNB
         * true: LNB
         */
        getDefaultHeader() {
            if (this.getUseageDefaultGNB) {
                return false;
            }

            return this.getEnvUseageLNB;
        },
        getArrowStyle() {
            return 'right: ' + (this.userLabelWid / 2 + 9) + 'px';
        },
        // env에서 LNB사용 설정
        // 개인화로 store의 getUseageLNB를 수정할 수 있기때문에 별도로 다시 가져오기
        getEnvUseageLNB() {
            return process.env.VUE_APP_USEAGE_LNB === 'true';
        },
    },
    methods: {
        setDefaultSetting() {
            this.set.useLNB = this.getDefaultHeader;
            this.set.primary = this.getColors('--primary');
            this.set.secondary = this.getColors('--secondary');
            this.set.tertiary = this.getColors('--tertiary');
        },
        setProperty(key, value) {
            document.querySelector(':root').style.setProperty(key, value);
        },
        getColors(propertyName) {
            return getComputedStyle(document.querySelector(':root')).getPropertyValue(propertyName);
        },
        evt_docClick() {
            if (this.active) this.active = false;
        },
        resetSetting() {
            this.set.useLNB = this.getDefaultHeader;
            this.set.primary = '#7487e5';
            this.set.secondary = '#52beba';
            this.set.tertiary = '#52beba';
        },
    },
};
</script>
