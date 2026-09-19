# Delivery Handoff Checklist

## Required before claiming DONE

- [ ] Exact branch/PR head contains intended changes
- [ ] Prisma generate passes
- [ ] Web typecheck passes
- [ ] Web lint passes
- [ ] Web production build passes
- [ ] Production server starts
- [ ] Dashboard route responds
- [ ] Critical preview APIs respond
- [ ] Browser smoke test passes when browser automation is available
- [ ] Vercel deployment for the exact commit succeeds
- [ ] No known blocking error remains

Rule: do not report DONE while any required gate is unchecked.
