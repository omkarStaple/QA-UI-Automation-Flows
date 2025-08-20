import { test, expect,request } from '@playwright/test';

// async function waitForPdfFilesToAppear(page, timeout, minFileCount) {
//     const startTime = Date.now();

//     // Polling loop
//     while (Date.now() - startTime < timeout) {
//         try {
//             // Check for PDF file elements in the table
//             const pdfFileCount = await page.locator('text=/\\(5629618\\).*\\.pdf/').count();

//             if (pdfFileCount >= minFileCount) {
//                 console.log(`✅ Found ${pdfFileCount} PDF files after ${Date.now() - startTime}ms`);
//                 return true;
//             }
//         } catch (error) {
//             console.error("⚠️ Error checking for PDF files:", error);
//         }

//         // Wait a bit before checking again
//         await page.waitForTimeout(1000);
//     }

//     throw new Error(`❌ Timed out after ${timeout}ms waiting for at least ${minFileCount} PDF files to appear.`);
// }


test('Splitting and Label flow test example', async ({ page,request }) => {
  // Navigate to website
  await page.goto('https://dev.staple.io/login');
  await page.waitForLoadState('networkidle');

  const LoginBtn = await page.locator("//span[normalize-space()='LOG IN WITH EMAIL AND PASSWORD']");
    await LoginBtn.click();
    await page.waitForLoadState('networkidle');
    await page.fill('//input[@placeholder="Enter your email address"]', 'developer@gmail.com');
    await page.fill('//input[@placeholder="Enter your password"]', 'P_8G3mtjrNZ6a:?');
    await page.locator("//button[@class='MuiButtonBase-root MuiButton-root Staple-style-48 Staple-style-50 MuiButton-text Staple-style-49 Staple-style-27']").click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);

    const ScanningBtn = await page.locator("//a[@class='Staple-style-62 Staple-style-63 Staple-style-78']");
    await ScanningBtn.click();
    await page.waitForLoadState('networkidle');
    const newQBtn = await page.locator("//span[normalize-space()='NEW QUEUE']");
    await newQBtn.click();
    await page.fill("//input[@placeholder='Queue name']","DocumentClassifierQueue");
    const DocBtn = await page.locator("//div[normalize-space()='Select document type']");
    await DocBtn.click();
    const DocumentClassifierOption = await page.locator("//span[normalize-space()='Document Classifier']");
    await DocumentClassifierOption.click();
    const groupBtn = await page.locator("//div[normalize-space()='Select group']");
    await groupBtn.click();
    const element = await page.$('text=OmkarComplex');
if (element) {
  await element.scrollIntoViewIfNeeded();
}
        const omkarOption = await page.locator("//span[normalize-space()='OmkarComplex']");
        await omkarOption.click();
    const TranslationBtn = await page.locator("//div[normalize-space()='Select document translation']");
    await TranslationBtn.click();
    const EnglishOption = await page.locator("//span[normalize-space()='On (With English Translation)']");
    await EnglishOption.click();
    const AutomationBtn = await page.locator("//span[normalize-space()='Automation']");
    await AutomationBtn.click();
    const intelligentBtn = await page.locator("(//input[@type='checkbox'])[16]");
    await intelligentBtn.check();
    const PrefBtn = await page.locator("//span[normalize-space()='Preferences']");
    await PrefBtn.click();
    await page.waitForLoadState('networkidle');
    const TableBtn = await page.locator(".MuiBox-root:nth-child(3) .MuiSelect-root");
    await TableBtn.click();
    const SmartTBtn = await page.locator("//span[normalize-space()='Smart Tables']");
    await SmartTBtn.click();
    await page.waitForLoadState('networkidle');
    const SubmitBtn = await page.locator("//span[normalize-space()='Submit']");
    await SubmitBtn.click();



//     // await waitForPdfFilesToAppear(page, 240000, 5);
// 

//     const uploaderEmails = await page.locator('td:has-text("developer@gmail.com")').count();
//     console.log(`📧 Found ${uploaderEmails} documents from the uploader after 240000ms`);
//     expect(uploaderEmails).toBeGreaterThanOrEqual(5);
    // await page.waitForLoadState('networkidle');
    // await page.waitForTimeout(10000); // Wait for 10 seconds

    //Going to the labels section to make a new label for the queues
    const LabelBtn = await page.getByRole('link', { name: 'Labels' });
    await LabelBtn.click();
    const NewLabelBtn = await page.locator("//span[@class='MuiButton-label']");
    await NewLabelBtn.click();
    await page.fill("//input[@placeholder='Enter label name']","InvoiceLabelPlaywright");
    const SelectQBtn = await page.locator("//span[normalize-space()='Select queues - 0']");
    await SelectQBtn.click();
    await page.fill("//input[@placeholder='Search Queue']", "DocumentClassifierQueue");
    const checkboxBtn = await page.getByRole('checkbox', { name: 'DocumentClassifierQueue' })
    await checkboxBtn.click();
    await page.fill("//input[@placeholder='Search Queue']", "");
    await page.fill("//input[@placeholder='Search Queue']", "PlaywrightDocumentClassLab");
    const checkboxBtn2 = await page.getByRole('checkbox', { name: 'PlaywrightDocumentClassLab' });
    await checkboxBtn2.click();
    const confirmLabelBtn = await page.getByRole('button', { name: 'CONFIRM' })
    await confirmLabelBtn.click();
    const NewActionBtn = await page.locator("//span[normalize-space()='SET A NEW ACTION']");
    await NewActionBtn.click();
    const ActionTypeBtn = await page.locator("(//div[@role='button'])[1]");
    await ActionTypeBtn.click();
    const moveToAnotherQueBtn = await page.locator("//span[normalize-space()='Move to another queue']");
    await moveToAnotherQueBtn.click();
    const ArrivalQueBtn = await page.locator("//div[normalize-space()='Select an arrival queue']");
    await ArrivalQueBtn.click();
    const ArrivalQueueBTN = await page.locator("//span[normalize-space()='PlaywrightDocumentClassLab']");
    await ArrivalQueueBTN.click();
    const AddLabelBtn = await page.locator("//span[normalize-space()='ADD LABEL']");
    await AddLabelBtn.click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(7000); // Wait for 5 seconds

    // Going back to the Scanning Tab and making a rule for that particular and assigning the label

   page.goBack();
 // Wait for 10 seconds
        const element1 = await page.$('text=OmkarComplex');
if (element1) {
  await element1.scrollIntoViewIfNeeded();
}
        const omkarComplexGroup1 = await page.locator("//div[@id='group-1386']//div[@id='panel1a-header']");
        await omkarComplexGroup1.click();

const settingsBtn = await page.getByRole('link', { name: 'DocumentClassifierQueue more' }).getByLabel('more')
await settingsBtn.click();
const editQueueBtn = await page.locator("//li[normalize-space()='Edit Queue']");
await editQueueBtn.click();

const element2 = await page.$('RULES');
if (element2) {
    await element2.scrollIntoViewIfNeeded();
  }
  const rulesBtn = await page.locator("//span[normalize-space()='Rules']");
    await rulesBtn.click();
    await page.waitForTimeout(5000); // Wait for 10 seconds
    const newRuleBtn = await page.locator("//span[normalize-space()='NEW RULE']");
    await newRuleBtn.click();
    const rule1Btn = await page.locator("(//div[@class='MuiAccordionSummary-content'])[114]");
    await rule1Btn.click();
    const ScenarioBtn = await page.locator("//div[@id='apply_rule']");
    await ScenarioBtn.click();
    const documentUploadedBtn = await page.locator("//span[normalize-space()='a document is uploaded to Staple']");
    await documentUploadedBtn.click();
    const ConditionBtn = await page.locator("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall']");
    await ConditionBtn.click();
    const selectConditionBtn = await page.locator("//div[@id='select_condition']");
    await selectConditionBtn.click();
    const compareDocBtn = await page.locator("//span[normalize-space()='compare a document with itself']");
    await compareDocBtn.click();
    const SelectFieldBtn = await page.locator("//div[normalize-space()='Select a field']");
    await SelectFieldBtn.click();
    const InvoiceNumberBtn = await page.locator("//span[normalize-space()='Invoice Number']");
    await InvoiceNumberBtn.click();
    const ComparisonBtn = await page.locator("//div[normalize-space()='Select a comparison operator']");
    await ComparisonBtn.click();
    const equalBtn = await page.locator("//span[normalize-space()='is equal to']");
    await equalBtn.click();
    const SelectValBtn = await page.locator("//div[normalize-space()='Select a value']");
    await SelectValBtn.click();
    const InvoiceNumberItselfBtn = await page.locator("//li[@role='option']//span[@class='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap'][normalize-space()='Invoice Number']");
    await InvoiceNumberItselfBtn.click();
    const SelectLabelBtn = await page.locator("//div[@id='select_label']");
    await SelectLabelBtn.click();
    const InvoiceLabelPlaywrightBtn = await page.locator("//span[normalize-space()='InvoiceLabelPlaywright']");
    await InvoiceLabelPlaywrightBtn.click();
    const confirmRuleBtn = await page.locator("//span[normalize-space()='Confirm']");
    await confirmRuleBtn.click();

// Uploading of a multiple paged document starts here

    const uploadBtn = await page.locator("(//span[normalize-space()='UPLOAD FILE'])[1]");
    const fileChooserPromise = page.waitForEvent('filechooser');
    await uploadBtn.click();
    
  
    // Wait for the file chooser dialog and handle it
    const fileChooser = await fileChooserPromise;
    
    // Provide the path to the file you want to upload
    await fileChooser.setFiles(['C:/Users/omkar/Downloads/(5629618) edd.pdf']);
    await page.waitForLoadState('networkidle'); 
    const confirmFileBtn = await page.locator("//span[normalize-space()='CONFIRM']");
    await confirmFileBtn.click();
    await page.waitForLoadState('networkidle');
    // await page.waitForTimeout(130000); // Wait for 2 minutes
    // const rcvdBtn = await page.locator(".Mui-selected > .MuiTab-wrapper");
    // await rcvdBtn.click();
    // await page.waitForLoadState('networkidle');
    const notification = page.getByText(/Documents are being moved/);
    await notification.waitFor();
    const text = await notification.textContent();
    console.log('Notification text:', text);
    await page.waitForTimeout(10000); // Wait for 10 seconds

});