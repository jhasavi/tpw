# Borrowing Money — Understanding Loans, Credit, and Interest

This lesson is adapted from *Hawkes Learning: Section 6.3 — Borrowing Money* and rewritten in a conversational and practical format. It focuses on real-world applications like auto loans, mortgages, and credit card management.

---

## 1. Fixed Installment Loans

A **fixed installment loan** is one where you borrow a set amount and repay it with **equal monthly payments** over a fixed period.

### Formula
PMT = P × (r/n) / [1 − (1 + r/n)^(-n×t)]

Where:  
- **PMT** = monthly payment  
- **P** = principal (amount borrowed)  
- **r** = annual interest rate (decimal)  
- **n** = payments per year  
- **t** = number of years  

### Example
You borrow **$18,000** at **4.5% APR** for **5 years**, with monthly payments.

PMT = 18000 × (0.045/12) / [1 − (1 + 0.045/12)^(-60)] ≈ **$335.04/month**

**Total paid:** 335.04 × 60 = $20,102.40  
**Interest paid:** $2,102.40

---

## 2. Down Payment & Auto Loans

When buying a car or home, a **down payment** reduces the loan amount — the rest is financed through the lender.

### Example
You’re buying a hybrid car for **$32,000**. The dealer offers a **$750 rebate** for recent graduates, and you’ll make a **15% down payment**.

Down Payment = 0.15 × 32,000 = **$4,800**  
Amount Financed = 32,000 − 750 − 4,800 = **$26,450**

With an APR of 3.9% over 6 years:  
PMT = 26,450 × (0.039/12) / [1 − (1 + 0.039/12)^(-72)] ≈ **$411.77/month**  
**Total Paid:** $411.77 × 72 + 4,800 = **$34,646.44**

---

## 3. Comparing Loan Options

Suppose you’re buying a car for $25,000 and have two choices:  

| Option | Offer | APR | Term | Rebate | Total Cost |
|--------|-------|-----|-------|---------|-------------|
| A | Low APR Financing | 1.9% | 60 months | None | ~$26,230 |
| B | Cash Rebate | 4.0% | 48 months | $1,000 | ~$25,900 |

**Tip:** If you plan to keep the car long-term, choose the option with the **lower total cost**. If cash flow is tight, lower monthly payments (even if longer) might make sense.

---

## 4. Mortgages — Long-Term Loans

A **mortgage** is a loan used to buy real estate, typically repaid over 15–30 years.

### Example
House Price: $300,000  
Down Payment: 20% = $60,000  
Loan Amount: $240,000  
APR: 3.6%, 30 years

PMT = 240,000 × (0.036/12) / [1 − (1 + 0.036/12)^(-360)] ≈ **$1,091.23/month**  
Total Paid: $1,091.23 × 360 = **$392,842.80**  
Interest: $392,842.80 − $240,000 = **$152,842.80**

If you add **property tax ($250)** and **insurance ($100)**, your total monthly cost = **$1,441.23**.

---

## 5. Loan Amortization — Where Does Each Payment Go?

Each payment is split between **interest** and **principal**. Early payments go mostly to interest. Later payments reduce more principal.

| Month | Payment | Principal | Interest | Balance |
|-------|----------|-----------|-----------|----------|
| 1 | $1,091.23 | $371.23 | $720.00 | $239,628.77 |
| 60 | $1,091.23 | $615.43 | $475.80 | $208,000.00 |
| 180 | $1,091.23 | $768.10 | $323.13 | $152,000.00 |

You can use Excel’s `PMT`, `PPMT`, and `IPMT` functions to generate an **amortization table**.

---

## 6. Credit Cards — Open-Ended Loans

A **credit card** is a type of open-ended loan. You can borrow repeatedly up to a **credit limit**, but unpaid balances incur interest.

If you owe $2,000 on a credit card at **18% APR** and only make **minimum payments of 3%** (~$60/month), it could take over **10 years** to pay off the balance — and you’ll pay over **$1,000** in interest!

If instead you pay **$200/month**, the debt clears in **11 months**, saving you over **$800**.

---

## 7. Number of Payments to Pay Off Debt

You can calculate how many payments it takes to clear a balance:

R = −log(1 − (r/n)(A/PMT)) / log(1 + r/n)

### Example
Credit card balance: $2,000  
APR: 18%  
Payment: $100/month  

R = −log(1 − (0.18/12)(2000/100)) / log(1 + 0.18/12) ≈ **23 months**

---

## 8. The Cost of Borrowing — Payday Loans

If a payday lender charges **$20 per $100 borrowed** for a two-week loan:  
There are 26 two-week periods in a year → APR = 20% × 26 = **520% APR**.

Such loans can trap borrowers in cycles of debt. Always check the **effective annual rate (EAR)** before borrowing.

---

## 9. Credit Scores Matter!

Your **credit score** affects your borrowing cost.

| Credit Score | APR | Monthly Payment (3-year, $20,000 loan) | Total Cost |
|---------------|-----|---------------------------------------|-------------|
| 760 | 6.5% | $613.09 | $22,071 |
| 700 | 8.0% | $626.42 | $22,551 |
| 640 | 11.0% | $654.44 | $23,560 |

Improving your credit by 100 points could save you **over $1,500** on a 3-year loan.

---

## 10. Key Takeaways

- **Borrow smart:** Always check APR and total cost, not just monthly payment.  
- **Extra payments** save thousands in long-term interest.  
- **Credit score = borrowing power.** Higher score → lower rates.  
- **Avoid payday loans.** APRs can exceed 500%.  
- Use online **loan calculators** or Excel to visualize your payment breakdowns.

---

*Adapted from Hawkes Learning, “Borrowing Money (Section 6.3).”*
