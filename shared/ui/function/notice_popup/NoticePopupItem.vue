<template>
    <section v-if="popupData && !popupData.hide && cookieChk" id="notice_popup" class="notice_popup_item" :class="{ img_load: !imgError && !visibleChk }">
        <div v-if="popupData.content_title" class="header">
            <div class="wrap">
                <h2>{{ popupData.content_title }}</h2>
            </div>
        </div>

        <div v-if="!popupData?.content && popupData?.content_img" class="content_img" :class="{ 'is-no-image': imgError }" :style="getPopupSize">
            <a v-if="popupData?.image_link" :href="popupData.image_link" target="_blank">
                <img :src="imageData" @error="setImageError" />
            </a>
            <img v-else :src="imageData" @error="setImageError" />
        </div>
        <div v-else id="editor" class="contents ql-container ql-snow" :style="getPopupSize">
            <div class="ql-editor" v-html="popupData.content"></div>
        </div>

        <div class="footer">
            <comp-checkbox label="오늘 하루 그만보기" :id="getChkBoxId" v-model="closeDayChk"></comp-checkbox>
            <comp-button class="close_btn" @click="evt_close"><span class="txt">닫기</span></comp-button>
        </div>
    </section>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'comp-notice-popup-item',
    data() {
        return {
            closeDayChk: false,
            imageData: '',
            imgError: false,
            imgLoadChk: false,
            visibleChk: false,
        };
    },

    props: {
        popupData: { type: Object },
    },

    computed: {
        getPopupSize() {
            let wid = this.popupData.size?.split(',')[0];
            let hgt = this.popupData.size?.split(',')[1];

            return {
                width: wid + 'px',
                height: hgt + 'px',
            };
        },
        cookieChk() {
            if (Cookies.get(`popup_close_day_${this.popupData?.seq}`) == 'true') return false;
            return true;
        },

        getChkBoxId() {
            return `closeChk_${this.popupData?.seq}`;
        },
    },

    watch: {
        $route(to, from) {
            // 탭 이동시 팝업의 위치를 잡기 위해 라우트 이동후 setPosition 실행
            if (to.path != from.path) {
                setTimeout(() => {
                    this.setPosition();
                }, 20);
            }
        },

        imgLoadChk(val) {
            this.visibleChk = true;
        },
    },

    methods: {
        evt_close() {
            if (this.closeDayChk) {
                Cookies.set(`popup_close_day_${this.popupData?.seq}`, true, { expires: 1, path: '/' });
                this.$store.dispatch('NOTICE_POPUP_CLOSE', this.popupData.seq);
            } else {
                this.$store.dispatch('NOTICE_POPUP_CLOSE', this.popupData.seq);
            }
        },

        setPosition() {
            const noticeItems = document.querySelectorAll('#notice_popup');
            let hgtArr = [];
            if (noticeItems.length > 1) {
                for (let i = 0; i < noticeItems.length; i++) {
                    const prevItem = noticeItems[i - 1];
                    const curItem = noticeItems[i];
                    if (i < 3) {
                        const leftPosition = prevItem ? prevItem.offsetLeft + prevItem.clientWidth + 10 : 0;
                        curItem.style.left = leftPosition + 'px';
                        hgtArr.push(curItem.clientHeight);
                    } else if (i >= 3) {
                        const leftPosition = i > 3 ? prevItem.offsetLeft + prevItem.clientWidth + 10 : 0;
                        let maxHgt = Math.max(...hgtArr);
                        curItem.style.top = maxHgt + 10 + 'px';
                        curItem.style.left = leftPosition + 'px';
                    }
                }
            }
        },

        loadImageData() {
            if (!this.popupData?.content && this.popupData?.content_img) {
                const image = new Image();
                image.src = this.popupData.content_img;
                image.onload = () => {
                    this.imageData = image.src;
                    this.imgLoadChk = true;
                    this.imgError = false;
                };
            } else {
                this.visibleChk = true;
            }
        },

        setImageError() {
            this.imgError = true;
        },
    },

    created() {
        this.loadImageData();
    },

    mounted() {
        this.setPosition();
    },
};
</script>

<style lang="scss" scoped></style>
