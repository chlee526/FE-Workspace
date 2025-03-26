<template>
    <div class="appContainerWrap">
        <div id="container" class="page-login">
            <div id="content">
                <div class="login">
                    <form ref="frm_login" class="wrap" method="post" action="../layout/layout.jsp">
                        <h2 id="page_title">Member Login</h2>
                        <div class="inputs">
                            <div class="id">
                                <strong class="title">ID</strong>
                                <comp-input-box ref="inputbox_id" id="inputbox_id" class="is-xlarge is-wid100p" v-model="memberInfo.id" label="ID 입력" @keyup="hndl_login" disabled-reset></comp-input-box>
                            </div>
                            <div class="pw">
                                <strong class="title">PW</strong>
                                <comp-input-box ref="inputbox_pw" type="password" id="inputbox_pw" class="is-xlarge is-wid100p" v-model="memberInfo.pw" label="PW 입력" @keyup="hndl_login"></comp-input-box>
                            </div>
                            <div class="result">{{ validateMsg }}</div>
                        </div>
                        <div class="btns">
                            <button ref="btnLogin" type="button" @click.stop="hndl_login" class="ui_btn is-color-hl is-xlarge is-wid100p">
                                <strong class="txt">Login</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import EventBus from '@shared/utils/eventBus';
import { getAccessToken, removeAccessToken, removeRefreshToken, removeIsPwdCertify, getIsPwdCertify, getRefreshToken, removeScrollPositionY, setScrollPositionY, getUserNo, removeUserNo } from '@shared/utils/auth';
export default {
    name: 'LoginPage',
    data() {
        return {
            memberInfo: {
                id: '',
                pw: '',
                ignrPusr: false,
            },
            isDialogOpen: false,
            btnDisabled: true,
            validateMsg: '',
        };
    },
    created() {
        if (getAccessToken() || getRefreshToken() || getUserNo()) {
            this.$store.commit('user/SET_ACCESS_TOKEN', '');
            this.$store.commit('user/SET_REFRESH_TOKEN', '');
            this.$store.commit('user/SET_IS_PWD_CERTIFY', '');

            removeAccessToken();
            removeUserNo();
            removeRefreshToken();
            removeIsPwdCertify();
        }
        //로그인 페이지 이동 시 y 좌표 초기화처리
        this.$store.commit('setting/SET_SCROLL_POSITION_Y', '');
        removeScrollPositionY();
    },
    mounted() {
        this.$nextTick(() => {
            // this.$refs.btnLogin.focus();
            // this.$refs.inputbox_id.$el.querySelector('input').focus();
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            });

            if (process.env.VUE_APP_LOGIN_ID && process.env.VUE_APP_LOGIN_PW) {
                this.memberInfo.id = process.env.VUE_APP_LOGIN_ID;
                this.memberInfo.pw = process.env.VUE_APP_LOGIN_PW;
            }

            document.querySelector('#wrap').dispatchEvent(clickEvent);
        });
    },
    watch: {
        memberInfo: {
            deep: true,
            handler: function ($val) {
                if ($val.id.trim().length && $val.pw.trim().length) this.btnDisabled = false;
                else this.btnDisabled = true;
                this.validateMsg = '';
            },
        },
    },
    methods: {
        validate() {
            // ID 입력 체크
            if (this.memberInfo.id.trim() == '') {
                // EventBus.$emit('msgMngr', 'ID가 입력되지 않았습니다.', '', 'error', 0, () => {
                //     $(this.$refs.inputbox_id.$el).find('input').focus();
                // });
                this.validateMsg = 'ID가 입력되지 않았습니다.';
                return false;
            }
            // PW 입력 체크
            if (this.memberInfo.pw.trim() == '') {
                // EventBus.$emit('msgMngr', 'PASSWORD가 입력되지 않았습니다.', '', 'error', 0, () => {
                //     $(this.$refs.inputbox_pw.$el).find('input').focus();
                // });
                this.validateMsg = '비밀번호가 입력되지 않았습니다.';
                return false;
            }
            if (this.memberInfo.pw.trim().length < parseInt(process.env.VUE_APP_PW_CHARACTERS)) {
                // EventBus.$emit('msgMngr', 'PASSWORD가 입력되지 않았습니다.', '', 'error', 0, () => {
                //     $(this.$refs.inputbox_pw.$el).find('input').focus();
                // });
                this.validateMsg = '비밀번호 양식이 맞지 않습니다.';
                return false;
            }
            return true;
        },

        async hndl_login() {
            if (!this.validate()) return;

            await this.$store
                .dispatch('user/LOGIN', {
                    id: this.memberInfo.id,
                    pw: this.memberInfo.pw,
                    ignrPusr: this.memberInfo.ignrPusr,
                })
                .then((res) => {
                    if (getAccessToken()) {
                        // Token이 있거나, user_no가 있으면 로그인 완료
                        if (process.env.VUE_APP_USEAGE_FIRST_PW_SET == 'true' && !getIsPwdCertify()) {
                            // 설정에서 처음 사용자 비밀번호 변경이 사용상태이고, 로그인정보에서 비밀번호를 변경한 이력이 없다면 비밀번호 변경 페이지로 이동
                            this.$router.push({ path: '/view/member/pass' }).catch(() => {});
                        } else {
                            // 위 조건과 상반되어, root로 진입
                            this.$router.push({ path: '/' }).catch(() => {});
                        }
                    } else {
                        // 로그인버튼 연타 방지
                        document.querySelector('#inputbox_id').blur();
                        document.querySelector('#inputbox_pw').blur();
                        let msg = '';
                        if (res.data.error_code == -2) {
                            msg = '아이디 또는 비밀번호가 잘못 되었습니다.';
                        } else if (res.data.error_code == -3) {
                            msg = '아이디 또는 비밀번호가 잘못 되었습니다.';
                        } else if (res.data.error_code == -4) {
                            msg = '아이디 또는 비밀번호가 잘못 되었습니다.';
                        }
                        this.validateMsg = msg;
                        // if (res.data.error_code) EventBus.$emit('msgMngr', msg, '', 'error', 0);
                    }
                })
                .catch((err) => {
                    // 로그인버튼 연타 방지
                    document.querySelector('#inputbox_id').blur();
                    document.querySelector('#inputbox_pw').blur();
                    if (err.response.status == '300') {
                        this.$store
                            .dispatch('DIALOG_WRN', [`동일 아이디 사용자가 존재합니다.<br/>기존 사용자를 강제 로그아웃 후 로그인하시겠습니까?`, '', 2])
                            .then((res) => {
                                this.memberInfo.ignrPusr = true;
                                this.hndl_login();
                            })
                            .catch((err) => {
                                this.memberInfo.ignrPusr = false;
                            });
                    }
                });
        },
    },
};
</script>

<style lang="scss">
@import './style.scss';
</style>
