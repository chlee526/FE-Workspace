<template>
    <div v-if="getUseage" id="locator" class="ui_location" :class="{ 'is-no-topsearchs': !topSearchEnabled }">
        <div class="wrap">
            <div class="inner_wrap">
                <!-- <TransitionGroup name="breadcrumb"> -->
                <router-link :to="item.url" class="item ui_lnk" v-for="item in getCurGnbLocation" :key="`${item.name}_${item.url}`">
                    <span class="txt">{{ item.name }}</span>
                </router-link>
                <!-- </TransitionGroup> -->
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: 'comp-breadcrumb',
    data() {
        return {
            topSearchEnabled: true,
            curLocs: [
                { name: 'name_1', url: 'url_1' },
                { name: 'name_2', url: 'url_2' },
            ],
        };
    },
    computed: {
        getUseage() {
            return process.env.VUE_APP_USEAGE_LOCATOR === 'true' && !this.getUseageLNB;
        },
        ...mapGetters(['getRoutes', 'getUseageLNB']),
        currPath() {
            return this.$route.path;
        },
        getCurGnbLocation() {
            let curGnbLocation = [];
            this.getRoutes.filter((item) => {
                if (item.children) {
                    item.children.filter((item2) => {
                        if (item2.url === this.currPath) {
                            curGnbLocation.push(item);
                            curGnbLocation.push(item2);
                        }
                    });
                } else {
                    if (item.url === this.currPath) {
                        curGnbLocation.push(item);
                    }
                }
            });
            return curGnbLocation;
        },
    },
    mounted() {
        const top_searchs = document.querySelector('.top_searchs');
        if (!top_searchs) {
            this.topSearchEnabled = false;
        }
    },
    methods: {},
};
</script>
