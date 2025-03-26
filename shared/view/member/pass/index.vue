<template>
    <div class="appContainerWrap">
        <div id="container" class="page-pass">
            <div id="content">
                <div class="pass">
                    <div class="wrap">
                        <h2 id="page_title">비밀번호 설정</h2>
                        <div class="user_info">
                            <strong>{{ $store.getters.getUser.id }}</strong>
                            비밀번호 변경
                        </div>
                        <div class="inputs">
                            <comp-input-box ref="inputbox_pw" type="password" id="inputbox_pw" name="inputbox_pw" class="is-xlarge is-wid100p" v-model="memberInfo.pw" label="비밀번호 입력" placeholder="신규 비밀번호" @keyup="hndl_passSet" @blur="validate"></comp-input-box>
                            <comp-input-box ref="inputbox_pwChk" type="password" id="inputbox_pwChk" name="inputbox_pwChk" class="is-xlarge is-wid100p" v-model="memberInfo.pwChk" label="비밀번호 확인 입력" placeholder="신규 비밀번호 확인" @keyup="hndl_passSet" @blur="validate"></comp-input-box>
                            <div class="result">{{ validateMsg }}</div>
                        </div>
                        <div class="btns">
                            <button type="button" @click.stop="hndl_passSet" class="ui_btn is-color-hl is-xlarge is-wid100p" :disabled="getBtnValidate">
                                <strong class="txt">변경</strong>
                            </button>
                        </div>
                    </div>
                    <div class="txts">
                        <p>※ 비밀번호 변경은 대시보드 상단 메뉴에서도 가능합니다.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
export default {
    name: 'Member-pass',
    data() {
        return {
            memberInfo: {
                pw: '',
                pwChk: '',
            },
            validateMsg: '',
        };
    },
    computed: {
        getBtnValidate() {
            return this.memberInfo.pw.trim() == '' || this.memberInfo.pwChk.trim() == '' || this.memberInfo.pw.trim() != this.memberInfo.pwChk.trim();
        },
    },
    watch: {
        memberInfo: {
            deep: true,
            handler: function ($val) {
                if ($val.pw.trim().length > 0 && $val.pwChk.trim().length) this.validateMsg = '';
            },
        },
    },
    methods: {
        validate() {
            if (this.memberInfo.pw.trim() == '' || this.memberInfo.pwChk.trim() == '') return false;

            if (this.memberInfo.pw != this.memberInfo.pwChk) {
                this.validateMsg = '입력하신 비밀번호가 다릅니다.';
                return false;
            }
            return true;
        },
        async hndl_passSet() {
            if (!this.validate()) return false;

            $(this.$refs.inputbox_pw).blur();
            $(this.$refs.inputbox_pwChk).blur();

            await this.$store
                .dispatch('user/FIRST_SET_PW', {
                    pw: this.memberInfo.pw,
                })
                .then((res) => {
                    // if (res.data.error_code) {
                    //     console.log('error');
                    //     return false;
                    // }

                    this.$router.push({ path: '/' });
                })
                .catch((err) => {
                    this.$store.dispatch('DIALOG_ERR', [`비밀번호 변경에 실패했습니다. 문제가 지속 될 경우 관리자에게 문의하세요.`, '에러', 0]).then((res) => {});
                });
        },
    },
};
</script>

<style>
@import './style.scss';
</style>
