// BULLETPROOF RESUME FUNCTION - DEFINITELY SKIPS PROCESSED ROWS
function processAllSheetsResume() {
  const sheetNames = [
    'example1',
    'example2'
  ];
  
  let totalProcessed = 0;
  let totalFound = 0;
  let results = [];
  
  for (const sheetName of sheetNames) {
    Logger.log(`=== PROCESSING SHEET: ${sheetName} ===`);
    
    const sheetResult = processSingleSheetBulletproof(sheetName);
    totalProcessed += sheetResult.processed;
    totalFound += sheetResult.found;
    results.push(`${sheetName}: ${sheetResult.processed} processed, ${sheetResult.found} found`);
    
    Logger.log(`Completed: ${sheetName} - ${sheetResult.found} emails found`);
    
    if (sheetName !== sheetNames[sheetNames.length - 1]) {
      Utilities.sleep(3000);
    }
  }
  
  const finalMessage = `TOTAL: ${totalProcessed} websites processed, ${totalFound} emails found`;
  Logger.log(finalMessage);
  
  Browser.msgBox(
    'Email Extraction Complete',
    `${finalMessage}\\n\\nResults:\\n${results.join('\\n')}`,
    Browser.Buttons.OK
  );
}

// BULLETPROOF VERSION - DEFINITELY SKIPS PROCESSED ROWS
function processSingleSheetBulletproof(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (!sheet) {
    Logger.log(`❌ Sheet ${sheetName} not found`);
    return { processed: 0, found: 0 };
  }
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    Logger.log(`📝 Sheet ${sheetName} has no data rows`);
    return { processed: 0, found: 0 };
  }
  
  // GET COLUMN P DATA FIRST - This is the key fix
  const emailRange = sheet.getRange(2, 16, lastRow - 1, 1); // Column P, rows 2-end
  const emailData = emailRange.getValues();
  
  // GET COLUMN D DATA (URLs)
  const urlRange = sheet.getRange(2, 4, lastRow - 1, 1); // Column D, rows 2-end
  const urlData = urlRange.getValues();
  
  // Ensure header exists
  if (sheet.getRange(1, 16).getValue() === '') {
    sheet.getRange(1, 16).setValue('Extracted Emails');
  }
  
  let processed = 0;
  let found = 0;
  let skipped = 0;
  
  Logger.log(`📊 ${sheetName}: Checking ${lastRow - 1} data rows`);
  
  for (let i = 0; i < urlData.length; i++) {
    const url = urlData[i][0];
    const currentEmail = emailData[i][0];
    const rowNumber = i + 2; // Actual row in sheet (2 = row 2, etc.)
    
    // DEBUG: Show what we're checking
    Logger.log(`Row ${rowNumber}: URL="${url}", CurrentEmail="${currentEmail}"`);
    
    // BULLETPROOF CHECK: Skip if Column P has ANY content
    if (currentEmail && currentEmail !== "") {
      skipped++;
      Logger.log(`⏭️ SKIPPING row ${rowNumber}: Column P already has data: "${currentEmail}"`);
      continue;
    }
    
    // Check if URL is valid
    if (url && url.toString().trim() !== '' && url.toString().trim() !== 'No Website') {
      Logger.log(`🔍 PROCESSING row ${rowNumber}: ${url}`);
      
      let emails = extractEmailConservative(url.toString().trim());
      if (emails === "No email found") {
        emails = extractEmailFromWebsite(url.toString().trim());
      }
      
      // Write result to Column P
      sheet.getRange(rowNumber, 16).setValue(emails);
      
      if (emails !== "No email found" && emails !== "No URL" && emails !== "Fetch error") {
        found++;
        Logger.log(`✅ FOUND: ${emails}`);
      } else {
        Logger.log(`❌ No email found`);
      }
      
      processed++;
      SpreadsheetApp.flush();
      
    } else {
      Logger.log(`⏭️ SKIPPING row ${rowNumber}: No valid URL`);
      sheet.getRange(rowNumber, 16).setValue('No URL');
    }
    
    // Rate limiting
    if (i < urlData.length - 1) {
      Utilities.sleep(4000);
    }
  }
  
  Logger.log(`✅ ${sheetName}: ${processed} processed, ${found} found, ${skipped} skipped`);
  return { processed: processed, found: found, skipped: skipped };
}

// ULTRA-SIMPLE TEST - Process just 2 rows to verify skipping works
function testBulletproof() {
  const sheetName = 'ELECTRONICS STORE_clean';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (!sheet) return;
  
  // Process only first 3 rows to test
  const testRows = 3;
  
  // Get current data from Column P
  const emailRange = sheet.getRange(2, 16, testRows, 1);
  const emailData = emailRange.getValues();
  
  // Get URLs from Column D
  const urlRange = sheet.getRange(2, 4, testRows, 1);
  const urlData = urlRange.getValues();
  
  Logger.log("=== BULLETPROOF TEST ===");
  
  for (let i = 0; i < testRows; i++) {
    const url = urlData[i][0];
    const currentEmail = emailData[i][0];
    const rowNumber = i + 2;
    
    Logger.log(`TEST Row ${rowNumber}: Email cell content = "${currentEmail}"`);
    
    if (currentEmail && currentEmail !== "") {
      Logger.log(`✅ WOULD SKIP row ${rowNumber} - already has data`);
    } else {
      Logger.log(`✅ WOULD PROCESS row ${rowNumber} - empty cell`);
    }
  }
  
  Browser.msgBox(
    'Bulletproof Test Complete',
    'Check logs to see if skipping works. If it shows "WOULD SKIP" for rows with data, then run processAllSheetsResume()',
    Browser.Buttons.OK
  );
}

// CHECK CURRENT COLUMN P STATUS
function debugColumnP() {
  const sheetName = 'ELECTRONICS STORE_clean';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (!sheet) return;
  
  const lastRow = Math.min(sheet.getLastRow(), 10); // Check first 10 rows
  const emailRange = sheet.getRange(2, 16, lastRow - 1, 1);
  const emailData = emailRange.getValues();
  
  Logger.log("=== DEBUG COLUMN P ===");
  for (let i = 0; i < emailData.length; i++) {
    Logger.log(`Row ${i + 2}: "${emailData[i][0]}"`);
  }
  
  Browser.msgBox(
    'Column P Debug',
    `Checked first ${emailData.length} rows in Column P. See logs for details.`,
    Browser.Buttons.OK
  );
}
