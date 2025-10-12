# Usage Examples & Workflows

## Basic Workflow

### 1. Initial Setup & Testing
```javascript
// Test single website analysis
testSingleAnalysis();

// Test email extraction
testSingleWebsite();

// Check current progress
getAnalysisProgress();

// Analyze all websites (run this first)
analyzeAllWebsitesDetailed();

// Create comprehensive report (run after analysis)
createMasterPlaybook();

// Extract emails from all websites
processAllSheetsResume();

// 1. Quick analysis to identify high-potential leads
quickAnalysis();

// 2. Focus on high-opportunity businesses
getAnalysisProgress();

// 3. Extract contact information
processAllSheetsResume();

// 4. Create client proposals
createMasterPlaybook();

// When script times out (6-minute limit), simply rerun:
analyzeAllWebsitesDetailed();
// It automatically skips processed rows


// Modify to focus on specific industries
function analyzeRestaurantsOnly() {
  const sheetNames = ['RESTAURANT_clean', 'CAFE_clean'];
  // Custom analysis logic for food industry
}


