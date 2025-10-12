// COMPLETE WEBSITE ANALYSIS TOOLKIT

// 1. MAIN ANALYSIS FUNCTION
function analyzeWebsite(url) {
  if (!url || url === "" || url === "No Website") {
    return "No URL";
  }
  
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http')) {
    cleanUrl = 'https://' + cleanUrl;
  }
  
  try {
    Utilities.sleep(2000);
    
    const options = {
      muteHttpExceptions: true,
      followRedirects: true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 30000
    };
    
    const response = UrlFetchApp.fetch(cleanUrl, options);
    const html = response.getContentText();
    const headers = response.getHeaders();
    
    const analysis = {
      url: cleanUrl,
      hasGoogleAnalytics: checkForGA4(html),
      hasGoogleTagManager: checkForGTM(html),
      hasFacebookPixel: checkForFacebookPixel(html),
      hasGoogleAds: checkForGoogleAds(html),
      hasMetaTags: checkMetaTags(html),
      hasStructuredData: checkStructuredData(html),
      isMobileFriendly: checkMobileFriendly(html),
      hasContactForm: checkContactForm(html),
      hasLiveChat: checkLiveChat(html),
      pageLoadTime: response.getResponseCode() === 200 ? 'Fast' : 'Slow',
      ssl: cleanUrl.startsWith('https'),
      technologies: detectTechnologies(html, headers)
    };
    
    return analysis;
    
  } catch (error) {
    return { error: error.toString() };
  }
}

