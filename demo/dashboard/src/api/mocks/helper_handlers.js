import { http, HttpResponse, delay } from 'msw';
import Chance from 'chance';

import store from '@/store';

const chance = new Chance();

const menu = [
    {
        seq: 110,
        name: '공통',
        children: [
            {
                seq: 111,
                name: '화면 개요',
            },
            {
                seq: 112,
                name: '화면 구조',
            },
            {
                seq: 113,
                name: '데이터 시각화',
                children: [
                    {
                        seq: 114,
                        name: '연관어 분석',
                    },
                    {
                        seq: 115,
                        name: '점유율 분석',
                    },
                    {
                        seq: 116,
                        name: '추이 분석',
                    },
                ],
            },
        ],
    },
    {
        seq: 200,
        name: '대시보드',
    },

    {
        seq: 11,
        name: '데이터 관리',
        order: 2,
        children: [
            {
                seq: 12,
                name: '데이터 다운로드',
                children: [
                    { seq: 123, name: '개요', order: 1 },
                    { seq: 231, name: '사용법', order: 2 },
                ],
            },
        ],
    },
    {
        seq: 1,
        name: '관리자',
        order: 3,
        children: [
            {
                seq: 9,
                name: '사용자',
                children: [
                    { seq: 13231, name: '개요', order: 1 },
                    { seq: 121, name: '사용법', order: 2 },
                    { seq: 12123, name: '사용법2', order: 3 },
                ],
            },
            {
                seq: 4,
                name: '전체 제외 키워드',
            },
            {
                seq: 2,
                name: '키워드 치환',
            },
            {
                seq: 3,
                name: '키워드',
            },
            {
                seq: 5,
                name: '기사 주제 사전',
            },
            {
                seq: 6,
                name: '기사 분류 사전',
            },
            {
                seq: 7,
                name: '사이트',
            },
            {
                seq: 8,
                name: 'SNS계정',
            },
            {
                seq: 10,
                name: '공용코드',
            },
            {
                seq: 13,
                name: '인기도 지수',
            },
            {
                seq: 14,
                name: '접속로그',
            },
            {
                seq: 15,
                name: '사이트 검색어',
            },
            {
                seq: 16,
                name: '제휴 수집원',
            },
            {
                seq: 17,
                name: '도움말',
            },
        ],
    },
    {
        seq: 300,
        name: '대시보드2',
    },
    { seq: 102, name: '활용 사례', order: 4 },
];

