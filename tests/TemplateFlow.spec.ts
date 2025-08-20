import { test, expect, request, Page, Locator } from '@playwright/test'; // Added Locator import


// --- Helper Function for Dynamic Table Presence Validation ---

/**
 * Checks if at least one table indicator element is present and visible on the page.
 * A table indicator is identified by text matching "Table X title" (e.g., "Table 1 title").
 * @param page The Playwright Page object.
 * @returns {Promise<boolean>} True if at least one table indicator is found and visible, false otherwise.
 */
async function isAnyTablePresent(page: Page): Promise<boolean> {
    console.log("Checking for the presence of any table...");

    // This locator will find any element containing text like "Table 1 title", "Table 2 title", etc.
    const tableTitleLocator = page.getByText(/Table \d+ title/);

    // Using .first().isVisible() to check if at least one such element is visible
    const isAnyTableTitleVisible = await tableTitleLocator.first().isVisible({ timeout: 5000 }); // Added timeout

    if (isAnyTableTitleVisible) {
        console.log("At least one table detected on the page.");
        return true;
    } else {
        console.log("No tables detected on the page.");
        return false;
    }
}


// --- Main Playwright Test ---

test('Splitting and Label flow test with sidebar and table validation', async ({ page, request }) => {
    // Navigate to website
    await page.goto('https://app.staple.io/login?redirectTo=%2Fdashboard');
    await page.waitForLoadState('networkidle');

    const LoginBtn = await page.locator("//span[normalize-space()='LOG IN WITH EMAIL AND PASSWORD']");
    await LoginBtn.click();
    await page.waitForLoadState('networkidle');
    await page.fill('//input[@placeholder="Enter your email address"]', 'qa_prod@staple.io');
    await page.fill('//input[@placeholder="Enter your password"]', 'bxy*xvt-ayt2RHV7vyp');
    await page.locator("//button[@class='MuiButtonBase-root MuiButton-root Staple-style-48 Staple-style-50 MuiButton-text Staple-style-49 Staple-style-27']").click();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/dashboard/);

    const ModelBtn = await page.locator("(//a[@class='Staple-style-130 Staple-style-132 Staple-style-147'])[1]");
    await ModelBtn.click();

    const newModelBtn = await page.locator("(//span[normalize-space()='NEW MODEL'])[1]");
    await newModelBtn.click();
    await page.fill("(//input[@placeholder='Enter model name'])[1]", "GalaxyModel2025");
    const ImageTypeBtn = await page.locator("(//div[normalize-space()='Select image processing type'])[1]");
    await ImageTypeBtn.click();
    const DocBtn = await page.locator("(//li[@role='option'])[3]");
    await DocBtn.click();
    await page.waitForTimeout(5000); // Wait for the dropdown to be interactive
//     const modelType = await page.$('text=SCAN-1209TestModel');
// if(modelType){
//     await modelType.scrollIntoViewIfNeeded();
// }   
    const TranslBtn = await page.locator("(//div[normalize-space()='Select Document Translation'])[1]");
    await TranslBtn.click();
    const OnTransLBTN = await page.locator("(//span[normalize-space()='On (With English Translation)'])[1]");
    await OnTransLBTN.click();
    const element = await page.$('text=Omkar 2025 sanity');
    
    const SubmitBtn = await page.locator("//span[normalize-space()='Submit']");
    await SubmitBtn.click();
    // const TranslationBtn = await page.locator("//div[normalize-space()='Select document translation']");
    // await TranslationBtn.click();
    // const EnglishOption = await page.locator("//span[normalize-space()='On (With English Translation)']");
    // await EnglishOption.click();

    const PrefBtn = await page.locator("//span[normalize-space()='Preferences']");
    await PrefBtn.click();
    await page.waitForTimeout(5000); // Wait for preferences to load
    // const TableBtn = await page.locator(".MuiBox-root:nth-child(3) .MuiSelect-root");
    // await TableBtn.click();
    // const SmartTBtn = await page.locator("//span[normalize-space()='Smart Tables']");
    // await SmartTBtn.click();
    // await page.waitForTimeout(5000); // Wait for UI to settle after selection
    // const SubmitBtn = await page.locator("//span[normalize-space()='Submit']");
    // await SubmitBtn.click();

    // Wait for the queue creation to complete and dashboard to reflect
    // Instead of: await page.waitForLoadState('networkidle');
    await expect(page.getByText('Queue created successfully')).toBeVisible({ timeout: 10000 });
    await page.waitForSelector("text=Queue created successfully", { timeout: 10000 }).catch(() => console.log("Queue creation success message not found, proceeding."));


    // Uploading of a multiple paged document starts here

    const uploadBtn = await page.locator("(//span[normalize-space()='UPLOAD FILE'])[1]");
    const fileChooserPromise = page.waitForEvent('filechooser');
    await uploadBtn.click();

    // Wait for the file chooser dialog and handle it
    const fileChooser = await fileChooserPromise;

    // Provide the path to the file you want to upload
    await fileChooser.setFiles(['C:/Users/omkar/Downloads/paradise old docs/PO-30-58553.pdf']);
    await page.waitForTimeout(5000); // Give time for file selection to register
    const confirmFileBtn = await page.locator("//span[normalize-space()='CONFIRM']");
    await confirmFileBtn.click();

    // Wait for document processing to complete and move to received state
    // This timeout is very long, consider more specific waits if possible (e.g., polling API, checking UI status)
    await page.waitForTimeout(130000); // Wait for 2 minutes and 10 seconds

    const rcvdBtn = await page.locator(".Mui-selected > .MuiTab-wrapper");
    await rcvdBtn.click();
    await page.waitForTimeout(10000);

    // Click on the first file in the received list to open it
    const file1 = await page.getByRole('cell', { name: 'PO-30-58553.pdf' }); // This locator might need refinement if it's not reliably finding the file
    await file1.click();
    await page.waitForTimeout(10000); // Wait for document details and sidebar to load

    // --- Start of Merged Validation Logic ---

    // 1. Table Presence Validation
    const tableIsPresent = await isAnyTablePresent(page);
    // Assert that at least one table is expected to be present on this document
    expect(tableIsPresent).toBe(true); 

    await test.step('Validate specific critical sidebar fields', async () => {
        // CurrencyCode
        const currencyCodeLocator = page.locator("//input[@id='input-CurrencyCode-0'][1]");
        await expect(currencyCodeLocator).toBeVisible();
        const currencyCodeValue = await currencyCodeLocator.inputValue();
        console.log(`  CurrencyCode: "${currencyCodeValue}"`);
        expect(currencyCodeValue.trim()).not.toBe('');
        expect(currencyCodeValue.trim().toLowerCase()).not.toBe('n/a');

        // Date
        // Note: For date fields, you might also want to validate the format (e.g., 'MM-DD-YYYY')
        const dateLocator = page.locator("//input[@id='input-Date-0'][1]");
        await expect(dateLocator).toBeVisible();
        const dateValue = await dateLocator.inputValue();
        console.log(`  Date: "${dateValue}"`);
        expect(dateValue.trim()).not.toBe('');
        expect(dateValue.trim().toLowerCase()).not.toBe('n/a');

        // PaymentTerms
        const paymentTermsLocator = page.locator("//input[@id='input-PaymentTerms-0'][1]");
        await expect(paymentTermsLocator).toBeVisible();
        const paymentTermsValue = await paymentTermsLocator.inputValue();
        console.log(`  PaymentTerms: "${paymentTermsValue}"`);
        expect(paymentTermsValue.trim()).not.toBe('');
        expect(paymentTermsValue.trim().toLowerCase()).not.toBe('n/a');

        // PONumber
        const poNumberLocator = page.locator("//input[@id='input-PONumber-0'][1]");
        await expect(poNumberLocator).toBeVisible();
        const poNumberValue = await poNumberLocator.inputValue();
        console.log(`  PONumber: "${poNumberValue}"`);
        expect(poNumberValue.trim()).not.toBe('');
        expect(poNumberValue.trim().toLowerCase()).not.toBe('n/a');

        // SupplierAddress
        const supplierAddressLocator = page.locator("//input[@id='input-SupplierAddress-0'][1]");
        await expect(supplierAddressLocator).toBeVisible();
        const supplierAddressValue = await supplierAddressLocator.inputValue();
        console.log(`  SupplierAddress: "${supplierAddressValue}"`);
        expect(supplierAddressValue.trim()).not.toBe('');
        expect(supplierAddressValue.trim().toLowerCase()).not.toBe('n/a');

        // SupplierName
        const supplierNameLocator = page.locator("//input[@id='input-SupplierName-0'][1]");
        await expect(supplierNameLocator).toBeVisible();
        const supplierNameValue = await supplierNameLocator.inputValue();
        console.log(`  SupplierName: "${supplierNameValue}"`);
        expect(supplierNameValue.trim()).not.toBe('');
        expect(supplierNameValue.trim().toLowerCase()).not.toBe('n/a');
    });

    console.log("All specified critical sidebar fields validated.");

    
    // --- End of Merged Validation Logic ---

    // Optional: Add steps to clean up the created queue if this is a test environment
    // For example, navigate back to queues list and delete "InvoiceDocscannerQueue"
});