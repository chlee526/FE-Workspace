<template>
    <div class="ui_list">
        <slot name="list"></slot>
    </div>
</template>

<script>
export default {
    name: 'comp-list',
    data() {
        return {};
    },
};
</script>

<style lang="scss" scope>
.ui_list {
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 2px;
    padding: 5px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
    overflow-y: auto;

    > *,
    > * > * {
        > .title {
            .btn_del {
                position: absolute;
                top: 0;
                right: 0;
                width: 0;
                height: 100%;
                overflow: hidden;
                text-align: left;
                text-indent: -9999px;
                @include opacity(0);
                @include transition(0.12, 0);

                &:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    @include backgroundAlpha(#666, 1);
                }

                &:after {
                    content: '\e019';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 16px;
                    height: 16px;
                    margin: -8px 0 0 -8px;
                    font-family: 'icomoon';
                    color: #fff;
                    font-size: 10px;
                    line-height: 16px;
                    text-align: center;
                    text-indent: 0;
                }
            }

            &:hover {
                .btn_del {
                    width: 22px;
                    @include opacity(1);
                    @include transition(0.12, 0.5);
                }
            }
        }
    }

    &[disabled],
    &.is-disabled {
        cursor: default;

        > * {
            .title {
                border: 1px solid #c4c4c4 !important;
                background: #d9d9d9 !important;
                color: #afafaf !important;
                @include shadow(0, 0, 0, 0, 0, 0, 0);
            }
        }

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
}
</style>
