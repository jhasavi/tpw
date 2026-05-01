# JanaGana CRM Manual Import Guide

## **🔍 Current Situation Analysis**

After testing the JanaGana API, we discovered that:

1. **API Access**: The JanaGana system is primarily designed as a JavaScript widget system
2. **Direct API**: No direct REST API available for programmatic event creation
3. **Authentication**: API key authentication doesn't provide access to event management endpoints
4. **Widget Integration**: Current system uses `window.Janagana.events()` JavaScript widget

## **🎯 Recommended Import Strategy**

### **Option 1: Manual Dashboard Import (Recommended)**

#### **Step 1: Access JanaGana Dashboard**
1. Navigate to: https://janagana.namasteneedham.com
2. Log in with your credentials
3. Navigate to "purple-wings" organization
4. Access the Events management section

#### **Step 2: Upload Event Images**
1. Go to Media/Library section
2. Upload the following images from `/public/images/`:
   - `Class-1.jpeg` - Basics of Finance
   - `Class-2.jpg` - Investing Workshop
   - `Class-3.jpg` - Insurance Workshop
   - `Class-4.jpeg` - Real Estate Workshop
   - `seminar.jpg` - Tax Strategies
   - `team.jpg` - Mortgage Workshop
   - `learners-1.jpg` - Spring Series 1
   - `learners-2.jpg` - Spring Series 2
   - `learners-3.jpg` - Spring Series 3
   - `1st-gathering_Jul23-2.jpeg` - First Gathering

#### **Step 3: Create Events Manually**
Use the data from the CSV file to create each event:

**Event 1: Basics of Finance**
- Title: "Basics of Finance"
- Date: October 3, 2024
- Location: "High Rock School, 77 Ferndale Road, Needham, MA"
- Speaker: "Bank of America Financial Education Team"
- Description: "Essential introduction to personal finance fundamentals. Covered banking basics, budgeting, credit scores, and emergency funds."
- Category: "Financial Basics"
- Image: Upload and select "Class-1.jpeg"
- Status: "Completed/Past"
- Attendees: 45

**Event 2: Investing in Stocks and Building Retirement**
- Title: "Investing in Stocks and Building Retirement"
- Date: October 10, 2024
- Location: "High Rock School, 77 Ferndale Road, Needham, MA"
- Speaker: "Vikram - Investment Specialist"
- Description: "Stock market fundamentals and retirement planning strategies. Topics included 401k, IRA accounts, portfolio diversification, and long-term wealth building."
- Category: "Investing"
- Image: Upload and select "Class-2.jpg"
- Status: "Completed/Past"
- Attendees: 42

**Continue with all 10 events...**

### **Option 2: CSV Import (If Available)**

If JanaGana dashboard supports CSV import:

1. **Prepare CSV File**: Use `past-events-import.csv`
2. **Upload Images First**: Ensure all images are in the media library
3. **Import CSV**: Use the dashboard's import functionality
4. **Link Images**: Manually associate images with events after import

### **Option 3: Contact JanaGana Support**

For API access or bulk import assistance:

1. **Request API Access**: Contact JanaGana support for programmatic access
2. **Bulk Import Service**: Ask about bulk import services
3. **Custom Integration**: Discuss custom integration options

## **📋 Complete Event Data Reference**

### **Fall 2024 Series**

| Event | Date | Speaker | Category | Image | Attendees |
|-------|------|---------|----------|-------|-----------|
| Basics of Finance | Oct 3, 2024 | Bank of America Team | Financial Basics | Class-1.jpeg | 45 |
| Investing in Stocks | Oct 10, 2024 | Vikram - Investment Specialist | Investing | Class-2.jpg | 42 |
| Life Insurance Assets | Oct 17, 2024 | Padma - Insurance Specialist | Insurance | Class-3.jpg | 38 |
| Real Estate Planning | Oct 24, 2024 | Sanjeev - Real Estate Expert | Real Estate | Class-4.jpeg | 48 |
| Tax Saving Strategies | Nov 7, 2024 | Jan - Tax Planning Specialist | Taxes | seminar.jpg | 45 |
| Mortgage Strategies | Nov 14, 2024 | Darren - Mortgage Specialist | Real Estate | team.jpg | 43 |

