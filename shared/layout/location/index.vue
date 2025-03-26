<template>
    <CompBreadCrumb>
        <template v-slot:default>
            <slot></slot>
        </template>
    </CompBreadCrumb>
</template>

<script>
/**
 * 2025-01-16
 * breadcrumb로 컴포넌트 대체
 */
import CompBreadCrumb from '@shared/layout/breadcrumb/index.vue';

export default {
    name: 'comp-location',
    data() {
        return {};
    },
    components: {
        CompBreadCrumb,
    },
};
</script>
