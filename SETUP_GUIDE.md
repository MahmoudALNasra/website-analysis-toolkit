# Setup Guide

## Prerequisites

- Google Account
- Google Sheets with business data
- Basic understanding of Google Apps Script

## Step-by-Step Setup

### 1. Prepare Your Google Sheet

Your spreadsheet should have these columns:
- Column A-O: Business data (name, address, etc.)
- Column D: Website URLs
- Column P: Extracted emails (auto-filled)
- Column Q: Website analysis (auto-filled)

### 2. Install the Script

1. Open your Google Sheet
2. Click `Extensions` → `Apps Script`
3. Delete any existing code
4. Copy and paste the entire content from `website-analysis-toolkit.gs`
5. Save the project (Ctrl+S)
6. Name it "Website Analysis Toolkit"

### 3. Configure Sheets

Ensure your sheets are named exactly: -- add all your tab names in your google sheet 



### 4. Run Initial Test

1. In Apps Script, select `testSingleAnalysis` function
2. Click `Run`
3. Authorize the script when prompted
4. Check logs for any errors

### 5. Start Processing

Run in this order:
1. `analyzeAllWebsitesDetailed()` - for website analysis
2. `createMasterPlaybook()` - for reporting

## Configuration Options

### Modify Sheet Names
Edit the `sheetNames` array in any function to process different sheets.

### Adjust Rate Limiting
Change `Utilities.sleep(4000)` to adjust delays between requests.

### Custom Analysis
Modify `analyzeWebsite()` to check for different technologies.

## Troubleshooting

### Common Issues

**Script Timeouts**
- Use resume functions
- Process in smaller batches
- Increase delays between requests

**Authorization Errors**
- Ensure you're signed into correct Google account
- Check script permissions

**No Results**
- Verify website URLs are valid
- Check internet connectivity
- Review script execution logs

### Performance Tips

- Start with small batches using test functions
- Use resume functions for large datasets
- Monitor execution time in logs
- Process during off-peak hours

## Security Notes

- The script only reads public website data
- No sensitive data is stored externally
- All processing happens within Google's ecosystem
- Regular Google security protocols apply
