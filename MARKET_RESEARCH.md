# Iranian Aesthetic Clinic Market — Revenue Leakage Discovery

Research date: 2026-09-19

## Evidence standard
Claims below are classified as:
- **Verified from source:** directly observable on a current product/regulatory page.
- **Source-reported:** a vendor's own claim.
- **Hypothesis:** requires customer discovery.
- **Inference:** interpretation of observed market structure.

## Market map

The current Iranian software market already has strong coverage of operational basics:

| Product | Observed positioning/capabilities | Implication |
|---|---|---|
| Emonshi | Clinic scheduling, patient records, payments, reminders, return/re-engagement ("بازآمد"), AI dictation; vendor reports 213k patient records and 200k appointments. | Revenue recovery is already partially claimed by an incumbent; ClinicFlow must go deeper into diagnosis/measurement. |
| Samaneh | All-in-one clinic platform: leads/CRM, records/consent, payments, surgery preparation, post-op follow-up; vendor states activity in multiple countries. | Generic all-in-one positioning is crowded. |
| Bookora | Aesthetic clinic management, patient records, before/after images, scheduling, inventory, accounting, SMS reminders, clinic public page; 14-day trial. | Operational breadth is not a differentiator. |
| Noxar Beauty | Booking, customers/CRM, staff, cash/sales, inventory, accounting, loyalty/campaigns, reports; public prices are listed. | Low-cost operational SaaS exists; compete on measurable revenue outcomes, not scheduling. |
| Nobyta | Online booking, digital records, SMS reminders, campaigns, discounts, revenue reports, AI voice-to-record. | AI features alone are not sufficient differentiation. |
| Kavak CRM | CRM positioning for beauty businesses: appointments, customer database, marketing automation, sales tracking. | CRM is an established category. |
| Persian vTiger | Aesthetic-clinic CRM flow covering incoming consultation, follow-up, appointments, WhatsApp and repeat visits. | Lead/follow-up workflow is already marketed; our gap must be revenue diagnosis and closed-loop measurement. |
| Barin Clinic | Aesthetic clinic software with scheduling, SMS, records, inventory, accounting and CRM. | Feature parity would create no clear wedge. |
| Boghrat | Clinic management, online scheduling, electronic records, communication and reporting. | General clinic operations are mature. |
| Terapia | Scheduling, electronic records, finance, reporting and inventory. | General management is crowded. |
| ReserveSystem | Clinic scheduling, availability, booking pages and reminders. | Scheduling is commodity infrastructure. |
| Azaran Web CRM | General CRM explicitly serves clinics and beauty centers. | Horizontal CRM can cover basic lead/customer workflows. |

Sources: Emonshi, Samaneh, Bookora, Noxar, Nobyta, Kavak, Persian vTiger, Barin, Boghrat, Terapia, ReserveSystem, Azaran Web product pages.

## What the market evidence actually supports

### Verified
1. Iranian vendors already provide scheduling, records, reminders, payments and reporting.
2. Several vendors explicitly market lead/CRM and follow-up functionality.
3. At least some vendors already use AI for documentation/dictation.
4. Public pricing exists in parts of the market; for example Noxar publishes multi-month/year plans.
5. Vendors increasingly position themselves around return visits, revenue, or "profit", not only appointment management.

### Not yet proven
- the exact size of revenue leakage in Iranian aesthetic clinics
- average lead-to-treatment conversion
- average no-show rate
- average recoverable revenue per clinic
- willingness to pay for a dedicated revenue-recovery layer
- whether clinics will grant access to enough data for reliable opportunity detection

## Regulatory/security signal

Iran's 2025 electronic-health roadmap describes health information as strategic data and calls for confidentiality, secure authentication, role-based access, auditability, standards for exchange/storage, and privacy controls. This makes patient-data minimization and tenant isolation architectural requirements, not optional polish.

## Competitive gap hypothesis

The observable market is strong at **recording operations**.

ClinicFlow should test whether there is a gap at **connecting operational events to explicit economic opportunities and measuring whether the recommended action recovered value**.

That is a hypothesis. It is not a claim that competitors cannot do it internally.

## Research sources
- https://emonshi.net/139/نرم-افزار-مدیریت-کلینیک-زیبایی-و-پوست/
- https://samaneh.co/fa
- https://bookora.net/
- https://noxar.ir/products/beauty
- https://www.nobyta.ir/
- https://kavak.ir/solutions/crm-for-beauty-salon/
- https://persianvtiger.ir/industries/aesthetic-clinics
- https://barinclinic.ir/نرم-افزار-کلینیک-زیبایی/
- https://boghrat.com/
- https://www.terapia.ir/
- https://reservesystem.ir/use-cases/clinics
- https://azaranweb.net/crm
- https://nezamat.ir/تصویب-نامه-در-خصوص-سند-نقشه-راه-سلامت-الکترونیک-کشور/