// 2. SUPPORTING ANALYSIS FUNCTIONS
function checkForGA4(html) {
  const ga4Patterns = [
    /gtag\s*\(\s*['"]config['"]\s*,\s*['"](G-[A-Z0-9]+)['"]/gi,
    /google-analytics.com\/g\/collect/gi,
    /gtag\s*\(\s*['"]event['"]/gi
  ];
  return ga4Patterns.some(pattern => pattern.test(html));
}

function checkForGTM(html) {
  const gtmPatterns = [
    /googletagmanager.com\/gtm.js/gi,
    /GTM-[A-Z0-9]+/gi,
    /Google Tag Manager/gi
  ];
  return gtmPatterns.some(pattern => pattern.test(html));
}

function checkForFacebookPixel(html) {
  const fbPatterns = [
    /facebook.com\/tr\?/gi,
    /fbq\s*\(\s*['"]init['"]/gi,
    /connect.facebook.net\/en_US\/fbevents.js/gi
  ];
  return fbPatterns.some(pattern => pattern.test(html));
}

function checkForGoogleAds(html) {
  const adsPatterns = [
    /googletagservices.com\/tag\/js\/gpt.js/gi,
    /www.googleadservices.com/gi,
    /googleads.g.doubleclick.net/gi,
    /gtag\s*\(\s*['"]conversion['"]/gi
  ];
  return adsPatterns.some(pattern => pattern.test(html));
}

function checkMetaTags(html) {
  return {
    hasDescription: /<meta\s+name="description"/gi.test(html),
    hasOpenGraph: /<meta\s+property="og:/gi.test(html),
    hasTwitterCard: /<meta\s+name="twitter:/gi.test(html),
    hasViewport: /<meta\s+name="viewport"/gi.test(html)
  };
}

function checkStructuredData(html) {
  const structuredDataPatterns = [
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi,
    /schema.org/gi,
    /itemtype=/gi,
    /itemprop=/gi
  ];
  return structuredDataPatterns.some(pattern => pattern.test(html));
}

function checkMobileFriendly(html) {
  return /<meta\s+name="viewport"/gi.test(html) && 
         !/user-scalable=no/gi.test(html);
}

function checkContactForm(html) {
  const formPatterns = [
    /<form[^>]*contact/gi,
    /<form[^>]*newsletter/gi,
    /type=["']email["']/gi,
    /action=["'][^"']*contact/gi
  ];
  return formPatterns.some(pattern => pattern.test(html));
}

function checkLiveChat(html) {
  const chatPatterns = [
    /livechatinc.com/gi,
    /tawk.to/gi,
    /intercom/gi,
    /zendesk.com/gi,
    /drift.com/gi,
    /olark.com/gi
  ];
  return chatPatterns.some(pattern => pattern.test(html));
}

function detectTechnologies(html, headers) {
  const technologies = [];
  
  // CMS Detection
  if (/wp-content|wp-includes|wordpress/gi.test(html)) technologies.push('WordPress');
  if (/shopify/gi.test(html)) technologies.push('Shopify');
  if (/woocommerce/gi.test(html)) technologies.push('WooCommerce');
  if (/magento/gi.test(html)) technologies.push('Magento');
  if (/wix/gi.test(html)) technologies.push('Wix');
  if (/squarespace/gi.test(html)) technologies.push('Squarespace');
  
  // JavaScript Frameworks
  if (/react|react-dom/gi.test(html)) technologies.push('React');
  if (/vue/gi.test(html)) technologies.push('Vue');
  if (/angular/gi.test(html)) technologies.push('Angular');
  if (/jquery/gi.test(html)) technologies.push('jQuery');
  
  return technologies.length > 0 ? technologies : ['Unknown'];
}

// 3. OPPORTUNITY SUMMARY GENERATOR
function generateOpportunitySummary(analysis) {
  if (analysis.error) return { opportunities: [], strengths: [], technologies: [], totalOpportunities: 0 };
  
  const opportunities = [];
  const strengths = [];
  
  // Check for opportunities
  if (!analysis.hasGoogleAnalytics) {
    opportunities.push("GA4 not installed - Missing website analytics");
  }
  
  if (!analysis.hasGoogleTagManager) {
    opportunities.push("Google Tag Manager missing - Hard to manage tracking codes");
  }
  
  if (!analysis.hasFacebookPixel) {
    opportunities.push("Facebook Pixel not found - Missing social media tracking");
  }
  
  if (!analysis.hasGoogleAds) {
    opportunities.push("Google Ads tracking not detected - Missing conversion tracking");
  }
  
  if (!analysis.hasMetaTags.hasDescription) {
    opportunities.push("Meta description missing - Poor SEO optimization");
  }
  
  if (!analysis.hasMetaTags.hasOpenGraph) {
    opportunities.push("Open Graph tags missing - Poor social media sharing");
  }
  
  if (!analysis.hasStructuredData) {
    opportunities.push("Structured data missing - Poor SEO rich results");
  }
  
  if (!analysis.isMobileFriendly) {
    opportunities.push("Mobile optimization issues - Poor mobile experience");
  }
  
  if (!analysis.hasContactForm) {
    opportunities.push("Contact form not detected - Missing lead capture");
  }
  
  if (!analysis.hasLiveChat) {
    opportunities.push("Live chat not installed - Missing instant customer service");
  }
  
  // Check strengths
  if (analysis.hasGoogleAnalytics) strengths.push("GA4 installed");
  if (analysis.hasGoogleTagManager) strengths.push("Google Tag Manager installed");
  if (analysis.hasFacebookPixel) strengths.push("Facebook Pixel installed");
  if (analysis.ssl) strengths.push("SSL secured");
  if (analysis.isMobileFriendly) strengths.push("Mobile friendly");
  
  return {
    opportunities: opportunities,
    strengths: strengths,
    technologies: analysis.technologies,
    totalOpportunities: opportunities.length
  };
}

// 4. DETAILED ANALYSIS GENERATOR
function generateDetailedAnalysis(analysis) {
  if (analysis.error) return "Analysis failed: " + analysis.error;
  
  const summary = generateOpportunitySummary(analysis);
  
  let detailedText = `📊 OPPORTUNITIES: ${summary.totalOpportunities}\n`;
  detailedText += `🛠 TECH: ${summary.technologies.join(', ')}\n`;
  detailedText += `✅ STRENGTHS: ${summary.strengths.length > 0 ? summary.strengths.join(', ') : 'None found'}\n\n`;
  
  // Group opportunities by category
  const categories = {
    '📈 Analytics & Tracking': [],
    '🔍 SEO & Meta': [],
    '📱 Mobile & UX': [],
    '💼 Business Tools': []
  };
  
  summary.opportunities.forEach(opp => {
    if (opp.includes('GA4') || opp.includes('Tag Manager') || opp.includes('Pixel') || opp.includes('Ads')) {
      categories['📈 Analytics & Tracking'].push(opp);
    } else if (opp.includes('Meta') || opp.includes('SEO') || opp.includes('Structured')) {
      categories['🔍 SEO & Meta'].push(opp);
    } else if (opp.includes('Mobile')) {
      categories['📱 Mobile & UX'].push(opp);
    } else {
      categories['💼 Business Tools'].push(opp);
    }
  });
  
  // Add categorized opportunities
  Object.entries(categories).forEach(([category, opportunities]) => {
    if (opportunities.length > 0) {
      detailedText += `${category}:\n`;
      opportunities.forEach(opp => {
        detailedText += `• ${opp}\n`;
      });
      detailedText += '\n';
    }
  });
  
  return detailedText;
}

// 5. MAIN DETAILED ANALYSIS FUNCTION
function analyzeSingleSheetDetailed(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) return { processed: 0, results: [] };
  
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return { processed: 0, results: [] };
  
  // GET COLUMN Q DATA FIRST
  const analysisRange = sheet.getRange(2, 17, lastRow - 1, 1);
  const analysisData = analysisRange.getValues();
  const urlRange = sheet.getRange(2, 4, lastRow - 1, 1);
  const urlData = urlRange.getValues();
  const emailRange = sheet.getRange(2, 16, lastRow - 1, 1);
  const emailData = emailRange.getValues();
  
  // Ensure analysis header exists
  if (sheet.getRange(1, 17).getValue() === '') {
    sheet.getRange(1, 17).setValue('Detailed Analysis');
  }
  
  let processed = 0;
  let results = [];
  
  for (let i = 0; i < urlData.length; i++) {
    const url = urlData[i][0];
    const currentAnalysis = analysisData[i][0];
    const email = emailData[i][0];
    const rowNumber = i + 2;
    
    // SKIP if already analyzed
    if (currentAnalysis && currentAnalysis !== "") {
      Logger.log(`⏭️ SKIPPING row ${rowNumber}: Already analyzed`);
      continue;
    }
    
    if (url && url.toString().trim() !== '' && url.toString().trim() !== 'No Website') {
      Logger.log(`🔍 ANALYZING row ${rowNumber}: ${url}`);
      
      const analysis = analyzeWebsite(url.toString().trim());
      const detailedAnalysis = generateDetailedAnalysis(analysis);
      
      sheet.getRange(rowNumber, 17).setValue(detailedAnalysis);
      
      if (analysis.error) {
        Logger.log(`❌ Analysis failed for ${url}`);
      } else {
        const summary = generateOpportunitySummary(analysis);
        results.push({
          sheet: sheetName,
          url: url,
          email: email,
          opportunities: summary.opportunities,
          totalOpportunities: summary.totalOpportunities,
          rowNumber: rowNumber
        });
        processed++;
        Logger.log(`✅ Detailed analysis complete: ${summary.totalOpportunities} opportunities`);
      }
      
      SpreadsheetApp.flush();
    } else {
      sheet.getRange(rowNumber, 17).setValue('No valid URL');
    }
    
    if (i < urlData.length - 1) Utilities.sleep(4000);
  }
  
  return { processed: processed, results: results };
}

// 6. ANALYZE ALL SHEETS WITH DETAILED ANALYSIS
function analyzeAllWebsitesDetailed() {
  const sheetNames = [
    'EXAMPLE1',
    'EXAMPLE2',];
  
  let allResults = [];
  let totalProcessed = 0;
  
  for (const sheetName of sheetNames) {
    Logger.log(`=== DETAILED ANALYSIS: ${sheetName} ===`);
    
    const sheetResult = analyzeSingleSheetDetailed(sheetName);
    allResults = allResults.concat(sheetResult.results);
    totalProcessed += sheetResult.processed;
    
    Logger.log(`Completed: ${sheetName} - ${sheetResult.processed} analyzed`);
    
    if (sheetName !== sheetNames[sheetNames.length - 1]) {
      Utilities.sleep(3000);
    }
  }
  
  Browser.msgBox(
    'Detailed Analysis Complete', 
    `Analyzed ${totalProcessed} websites with detailed insights. Check Column Q.`, 
    Browser.Buttons.OK
  );
  
  return allResults;
}

// 7. MASTER PLAYBOOK CREATOR
function createMasterPlaybook() {
  const sheetNames = [
    'ELECTRONICS STORE_clean', 'PHARMACY_clean', 'CAR DEALER_clean',
    'REAL ESTATE AGENCY_clean', 'HOTEL_clean', 'SUPERMARKET_clean',
    'BEAUTY SALON_clean', 'CAFE_clean', 'GYM_clean', 'RESTAURANT_clean'
  ];
  
  const doc = DocumentApp.create('Master Digital Growth Playbook');
  const body = doc.getBody();
  
  body.appendParagraph('MASTER DIGITAL GROWTH PLAYBOOK').setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph(`Generated on: ${new Date().toLocaleDateString()}`).setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendParagraph('');
  
  let totalBusinesses = 0;
  let totalOpportunities = 0;
  
  for (const sheetName of sheetNames) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) continue;
    
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) continue;
    
    const dataRange = sheet.getRange(1, 1, lastRow, 17);
    const data = dataRange.getValues();
    
    body.appendParagraph(`🏢 ${sheetName.replace('_clean', '')}`).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    for (let i = 1; i < data.length; i++) {
      const url = data[i][3];
      const email = data[i][15];
      const analysis = data[i][16];
      
      if (url && url !== 'No Website' && analysis && typeof analysis === 'string' && analysis.includes('OPPORTUNITIES:')) {
        totalBusinesses++;
        
        body.appendParagraph(`Business: ${url}`).setHeading(DocumentApp.ParagraphHeading.HEADING2);
        if (email && email !== 'No email found') {
          body.appendParagraph(`Contact: ${email}`);
        }
        
        // Extract opportunity count
        const oppMatch = analysis.match(/OPPORTUNITIES: (\d+)/);
        if (oppMatch) totalOpportunities += parseInt(oppMatch[1]);
        
        body.appendParagraph(analysis);
        body.appendParagraph('─'.repeat(50));
        body.appendParagraph('');
      }
    }
  }
  
  // Add summary
  body.appendParagraph('📈 EXECUTIVE SUMMARY').setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(`Total Businesses: ${totalBusinesses}`);
  body.appendParagraph(`Total Opportunities Identified: ${totalOpportunities}`);
  body.appendParagraph(`Average Opportunities per Business: ${totalBusinesses > 0 ? (totalOpportunities / totalBusinesses).toFixed(1) : 0}`);
  
  doc.saveAndClose();
  
  const docUrl = doc.getUrl();
  Browser.msgBox(
    'Master Playbook Created!',
    `Created playbook with ${totalBusinesses} businesses and ${totalOpportunities} opportunities.\n\nDoc: ${docUrl}`,
    Browser.Buttons.OK
  );
  
  return docUrl;
}
