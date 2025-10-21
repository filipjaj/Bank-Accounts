# Code Review Issues

This file contains all issues found during the code review. Copy these to create GitHub issues.

---

## 🔴 High Priority Issues

### Issue 1: Remove console.log statements from production code

**Labels**: `bug`, `high-priority`

**Description:**
Multiple console.log statements are present in production code which can expose sensitive data and hurt performance.

**Locations:**
- `src/hooks/useAccounts.ts:15` - `console.log(data)`
- `src/hooks/useComparisonStore.ts:18` - `console.log(initialAmount, interestRate, years)`
- `src/lib/formatting/filterItems.ts:67` - `console.log(filters)`

**Suggested Solution:**
1. Remove all console.log statements
2. Consider using a proper logging library for development (e.g., `debug` package)
3. Add ESLint rule to prevent console statements: `no-console: 'error'`

**Priority:** 🔴 High - Should be fixed before production deployment

---

### Issue 2: Replace @ts-ignore with proper TypeScript typing

**Labels**: `bug`, `typescript`, `high-priority`

**Description:**
Using `@ts-ignore` in `src/lib/formatting/filterItems.ts:73` suppresses TypeScript errors instead of properly typing the function. This defeats the purpose of using TypeScript and can hide bugs.

**Location:**
```typescript
// src/lib/formatting/filterItems.ts:73
// @ts-ignore
const result = filterFunction(item, value);
```

**Suggested Solution:**
Use discriminated unions and proper generics to type the filter functions:

```typescript
type FilterFunction =
  | { type: 'string'; fn: (item: BankDataType[number], value: string) => boolean }
  | { type: 'number'; fn: (item: BankDataType[number], value: number) => boolean }
  | { type: 'stringArray'; fn: (item: BankDataType[number], value: string[]) => boolean };

export const getFilterFunction = (filter: z.infer<typeof FiltersSchema>): FilterFunction => {
  // Return properly typed filter function
}
```

**Priority:** 🔴 High - Affects type safety across the application

---

### Issue 3: Add error handling to API fetch requests

**Labels**: `bug`, `high-priority`

**Description:**
The `getBankAccounts` function in `src/lib/serverFunctions.ts` lacks error handling for failed fetch requests or invalid JSON responses. This can cause the application to crash.

**Location:**
```typescript
// src/lib/serverFunctions.ts:4-21
export const getBankAccounts = async (pageParam, filters) => {
  const response = await fetch("/api/filters", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filters: filters ?? [], page: pageParam ?? 1 }),
  });
  const data = await response.json();
  return data;
};
```

**Suggested Solution:**
```typescript
export const getBankAccounts = async (pageParam, filters) => {
  try {
    const response = await fetch("/api/filters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters: filters ?? [], page: pageParam ?? 1 }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch bank accounts:', error);
    throw error; // React Query will handle this
  }
};
```

**Priority:** 🔴 High - Can cause application crashes

---

### Issue 4: Move bank-data.ts out of application bundle

**Labels**: `performance`, `high-priority`

**Description:**
The `src/lib/bank-data.ts` file is **70,347 lines** and contains all bank data as a hardcoded object. This significantly increases the bundle size and affects application performance.

**Current State:**
- File size: 70,347 lines
- Location: `src/lib/bank-data.ts`
- Impact: Large initial bundle size, slow build times, poor performance

**Suggested Solutions (in order of preference):**
1. **Database approach**: Move data to a database (PostgreSQL, MongoDB, etc.)
2. **External API**: Serve data from a separate API service
3. **Static JSON file**: Move to `public/data/bank-data.json` and fetch at runtime
4. **Build-time generation**: Generate static props at build time with Next.js ISR

**Example Implementation (Static JSON):**
```typescript
// src/lib/serverFunctions.ts
export const getBankData = async () => {
  const response = await fetch('/data/bank-data.json');
  if (!response.ok) throw new Error('Failed to load bank data');
  return response.json();
};
```

**Priority:** 🔴 High - Significantly affects performance and scalability

---

### Issue 5: Add input validation to API routes

**Labels**: `security`, `bug`, `high-priority`

**Description:**
API routes in `src/app/api/filters/route.ts` do not validate request bodies before processing. This can lead to runtime errors and potential security issues.

