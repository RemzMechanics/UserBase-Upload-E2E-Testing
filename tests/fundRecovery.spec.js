const {test, expect} = require("@playwright/test")

const path = require('path')

test ('UserBaseUploadE2E', async function({page}){

    //Invoke BUService URL
    await page.goto("https://buservice-sit.saas.mynt.xyz/")

    //Input Username and Password
    await page.locator("#login-name-input").fill("rtormiento@77global.biz")

    await page.locator("#pwd-input").fill("Test_1234")

    await page.locator("#login-btn").click()

    await expect(page).toHaveURL(/console/)

    //Navigate to Fund Recovery sub-menus
    await page.locator("//a[normalize-space()='Funds']").click()

    const funds = page.locator("//dt[normalize-space()='Fund Recovery']")

    await expect(funds).toContainText("Fund Recovery")

    //Navigate to UserBaseUpload page
    await page.locator("//a[normalize-space()='Userbase Upload']").click()

    await expect(page).toHaveURL(/userbaseUpload/)

    //Verify Service Name header
    const service = page.locator("//label[normalize-space()='Service']")

    await expect(service).toContainText("Service")

    //Verify Reference ID header
    const referenceId = page.locator("//label[normalize-space()='Reference ID']")

    await expect(referenceId).toContainText("Reference ID")

    //Verify Clawback Reason header
    const clawbackReason = page.locator("//label[normalize-space()='Clawback Reason']")

    await expect(clawbackReason).toContainText("Clawback Reason")
    
    //Verify UserBase File header
    const userBaseFile = page.locator("//label[normalize-space()='Userbase File']")

    await expect(userBaseFile).toContainText("Userbase File")

    //Verify UserBase File header
    const downloadTemplateLink = page.locator("//span[normalize-space()='Download Input File Template']")

    await expect(downloadTemplateLink).toContainText("Download Input File Template")

    //Verify Service Name Field and its dropdown values
    await page.locator("//div[@class='ant-select-selection__placeholder']").click()


    const options = await page.$$eval('.ant-select-dropdown-menu-item', items =>
    items.map(el => el.textContent.trim())
  )
    const expectedOptions = ['Instapay Send','Ang Pao','GInvest','GPO','GSave','IPY Receive','GCash Padala','GXI Recovery for GGives','GXI Recovery for Nook','GXI Recovery for GLoan','GXI Recovery for GSave','GXI Recovery for Online Payments','GXI Recovery Bal','GXI Recovery P3','GXI Recovery Invest','GXI Recovery Ipy','GXI Recovery GCredit','GXI Recovery Cashin','GXI Recovery Load','GXI Recovery P2P','GXI Recovery GPay','GXI Recovery Amex','GXI Recovery Others','GXI Recovery BP','GXI Recovery ATM','GXI Recovery MC','GXI Recovery GInsure']

    await expect(options).toEqual(expectedOptions)

    //Verify Download Input File Template Link
    await page.locator("//span[normalize-space()='Download Input File Template']").click()

    const donwloadTitle = page.locator("//b[contains(text(),'Are you sure you want to download the Input File T')]")

    await expect(donwloadTitle).toContainText("Are you sure you want to download the Input File Template?")

    //Verify Download Input File Template Link Cancel button
    await page.locator("//button[@class='ant-btn btn-fund-recovery-next btn-clear-cstm']").click()

    //Verify Download Input File Template Link Yes, Download
    //await page.locator("//span[normalize-space()='Download Input File Template']").click()
    //await page.locator("//button[@class='ant-btn btn-fund-recovery-next btn-submit-cstm ant-btn-primary']").click()
    
    //await page.waitForTimeout(20000)

}

)

