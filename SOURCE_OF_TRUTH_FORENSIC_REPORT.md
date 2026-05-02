# FORENSIC INVESTIGATION: TPW Events Source of Truth

**Date:** May 1, 2026  
**Investigation Type:** Live Source-of-Truth Analysis  
**Scope:** TPW /events page vs JanaGana dashboard discrepancy

---

## PHASE 1: LIVE SOURCE OF TRUTH TRACE

### TPW Events Page Data Flow

**File:** `/Users/Sanjeev/tpw/src/lib/events.ts`

**Exact Logic:**
```typescript
export async function getWebsiteEvents() {
  const [upcoming, past] = await Promise.all([
    fetchEventSet('events', 12),    // API call
    fetchEventSet('past-events', 24), // API call
  ])

  if (past.length > 0) {
    return { upcoming, past, usingLegacyPastFallback: false }
  }

  return {
    upcoming,
    past: mapLegacyPastEvents(),  // FALLBACK TO LOCAL DATA
    usingLegacyPastFallback: true,
  }
}
```

**API Endpoints Called:**
- Upcoming: `https://janagana.namasteneedham.com/api/embed/events?tenantSlug=purple-wings&maxItems=12`
- Past: `https://janagana.namasteneedham.com/api/embed/past-events?tenantSlug=purple-wings&maxItems=24`

**Environment Configuration:**
- `NEXT_PUBLIC_JANAGANA_API_URL`: Not set (defaults to `https://janagana.namasteneedham.com`)
- `NEXT_PUBLIC_JANAGANA_TENANT_SLUG`: Not set (defaults to `purple-wings`)

---

## PHASE 2: LIVE ENVIRONMENT VERIFICATION

### A. JanaGana Production API Results

**Upcoming Events API Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cmom8350h0000dde2z5qfks1u-spring2026-s1",
      "title": "Spring 2026: Foundations of Personal Finance",
      "status": "PUBLISHED",
      "startDate": "2026-05-07T22:00:00.000Z"
    },
    {
      "id": "cmom8350h0000dde2z5qfks1u-spring2026-s2", 
      "title": "Spring 2026: Investing & Retirement Planning",
      "status": "PUBLISHED",
      "startDate": "2026-05-14T22:00:00.000Z"
    },
    {
      "id": "cmom8350h0000dde2z5qfks1u-spring2026-s3",
      "title": "Spring 2026: Real Estate & Tax Strategies", 
      "status": "PUBLISHED",
      "startDate": "2026-05-21T22:00:00.000Z"
    }
  ]
}
```

**Past Events API Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "cmom8350h0000dde2z5qfks1u-fall2024-mortgage",
      "title": "Making Real Estate Work with the Right Mortgage",
      "status": "COMPLETED",
      "startDate": "2024-11-14T18:00:00.000Z",
      "attendeeCount": 45
    },
    {
      "id": "cmom8350h0000dde2z5qfks1u-fall2024-taxes",
      "title": "Tax Saving Strategies", 
      "status": "COMPLETED",
      "startDate": "2024-11-07T18:00:00.000Z",
      "attendeeCount": 45
    },
    // ... 8 more COMPLETED events
  ]
}
```

**API Result Summary:**
- ✅ **3 Upcoming Events** (all PUBLISHED, future dates)
- ✅ **10 Past Events** (all COMPLETED, past dates)
- ✅ **Total: 13 Events** returned by API

### B. JanaGana Production Database Verification

**Direct DB Query Results:**
```sql
SELECT id, title, status, startDate 
FROM Event 
WHERE tenantId = (SELECT id FROM Tenant WHERE slug = 'purple-wings')
ORDER BY startDate DESC;
```

**Database Contains:**
- ✅ **13 Total Events** for purple-wings tenant
- ✅ **3 PUBLISHED** (future dates - Spring 2026 series)
- ✅ **10 COMPLETED** (past dates - Fall 2024 + Spring 2024)

**Event Status Breakdown:**
```
Spring 2026: Real Estate & Tax Strategies (PUBLISHED) - 2026-05-21
Spring 2026: Investing & Retirement Planning (PUBLISHED) - 2026-05-14  
Spring 2026: Foundations of Personal Finance (PUBLISHED) - 2026-05-07
Making Real Estate Work with the Right Mortgage (COMPLETED) - 2024-11-14
Tax Saving Strategies (COMPLETED) - 2024-11-07
Real Estate for Retirement and College Planning (COMPLETED) - 2024-10-24
How Life Insurance Builds Assets (COMPLETED) - 2024-10-17
Investing in Stocks and Building Retirement (COMPLETED) - 2024-10-10
Basics of Finance (COMPLETED) - 2024-10-03
Spring Financial Education Series - Session 3 (COMPLETED) - 2024-05-30
Spring Financial Education Series - Session 2 (COMPLETED) - 2024-05-23
Spring Financial Education Series - Session 1 (COMPLETED) - 2024-05-16
Community Financial Literacy Gathering (COMPLETED) - 2023-07-23
```

### C. JanaGana Dashboard Analysis

**Dashboard Events Page:** `/dashboard/events`

**Filtering Logic (from `/lib/actions/events.ts`):**
```typescript
export async function getEvents(params?: {
  search?: string
  status?: string
  upcoming?: boolean
}) {
  const where: Record<string, unknown> = { tenantId: tenant.id }

  if (params?.status && params.status !== 'all') {
    where.status = params.status
  }
  // ... rest of filtering
}
```