**Location:**
```typescript
// src/app/api/filters/route.ts:16-22
export async function POST(request: Request) {
  const body = await request.json();
  const pageInput = body.page ?? 1;
  const pageSize = body.pageSize ?? 10;
  const resultFull = filterItems(bankData.feed.entry, body.filters);
  // ...
}
```

**Issues:**
- No validation that `body` is an object
- No validation of `page`, `pageSize`, or `filters` structure
- Could crash if malformed data is sent

**Suggested Solution:**
Use Zod schemas for validation:

```typescript
import { z } from 'zod';

const RequestSchema = z.object({
  page: z.number().int().positive().optional(),
  pageSize: z.number().int().positive().max(100).optional(),
  filters: IncomingFiltersArraySchema.optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = RequestSchema.parse(body);

    const pageInput = validated.page ?? 1;
    const pageSize = validated.pageSize ?? 10;
    const resultFull = filterItems(bankData.feed.entry, validated.filters ?? []);
    // ...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request', details: error.errors }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    throw error;
  }
}
```

**Priority:** 🔴 High - Security and stability concern

---

### Issue 6: Fix compound interest calculation

**Labels**: `bug`, `enhancement`, `high-priority`

**Description:**
The compound interest calculation in `src/hooks/useComparisonStore.ts` has several issues that make comparisons inaccurate.

**Location:**
```typescript
// src/hooks/useComparisonStore.ts:13-31
const generatCompoundInterest = (initialAmount, interestRate, years) => {
  const interest = interestRate / 100;
  const values = Array.from({ length: years }, (_, i) => i + 1);
  const compoundInterest = values.map((year) => {
    const amount = initialAmount * Math.pow(1 + interest, year);
    return { x: year, y: amount };
  });
  return compoundInterest;
};
```

**Issues:**
1. **Typo in function name**: `generatCompoundInterest` → `generateCompoundInterest`
2. **Doesn't handle stepped interest rates**: Banks have different rates for different balance ranges (from `grensebelop1`, `grensebelop2`, etc.)
3. **No monthly deposits**: Many accounts require monthly savings (`manedlig_sparing`)
4. **No input validation**: No checks for negative values or invalid inputs
5. **Misleading results**: Users might make financial decisions based on incorrect calculations

**Suggested Solution:**
1. Add proper handling for tiered interest rates
2. Add support for monthly deposits
3. Add input validation
4. Consider adding interest rate changes over time
5. Add unit tests for financial calculations

**Priority:** 🔴 High - Affects core functionality and user financial decisions

---

## ⚠️ Medium Priority Issues

### Issue 7: Fix infinite scroll implementation (hasNextPage unused)

**Labels**: `bug`, `medium-priority`

**Description:**
In `src/hooks/useAccounts.ts:8`, the `hasNextPage` variable is destructured from `useInfiniteQuery` but never returned or used. This could lead to infinite pagination as there's no check for whether more pages exist.

**Location:**
```typescript
// src/hooks/useAccounts.ts:8
const { data, isLoading, isError, fetchNextPage, hasNextPage } =
  useInfiniteQuery<APIResponse>({...});

// hasNextPage is destructured but never used or returned
return {
  data: data?.pages?.flatMap((page) => page.result).flat() ?? [],
  isLoading,
  isError,
  fetchNextPage,
  // hasNextPage is missing here!
};
```

**Suggested Solution:**
```typescript
return {
  data: data?.pages?.flatMap((page) => page.result).flat() ?? [],
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage, // Add this
};
```

And update `BankAccountList.tsx` to check `hasNextPage`:
```typescript
onChange: (inView) => {
  if (inView && hasNextPage) { // Add hasNextPage check
    fetchNextPage();
  }
}
```

**Priority:** ⚠️ Medium - Can cause unnecessary API calls

---

### Issue 8: Remove redundant .flat() call

**Labels**: `code-quality`, `medium-priority`

**Description:**
In `src/hooks/useAccounts.ts:17`, there's a redundant `.flat()` call after `.flatMap()`. The `flatMap` method already flattens one level, making the additional `.flat()` unnecessary.

**Location:**
```typescript
// src/hooks/useAccounts.ts:17
data: data?.pages?.flatMap((page) => page.result).flat() ?? [],
```

