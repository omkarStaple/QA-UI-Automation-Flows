import { test, expect, request, Page, Locator } from '@playwright/test'; // Added Locator import
import { getEnvironment } from '../utils/environment';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

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

test('test with sidebar and table validation', async ({ page, request }) => {
    // Get environment configuration
    const env = getEnvironment();
    
    // Navigate to website
    await page.goto(env.url);
    await page.waitForTimeout(10000);

    const LoginBtn = await page.locator("//span[normalize-space()='LOG IN WITH EMAIL AND PASSWORD']");
    await LoginBtn.click();
    await page.waitForTimeout(10000);
    await page.fill('//input[@placeholder="Enter your email address"]', env.username);
    await page.fill('//input[@placeholder="Enter your password"]', env.password);
    await page.locator("//button[@class='MuiButtonBase-root MuiButton-root Staple-style-48 Staple-style-50 MuiButton-text Staple-style-49 Staple-style-27']").click();

    await page.waitForTimeout(10000);
    await expect(page).toHaveURL(/dashboard/);

    const ScanningBtn = await page.locator("xpath=/html/body/div/section/div[1]/div[1]/div/a[3]");
    await ScanningBtn.click();
    const currentDate = new Date();

// Option 1: Full Date (YYYY-MM-DD), Time (HH-MM-SS), and Millisecond Timestamp
// This is often more useful for identifying queue creation time precisely.
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(currentDate.getDate()).padStart(2, '0');
const hours = String(currentDate.getHours()).padStart(2, '0');
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

const formattedDateTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;

    const newQBtn = await page.locator("//span[normalize-space()='NEW QUEUE']");
    await newQBtn.click();
    await page.fill("//input[@placeholder='Queue name']",  `InvoiceDocscannerQueue_${formattedDateTime}`); // Added timestamp to ensure unique queue names
    const DocBtn = await page.locator("//div[normalize-space()='Select document type']");
    await DocBtn.click();
    const InvoiceOption = await page.locator("//span[normalize-space()='Invoice']");
    await InvoiceOption.click();
    const groupBtn = await page.locator("//div[normalize-space()='Select group']");
    await groupBtn.click();
    const element = await page.$('text=Omkar 2025 sanity');
    if (element) {
        await element.scrollIntoViewIfNeeded();
    }
    const omkarOption = await page.locator("//span[normalize-space()='Omkar 2025 sanity']");
    await omkarOption.click();
    const TranslationBtn = await page.locator("//div[normalize-space()='Select document translation']");
    await TranslationBtn.click();
    const EnglishOption = await page.locator("//span[normalize-space()='On (With English Translation)']");
    await EnglishOption.click();

    const PrefBtn = await page.locator("//span[normalize-space()='Preferences']");
    await PrefBtn.click();
    await page.waitForTimeout(5000); // Wait for preferences to load
    const TableBtn = await page.locator(".MuiBox-root:nth-child(3) .MuiSelect-root");
    await TableBtn.click();
    const SmartTBtn = await page.locator("//span[normalize-space()='Smart Tables']");
    await SmartTBtn.click();
    await page.waitForTimeout(5000); // Wait for UI to settle after selection
    const SubmitBtn = await page.locator("//span[normalize-space()='Submit']");
    await SubmitBtn.click();

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

    // Provide the path to the test file (use relative path from project root)
    const testFilePath = path.join(process.cwd(), 'test-data', '(5629618) edd.pdf');
    await fileChooser.setFiles([testFilePath]);
    await page.waitForTimeout(5000); // Give time for file selection to register
    const confirmFileBtn = await page.locator("//span[normalize-space()='CONFIRM']");
    await confirmFileBtn.click();

    // Wait for document processing to complete and move to received state
    // This timeout is very long, consider more specific waits if possible (e.g., polling API, checking UI status)
    const notificationSnackbarLocator = page.locator("(//div[@id='notistack-snackbar'])[1]");
    await expect(notificationSnackbarLocator).toBeVisible({ timeout: 300000 }); 
    // if(urlSite === "https://app.stapleai.cn/login?redirectTo=%2Fdashboard"){
    //         // Increased timeout to 5 minutes
    // } else{
    //     // await page.waitForTimeout(130000); // Wait for 2 minutes and 10 seconds
    //     await expect(notificationSnackbarLocator).toBeVisible({ timeout: 270000 }); // Increased timeout to 4 minutes
    // }
    

    const rcvdBtn = await page.locator(".Mui-selected > .MuiTab-wrapper");
    await rcvdBtn.click();
    await page.waitForTimeout(10000);

    // Click on the first file in the received list to open it
    const file1 = await page.getByRole('cell', { name: '(5629618) edd.pdf' }); // This locator might need refinement if it's not reliably finding the file
    await file1.click();
    await page.waitForTimeout(10000); // Wait for document details and sidebar to load

    // --- Start of Merged Validation Logic ---

    // 1. Table Presence Validation
    const tableIsPresent = await isAnyTablePresent(page);
    // Assert that at least one table is expected to be present on this document
    // expect(tableIsPresent).toBe(true); 
      expect.soft(tableIsPresent).toBe(true);

         if (!tableIsPresent) {
        console.log("⚠️ Table is NOT present. The soft assertion above will record a failure,the test will continue.");
        } else {
        console.log("✅ Table is present. The soft assertion will pass.");
        }
        await test.step('Validate specific critical sidebar fields', async () => {
        // Description Text
        const descriptionTextLocator = page.locator("//input[@id='input-DescriptionText-0'][1]");
        await expect(descriptionTextLocator).toBeVisible();
        const descValue = await descriptionTextLocator.inputValue();
        console.log(`  Description Text: "${descValue}"`);
        expect(descValue.trim()).not.toBe('');
        expect(descValue.trim().toLowerCase()).not.toBe('n/a');

        // Document Type
        // Note: If Document Type is a dropdown, you'd use .evaluate() or .selectOption() instead of .inputValue()
        // Assuming it's an input field for now as per your locator.
        const documentTypeLocator = page.locator("//input[@id='input-DocumentType-0'][1]");
        await expect(documentTypeLocator).toBeVisible();
        const docTypeValue = await documentTypeLocator.inputValue();
        console.log(`  Document Type: "${docTypeValue}"`);
        expect(docTypeValue.trim()).not.toBe('');
        expect(docTypeValue.trim().toLowerCase()).not.toBe('n/a');

        // Invoice Number
        const invoiceNumberLocator = page.locator("//input[@id='input-InvoiceNumber-0'][1]");
        await expect(invoiceNumberLocator).toBeVisible();
        const invoiceNumValue = await invoiceNumberLocator.inputValue();
        console.log(`  Invoice Number: "${invoiceNumValue}"`);
        expect(invoiceNumValue.trim()).not.toBe('');
        expect(invoiceNumValue.trim().toLowerCase()).not.toBe('n/a');

        // Subtotal
        const subtotalLocator = page.locator("//input[@id='input-Subtotal-0'][1]");
        await expect(subtotalLocator).toBeVisible();
        const subtotalValue = await subtotalLocator.inputValue();
        console.log(`  Subtotal: "${subtotalValue}"`);
        expect(subtotalValue.trim()).not.toBe('');
        expect(subtotalValue.trim().toLowerCase()).not.toBe('n/a');

        // Total
        const totalLocator = page.locator("//input[@id='input-Total-0'][1]");
        await expect(totalLocator).toBeVisible();
        const totalValue = await totalLocator.inputValue();
        console.log(`  Total: "${totalValue}"`);
        expect(totalValue.trim()).not.toBe('');
        expect(totalValue.trim().toLowerCase()).not.toBe('n/a');
    });

    console.log("All specified critical sidebar fields validated.");

    // --- End of Merged Validation Logic ---

    // Optional: Add steps to clean up the created queue if this is a test environment
    // For example, navigate back to queues list and delete "InvoiceDocscannerQueue"
});