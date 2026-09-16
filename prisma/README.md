# Transitional root Prisma schema

The root `prisma/schema.prisma` exists only to support the current Next.js migration surface.

## Rule

Do **not** add new business models here.

New production data ownership belongs to the service that owns the bounded context:

- `services/identity-service/prisma/` → identity data
- `services/clinic-service/prisma/` → organization/clinic/configuration data
- `services/patient-service/prisma/` → patient data
- `services/scheduling-service/prisma/` → scheduling data
- `services/treatment-service/prisma/` → treatment data
- `services/billing-service/prisma/` → billing data
- `services/finance-service/prisma/` → finance data
- `services/notification-service/prisma/` → notification data
- `services/analytics-service/prisma/` → analytics/read-model data

A multi-schema PostgreSQL deployment can still be used operationally, but service ownership must remain explicit and application code must not perform cross-service database joins.

The root schema will be retired when the Next.js application is migrated to `apps/web` and its direct persistence responsibilities have been removed.
