# JanaGana CRM Import Guide - Past Events Data

## **📋 Current Past Events Data Structure**

The current hard-coded events contain the following data that can be imported into JanaGana CRM:

### **Event Data Fields Available:**

```typescript
interface Event {
  id: string                    // Unique identifier
  title: string                 // Event name
  date: string                  // Event date (e.g., "October 3, 2024")
  location: string              // Venue address
  speaker: string               // Speaker name/team
  description: string           // Event description
  category: string              // Topic category
  image: string                 // Cover image path
  attendees?: number            // Number of attendees
}
```

## **🗂️ Complete Past Events List to Import:**

### **1. Fall 2024 Series**
- **Basics of Finance** - October 3, 2024
  - Speaker: Bank of America Financial Education Team
  - Location: High Rock School, Needham, MA
  - Image: `/images/Class-1.jpeg`
  - Attendees: 45
  - Category: Financial Basics

- **Investing in Stocks and Building Retirement** - October 10, 2024
  - Speaker: Vikram - Investment Specialist
  - Location: High Rock School, Needham, MA
  - Image: `/images/Class-2.jpg`
  - Attendees: 42
  - Category: Investing

- **How Life Insurance Builds Assets** - October 17, 2024
  - Speaker: Padma - Insurance Specialist
  - Location: High Rock School, Needham, MA
  - Image: `/images/Class-3.jpg`
  - Attendees: 38
  - Category: Insurance

- **Real Estate for Retirement and College Planning** - October 24, 2024
  - Speaker: Sanjeev - Real Estate Investment Expert
  - Location: High Rock School, Needham, MA
  - Image: `/images/Class-4.jpeg`
  - Attendees: 48
  - Category: Real Estate

- **Tax Saving Strategies** - November 7, 2024
  - Speaker: Jan - Tax Planning Specialist
  - Location: High Rock School, Needham, MA
  - Image: `/images/seminar.jpg`
  - Attendees: 45
  - Category: Taxes

- **Making Real Estate Work with the Right Mortgage** - November 14, 2024
  - Speaker: Darren - Mortgage Specialist
  - Location: High Rock School, Needham, MA
  - Image: `/images/team.jpg`
  - Attendees: 43
  - Category: Real Estate

### **2. Spring 2024 Series**
- **Spring Financial Education Series - Session 1** - May 16, 2024
  - Speaker: Purple Wings Financial Education Team
  - Location: High Rock School, Needham, MA
  - Image: `/images/learners-1.jpg`
  - Attendees: 45
  - Category: Financial Basics

- **Spring Financial Education Series - Session 2** - May 23, 2024
  - Speaker: Purple Wings Investment Team
  - Location: High Rock School, Needham, MA
  - Image: `/images/learners-2.jpg`
  - Attendees: 42
  - Category: Investing

- **Spring Financial Education Series - Session 3** - May 30, 2024
  - Speaker: Estate Planning Experts
  - Location: High Rock School, Needham, MA
  - Image: `/images/learners-3.jpg`
  - Attendees: 38
  - Category: Retirement

### **3. Historical Events**
- **Community Financial Literacy Gathering** - July 23, 2023
  - Speaker: Shalini Jha & Community Partners
  - Location: Needham Community Center
  - Image: `/images/1st-gathering_Jul23-2.jpeg`
  - Attendees: 35
  - Category: Community

## **🖼️ Image Assets Available:**

### **Event Cover Images:**
- `/images/Class-1.jpeg` - Basics of Finance
- `/images/Class-2.jpg` - Investing Workshop
- `/images/Class-3.jpg` - Insurance Workshop
- `/images/Class-4.jpeg` - Real Estate Workshop
- `/images/seminar.jpg` - Tax Strategies
- `/images/team.jpg` - Mortgage Workshop
- `/images/learners-1.jpg` - Spring Series 1
- `/images/learners-2.jpg` - Spring Series 2
- `/images/learners-3.jpg` - Spring Series 3
- `/images/1st-gathering_Jul23-2.jpeg` - First Gathering

## **📊 Categories Used:**
- Financial Basics
- Investing
- Insurance
- Real Estate
- Taxes
- Retirement
- Community

## **🏢 Standard Location:**
- **Primary**: High Rock School, 77 Ferndale Road, Needham, MA
- **Secondary**: Needham Community Center

## **🔄 Import Strategy Options:**

### **Option 1: Manual Import**
1. Log into JanaGana CRM
2. Navigate to "purple-wings" organization
3. Create each event manually
4. Upload images to JanaGana media library
5. Link images to events
6. Set event status to "completed/past"

### **Option 2: Bulk Import via CSV**
Create CSV file with columns:
```
title,date,location,speaker,description,category,image,attendees,status
"Basics of Finance","2024-10-03","High Rock School, 77 Ferndale Road, Needham, MA","Bank of America Financial Education Team","Essential introduction to personal finance fundamentals...","Financial Basics","Class-1.jpeg",45,"completed"
```

### **Option 3: API Integration**
- Use JanaGana API endpoints
- Programmatically import all events
- Batch upload images
- Set metadata and categories

## **🎯 Benefits of Importing to JanaGana:**

### **Unified Event Management:**
- Single system for past and future events
- Consistent look and feel
- Centralized event data
- Better analytics and reporting

### **Enhanced Features:**
- Event analytics and insights
- Attendee management
- Registration history
- Email marketing integration
- Social media sharing

### **Improved User Experience:**
- Consistent event cards design
- Better search and filtering
- Mobile-optimized display
- Integrated registration flow

## **📋 Implementation Plan:**

### **Phase 1: Data Preparation**
1. ✅ Extract all event data from current codebase
2. ✅ Organize images for upload
3. ✅ Create import template
4. ⏳ Test with sample event

### **Phase 2: Import Process**
1. ⏳ Upload images to JanaGana media library
2. ⏳ Import events with metadata
3. ⏳ Set event categories and tags
4. ⏳ Configure event status (completed)

### **Phase 3: Integration Update**
1. ⏳ Update website to use JanaGana for all events
2. ⏳ Remove hard-coded past events
3. ⏳ Test event display and filtering
4. ⏳ Verify image loading and display

### **Phase 4: Validation**
1. ⏳ Test all event pages
2. ⏳ Verify image display
3. ⏳ Check mobile responsiveness
4. ⏳ Validate registration links

## **🔧 Technical Considerations:**

### **Image Handling:**
- Current images stored in `/public/images/`
- Need to upload to JanaGana media library
- Update image paths to JanaGana URLs
- Ensure proper image optimization

### **Date Format:**
- Current: "October 3, 2024"
- JanaGana likely expects: "2024-10-03"
- Need format conversion during import

### **Category Mapping:**
- Current categories map to JanaGana tags
- Ensure consistent categorization
- Enable filtering and search

### **Event Status:**
- Past events should be marked as "completed"
- Enable historical event display
- Maintain chronological order

## **📈 Expected Outcome:**

After successful import:
- ✅ All 10 past events in JanaGana CRM
- ✅ Consistent event display for past/future
- ✅ Unified event management system
- ✅ Better user experience
- ✅ Enhanced analytics capabilities

## **🚀 Next Steps:**

1. **Verify JanaGana API access** for bulk operations
2. **Test image upload** capabilities
3. **Import sample event** to validate format
4. **Execute full import** process
5. **Update website integration**
6. **Test complete system**

---

**Ready to proceed with JanaGana CRM import for unified event management!** 🎯