**Suggested Solution:**
```typescript
data: data?.pages?.flatMap((page) => page.result) ?? [],
```

**Priority:** ⚠️ Medium - Minor performance impact

---

### Issue 9: Extract duplicate membership parsing logic

**Labels**: `refactoring`, `code-quality`, `medium-priority`

**Description:**
The logic for parsing membership strings is duplicated in two places:
- `src/lib/formatting/dataFormatting.ts:111-116`
- `src/lib/formatting/filterFunctions.ts:53-56`

**Locations:**
```typescript
// dataFormatting.ts:111-116
const getMembership = (data: BankDataType[number]) => {
  const membership = data.medlemskap_tekst;
  const membershipArray = membership
    .split(",")
    .filter((item) => item !== "")
    .map((item) => item.trim());
  return membershipArray;
};

// filterFunctions.ts:53-56
const membership = data.medlemskap_tekst
  .split(",")
  .map((item) => item.trim());
```

**Suggested Solution:**
Create a shared utility function:

```typescript
// src/lib/utils.ts
export const parseMembershipString = (membershipText: string): string[] => {
  return membershipText
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");
};
```

Then use it in both places:
```typescript
const membershipArray = parseMembershipString(data.medlemskap_tekst);
```

**Priority:** ⚠️ Medium - DRY principle violation

---

### Issue 10: Add loading states for filter changes

**Labels**: `enhancement`, `ux`, `medium-priority`

**Description:**
In `src/components/BankAccountList.tsx`, skeleton loaders are only shown on initial load. When filters change or when fetching the next page, there's no visual feedback to the user.

**Current Implementation:**
```typescript
// src/components/BankAccountList.tsx:21-28
if (isLoading)
  return (
    <div className=" flex gap-4 flex-col m-5 ">
      <BankAccountSkeleton />
      <BankAccountSkeleton />
      <BankAccountSkeleton />
    </div>
  );
```

**Issues:**
- `isLoading` is only true on the very first load
- Filter changes don't show loading state
- Next page fetches don't show loading indicator

**Suggested Solution:**
```typescript
const { data, fetchNextPage, isLoading, isFetching } = useAccounts();

// Show full skeleton on initial load
if (isLoading) {
  return <FullSkeleton />;
}

// Show partial loading indicator when fetching
{isFetching && <LoadingIndicator />}
```

**Priority:** ⚠️ Medium - Affects user experience

---

### Issue 11: Fix HTML lang attribute for Norwegian content

**Labels**: `a11y`, `bug`, `medium-priority`

**Description:**
The HTML lang attribute in `src/app/layout.tsx:39` is set to `"en"` (English), but the entire application is in Norwegian.

**Location:**
```typescript
// src/app/layout.tsx:39
<html lang="en">
```

**Impact:**
- Screen readers will use English pronunciation
- Search engines may misidentify the content language
- Affects SEO and accessibility

**Suggested Solution:**
```typescript
<html lang="no"> {/* or "nb" for Norwegian Bokmål */}
```

**Priority:** ⚠️ Medium - Accessibility and SEO concern

---

## 🟡 Low Priority Issues

### Issue 12: Improve accessibility (ARIA labels and focus management)

**Labels**: `a11y`, `enhancement`, `low-priority`

**Description:**
The application is missing several accessibility features:
1. Missing ARIA labels on interactive elements
2. No focus management for modals/drawers
3. The README acknowledges: "Accessibility er hensyntatt ved at Radix har en del innebygd, utover det er det mye potensial"

**Areas for improvement:**
- Add `aria-label` to filter buttons and controls
- Add `aria-live` regions for dynamic content updates
- Ensure keyboard navigation works throughout
- Add skip links for screen readers
- Test with screen readers (NVDA, JAWS, VoiceOver)

**Priority:** 🟡 Low - Important for inclusive design, but Radix provides some baseline accessibility

---

### Issue 13: Standardize hook naming conventions

**Labels**: `refactoring`, `code-quality`, `low-priority`

**Description:**
There's inconsistency in how custom hooks are named and exported across the codebase.

**Current State:**
- Most hooks export a custom hook (e.g., `useComparison`, `useFiltering`)
- `useFilterStore` exports both the store AND a custom hook `useFiltering`
- Some files use `use*Store` pattern, others use `use*` pattern

