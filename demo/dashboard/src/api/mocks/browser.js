import { setupWorker } from 'msw/browser';

import { common_handlers } from './common_handlers';
import { volume_handlers } from './volume_handlers';
import { rk_handlers } from './rk_handlers';
import { rd_handlers } from './rd_handlers';
import { dlab_handlers } from './dlab_handlers';
// import { helper_handlers } from './helper_handlers';
// import { excel_data_handler } from './excel_data';

export const worker = setupWorker(...common_handlers, ...volume_handlers, ...rk_handlers, ...dlab_handlers, ...rd_handlers);
