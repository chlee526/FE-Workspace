<template>
    <textarea class="jodit-editor" :id="`jodit_editor_${id}`"></textarea>
</template>

<script>
import 'jodit/es2021/jodit.min.css';
import { Jodit } from './jodit.min.js'; //gs리테일 jodit editor 사용

export default {
    name: 'comp-jodit-editor',
    data() {
        return {
            editor: null,
            updateContent: true,
            styleAttribute: null,
            observer: null,
        };
    },
    props: {
        id: { type: String, default: '' },
        value: { type: String, required: true },
        placeholder: {
            type: String,
            default: '',
        },
        addFonts: { type: Array, default: null },
        // sticky 기준
        toolbarStickyOffset: {
            type: Number,
            default: 0,
        },
    },

    computed: {
        /**
         * jodit editor 기본 옵션 config
         * https://xdsoft.net/jodit/ 에서 확인 가능
         */
        joditConfig() {
            return {
                uploader: {
                    insertImageAsBase64URI: true,
                    defaultHandlerSuccess: function (data, resp) {
                        var i,
                            field = 'files';

                        const _this = this.jodit ?? this;
                        if (data[field] && data[field].length) {
                            for (i = 0; i < data[field].length; i += 1) {
                                _this.events.fire('setUpdateContent', true);
                                _this.s.insertImage(data.baseurl + data[field][i]);
                            }
                        }
                    },
                },
                language: 'ko',
                showPlaceholder: false,
                allowResizeY: false,
                enter: 'P',
                sourceEditor: 'area',
                disablePlugins: 'preview,add-new-line,video,about,clean-html,file,class-span,fullsize,print,ai-assistant,copyformat,symbols',
                hidePoweredByJodit: true,
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                showCharsCounter: false,
                showWordsCounter: false,

                events: {
                    afterInit: (e) => {
                        // 이벤트 설정 영역
                    },
                },
            };
        },

        /**
         * custom jodit editor
         * 외부 props 값에 맞춰서 옵션 변경 및 스타일 적용
         */
        editorConfig() {
            let config = Object.assign({}, this.joditConfig);

            if (this.placeholder) {
                config.showPlaceholder = this.placeholder.length;
                config.placeholder = this.placeholder;
            }

            // 인라인 스타일 적용
            config = { ...config, ...this.styleConfig };

            // content 내부 스타일
            config.style = {
                // color: this.styleConfig.color,
                // background: this.styleConfig.background,
            };

            // css 변수 선언
            config.styleValues = {
                // 'color-background-default': this.styleConfig.background, // content 배경
                // 'color-border': this.styleConfig.background, // 에디터 border 색깔
                'color-panel': this.styleConfig.background, // tool 배경색
                'color-icon': this.styleConfig.color, // tool icon
            };

            this.toolbarStickyOffset && (config.toolbarStickyOffset = this.toolbarStickyOffset);

            // 버튼 커스텀 추가 하고싶을 때 예시
            // let button = [
            //     ...Jodit.defaultOptions.buttons,
            //     {
            //         icon: 'brush',
            //         name: '삭제',
            //         tooltip: '내용을 모두 삭제합니다',
            //         exec: (t, e, n) => {
            //             console.log(t, e, n);
            //         },
            //     },
            // ];

            // config.buttons = button;

            let customButton = ['bold', 'italic', 'underline', 'strikethrough', '|', 'ul', 'ol', 'indent', 'outdent', '|', 'font', 'brush', 'fontsize', 'paragraph', 'lineHeight', '|', 'superscript', 'subscript', '\n', 'cut', 'copy', 'paste', 'selectall', '|', 'hr', 'table', 'link', 'image', '|', 'left', '---', 'undo', 'redo', 'find', '|', 'source'];

            config.buttons = customButton;

            return config;
        },

        /**
         * 외부 인라인 스타일
         */
        styleConfig() {
            const styleObj = {};

            if (!this.styleAttribute) {
                return styleObj;
            }

            this.styleAttribute.split(';').forEach((item) => {
                const [key, value] = item.split(':');
                const formattedKey = key.trim().replace(/-([a-z])/g, (_, char) => char.toUpperCase());
                if (formattedKey && value) {
                    styleObj[formattedKey] = value.trim();
                }
            });

            return styleObj;
        },
    },
    created() {},
    mounted() {
        this.styleAttribute = this.$el.getAttribute('style'); // style 변경 감지 후 업데이트

        // MutationObserver 생성
        this.observer = new MutationObserver(() => {
            this.styleAttribute = this.$el.getAttribute('style'); // style 변경 감지 후 업데이트

            if (!this.editor) {
                this.editorInit();
            }
        });

        // $el 감시 시작
        this.observer.observe(this.$el, {
            attributes: true, // 속성 변경 감시
            attributeFilter: ['style'], // style 속성만 감시
        });

        this.editorInit();
    },
    watch: {
        value(val) {
            this.editor.value != val && (this.editor.value = val);
        },
    },
    methods: {
        /**
         * 에디터 생성 및 속성 등록
         * 기존 GS 리테일 프로젝트 사용 옵션 기본값
         *
         * jodit 라이브러리 import 시 Jodit 변수명 사용 가능
         */
        editorInit() {
            if (this.addFonts) {
                // 폰트 추가 있을 경우
                const list = this.addFonts.reduce((acc, font) => {
                    acc[font] = font; // 폰트 이름과 값 동일하게
                    return acc;
                }, {});

                Jodit.defaultOptions.controls.font.list = {
                    ...Jodit.defaultOptions.controls.font.list,
                    ...list,
                };
            }

            // 한글 설정
            Jodit.lang.ko = {
                ...Jodit.lang.ko,
                'Line height': '줄간격',
                'Change mode': 'HTML모드 변경',
                'Fill color or set the text color': '색상',
            };

            // brush 아이콘에 커스텀 설정
            Jodit.modules.Icon.set('brush', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M80 0v-160h800V0H80Zm140-280 210-560h100l210 560h-96l-50-144H368l-52 144h-96Zm176-224h168l-82-232h-4l-82 232Z"/></svg>');

            this.editor = Jodit.make(`#jodit_editor_${this.id}`, this.editorConfig);
            this.editor.value = this.value;

            this.editor.updateContent = this.updateContent;

            // 에디터 내부 (textarea) 내용이 변경 되었을 때 실행 되는 이벤트
            this.editor.events.on('change', (e) => {
                if (!!e?.trim() == false) {
                    // e = this.defaultMessage;
                    this.editor.execCommand('foreColor', false, '#000000');
                }

                if (this.updateContent) {
                    return this.$emit('input', e);
                }
            });

            this.editor.events.on('setUpdateContent', (e) => {
                this.updateContent = e;
            });

            //compositon 관련 사항 외에 모든 키 다운 이벤트 처리
            this.editor.events.on('keydown', (e) => {
                this.updateContent = true;
            });

            //composition 관련 사항으로 인하여 한글 입력 후 최종적으로 작성 완료 때만 emit
            this.editor.editor.addEventListener('compositionend', (e) => {
                this.$emit('input', e.target.innerHTML);
            });

            //composition 관련 사항으로 인하여 한글 입력 도중에는 에디터 내용 변하더라도 emit 막는 용도
            this.editor.editor.addEventListener('compositionupdate', (e) => {
                this.updateContent = false;
            });
        },
    },
    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        // jodit 사용 시 제거
        this.editor.destruct();
    },
};
</script>
