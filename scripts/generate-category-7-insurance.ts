import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Note: category_id 7 should be created in quiz_categories table first
// This matches "Insurance Fundamentals" category

const CATEGORY_7_INSURANCE = [
  // BEGINNER LEVEL (25 questions)
  {
    question_text: "What is the primary purpose of insurance?",
    correct_answer: "To transfer financial risk from an individual to an insurance company",
    incorrect_answers: [
      "To make money through investments",
      "To avoid paying taxes",
      "To guarantee you never experience loss"
    ],
    explanation: "Insurance transfers the financial risk of unexpected events from you to the insurance company. You pay premiums, and they cover certain losses if they occur.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is a premium in insurance?",
    correct_answer: "The amount you pay for insurance coverage",
    incorrect_answers: [
      "The amount the insurance company pays when you file a claim",
      "A bonus payment for not filing claims",
      "The total value of your coverage"
    ],
    explanation: "A premium is the regular payment (usually monthly or annually) you make to keep your insurance policy active. It's the cost of maintaining coverage.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is a deductible?",
    correct_answer: "The amount you pay out-of-pocket before insurance coverage begins",
    incorrect_answers: [
      "The monthly insurance payment",
      "The maximum amount you'll ever pay",
      "A tax deduction for having insurance"
    ],
    explanation: "A deductible is what you must pay first before your insurance kicks in. For example, with a $1,000 deductible, you pay the first $1,000 of a claim.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What does health insurance typically cover?",
    correct_answer: "Medical expenses like doctor visits, prescriptions, and hospital stays",
    incorrect_answers: [
      "Only emergency room visits",
      "Dental and vision care automatically",
      "All healthcare costs with no out-of-pocket expenses"
    ],
    explanation: "Health insurance covers various medical services including preventive care, doctor visits, hospital stays, and prescriptions. Coverage details vary by plan.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is auto liability insurance?",
    correct_answer: "Coverage that pays for damage you cause to others",
    incorrect_answers: [
      "Coverage for damage to your own car",
      "Coverage for theft of your vehicle",
      "Coverage for car rental expenses"
    ],
    explanation: "Auto liability insurance covers damage and injuries you cause to other people and their property in an accident. It's required by law in most states.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is the purpose of homeowners insurance?",
    correct_answer: "To protect your home and belongings from damage or loss",
    incorrect_answers: [
      "To increase your home's value",
      "To cover home maintenance costs",
      "To guarantee you can sell your home"
    ],
    explanation: "Homeowners insurance covers damage to your home and belongings from events like fire, theft, or weather. It also provides liability coverage if someone is injured on your property.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is term life insurance?",
    correct_answer: "Life insurance that covers you for a specific period of time",
    incorrect_answers: [
      "Life insurance that builds cash value",
      "Life insurance that lasts your entire life",
      "Life insurance for multiple family members"
    ],
    explanation: "Term life insurance provides coverage for a set period (term) like 10, 20, or 30 years. It pays a death benefit if you die during the term but has no cash value.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What does 'out-of-pocket maximum' mean in health insurance?",
    correct_answer: "The most you'll pay for covered services in a plan year",
    incorrect_answers: [
      "The monthly premium you pay",
      "The deductible amount",
      "The cost of services not covered by insurance"
    ],
    explanation: "The out-of-pocket maximum is the cap on what you'll pay in a year for covered services. Once you reach it, your insurance pays 100% of covered costs.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is collision coverage in auto insurance?",
    correct_answer: "Coverage for damage to your car from an accident",
    incorrect_answers: [
      "Coverage for injuries to people in your car",
      "Coverage for damage you cause to other vehicles",
      "Coverage for theft or vandalism"
    ],
    explanation: "Collision coverage pays to repair or replace your car if it's damaged in an accident, regardless of who was at fault.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "Why is it important to have emergency savings even with insurance?",
    correct_answer: "To cover deductibles and expenses not covered by insurance",
    incorrect_answers: [
      "Insurance covers everything, so savings aren't needed",
      "To pay your insurance premiums only",
      "Insurance companies require you to have savings"
    ],
    explanation: "Insurance doesn't cover everything. You need savings for deductibles, co-pays, and expenses that fall outside your coverage or policy limits.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is a copay in health insurance?",
    correct_answer: "A fixed amount you pay for a covered service",
    incorrect_answers: [
      "The percentage you pay after meeting your deductible",
      "Your monthly premium payment",
      "The amount insurance pays for services"
    ],
    explanation: "A copay (copayment) is a fixed fee you pay when you receive a service, like $25 for a doctor visit. It's separate from your deductible.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What does renters insurance typically cover?",
    correct_answer: "Your personal belongings and liability",
    incorrect_answers: [
      "The building structure",
      "Your roommate's belongings",
      "Damage you cause to the rental unit"
    ],
    explanation: "Renters insurance covers your personal possessions and provides liability protection. The landlord's insurance covers the building itself.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is comprehensive auto insurance coverage?",
    correct_answer: "Coverage for damage to your car from non-collision events",
    incorrect_answers: [
      "Coverage for all possible car-related expenses",
      "Coverage for damage from accidents only",
      "Coverage for injuries to passengers"
    ],
    explanation: "Comprehensive coverage pays for damage to your car from events other than collisions, like theft, vandalism, weather, or hitting an animal.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is a beneficiary in life insurance?",
    correct_answer: "The person who receives the death benefit when you die",
    incorrect_answers: [
      "The person who pays your premiums",
      "The insurance company representative",
      "Anyone covered by your policy"
    ],
    explanation: "A beneficiary is the person (or entity) you designate to receive the life insurance payout upon your death. You can name multiple beneficiaries.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is disability insurance?",
    correct_answer: "Insurance that replaces part of your income if you can't work due to injury or illness",
    incorrect_answers: [
      "Insurance that covers medical bills for disabilities",
      "Insurance for people with pre-existing conditions",
      "Insurance that pays for home modifications"
    ],
    explanation: "Disability insurance provides income replacement if you're unable to work due to an injury or illness. It helps cover living expenses when you can't earn a paycheck.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What does 'in-network' mean for health insurance?",
    correct_answer: "Providers who have agreements with your insurance company for lower rates",
    incorrect_answers: [
      "Doctors located near your home",
      "Specialists recommended by your primary doctor",
      "Providers who accept any insurance"
    ],
    explanation: "In-network providers have negotiated rates with your insurance company, resulting in lower out-of-pocket costs for you compared to out-of-network providers.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is the difference between comprehensive and collision auto insurance?",
    correct_answer: "Comprehensive covers non-collision events, collision covers accidents",
    incorrect_answers: [
      "Comprehensive covers everything, collision covers accidents only",
      "Comprehensive is cheaper than collision",
      "Comprehensive is required, collision is optional"
    ],
    explanation: "Comprehensive covers damage from theft, weather, vandalism, etc. Collision covers damage from accidents. Both cover your car, not others' vehicles or injuries.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "Why might younger, healthier people still need health insurance?",
    correct_answer: "Unexpected accidents or illnesses can happen at any age",
    incorrect_answers: [
      "It's mainly for older people with health problems",
      "Health insurance is only valuable for chronic conditions",
      "Young people rarely need medical care"
    ],
    explanation: "Even healthy young people can face unexpected injuries or illnesses with high medical costs. Insurance protects against financial catastrophe from these unforeseen events.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is uninsured motorist coverage?",
    correct_answer: "Coverage that protects you if you're hit by a driver with no insurance",
    incorrect_answers: [
      "Insurance for people who don't own a car",
      "Coverage if you forget to pay your insurance",
      "Insurance for drivers with bad records"
    ],
    explanation: "Uninsured/underinsured motorist coverage protects you and your passengers if you're hit by a driver who has no insurance or insufficient coverage.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is coinsurance in health insurance?",
    correct_answer: "The percentage of costs you pay after meeting your deductible",
    incorrect_answers: [
      "The fixed amount you pay for each service",
      "Insurance shared between two people",
      "The portion of premium your employer pays"
    ],
    explanation: "Coinsurance is your share of costs for covered services, expressed as a percentage. For example, with 20% coinsurance, you pay 20% and insurance pays 80%.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What does umbrella insurance cover?",
    correct_answer: "Additional liability coverage beyond your other policies",
    incorrect_answers: [
      "All types of insurance in one policy",
      "Protection from weather-related damage",
      "Coverage for personal belongings only"
    ],
    explanation: "Umbrella insurance provides extra liability coverage that goes beyond the limits of your home, auto, or other insurance policies. It protects against major claims and lawsuits.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is an insurance claim?",
    correct_answer: "A formal request to the insurance company for payment of a covered loss",
    incorrect_answers: [
      "A complaint about your insurance company",
      "Your monthly insurance payment",
      "Documentation of your insurance coverage"
    ],
    explanation: "A claim is your request for the insurance company to pay for a covered loss or service. You provide documentation, and they review it according to your policy terms.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "Why is it important to review your insurance coverage regularly?",
    correct_answer: "Your needs and circumstances change over time",
    incorrect_answers: [
      "Insurance companies require annual reviews",
      "Premiums automatically decrease each year",
      "Coverage limits reset every year"
    ],
    explanation: "Life changes like marriage, children, new home, or new job affect your insurance needs. Regular reviews ensure you have appropriate coverage and aren't over or under-insured.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is a pre-existing condition in health insurance?",
    correct_answer: "A health condition you had before getting new insurance coverage",
    incorrect_answers: [
      "A condition that won't be covered by any insurance",
      "An illness you developed while insured",
      "A condition that requires specialist care"
    ],
    explanation: "A pre-existing condition is a health issue you had before your insurance effective date. Under the ACA, insurers can't deny coverage or charge more for pre-existing conditions.",
    difficulty_level: "beginner",
    category_id: 7
  },
  {
    question_text: "What is the purpose of having an emergency fund in addition to insurance?",
    correct_answer: "To cover deductibles and costs not covered by insurance",
    incorrect_answers: [
      "Insurance and emergency funds serve the same purpose",
      "To pay insurance premiums during unemployment",
      "Insurance companies require you to have savings"
    ],
    explanation: "Emergency funds cover insurance deductibles, co-pays, and expenses that aren't insured. They also help if you're between jobs and need to pay premiums.",
    difficulty_level: "beginner",
    category_id: 7
  },

  // INTERMEDIATE LEVEL (25 questions)
  {
    question_text: "What is the difference between HMO and PPO health insurance plans?",
    correct_answer: "HMOs require using in-network providers and referrals; PPOs offer more flexibility",
    incorrect_answers: [
      "HMOs are cheaper but cover less; PPOs cover everything",
      "HMOs are for individuals; PPOs are for families",
      "HMOs require high deductibles; PPOs have low deductibles"
    ],
    explanation: "HMOs typically have lower premiums but require you to use in-network providers and get referrals for specialists. PPOs cost more but allow out-of-network care and no referral requirements.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is actual cash value (ACV) vs. replacement cost in homeowners insurance?",
    correct_answer: "ACV pays depreciated value; replacement cost pays to replace items new",
    incorrect_answers: [
      "ACV is for homes; replacement cost is for belongings",
      "ACV is cheaper coverage; replacement cost is premium coverage",
      "ACV covers cash only; replacement cost covers property"
    ],
    explanation: "ACV coverage pays what items are worth today (minus depreciation). Replacement cost coverage pays to replace items with new equivalents, regardless of depreciation.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is guaranteed insurability in disability insurance?",
    correct_answer: "The right to increase coverage without medical underwriting",
    incorrect_answers: [
      "Guarantee that you'll be approved for disability benefits",
      "Coverage that never expires",
      "Insurance that covers pre-existing disabilities"
    ],
    explanation: "Guaranteed insurability lets you increase your disability coverage at specified times without medical exams, which is valuable as your income grows.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is a High Deductible Health Plan (HDHP)?",
    correct_answer: "A health plan with higher deductibles but lower premiums, eligible for HSAs",
    incorrect_answers: [
      "A plan only for high-risk individuals",
      "A plan that covers only major medical expenses",
      "A plan with the highest quality coverage"
    ],
    explanation: "HDHPs have higher deductibles than traditional plans but lower monthly premiums. They're HSA-eligible, allowing you to save pre-tax money for medical expenses.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is the purpose of a Health Savings Account (HSA)?",
    correct_answer: "To save pre-tax money for medical expenses when you have an HDHP",
    incorrect_answers: [
      "To pay your health insurance premiums",
      "To invest in healthcare stocks",
      "To save for retirement healthcare only"
    ],
    explanation: "HSAs are tax-advantaged accounts for medical expenses. Contributions are tax-deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is 'own occupation' vs. 'any occupation' in disability insurance?",
    correct_answer: "'Own occupation' pays if you can't do your specific job; 'any occupation' requires inability to work at all",
    incorrect_answers: [
      "'Own occupation' is for business owners; 'any occupation' is for employees",
      "'Own occupation' is temporary; 'any occupation' is permanent",
      "'Own occupation' has lower premiums than 'any occupation'"
    ],
    explanation: "'Own occupation' coverage pays benefits if you can't perform your specific job, even if you can work elsewhere. 'Any occupation' only pays if you can't work at any job.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is loss of use coverage in homeowners insurance?",
    correct_answer: "Coverage for additional living expenses if your home becomes uninhabitable",
    incorrect_answers: [
      "Coverage if you can't sell your home",
      "Coverage for lost wages due to home damage",
      "Coverage for depreciation of home value"
    ],
    explanation: "Loss of use (or Additional Living Expenses) covers costs like hotel stays and meals if you can't live in your home due to covered damage during repairs.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is a health insurance deductible reset period?",
    correct_answer: "The period (usually annual) when your deductible starts over",
    incorrect_answers: [
      "The time you have to pay your deductible",
      "When insurance companies change deductible amounts",
      "The waiting period before coverage starts"
    ],
    explanation: "Most health insurance deductibles reset annually, meaning you must pay the full deductible again each plan year before coverage kicks in.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is the coordination of benefits when you have multiple insurance policies?",
    correct_answer: "The process of determining which insurance pays first and how much each pays",
    incorrect_answers: [
      "Getting benefits from multiple insurers for the same claim",
      "Combining all your insurance into one policy",
      "Choosing which insurance to use for each claim"
    ],
    explanation: "Coordination of benefits prevents double-payment. One policy is designated primary and pays first, then the secondary policy may cover remaining eligible costs.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is whole life insurance?",
    correct_answer: "Permanent life insurance with a cash value component and level premiums",
    incorrect_answers: [
      "Life insurance that covers your whole family",
      "Life insurance that covers all causes of death",
      "The most comprehensive life insurance available"
    ],
    explanation: "Whole life insurance provides lifetime coverage with level premiums and builds cash value you can borrow against. It's more expensive than term life insurance.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is personal property replacement cost coverage in renters insurance?",
    correct_answer: "Coverage that pays to replace belongings at today's prices without depreciation",
    incorrect_answers: [
      "Coverage that replaces items with identical ones",
      "The total value of all your belongings",
      "Coverage only for expensive personal items"
    ],
    explanation: "Replacement cost coverage pays to replace your belongings with new items at current prices, unlike actual cash value which factors in depreciation.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is gap insurance for auto loans?",
    correct_answer: "Insurance that covers the difference between your car's value and loan amount",
    incorrect_answers: [
      "Insurance for the time between selling one car and buying another",
      "Insurance that covers missed car payments",
      "Extended warranty coverage"
    ],
    explanation: "Gap insurance pays the difference if your car is totaled and you owe more on the loan than the car's actual cash value, protecting you from owing money on a totaled car.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is medical payments coverage (MedPay) in auto insurance?",
    correct_answer: "Coverage for medical expenses regardless of who caused the accident",
    incorrect_answers: [
      "Coverage for other drivers' medical bills",
      "Health insurance specifically for car accidents",
      "Required coverage in all states"
    ],
    explanation: "MedPay covers medical expenses for you and your passengers after an accident, regardless of fault. It supplements health insurance and covers deductibles and co-pays.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is a waiting period (elimination period) in disability insurance?",
    correct_answer: "The time between when you become disabled and when benefits begin",
    incorrect_answers: [
      "The period you must wait before buying disability insurance",
      "The time until your policy becomes effective",
      "The probationary period for pre-existing conditions"
    ],
    explanation: "The elimination period is like a deductible in time. Common periods are 90 or 180 days. Longer elimination periods mean lower premiums but more time without benefits.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is extended replacement cost coverage in homeowners insurance?",
    correct_answer: "Coverage that pays above your policy limit if rebuilding costs exceed limits",
    incorrect_answers: [
      "Coverage that extends your policy term",
      "Coverage for replacements over time",
      "Coverage for extended family members"
    ],
    explanation: "Extended replacement cost (often 125% or 150% of dwelling coverage) protects against construction cost increases, paying above your coverage limit if needed to rebuild.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is a rider in insurance?",
    correct_answer: "An add-on that modifies or expands coverage beyond the standard policy",
    incorrect_answers: [
      "A person covered under someone else's policy",
      "The insurance agent who sells the policy",
      "The monthly payment schedule"
    ],
    explanation: "Riders (also called endorsements) customize your insurance by adding coverage for specific items or situations not included in the standard policy, usually for an additional premium.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is the difference between short-term and long-term disability insurance?",
    correct_answer: "Short-term covers disabilities lasting weeks/months; long-term covers years or until retirement",
    incorrect_answers: [
      "Short-term is cheaper with same coverage as long-term",
      "Short-term is for partial disabilities; long-term is for total disabilities",
      "Short-term is optional; long-term is required by employers"
    ],
    explanation: "Short-term disability typically covers 3-6 months with higher benefit percentages. Long-term starts after short-term ends and can last years or until retirement age.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is scheduled personal property coverage?",
    correct_answer: "Additional coverage for specific high-value items listed individually",
    incorrect_answers: [
      "Coverage on a payment schedule",
      "Property that must be replaced on schedule",
      "Coverage that renews automatically"
    ],
    explanation: "Scheduled personal property (or floater) provides higher limits and broader coverage for valuable items like jewelry, art, or electronics that exceed standard policy limits.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is subrogation in insurance?",
    correct_answer: "The insurer's right to recover costs from the party responsible for a loss",
    incorrect_answers: [
      "Transferring your policy to another person",
      "Getting a second opinion on a claim",
      "Downgrading your coverage level"
    ],
    explanation: "After paying your claim, your insurer may pursue the at-fault party to recover the money they paid you. This is subrogation, and you typically must cooperate.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is guaranteed renewable in insurance policies?",
    correct_answer: "The insurer must renew your policy as long as you pay premiums",
    incorrect_answers: [
      "Your rates are guaranteed never to increase",
      "You're guaranteed to be approved initially",
      "Coverage is automatically renewed without your action"
    ],
    explanation: "Guaranteed renewable means the insurer can't cancel your policy as long as you pay premiums on time, though they can raise rates for your entire class of policyholders.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is the difference between a copay and coinsurance?",
    correct_answer: "Copays are fixed amounts; coinsurance is a percentage of costs",
    incorrect_answers: [
      "Copays apply before deductible; coinsurance applies after",
      "Copays are for doctor visits; coinsurance is for hospital stays",
      "Copays are optional; coinsurance is required"
    ],
    explanation: "A copay is a flat fee (like $30) per service. Coinsurance is your share as a percentage (like 20%) of the cost after meeting your deductible.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is ordinance or law coverage in homeowners insurance?",
    correct_answer: "Coverage for costs to meet current building codes when rebuilding",
    incorrect_answers: [
      "Coverage for legal fees",
      "Coverage for code violations on your property",
      "Required coverage by law in all states"
    ],
    explanation: "Ordinance or law coverage pays for additional costs to bring your rebuilt home up to current building codes, which may be more stringent than when originally built.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is the cash value component of whole life insurance?",
    correct_answer: "A savings element that grows tax-deferred and can be borrowed against",
    incorrect_answers: [
      "The amount paid to beneficiaries when you die",
      "The premium refund if you cancel the policy",
      "The current market value of the policy"
    ],
    explanation: "Whole life insurance builds cash value over time that you can borrow against, withdraw, or use to pay premiums. It grows tax-deferred based on policy terms.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is a premium waiver rider?",
    correct_answer: "Coverage that pays your insurance premiums if you become disabled",
    incorrect_answers: [
      "A discount on premiums for safe driving or good health",
      "The ability to skip premium payments occasionally",
      "Automatic premium reduction after certain age"
    ],
    explanation: "A waiver of premium rider continues your insurance coverage without premium payments if you become disabled and meet the policy's definition of disability.",
    difficulty_level: "intermediate",
    category_id: 7
  },
  {
    question_text: "What is water backup coverage in homeowners insurance?",
    correct_answer: "Coverage for damage from sewer or drain backups into your home",
    incorrect_answers: [
      "Coverage for flood damage",
      "Coverage for water heater failures",
      "Coverage for well water contamination"
    ],
    explanation: "Water backup coverage protects against damage from sewer or drain backups. It's typically an optional endorsement as standard policies exclude this coverage.",
    difficulty_level: "intermediate",
    category_id: 7
  },

  // ADVANCED LEVEL (20 questions)
  {
    question_text: "How does the Modified Endowment Contract (MEC) classification affect life insurance taxation?",
    correct_answer: "MECs lose tax-free loan benefits and withdrawals are taxed as income first",
    incorrect_answers: [
      "MECs receive better tax treatment than standard policies",
      "MECs are only taxed at death, not during life",
      "MEC status has no tax implications"
    ],
    explanation: "If a life insurance policy becomes a MEC due to excess premiums, loans and withdrawals become taxable (income-first rule) and may face 10% penalty if under 59½, losing key tax advantages.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is a captive insurance company and why might a business owner use one?",
    correct_answer: "A subsidiary insurer owned by the business to insure parent company risks",
    incorrect_answers: [
      "An insurance company that exclusively serves one client",
      "A company held captive by regulatory requirements",
      "An insurance company that only sells to existing customers"
    ],
    explanation: "Captive insurance companies are subsidiaries that insure the parent company's risks. They offer tax benefits, risk management control, and potential profit retention from underwriting gains.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does the per stirpes vs. per capita beneficiary designation affect life insurance distributions?",
    correct_answer: "Per stirpes passes shares to descendants if beneficiary predeceases; per capita divides only among living beneficiaries",
    incorrect_answers: [
      "Per stirpes requires probate; per capita avoids it",
      "Per stirpes applies to primary beneficiaries; per capita to contingent",
      "They're identical terms from different insurance companies"
    ],
    explanation: "Per stirpes preserves deceased beneficiaries' shares for their descendants. Per capita only divides among surviving named beneficiaries, excluding descendants of deceased beneficiaries.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is adverse selection in insurance markets and how do insurers combat it?",
    correct_answer: "When high-risk individuals are more likely to buy insurance; insurers use underwriting and risk classification",
    incorrect_answers: [
      "When insurers reject too many applicants; they use automated approval",
      "When customers choose unfavorable policy terms; insurers limit options",
      "When market conditions turn against insurers; they raise all premiums"
    ],
    explanation: "Adverse selection occurs when those most likely to need insurance disproportionately purchase it. Insurers combat this through medical underwriting, risk pools, and tiered pricing.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does the Affordable Care Act's risk corridor program work?",
    correct_answer: "It limits insurer losses and gains by sharing risk with the government",
    incorrect_answers: [
      "It sets minimum coverage requirements for all plans",
      "It creates geographical insurance zones",
      "It establishes corridors for rate increases"
    ],
    explanation: "The risk corridor program was designed to limit insurer losses/gains during ACA's early years by having the government share in profits/losses outside target ranges, stabilizing the market.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is the difference between occurrence vs. claims-made liability insurance?",
    correct_answer: "Occurrence covers incidents during policy period; claims-made covers claims filed during policy period",
    incorrect_answers: [
      "Occurrence is for businesses; claims-made is for individuals",
      "Occurrence is more expensive than claims-made",
      "They're the same coverage with different names"
    ],
    explanation: "Occurrence policies cover incidents that happen during the policy period, regardless of when claims are filed. Claims-made covers claims filed during the policy period, requiring tail coverage after cancellation.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does the Section 1035 exchange work for life insurance and annuities?",
    correct_answer: "Allows tax-free exchange of certain insurance products without triggering taxable events",
    incorrect_answers: [
      "It's a marketplace for buying/selling insurance policies",
      "It allows converting term life to whole life only",
      "It's a government program for subsidizing insurance"
    ],
    explanation: "IRC Section 1035 allows tax-free exchanges of life insurance for life insurance or annuity, and annuities for annuities, without recognizing gain, preserving tax-deferred growth.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is the purpose of reinsurance in the insurance industry?",
    correct_answer: "Insurance for insurance companies to transfer risk and maintain financial stability",
    incorrect_answers: [
      "Secondary insurance for individuals with high-risk profiles",
      "Reinstating a cancelled insurance policy",
      "Insurance for previously insured items"
    ],
    explanation: "Reinsurance allows primary insurers to transfer portions of risk portfolios to reinsurers, managing exposure to large claims, stabilizing operations, and maintaining capital requirements.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How do Guaranteed Universal Life (GUL) policies differ from traditional universal life?",
    correct_answer: "GUL guarantees death benefit with minimal cash value; traditional UL builds substantial cash value",
    incorrect_answers: [
      "GUL has fixed premiums; traditional UL has variable premiums",
      "GUL is temporary coverage; traditional UL is permanent",
      "GUL requires medical exams; traditional UL doesn't"
    ],
    explanation: "GUL focuses on death benefit guarantee with low/no cash value accumulation and lower premiums. Traditional UL emphasizes cash value growth with more flexible premiums and investment options.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is the incontestability clause in life insurance?",
    correct_answer: "Prevents insurers from denying claims after 2 years except for non-payment",
    incorrect_answers: [
      "Guarantees the policy can never be contested",
      "Allows beneficiaries to contest claim denials",
      "Prevents fraud investigations after policy issue"
    ],
    explanation: "After the contestability period (typically 2 years), insurers generally cannot void the policy or deny claims based on misrepresentations in the application, except for premium non-payment.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does a viatical settlement differ from a life settlement?",
    correct_answer: "Viatical is for terminally ill insureds; life settlement is for seniors with shorter life expectancy",
    incorrect_answers: [
      "Viatical pays more than life settlements",
      "Viatical applies to term policies; life settlements to permanent policies",
      "Viatical is tax-free; life settlements are taxable"
    ],
    explanation: "Viatical settlements involve selling life insurance by terminally ill individuals (life expectancy under 2 years). Life settlements are for seniors without terminal illness seeking liquidity from policies.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is the concept of 'insurable interest' and when must it exist?",
    correct_answer: "Financial or emotional interest in the insured's life; must exist at policy inception for life insurance",
    incorrect_answers: [
      "Minimum coverage amount required by law; must exist throughout policy",
      "Interest rate applied to cash value; must exist at claim time",
      "Reason for buying insurance; must exist at death"
    ],
    explanation: "Insurable interest means you'd suffer financial or emotional loss from the insured's death. For life insurance, it must exist when the policy is purchased but not necessarily at claim time.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does the corridor test affect universal life insurance policies?",
    correct_answer: "Requires death benefit to exceed cash value by a percentage to maintain tax-favored status",
    incorrect_answers: [
      "Tests whether premiums are adequate to keep policy in force",
      "Determines if policy qualifies for guaranteed renewal",
      "Measures policy performance against industry standards"
    ],
    explanation: "The corridor test ensures the death benefit exceeds cash value by IRS-specified percentages based on insured's age, maintaining the policy's qualification as life insurance for tax purposes.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is residual disability coverage and how does it differ from total disability?",
    correct_answer: "Pays partial benefits if income is reduced due to disability; total pays full benefits for complete inability to work",
    incorrect_answers: [
      "Residual covers what total disability doesn't pay",
      "Residual is for temporary disabilities; total is for permanent",
      "Residual pays family members; total pays only the insured"
    ],
    explanation: "Residual disability benefits pay a percentage of benefits based on lost income if you return to work part-time or with reduced capacity. It provides smoother transition than all-or-nothing total disability.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How do Lloyd's of London syndicates operate differently from traditional insurers?",
    correct_answer: "Individual members accept risk through syndicates rather than a corporate entity",
    incorrect_answers: [
      "They only insure maritime risks",
      "They operate as a non-profit organization",
      "They're owned by the British government"
    ],
    explanation: "Lloyd's is a marketplace where members (Names) join syndicates to underwrite risk individually. Unlike corporate insurers, members have unlimited liability for their share of syndicate losses.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is the purpose of a Section 79 plan for group term life insurance?",
    correct_answer: "Provides favorable tax treatment for employer-provided group term life up to $50,000",
    incorrect_answers: [
      "Allows unlimited tax-free employer-provided life insurance",
      "Creates tax deductions for employee premium payments",
      "Eliminates taxation on death benefits"
    ],
    explanation: "IRC Section 79 allows employers to provide up to $50,000 of group term life insurance tax-free to employees. Coverage above $50,000 creates imputed income based on IRS tables.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does an Irrevocable Life Insurance Trust (ILIT) provide estate tax benefits?",
    correct_answer: "Removes life insurance from taxable estate while maintaining control through trust provisions",
    incorrect_answers: [
      "Eliminates all taxes on life insurance proceeds",
      "Allows estate tax deduction for premiums paid",
      "Converts death benefit to tax-free inheritance automatically"
    ],
    explanation: "An ILIT owns the life insurance policy, removing it from the insured's taxable estate. Proceeds pass to beneficiaries estate-tax-free while the trust provides control over distributions.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is the difference between guaranteed issue and simplified issue life insurance?",
    correct_answer: "Guaranteed issue requires no medical questions; simplified issue has basic health questions but no exam",
    incorrect_answers: [
      "Guaranteed issue is cheaper than simplified issue",
      "Guaranteed issue is permanent; simplified issue is term only",
      "Guaranteed issue has no waiting period; simplified issue does"
    ],
    explanation: "Guaranteed issue accepts all applicants without health questions but often has graded death benefits. Simplified issue asks health questions but requires no exam, offering better rates for healthier applicants.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "How does the principle of utmost good faith (uberrima fides) apply to insurance contracts?",
    correct_answer: "Both parties must disclose all material facts honestly and completely",
    incorrect_answers: [
      "Only the insurer must act in good faith",
      "It only applies during claim disputes",
      "It's a suggestion rather than legal requirement"
    ],
    explanation: "Uberrima fides requires both insurer and insured to disclose all material facts. The applicant must honestly answer all questions, and the insurer must clearly state coverage terms and exclusions.",
    difficulty_level: "advanced",
    category_id: 7
  },
  {
    question_text: "What is premium financed life insurance and what are its risks?",
    correct_answer: "Using borrowed money to pay premiums; risks include policy lapse if loan interest exceeds cash value growth",
    incorrect_answers: [
      "Life insurance paid through payroll deduction; risk is job loss",
      "Financing purchased with life insurance proceeds; risk is market volatility",
      "Insurance that finances other purchases; risk is over-leveraging"
    ],
    explanation: "Premium financing uses third-party loans to pay large life insurance premiums. Major risks include interest rate changes, collateral calls, and potential policy collapse if loan costs exceed cash value growth.",
    difficulty_level: "advanced",
    category_id: 7
  }
]

async function uploadQuestions() {
  console.log('Starting upload of Category 7: Insurance questions...')
  
  for (let i = 0; i < insuranceQuestions.length; i++) {
    const question = insuranceQuestions[i]
    
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert([question])
    
    if (error) {
      console.error(`Error uploading question ${i + 1}:`, error)
    } else {
      console.log(`✓ Uploaded question ${i + 1}/${insuranceQuestions.length}`)
    }
  }
  
  console.log('\n✅ Upload complete!')
  console.log(`Total questions uploaded: ${insuranceQuestions.length}`)
  console.log('Breakdown:')
  console.log(`- Beginner: ${insuranceQuestions.filter(q => q.difficulty_level === 'beginner').length}`)
  console.log(`- Intermediate: ${insuranceQuestions.filter(q => q.difficulty_level === 'intermediate').length}`)
  console.log(`- Advanced: ${insuranceQuestions.filter(q => q.difficulty_level === 'advanced').length}`)
}

uploadQuestions()