test('ReferenceID field should not accept min and max length', async ({page})=> {
    await page.goto("https://buservice-sit.saas.mynt.xyz/")

    //Input Username and Password
    await page.locator("#login-name-input").fill("rtormiento@77global.biz")

    await page.locator("#pwd-input").fill("Test_1234")

    await page.locator("#login-btn").click()

    await expect(page).toHaveURL(/console/)

    //Navigate to Fund Recovery sub-menus
    await page.locator("//a[normalize-space()='Funds']").click()

    const funds = page.locator("//dt[normalize-space()='Fund Recovery']")

    await expect(funds).toContainText("Fund Recovery")

    //Navigate to UserBaseUpload page
    await page.locator("//a[normalize-space()='Userbase Upload']").click()

    await expect(page).toHaveURL(/userbaseUpload/)

    const input = page.locator("//input[@placeholder='Enter Reference ID']")
    await input.fill('Te')

    const minRefID = page.locator("//div[@class='ant-form-explain']")

    await expect(minRefID).toContainText("Reference ID should be at least 3 characters.")

    
    await input.fill('50CharactersLength50CharactersLength50CharactersLe')

    const value = await input.inputValue()

    expect(value.length).toBeLessThanOrEqual(50)

})

test('Clawback Reason field should not accept min and max length', async ({page})=> {
    await page.goto("https://buservice-sit.saas.mynt.xyz/")

    //Input Username and Password
    await page.locator("#login-name-input").fill("rtormiento@77global.biz")

    await page.locator("#pwd-input").fill("Test_1234")

    await page.locator("#login-btn").click()

    await expect(page).toHaveURL(/console/)

    //Navigate to Fund Recovery sub-menus
    await page.locator("//a[normalize-space()='Funds']").click()

    const funds = page.locator("//dt[normalize-space()='Fund Recovery']")

    await expect(funds).toContainText("Fund Recovery")

    //Navigate to UserBaseUpload page
    await page.locator("//a[normalize-space()='Userbase Upload']").click()

    await expect(page).toHaveURL(/userbaseUpload/)

    const input = page.locator("//input[@placeholder='Enter Clawback Reason']")
    await input.fill('Te')

    const minClawBack = page.locator("(//div[@class='ant-form-explain'])[1]")

    await expect(minClawBack).toContainText("Clawback Reason should be at least 3 characters.")

    
    await input.fill('50CharactersLength50CharactersLength50CharactersLe50CharactersLesdangth50CharactersLength50CharactersLe50CharactersLength50CharactersLength50CharactersLe50CharactersLength50CharactersLength50CharactersLe')

    const value = await input.inputValue()

    expect(value.length).toBeLessThanOrEqual(200)

})

 function generateAlphanumeric(length) {
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({length}, ()=> char.charAt(Math.floor(Math.random()*char.length))).join('')
}

test('Successful Upload', async ({page})=> {

 
  await page.goto("https://buservice-sit.saas.mynt.xyz/")

  //Input Username and Password
  await page.locator("#login-name-input").fill("rtormiento@77global.biz")

  await page.locator("#pwd-input").fill("Test_1234")

  await page.locator("#login-btn").click()

  await expect(page).toHaveURL(/console/)

  //Navigate to Fund Recovery sub-menus
  await page.locator("//a[normalize-space()='Funds']").click()

  const funds = page.locator("//dt[normalize-space()='Fund Recovery']")

  await expect(funds).toContainText("Fund Recovery")

  //Navigate to UserBaseUpload page
  await page.locator("//a[normalize-space()='Userbase Upload']").click()

  await expect(page).toHaveURL(/userbaseUpload/)

  const field1String = generateAlphanumeric(50)
  await page.locator("//input[@placeholder='Enter Reference ID']").fill(field1String)
  console.log(field1String)

  const field2String = generateAlphanumeric(200)
  await page.locator("//input[@placeholder='Enter Clawback Reason']").fill(field2String)
  console.log(field2String)

  await page.locator("//div[@class='ant-select-selection__placeholder']").click()
  const options = page.locator('.ant-select-dropdown-menu-item');
  const count = await options.count(); // should be 27

  // Step 3: Generate random index
  const randomIndex = Math.floor(Math.random() * count);

  const randomText = await options.nth(randomIndex).textContent()
  await options.nth(randomIndex).click()

  console.log(randomText)
  
  const filePath = path.join(__dirname, '2025-08-29.xlsx')

  await page.click("(//div[@class='ant-upload-drag-container'])[1]")

  await page.setInputFiles("(//input[@type='file'])[1]", filePath)
  await page.waitForTimeout(7000)

  await page.click("(//button[@type='submit'])[1]")

  await page.waitForTimeout(3000)

  const succesfulUpload = page.locator("(//b[normalize-space()='Successful Upload'])[1]")

  await expect(succesfulUpload).toContainText("Successful Upload")
})