export const helper_handlers = [
    // 키워드
    http.post('http://dev.cjmia.newenai.co.kr/api/helper/', async ({ request, params, cookies }) => {
        const body = await request.json(); // convert the stream to a JavaScript object

        let result = {};
        if (body.cmd === 'HL') {
            const createListItem = (item) => {
                const listItem = {
                    seq: item.seq,
                    p_seq: item.p_code || 0,
                    subject: item.name,
                    content: chance.paragraph({ sentences: 20 }),
                    order: item.order,
                    modifier: chance.name(),
                    modi_date: chance.date({ string: true, american: false }),
                    use_yn: item.seq === 3 ? 'N' : 'Y',
                };

                if (item.children && item.children.length > 0) {
                    listItem.children = item.children.map((child) => {
                        child.p_code = item.seq;
                        return createListItem(child);
                    });
                }

                if (listItem.subject === '사용자') {
                    listItem.content = `<div style="width: 100%; height: 100%; background: white; flex-direction: column; justify-content: flex-end; align-items: center; display: inline-flex">
    <div style="align-self: stretch; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 35px; display: inline-flex">
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="color: rgb(0, 145, 255); font-family: Pretendard; font-weight: 700; line-height: 30px; overflow-wrap: break-word; font-size: 20px;">트렌즈에서 최신 트렌드를 분석해 업무에 활용해 보세요.</div>
        </div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
                <div style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 24px; overflow-wrap: break-word; font-size: 16px;">트렌즈란?</div>
            </div>
            <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
                    <div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">트렌즈는 여러 채널에 흩어져 있는 데이터를 종합적으로 분석하여 트렌드를 파악할 수 있는 서비스입니다. <br>         </span><span style="color: rgb(132, 132, 132); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">▶ &nbsp;위젯을 통해 더욱 쉽게 접속할 수 있어요.</span></div><div><span style="color: rgb(132, 132, 132); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">총 4개의 메뉴로 구성되었으며, 다양한 시각화를 통해 다각적으로 데이터를 분석해보세요.</span></div>
                </div>
            </div>
        </div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="width: 855px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: #F9F9F9; border-radius: 5px; overflow: hidden; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                <div style="flex: 1 1 0"><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">최신 트렌드 (</span><span style="color: rgb(0, 145, 255); font-family: Pretendard; font-weight: 400; text-decoration: underline; line-height: 21px; overflow-wrap: break-word; font-size: 14px;"><a href="https://gs.realsn.com/help/pages/manual/detail/?seq=2_1_0">도움말 바로가기</a></span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">)</span></div>
            </div>
            <div style="padding-left: 10px; padding-right: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                <div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">식품 관련하여 최신 트렌드 키워드를 발굴해 보세요.</span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">1. 언급 데이터 <br>          - 채널 : 뉴스, 블로그, 카페, 커뮤니티, 유튜브, 인스타그램, 트위터 <br>          - 분야 : 식품 </span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">       2. 주요 기능<br>   - 사용자가 설정한 검색조건의 급상승 해시태그/키워드를 확인할 수 있습니다. <br>          - 선택한 급상승 해시태그/키워드를 상세 분석 할 수 있습니다. <br>          </span><span style="color: rgb(132, 132, 132); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">▶ 상세 분석 : 분류 별 언급량 현황, 연관어, 속성 별 분석, 데이터 목록</span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">        </span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">3. 업무 활동           - 검색기간 동안 식품 분야에서 핫한 아이템과 주제를 빠르게 발굴해 업무에 반영할 수 있습니다.</span></div>
            </div>
        </div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="width: 855px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: #F9F9F9; border-radius: 5px; overflow: hidden; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                <div style="flex: 1 1 0"><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">트렌드 선행 캐칭 (</span><span style="color: rgb(0, 145, 255); font-family: Pretendard; font-weight: 400; text-decoration: underline; line-height: 21px; overflow-wrap: break-word; font-size: 14px;"><a href="https://gs.realsn.com/help/pages/manual/detail/?seq=3_1_0">도움말 바로가기</a></span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">)</span></div>
            </div>
            <div style="padding-left: 10px; padding-right: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                <div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">앞으로 떠오를 선행 키워드를 분석해 보세요.</span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">1. 언급 데이터           - 채널 : 블로그, 카페, 커뮤니티, 유튜브, 인스타그램, 트위터           - 분야 : 맛집, 음주류, 가공식품, 디저트, 캐릭터, 일상용품<br>        2. 주요 기능<br>   - 설정한 검색 조건에 따라 언급빈도/평균 성장률/히트상품 유사도 점수의 합이 높은 순으로 키워드를 파악할 수 있어요.           - 선택한 선행 키워드를 상세히 분석 할 수 있습니다.        </span><span style="color: rgb(132, 132, 132); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">   ▶ 선행 키워드 분석 : 항목 별 순위 및 별점, 히트상품 추이 비교 차트, 채널 별 언급량 현황, 데이터 목록</span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">        <br>3. 업무 활동           - 히트상품 추이 차트 분석을 통해 유행 주기를 예측하여 효과적인 상품 기획과 마케팅 전략을 세울 수 있습니다.</span></div>
            </div>
        </div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="width: 855px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: #F9F9F9; border-radius: 5px; overflow: hidden; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                <div style="flex: 1 1 0"><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">트렌드 검색 (</span><span style="color: rgb(0, 145, 255); font-family: Pretendard; font-weight: 400; text-decoration: underline; line-height: 21px; overflow-wrap: break-word; font-size: 14px;"><a href="https://gs.realsn.com/help/pages/manual/detail/?seq=4_1_0">도움말 바로가기</a></span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">)</span></div>
            </div>
            <div style="padding-left: 10px; padding-right: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                <div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">최신 트렌드/관심 키워드를&nbsp;상세히 분석해 보세요.<br></span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">1. 언급 데이터 <br>          - 채널 : 뉴스, 블로그, 카페, 커뮤니티, 유튜브, 인스타그램, 트위터 <br>          - 분야 : 식품, 자사/경쟁사 주요 사업 언급         </span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">2. 주요 기능<br>  - 최대 검색어 3개를 비교 분석할 수 있습니다. <br>          - 사용자가 설정한 검색조건을 활용해 검색어를 상세히 분석할 수 있습니다.         </span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">3. 업무 활동 <br>- 최신 트렌드에서 발굴한 아이템 혹은 주제를 상세히 분석할 수 있습니다. <br>          - 경쟁 브랜드 혹은 제품을 비교·분석할 수 있습니다.</span></div>
            </div>
        </div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="width: 855px; padding-left: 10px; padding-right: 10px; padding-top: 5px; padding-bottom: 5px; background: #F9F9F9; border-radius: 5px; overflow: hidden; justify-content: flex-start; align-items: center; gap: 10px; display: inline-flex">
                <div style="flex: 1 1 0"><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">쇼핑 트렌드 (</span><span style="color: rgb(0, 145, 255); font-family: Pretendard; font-weight: 400; text-decoration: underline; line-height: 21px; overflow-wrap: break-word; font-size: 14px;"><a href="https://gs.realsn.com/help/pages/manual/detail/?seq=5_1_0">도움말 바로가기</a></span><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">)</span></div>
            </div>
            <div style="padding-left: 10px; padding-right: 10px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
                <div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">쇼핑 카테고리별 인기 검색어 변화를 분석하여 트렌드를 파악해 보세요.</span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">1. 쇼핑 인기 검색어 데이터 <br>          - 채널 : 네이버 데이터랩 &gt; 쇼핑인사이트 <br>          - 분야 :식품, 패션의류, 패션잡화, 화장품/미용, 생활/건강 </span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">2. 주요 기능<br>  - 라이프 사이클 별로 인기 검색어를 파악할 수 있습니다. <br>         - 분석 검색어의 성별, 연령별 관심도를 파악할 수 있습니다. <br>         - 다양한 성별X연령 별 조건의 인기 검색어 순위를 비교할 수 있습니다. </span></div><div><span style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 400; line-height: 21px; overflow-wrap: break-word; font-size: 14px;">        3. 업무 활동 <br>        - 고객 세그먼트 별 소비 니즈가 높은 아이템 혹은 브랜드를 빠르게 발굴해 업무에 반영할 수 있습니다 </span></div>
            </div>
        </div>
        <div style="width: 855px; height: 0px; border: 1px #A5A5A5 solid"></div>
        <div style="flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 15px; display: flex">
            <div style="color: rgb(57, 57, 57); font-family: Pretendard; font-weight: 700; line-height: 21px; overflow-wrap: break-word; font-size: 14px;"><a href="https://gs.realsn.com/help/pages/usecase/list/" target="_blank">트렌즈 활용 사례 보러가기 →</a></div>
        </div>
    </div>
</div>`;
                }

                return listItem;
            };

            result = {
                list: menu.map((item) => createListItem(item)),
            };
        } else if (body.cmd === 'HV') {
            result = {
                content: chance.paragraph({ sentences: 3 }),
                modifier: chance.name(),
                modi_date: chance.date({ string: true, american: false }),
            };
        } else if (body.cmd === 'HM') {
            // 연관어 TOP 30
            result = {
                list: Array.from({ length: body.row_limit }, (_, i) => ({
                    code: i,
                    name: chance.name(),
                    cnt: chance.integer({ min: 0, max: 1000 }),
                })),
            };
        }

        // console.log(`Request - ${body.cmd}  >>  `, body);
        // console.log(`Response - ${body.cmd}  >>  `, result);

        return HttpResponse.json({ result: result });
    }),
];
