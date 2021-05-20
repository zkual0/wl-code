import {t} from 'testcafe';

class BasePage{
    async waitFor(milliseconds, debug=false) {
        if (debug){
            console.log('Waiting for ' + milliseconds / 1000 + ' seconds')
        };
        await t.wait(milliseconds)
    }

    async setTestSpeed(speedLevel) {
        await t.setTestSpeed(speedLevel)
    }
}

export default BasePage;