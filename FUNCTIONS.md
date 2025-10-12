# Function Documentation

## Core Analysis Functions

### `analyzeWebsite(url)`
**Purpose**: Comprehensive website technical analysis
**Parameters**: 
- `url` (String): Website URL to analyze
**Returns**: Object containing analysis results
**Features**:
- Checks for GA4, GTM, Facebook Pixel, Google Ads
- Analyzes meta tags and SEO elements
- Detects mobile optimization
- Identifies technology stack

### `extractEmailFromWebsite(url)`
**Purpose**: Extract email addresses from website content
**Parameters**:
- `url` (String): Website URL to scan
**Returns**: String of comma-separated email addresses
**Features**:
- Multiple extraction strategies
- False positive filtering
- HTML entity decoding
- Conservative and advanced modes

### `generateDetailedAnalysis(analysis)`
**Purpose**: Generate formatted analysis report
**Parameters**:
- `analysis` (Object): Raw analysis data from analyzeWebsite()
**Returns**: Formatted string for spreadsheet display
**Features**:
- Categorizes opportunities (Analytics, SEO, Mobile, Business Tools)
- Includes technology detection
- Strength identification
- Priority indication

## Batch Processing Functions

### `analyzeAllWebsitesDetailed()`
**Purpose**: Process all websites across all sheets with detailed analysis
**Parameters**: None
**Returns**: Array of analysis results
**Features**:
- Processes all configured sheets
- Resume capability (skips already analyzed rows)
- Rate limiting to avoid overwhelming servers
- Progress logging

### `processAllSheetsResume()`
**Purpose**: Extract emails from all sheets with resume capability
**Parameters**: None
**Returns**: Processing statistics
**Features**:
- Smart skipping of processed rows
- Graceful timeout handling
- Cross-sheet processing
- Completion reporting

## Reporting Functions

### `createMasterPlaybook()`
**Purpose**: Generate comprehensive Google Docs playbook
**Parameters**: None
**Returns**: Google Docs URL
**Features**:
- Aggregates all analysis data
- Creates professional document
- Executive summary
- Priority categorization
- Industry segmentation

### `getAnalysisProgress()`
**Purpose**: Generate progress report across all sheets
**Parameters**: None
**Returns**: Formatted progress report
**Features**:
- Percentage completion per sheet
- Total opportunities identified
- Processing statistics
- Visual progress indicators

## Utility Functions

### `generateOpportunitySummary(analysis)`
**Purpose**: Convert analysis to opportunity-focused summary
**Parameters**:
- `analysis` (Object): Raw analysis data
**Returns**: Object with categorized opportunities and strengths

### `getRecommendations(opportunity)`
**Purpose**: Get specific recommendations for identified opportunities
**Parameters**:
- `opportunity` (String): Specific opportunity description
**Returns**: Array of actionable recommendations

## Configuration
The toolkit processes these sheets by default:
- ELECTRONICS STORE_clean
- PHARMACY_clean
- CAR DEALER_clean
- REAL ESTATE AGENCY_clean
- HOTEL_clean
- SUPERMARKET_clean
- BEAUTY SALON_clean
- CAFE_clean
- GYM_clean
- RESTAURANT_clean

Modify the `sheetNames` array in functions to customize.
