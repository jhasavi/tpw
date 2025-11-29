# Understanding Interest — A Short, Practical Lesson

> This lesson is inspired by the uploaded “Understanding Interest, Section 6.1” PDF and covers simple interest, compound interest (including continuous compounding), and APY. I’ve rewritten examples with new numbers and added quick practice.

---

## Learning goals
- Know key terms: **principal, interest, APR, APY**.  
- Compute **simple interest** and **future value**.  
- Compute **compound interest** (monthly/daily) and **continuous compounding**.  
- Compare offers using **APY** (effective annual rate).

---

## 1) Key terms (quick definitions)

- **Principal (P):** the amount borrowed or invested.  
- **Interest:** the cost of borrowing money or the reward for saving.  
- **APR:** nominal annual rate (doesn’t by itself account for how often interest is added).  
- **APY:** effective annual rate **after** compounding is considered.

---

## 2) Simple interest

**Formula:**  
I = P * r * t  
A = P + I = P(1 + r * t)

where:
- P = principal
- r = APR (decimal)
- t = time in years

### Example S1 — Short personal loan
You borrow **$2,800** for **9 months** at **12.5%** simple interest.

- Convert months to years: t = 9/12 = 0.75  
- I = 2800 * 0.125 * 0.75 = 262.50  
- **Total owed:** A = 2800 + 262.50 = **$3,062.50**

---

## 3) Compound interest

**Formula:**  
A = P(1 + r/n)^(n*t)

where n = number of compounding periods per year.

### Example C1 — Monthly compounding (savings)
Deposit **$7,500** at **3.2% APR**, compounded **monthly**, for **6 years**.  
A = 7500 * (1 + 0.032/12)^(12*6) ≈ **$9,215.92**

### Example C2 — Daily compounding vs. higher APR quarterly
You have **$18,000** for **10 years**.

- **Account A:** 2.05% APR, daily compounding (n=365)  
  A ≈ **$22,048.75**
- **Account B:** 2.30% APR, quarterly compounding (n=4)  
  A ≈ **$22,908.17**

**Takeaway:** Slightly higher APR with less frequent compounding can win.

---

## 4) Continuous compounding

**Formula:**  
A = P * e^(r*t)

### Example CC1 — Grow with continuous compounding
Invest **$5,000** at **2.1%**, continuously compounded, for **15 years**:  
A = 5000 * e^(0.021*15) ≈ **$6,851.41**

### Example CC2 — “How long to double?”
Solve 2 = e^(r*t) → t = ln(2)/r  
At 2.1%, t ≈ **33.0 years**

---

## 5) APY — Effective annual rate

**Formula:**  
APY = (1 + r/n)^n - 1

### Example APY1 — Compare banks
- Bank X: 4.80% APR, monthly compounding → APY ≈ **4.91%**
- Bank Y: 4.75% APR, daily compounding → APY ≈ **4.86%**

**Conclusion:** Bank X yields more despite similar APR.

---

## 6) Common compounding intervals
| Interval | n value |
|-----------|----------|
| Annually | 1 |
| Semiannually | 2 |
| Quarterly | 4 |
| Monthly | 12 |
| Weekly | 52 |
| Daily | 365 |

---

## 7) Calculator/Spreadsheet tips

- **Excel/Sheets**
  - Simple interest: `=P*r*t`
  - Compound interest: `=P*(1+r/n)^(n*t)`
  - APY: `=(1+r/n)^n-1`

---

## 8) Practice problems

1. Simple interest: Borrow **$4,600** at **9.2%** simple interest for **18 months**.  
2. Compound monthly: Invest **$3,900** at **5.1% APR**, monthly compounding, for **4 years**.  
3. Continuous compounding: How long to reach **$8,000** from **$6,500** at **2.4%** continuously?  
4. APY: Find the APY for **3.85% APR** with **daily** compounding.  
5. Compare offers:  
   - A: 4.35% APR, quarterly  
   - B: 4.30% APR, daily

### Answers
1. $5,234.80  
2. $4,752.06  
3. 8.25 years  
4. 3.92%  
5. Offer A (4.44% APY) wins.

---

## 9) What to remember
- **Simple interest** grows linearly; **compound interest** grows exponentially.  
- For fair comparisons, use **APY**, not APR.  
- Frequency matters, but **rate differences often dominate**.

---

*Source: Adapted from uploaded PDF “Understanding Interest, Section 6.1.”*
