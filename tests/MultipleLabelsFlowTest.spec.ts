import { test, expect,request } from '@playwright/test';

test('Splitting and Label flow test example', async ({ page,request }) => {

    await page.goto('https://staple.io/login');
    await page.waitForLoadState('networkidle');
  
    const LoginBtn = await page.locator("//span[normalize-space()='LOG IN WITH EMAIL AND PASSWORD']");
      await LoginBtn.click();
      await page.waitForLoadState('networkidle');
      await page.fill('//input[@placeholder="Enter your email address"]', 'qa_prod@staple.io');
      await page.fill('//input[@placeholder="Enter your password"]', 'bxy*xvt-ayt2RHV7vyp');
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

      const element = await page.$('text=Omkar Test');
      if (element) {
        await element.scrollIntoViewIfNeeded();
      }
              const omkarOption = await page.locator("//span[normalize-space()='Omkar Test']");
              await omkarOption.click();
          const TranslationBtn = await page.locator("//div[normalize-space()='Select document translation']");
          await TranslationBtn.click();
          const EnglishOption = await page.locator("//span[normalize-space()='On (With English Translation)']");
          await EnglishOption.click();


          const AutomationBtn = await page.locator("//span[normalize-space()='Automation']");
          await AutomationBtn.click();
          const intelligentBtn = await page.locator("(//input[@type='checkbox'])[15]");
          await intelligentBtn.check();
          const PrefBtn = await page.locator("//span[normalize-space()='Preferences']");
          await PrefBtn.click();
          await page.waitForLoadState('networkidle');
          const ScanningTypeBtn = await page.getByRole('button', { name: 'For images, scans and' });
          await ScanningTypeBtn.click();
          const asianBtn = await page.locator("//span[normalize-space()='For Asian languages and handwriting']");
          await asianBtn.click();
          // const TableBtn = await page.locator(".MuiBox-root:nth-child(3) .MuiSelect-root");
          // await TableBtn.click();
          // const SmartTBtn = await page.locator("//span[normalize-space()='Smart Tables']");
          // await SmartTBtn.click();
          await page.waitForLoadState('networkidle');
          const SubmitBtn = await page.locator("//span[normalize-space()='Submit']");
          await SubmitBtn.click();


  //             //Going to the labels section to make a new label for the queues
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
    await page.fill("//input[@placeholder='Search Queue']", "PlaywrightInvoice");
    const checkboxBtn2 = await page.getByRole('checkbox', { name: 'PlaywrightInvoice' });
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
    const ArrivalQueueBTN = await page.locator("//span[normalize-space()='PlaywrightInvoice']");
    await ArrivalQueueBTN.click();
    const AddLabelBtn = await page.locator("//span[normalize-space()='ADD LABEL']");
    await AddLabelBtn.click();
    try {
      const Labelnotification = page.getByText(/Document label has been created successfully./);
  await Labelnotification.waitFor();
  const Labeltext = await Labelnotification.textContent();
  console.log('Notification text:', Labeltext);
    await page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Error occurred while waiting for the notification:', error);
      
    }
  
  await page.waitForTimeout(4000); // Wait for 4 seconds


    
    await NewLabelBtn.click();
    await page.fill("//input[@placeholder='Enter label name']","FapiaoLabelPlaywright");
    const SelectQBtn1 = await page.locator("//span[normalize-space()='Select queues - 0']");
    await SelectQBtn1.click();

    await page.fill("//input[@placeholder='Search Queue']", "DocumentClassifierQueue");
    const checkboxBtn1 = await page.getByRole('checkbox', { name: 'DocumentClassifierQueue' })
    await checkboxBtn1.click();
    await page.fill("//input[@placeholder='Search Queue']", "");
    await page.fill("//input[@placeholder='Search Queue']", "PlaywrightFapiao");
    const checkboxBtn12 = await page.getByRole('checkbox', { name: 'PlaywrightFapiao' });
    await checkboxBtn12.click();
    const confirmLabelBtn1 = await page.getByRole('button', { name: 'CONFIRM' })
    await confirmLabelBtn1.click();
    const NewActionBtn1 = await page.locator("//span[normalize-space()='SET A NEW ACTION']");
    await NewActionBtn1.click();
    const ActionTypeBtn1 = await page.locator("(//div[@role='button'])[1]");
    await ActionTypeBtn1.click();
    const moveToAnotherQueBtn1 = await page.locator("//span[normalize-space()='Move to another queue']");
    await moveToAnotherQueBtn1.click();
    const ArrivalQueBtn1 = await page.locator("//div[normalize-space()='Select an arrival queue']");
    await ArrivalQueBtn1.click();
    const ArrivalQueueBTN1 = await page.locator("//span[normalize-space()='PlaywrightFapiao']");
    await ArrivalQueueBTN1.click();
    const AddLabelBtn1 = await page.locator("//span[normalize-space()='ADD LABEL']");
    await AddLabelBtn1.click();
    try {
      const Labelnotification1 = page.getByText(/Document label has been created successfully./);
  await Labelnotification1.waitFor();
  const Labeltext1 = await Labelnotification1.textContent();
  console.log('Notification text:', Labeltext1);
    await page.waitForLoadState('networkidle'); 
    } catch (error) {
      console.error('Error occurred while waiting for the notification:', error);
      
    }
  
    await page.waitForTimeout(4000); // Wait for 4 seconds 


    
    await NewLabelBtn.click();
    await page.fill("//input[@placeholder='Enter label name']","ReceiptLabelPlaywright");
    const SelectQBtn2 = await page.locator("//span[normalize-space()='Select queues - 0']");
    await SelectQBtn2.click();

    await page.fill("//input[@placeholder='Search Queue']", "DocumentClassifierQueue");
    const checkboxBtn22 = await page.getByRole('checkbox', { name: 'DocumentClassifierQueue' })
    await checkboxBtn22.click();
    await page.fill("//input[@placeholder='Search Queue']", "");
    await page.fill("//input[@placeholder='Search Queue']", "PlaywrightReceipt");
    const checkboxBtn23 = await page.getByRole('checkbox', { name: 'PlaywrightReceipt' });
    await checkboxBtn23.click();
    const confirmLabelBtn2 = await page.getByRole('button', { name: 'CONFIRM' })
    await confirmLabelBtn2.click();
    const NewActionBtn2 = await page.locator("//span[normalize-space()='SET A NEW ACTION']");
    await NewActionBtn2.click();
    const ActionTypeBtn2 = await page.locator("(//div[@role='button'])[1]");
    await ActionTypeBtn2.click();
    const moveToAnotherQueBtn2 = await page.locator("//span[normalize-space()='Move to another queue']");
    await moveToAnotherQueBtn2.click();
    const ArrivalQueBtn2 = await page.locator("//div[normalize-space()='Select an arrival queue']");
    await ArrivalQueBtn2.click();
    const ArrivalQueueBTN2 = await page.locator("//span[normalize-space()='PlaywrightReceipt']");
    await ArrivalQueueBTN2.click();
    const AddLabelBtn2 = await page.locator("//span[normalize-space()='ADD LABEL']");
    await AddLabelBtn2.click();
    try {
      const Labelnotification2 = page.getByText(/Document label has been created successfully./);
  await Labelnotification2.waitFor();
  const Labeltext2 = await Labelnotification2.textContent();
  console.log('Notification text:', Labeltext2);
    await page.waitForLoadState('networkidle');
    } catch (error) {
      console.error('Error occurred while waiting for the notification:', error);
      
    }
  

    await page.waitForTimeout(5000); // Wait for 5 seconds

  //       // Going back to the Scanning Tab and making a rule for that particular and assigning the label

   page.goBack();
  //  // Wait for 10 seconds
          const element1 = await page.$('text=Omkar Test');
  if (element1) {
    await element1.scrollIntoViewIfNeeded();
  }
          const omkarTestGroup1 = await page.locator("#group-4260 > #panel1a-header .MuiTypography-root");
          await omkarTestGroup1.click();
          
    const scrollelement = await page.$('text=DocumentClassifierQueue');
    if (scrollelement) {
      await scrollelement.scrollIntoViewIfNeeded();
    }
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
      const rule1Btn = await page.getByRole('button', { name: 'Rule 1' })
      await rule1Btn.click();
      const ScenarioBtn = await page.locator("//div[@id='apply_rule']");
      await ScenarioBtn.click();
      const documentUploadedBtn = await page.locator("//span[normalize-space()='a document is uploaded to Staple']");
      await documentUploadedBtn.click();
      const ConditionBtn = await page.locator("//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall']");
      await ConditionBtn.click();
      const selectConditionBtn = await page.locator("//div[@id='select_condition']");
      await selectConditionBtn.click();
      const compareValueBtn = await page.locator("//span[normalize-space()='compare a document with a value']");
      await compareValueBtn.click();
      const SelectFieldBtn = await page.locator("//div[normalize-space()='Select a field']");
      await SelectFieldBtn.click();
      const DocumentClassificationbtn = await page.locator("//span[normalize-space()='Document Classification']");
      await DocumentClassificationbtn.click();
      const ComparisonBtn = await page.locator("//div[normalize-space()='Select a comparison operator']");
      await ComparisonBtn.click();
      const equalToBtn = await page.locator("//span[normalize-space()='is equal to']");
      await equalToBtn.click();
      await page.fill("//input[@placeholder='Select a value']","Invoice");
      const SelectLabelBtn = await page.locator("//div[@id='select_label']");
      await SelectLabelBtn.click();
      const InvoiceLabelPlaywrightBtn = await page.locator("//span[normalize-space()='InvoiceLabelPlaywright']");
      await InvoiceLabelPlaywrightBtn.click();

      
      await newRuleBtn.click();
      const rule2Btn = await page.getByRole('button', { name: 'Rule 2' })
      await rule2Btn.click();
      const Scenario2Btn = await page.getByText('Select a scenario')
      await Scenario2Btn.click();
      const documentUploadedBtn2 = await page.locator("li.MuiListItem-root:nth-child(2)");
      await documentUploadedBtn2.click();
      const ConditionBtn2 = await page.getByRole('button').filter({ hasText: /^$/ }).nth(2)
      await ConditionBtn2.click();
      const selectConditionBtn2 = await page.locator("(//div[@id='select_condition'])[2]");
      await selectConditionBtn2.click();
      const compareValueBtn2 = await page.locator("(//li[@role='option'])[2]");
      await compareValueBtn2.click();
      const SelectFieldBtn2 = await page.locator("//div[normalize-space()='Select a field']");
      await SelectFieldBtn2.click();
      const DocumentClassificationbtn2 = await page.locator('#menu-').getByText('Document Classification')
      await DocumentClassificationbtn2.click();
      // const ComparisonBtn2 = await page.getByText('Select a comparison operator')
      await ComparisonBtn.click();
      // const equalToBtn2 = await page.getByText('is equal to')
      const equalToBtn2 = await page.locator('#menu-').getByText('is equal to')
      await equalToBtn2.click();
      const dropdown =  await page.getByRole('textbox', { name: 'Select a value' }).nth(1)
      await dropdown.fill("FapiaoInvoice");
      const SelectLabelBtn2 = await page.getByText('Select a label')
      await SelectLabelBtn2.click();
      const FapiaoLabelPlaywrightBtn = await page.locator("//span[normalize-space()='FapiaoLabelPlaywright']");
      await FapiaoLabelPlaywrightBtn.click();


      await newRuleBtn.click();
      const rule3Btn = await page.getByRole('button', { name: 'Rule 3' })
      await rule3Btn.click();
      const Scenario3Btn = await page.getByText('Select a scenario')
      await Scenario3Btn.click();
      const documentUploadedBtn3 = await page.locator("li.MuiListItem-root:nth-child(2)");
      await documentUploadedBtn3.click();
      const ConditionBtn3 = await page.getByRole('button').filter({ hasText: /^$/ }).nth(4)
      await ConditionBtn3.click();
      const selectConditionBtn3 = await page.locator("(//div[@id='select_condition'])[3]");
      await selectConditionBtn3.click();
      const compareValueBtn3 = await page.locator("(//li[@role='option'])[2]");
      await compareValueBtn3.click();
      const SelectFieldBtn3 = await page.locator("//div[normalize-space()='Select a field']");
      await SelectFieldBtn3.click();
      const DocumentClassificationbtn3 = await page.locator('#menu-').getByText('Document Classification')
      await DocumentClassificationbtn3.click();
      // const ComparisonBtn2 = await page.getByText('Select a comparison operator')
      await ComparisonBtn.click();
      // const equalToBtn2 = await page.getByText('is equal to')
      const equalToBtn3 = await page.locator('#menu-').getByText('is equal to')
      await equalToBtn3.click();
      const dropdown3 =  await page.getByRole('textbox', { name: 'Select a value' }).nth(2)
      await dropdown3.fill("Receipt");
      const SelectLabelBtn3 = await page.getByText('Select a label')
      await SelectLabelBtn3.click();
      const ReceiptLabelPlaywrightBtn3 = await page.locator("//span[normalize-space()='ReceiptLabelPlaywright']");
      await ReceiptLabelPlaywrightBtn3.click();
      

      await newRuleBtn.click();
      const rule4Btn = await page.getByRole('button', { name: 'Rule 4' })
      await rule4Btn.click();
      const Scenario4Btn = await page.getByText('Select a scenario')
      await Scenario4Btn.click();
      const documentUploadedBtn4 = await page.locator("li.MuiListItem-root:nth-child(2)");
      await documentUploadedBtn4.click();
      const ConditionBtn4 = await page.getByRole('button').filter({ hasText: /^$/ }).nth(6)
      await ConditionBtn4.click();
      const selectConditionBtn4 = await page.locator("(//div[@id='select_condition'])[4]");
      await selectConditionBtn4.click();
      const compareValueBtn4 = await page.locator("(//li[@role='option'])[2]");
      await compareValueBtn4.click();
      const SelectFieldBtn4 = await page.locator("//div[normalize-space()='Select a field']");
      await SelectFieldBtn4.click();
      const DocumentClassificationbtn4 = await page.locator('#menu-').getByText('Document Classification')
      await DocumentClassificationbtn4.click();
      // const ComparisonBtn2 = await page.getByText('Select a comparison operator')
      await ComparisonBtn.click();
      // const equalToBtn2 = await page.getByText('is equal to')
      const equalToBtn4 = await page.locator('#menu-').getByText('is equal to')
      await equalToBtn4.click();
      const dropdown4 =  await page.getByRole('textbox', { name: 'Select a value' }).nth(3)
      await dropdown4.fill("Other");
      const SelectLabelBtn4 = await page.getByText('Select a label')
      await SelectLabelBtn4.click();
      const elements = await page.locator("//span[normalize-space()='ReceiptLabelPlaywright']").all();
      await elements[1].click();

      const confirmRuleBtn = await page.locator("//span[normalize-space()='Confirm']");
      await confirmRuleBtn.click();
      
      const notificationRule = page.getByText(/Successfully updated DocumentClassifierQueue/);
      await notificationRule.waitFor();
      const textRule = await notificationRule.textContent();
      console.log('Notification text:', textRule);

      const uploadBtn = await page.locator("(//span[normalize-space()='UPLOAD FILE'])[1]");
      const fileChooserPromise = page.waitForEvent('filechooser');
      await uploadBtn.click();
      
    
      // Wait for the file chooser dialog and handle it
      const fileChooser = await fileChooserPromise;
      // Provide the path to the file you want to upload
      await fileChooser.setFiles(['C:/Users/omkar/Downloads/(5876676) doctosplit.pdf']); 
      await page.waitForLoadState('networkidle'); 
      const confirmFileBtn = await page.locator("//span[normalize-space()='CONFIRM']");
      await confirmFileBtn.click();
      await page.waitForLoadState('networkidle');
      try {
        const notification = page.getByText(/Documents are being moved/);
        await notification.waitFor({ timeout: 180000 }); 
      const text = await notification.textContent();
      console.log('Notification text:', text);
      } catch (error) {
        console.error('Error occurred while waiting for the notification:', error);
        
      }
      
      await page.waitForTimeout(10000); // Wait for 10 seconds

      const PlaywrightInvoiceConfirmBtn = await page.locator("//span[normalize-space()='PlaywrightInvoice']");
      await PlaywrightInvoiceConfirmBtn.click();
      await page.waitForTimeout(5000); // Wait for 5 seconds
      await page.screenshot({ path: 'Invoicescreenshot.png' });


  
});