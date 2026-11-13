# PFE-19: Testimonial presentation and publication

The reusable quote-card presentation lives in `src/components/Testimonial.jsx`.
`Testimonials.jsx` groups that card and interview feedback into the separate
`#testimonials` section, placed after the Expertise/Process group by `App.jsx`.
Professional qualifications remain in `Expertise.jsx`.

Both feedback groups are currently harmless mock content and have `approved:
false` in `src/data/testimonials.js`. Each group requires its own approval.
The publication rule is isolated in `src/lib/testimonialPublication.js`.
`Testimonial` is a presentational component; public-page callers must use the
policy-aware `Testimonials` section or explicitly apply the same publication rule.

| Context | Approved | Explicit preview flag | Rendered |
| --- | --- | --- | --- |
| Production build | false | Any value | No |
| Production build | true | Any value | Yes |
| Development | false | Unset or anything except `true` | No |
| Development | false | `true` | Yes, for design preview |
| Development | true | Any value | Yes |

When neither group is visible, the entire section returns `null`, including its
heading and spacing. With one approved group, that card spans the section's grid;
with both groups visible, they use two desktop columns and one mobile column.

## Deliberate local preview

Add this line to your ignored `.env.local` and restart the development server:

```env
VITE_PREVIEW_UNAPPROVED_TESTIMONIAL=true
```

Run `npm run dev`. The flag is off in the tracked `.env.example`; this change does
not modify your `.env.local`. The same flag cannot expose unapproved feedback in
a production build. `npm run preview` serves a production build and is not a
substitute for the development preview.

The flag checks Vite's development status, not network accessibility. Do not
expose an opted-in development server publicly.

## Publication review

Before setting an entry's `approved` property to boolean `true`:

- Replace mock statements and attribution with authentic content.
- Confirm permission to publish the statement and identify its author as shown.
- Review interview quotes independently of the individual testimonial.
- Review the rendered approved state and remove any local preview opt-in from
  the environment used for public development previews.

Rendering control is not confidential-data protection. Imported data can appear
in client-side JavaScript even when its component is hidden. Do not put real,
unpublished customer statements in this module; load any confidential draft
content through a separate access-controlled system if that becomes necessary.

## Verification

Run `npm test` for the approval matrix and component behavior, then
`npm run test:e2e` for production rendering, development opt-in, navigation, and
responsive checks. Keep ports 4173 (production) and 4181/4182 (development
preview off/on) free; the test suite starts and stops these local servers.
These checks are executable publication regressions, not proof
that a particular statement is authentic or that approval was granted correctly.

The verification report records the separately checked architecture stage,
production-hidden state with preview deliberately enabled, opted-in development
preview, and isolated production fixtures with both or either group approved.
Fixture approvals exist only in temporary test copies and do not approve the
application's mock content.
