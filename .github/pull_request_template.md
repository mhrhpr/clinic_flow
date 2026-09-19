# Delivery Handoff Checklist

## Required before claiming DONE

- [ ] Exact branch/PR head contains intended changes
- [ ] CI checks out and asserts the exact PR head commit
- [ ] Prisma generate passes
- [ ] Web typecheck passes
- [ ] Web lint passes
- [ ] Web production build passes
- [ ] Production server starts
- [ ] Dashboard route responds
- [ ] Critical preview APIs respond
- [ ] Playwright browser smoke passes
- [ ] Critical browser flow has no console errors
- [ ] Vercel deployment for the exact commit reports success
- [ ] No known blocking error remains

Rule: do not report DONE while any required gate is unchecked.
