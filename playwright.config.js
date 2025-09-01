import {defineConfig} from '@playwright/test'

export default defineConfig ({
    reporter: [['html',{outputFolder: 'playwright-report',open: 'never'}]],
    use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure'
    },

}

)