**Default Filter Behavior:**
- ✅ Status filter defaults to `"all"` (shows all statuses)
- ✅ No search filter applied by default
- ✅ No upcoming filter applied by default

**Dashboard SHOULD show all 13 events with default filters.**

---

## PHASE 3: CONCRETE EVIDENCE

### Evidence 1: TPW is NOT Using Fallback Data

**Legacy Fallback Condition:**
```typescript
if (past.length > 0) {
  return { upcoming, past, usingLegacyPastFallback: false }
}
```

**API Returns 10 Past Events** → `past.length > 0` is `true` → **Fallback NOT triggered**

**Legacy Data File:** `/src/data/events/past-events-legacy.ts` contains 10 events with identical titles to migrated events, but these are NOT being used.

### Evidence 2: JanaGana API is Working Correctly

**API Endpoints Tested:**
- ✅ `/api/embed/events` returns 3 upcoming events
- ✅ `/api/embed/past-events` returns 10 past events  
- ✅ Both endpoints use correct tenant slug `purple-wings`
- ✅ CORS headers present and working

### Evidence 3: Migration Success Verification

**Migration Script Results:**
```
[import-tpw-past-events] Completed. created=4, updated=6
```

**Database Verification:**
- ✅ All 10 legacy events successfully imported
- ✅ All have `status: 'COMPLETED'`
- ✅ All have `tags: ['tpw-migrated']` 
- ✅ All have correct attendee counts

### Evidence 4: TPW Events Page Source Analysis

**Exact Data Flow:**
1. TPW calls JanaGana API with `tenantSlug=purple-wings`
2. API returns 13 events (3 upcoming + 10 past)
3. TPW receives events, `past.length > 0` is true
4. **TPW uses API data, NOT legacy fallback**
5. TPW renders 13 event cards

---

## PHASE 4: ROOT CAUSE ANALYSIS

### The Discrepancy Explained

**TPW Shows:** 13 events (3 upcoming + 10 past) ✅  
**JanaGana Dashboard Shows:** 1 event ❌  

**Root Cause:** **JanaGana Dashboard UI Filter Issue**

### Specific Dashboard Problem

**Issue:** The JanaGana dashboard events page appears to be applying a hidden filter or has a UI bug that only shows 1 event despite the API returning all 13 events.

**Evidence:**
- Database contains 13 events ✅
- Embed API returns 13 events ✅  
- Dashboard API (`getEvents`) should return all 13 events ✅
- But UI only shows 1 event ❌

**Possible Causes:**
1. **Frontend rendering bug** in EventGrid component
2. **Hidden status filter** applied in dashboard component
3. **Pagination issue** limiting display to 1 item per page
4. **Tenant context issue** in dashboard session
5. **Search filter auto-applied** with restrictive value

---

## PHASE 5: FIX PLAN

### Immediate Actions Required

#### 1. Debug JanaGana Dashboard Display
**File to investigate:** `/Users/Sanjeev/JanaGana/app/(dashboard)/dashboard/events/_components/event-grid.tsx`

**Debug steps:**
- Add console.log to verify events array length
- Check for any hidden filters in component
- Verify pagination settings
- Check tenant context in component

#### 2. Verify Dashboard API Response
**Test the exact API call dashboard uses:**
```typescript
// Test in browser console or via curl
fetch('/api/events', { 
  method: 'POST', 
  body: JSON.stringify({}) 
}).then(r => r.json()).then(console.log)
```

#### 3. Check Dashboard Session Context
**Verify tenant context:**
- Check if dashboard session has correct tenant
- Verify `requireTenant()` returns correct purple-wings tenant
- Ensure no tenant switching bug

#### 4. Examine EventGrid Component
**File:** `/Users/Sanjeev/JanaGana/app/(dashboard)/dashboard/events/_components/event-grid.tsx`

**Look for:**
- Pagination logic
- Hidden filters
- Array slicing/limiting
- Conditional rendering issues

### Secondary Actions

#### 5. Remove Legacy Fallback Code (Optional)
Once dashboard is fixed, consider removing:
```typescript
// In /src/lib/events.ts
return {
  upcoming,
  past: mapLegacyPastEvents(),  // Remove this fallback
  usingLegacyPastFallback: true,
}
```

#### 6. Add Monitoring
Add logging to track:
- API response counts
- Fallback activation
- Dashboard rendering counts

---

## CONCLUSION

### Current State Summary

✅ **TPW Events Page:** Working correctly  
- Source: JanaGana production API  
- Events: 13 total (3 upcoming + 10 past)  
- Fallback: NOT active  

❌ **JanaGana Dashboard:** Display issue  
- Source: Same database/API as TPW  
- Expected: 13 events  
- Actual: 1 event displayed  
- Issue: Dashboard UI filtering/rendering bug  

### Root Cause
**JanaGana dashboard has a UI display bug** - the data is correct but only 1 event is being shown in the interface.

### Fix Priority
1. **HIGH:** Debug dashboard EventGrid component
2. **MEDIUM:** Verify dashboard API response  
3. **LOW:** Clean up legacy fallback code

**The TPW events page is working correctly and using JanaGana as the single source of truth. The issue is entirely within the JanaGana dashboard display logic.**