### **Spring 2024 Series**

| Event | Date | Speaker | Category | Image | Attendees |
|-------|------|---------|----------|-------|-----------|
| Financial Series 1 | May 16, 2024 | Purple Wings Team | Financial Basics | learners-1.jpg | 45 |
| Financial Series 2 | May 23, 2024 | Purple Wings Investment Team | Investing | learners-2.jpg | 42 |
| Financial Series 3 | May 30, 2024 | Estate Planning Experts | Retirement | learners-3.jpg | 38 |

### **Historical Events**

| Event | Date | Speaker | Category | Image | Attendees |
|-------|------|---------|----------|-------|-----------|
| Community Gathering | Jul 23, 2023 | Shalini Jha & Partners | Community | 1st-gathering_Jul23-2.jpeg | 35 |

## **🖼️ Image Upload Checklist**

Before creating events, ensure these images are uploaded:

- [ ] `Class-1.jpeg` - Basics of Finance event photo
- [ ] `Class-2.jpg` - Investing workshop photo  
- [ ] `Class-3.jpg` - Insurance workshop photo
- [ ] `Class-4.jpeg` - Real estate workshop photo
- [ ] `seminar.jpg` - Tax strategies seminar photo
- [ ] `team.jpg` - Mortgage workshop team photo
- [ ] `learners-1.jpg` - Spring series group photo 1
- [ ] `learners-2.jpg` - Spring series group photo 2
- [ ] `learners-3.jpg` - Spring series group photo 3
- [ ] `1st-gathering_Jul23-2.jpeg` - First community gathering photo

## **⚙️ Event Configuration Settings**

For each event, set these parameters:

### **Basic Settings:**
- **Title**: Use exact title from reference table
- **Date**: Use exact date format (MM/DD/YYYY)
- **Location**: Copy exact address from reference
- **Speaker**: Use exact speaker name/title
- **Description**: Copy full description from CSV

### **Advanced Settings:**
- **Status**: Set to "Completed" or "Past"
- **Category**: Use category from reference table
- **Image**: Select corresponding uploaded image
- **Registration**: Set to "Closed" (past events)
- **Attendees**: Set actual attendee count
- **Tags**: Add category tags for filtering

### **Display Settings:**
- **Show in Past Events**: ✅ Enable
- **Show in Upcoming Events**: ❌ Disable
- **Allow Registration**: ❌ Disable (past events)
- **Display Attendee Count**: ✅ Enable

## **🎯 Expected Outcome**

After successful manual import:

1. **Events Display**: All 10 past events appear in JanaGana widget
2. **Consistent Design**: Same look and feel as future events
3. **Unified Management**: Single system for all events
4. **Better Analytics**: Comprehensive event tracking
5. **Improved UX**: Consistent event cards and filtering

## **📊 Validation Checklist**

After importing all events, verify:

- [ ] All 10 events appear in the JanaGana widget
- [ ] Event images display correctly
- [ ] Event titles and descriptions match exactly
- [ ] Event dates are correct
- [ ] Speaker information is accurate
- [ ] Categories and tags are properly set
- [ ] Events show as "completed/past"
- [ ] Registration is disabled for past events
- [ ] Mobile display works correctly
- [ ] Filtering by category works

## **🚀 Next Steps After Import**

Once events are imported into JanaGana:

1. **Test Widget Display**: Verify events appear on website
2. **Remove Hard-coded Events**: Update website to use only JanaGana
3. **Test Functionality**: Verify all event features work
4. **Monitor Performance**: Check load times and user experience
5. **Update Documentation**: Record the import process

## **📞 Support Resources**

If you encounter issues:

1. **JanaGana Documentation**: Check dashboard help section
2. **Contact Support**: Reach out to JanaGana support team
3. **Community Forums**: Check JanaGana community forums
4. **Technical Assistance**: Contact your JanaGana account manager

---

**Ready to proceed with manual import into JanaGana CRM!** 🎯

This approach ensures all past events are properly imported with correct metadata, images, and configuration for consistent display with future events.