**Suggested Solution:**
Standardize to one pattern:

**Option 1** (Recommended): Always export custom hooks
```typescript
// useFilterStore.ts
const filterStore = create<FilterStoreType>(...);

export const useFilters = () => {
  const store = filterStore();
  // ... custom logic
  return { ... };
};
```

**Option 2**: Always export stores directly
```typescript
export const useFilterStore = create<FilterStoreType>(...);
```

**Priority:** 🟡 Low - Doesn't affect functionality, but improves code consistency

---

### Issue 14: Split filter components into separate files

**Labels**: `refactoring`, `code-quality`, `low-priority`

**Description:**
In `src/components/FilterComponents/Filters.tsx`, the `DesktopFilters` and `MobileFilters` components are defined in the same file. This makes the file harder to maintain and test.

**Current Structure:**
```
Filters.tsx
├── Filters (main component)
├── DesktopFilters
└── MobileFilters
```

**Suggested Structure:**
```
FilterComponents/
├── Filters.tsx (main component)
├── DesktopFilters.tsx
└── MobileFilters.tsx
```

**Priority:** 🟡 Low - Code organization improvement

---

### Issue 15: Extract magic strings to constants

**Labels**: `refactoring`, `code-quality`, `low-priority`

**Description:**
Multiple places use string literals that should be constants:

**Examples:**
- Filter keys: `"gruppe"`, `"frie_uttak"`, `"markedsomraade"`, `"alder"`, `"sum"`, etc.
- Storage keys: `"comparison-storage"`, `"accounts"`

**Suggested Solution:**
Create constants files:

```typescript
// src/lib/constants/filterKeys.ts
export const FILTER_KEYS = {
  GRUPPE: 'gruppe',
  FRIE_UTTAK: 'frie_uttak',
  MARKEDSOMRAADE: 'markedsomraade',
  ALDER: 'alder',
  SUM: 'sum',
  // ...
} as const;

// src/lib/constants/storageKeys.ts
export const STORAGE_KEYS = {
  COMPARISON: 'comparison-storage',
  ACCOUNTS: 'accounts',
} as const;
```

**Benefits:**
- Prevents typos
- Easier refactoring
- Autocomplete support
- Single source of truth

**Priority:** 🟡 Low - Nice to have, improves maintainability

---

### Issue 16: Address TODO comments in code

**Labels**: `tech-debt`, `low-priority`

**Description:**
Multiple TODO comments indicate incomplete features or known issues:

**Locations:**
1. `src/lib/formatting/filterItems.ts:32`
   ```typescript
   // TODO: fix the filter function so that it also works when certain filters are not included
   ```

2. `src/lib/formatting/filterFunctions.ts:69`
   ```typescript
   //TODO: fix this logic
   const bankIsIncluded = filterValue.includes(data.leverandor_tekst);
   ```

**Action Items:**
- Review each TODO
- Create specific issues for each one
- Either fix or document why it's not fixed
- Remove completed TODOs

**Priority:** 🟡 Low - Should be addressed eventually, but not blocking

---

## 🔵 Enhancement Ideas

### Issue 17: Add unit tests for financial calculations

**Labels**: `testing`, `enhancement`

**Description:**
The compound interest calculations and financial logic should have comprehensive unit tests to ensure accuracy.

**Areas to test:**
- Compound interest calculation
- Filter functions
- Data formatting functions
- Pagination logic

**Suggested Tools:**
- Vitest (fast, works well with Vite/Next.js)
- Jest (popular, well-supported)

**Priority:** Enhancement - Would significantly improve confidence in financial calculations

---

### Issue 18: Add API response caching

**Labels**: `performance`, `enhancement`

**Description:**
Consider adding caching for API responses to improve performance:
- React Query already provides client-side caching
- Could add HTTP cache headers on API routes
- Consider adding Redis for server-side caching if data updates infrequently

**Priority:** Enhancement - Would improve performance at scale

---

## Summary

- **High Priority**: 6 issues (must fix before production)
- **Medium Priority**: 5 issues (should fix soon)
- **Low Priority**: 6 issues (nice to have)
- **Enhancements**: 2 ideas (future improvements)

**Total**: 19 actionable items
