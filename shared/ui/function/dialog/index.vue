<template>
    <transition name="fade_scale">
        <section id="msg_box" v-if="open">
            <div class="wrap">
                <div class="bg"></div>
                <div class="box">
                    <div class="icons" v-if="mType != undefined">
                        <span v-if="mType == 'error'" class="icon_error"></span>
                        <span v-if="mType == 'warning'" class="icon_warning"></span>
                        <span v-if="mType == 'info'" class="icon_info"></span>
                        <span v-if="mType == 'question'" class="icon_question"></span>
                        <span v-if="mType == 'complete'" class="icon_complete"></span>
                    </div>
                    <h2 class="title" v-if="title" v-html="title"></h2>
                    <div class="txts" :class="{ alone: mType == undefined }" v-if="txt"><span v-html="txt"></span></div>
                    <div class="btns">
                        <button ref="btn_0" type="button" class="ui_btn is-large is-color-hl" v-if="btnType == 0 || btnType == 1" @click="evt_click(0)"><span>확인</span></button>
                        <button ref="btn_1" type="button" class="ui_btn is-large is-color-hl" v-if="btnType == 2 || btnType == 3" @click="evt_click(2)"><span>예</span></button>
                        <button ref="btn_2" type="button" class="ui_btn is-large" v-if="btnType == 2 || btnType == 3" @click="evt_click(3)"><span>아니요</span></button>
                        <button ref="btn_3" type="button" class="ui_btn is-large" v-if="btnType == 1 || btnType == 3" @click="evt_click(1)"><span>취소</span></button>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
import EventBus from '@shared/utils/eventBus';
export default {
    name: 'comp-dialog',
    data() {
        return {
            stack: [],
            open: false,
            aniChk: false,
            title: '',
            txt: '',
            mType: NaN,
            btnType: 0,
            func: null,
            focusBtn: null,
        };
    },
    props: [],
    computed: {},
    created() {
        EventBus.$on('msgMngr', this.send);
        EventBus.$on('msgMngr.destroy', this.destroy);
    },
    watch: {
        $route(to, from) {
            if (this.open) {
                this.open = false;
                this.stack = [];
            }
        },
        open($type) {
            this.$nextTick(() => {
                this.aniChk = true;
                /*
					if( $type ){
						$( this.$el ).find( ".box" ).css( { "margin-top": ( -$( this.$el ).find( ".box" ).outerHeight() / 2 ) + 50,  "margin-left": ( -$( this.$el ).find( ".box" ).outerWidth() / 2 ) } );
						$( this.$el ).find( ".box" ).animate( { "margin-top" : -$( this.$el ).find( ".box" ).outerHeight() / 2 }, 400, "easeOutQuad", function(){
							_this.aniChk = false;
							$( "#msg_box button" ).eq( 0 ).focus();
						});
					} else {
						$( this.$el ).find( ".box" ).animate( { "margin-top" : ( -$( this.$el ).find( ".box" ).outerHeight() / 2 ) - 50 }, 300, "easeOutQuad", function(){
							_this.aniChk = false;
							_this.remove();
						});
                    }
                    */

                // 버튼 자동 포커스
                if (this.$refs[this.focusBtn]) this.$refs[this.focusBtn].focus();
            });

            if ($type) {
                document.querySelector('#wrap').classList.add('is-blured');
            } else {
                document.querySelector('#wrap').classList.remove('is-blured');
                this.remove();
            }
        },
    },
    methods: {
        send($txt, $title, $mType, $btnType, $func, $focusBtn) {
            $focusBtn = $focusBtn ? $focusBtn : $btnType == 0 || $btnType == 1 ? 0 : 1;

            const stackData = {};
            stackData.txt = $txt;
            stackData.title = $title;
            stackData.btnType = $btnType ? $btnType : 0;
            stackData.mType = $mType;
            stackData.func = $func;
            stackData.focusBtn = 'btn_' + $focusBtn;
            this.stack.push(stackData);
            if (!this.open) this.stackChk();
        },
        openMBox() {
            this.title = this.stack[0].title;
            this.txt = this.stack[0].txt;
            this.btnType = this.stack[0].btnType;
            this.mType = this.stack[0].mType;
            this.func = this.stack[0].func;
            this.focusBtn = this.stack[0].focusBtn;

            this.open = true;
        },
        stackChk() {
            if (this.stack.length > 0) this.openMBox();
        },
        remove() {
            this.stack.shift();
            this.stackChk();
        },
        destroy() {
            this.stack = [];
        },
        evt_click($val) {
            this.open = false;
            if (this.func) this.func($val);
        },
    },
};
</script>
