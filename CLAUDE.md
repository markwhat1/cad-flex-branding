# Flex Updates

CAD-branded HTML templates for Flex Dental: blast emails, consent forms, post-op instructions, education handouts, membership pages. Authored as static HTML, then either pasted into Flex's BEE Editor (for emails) or imported as patient-facing forms (delivered on iPads in the operatory).

## Flex architecture (read once)

Flex Dental is an Ember.js SPA with a self-hosted backend. Ours runs at `coloradoad.myflex.app`. The forms users see on iPads are rendered inside Flex's container; emails are composed in BEE Editor (a third-party HTML email builder Flex embeds). That means our templates have to:

- **Emails**: be valid BEE-Editor HTML (table-based layout, inline styles, no external CSS, image URLs absolute).
- **Forms**: render inside Flex's iframe wrapper without breaking its layout. Forms support `{{variable}}` merge tokens that Flex substitutes server-side.

If you don't already know Flex's quirks, read `docs/plans/` first and the actual Flex docs second. Flex's editor accepts a subset of HTML and silently strips the rest.

## Layout

```
new-templates/         Active authoring (where new work goes)
  consents/            Consent forms (HTML)
  postop/              Post-op instructions (HTML)
  _starter-consent.html   Boilerplate to copy when starting a new consent
  _starter-education.html
  _starter-postop.html
preview/               Local browser preview output
docs/plans/            Project planning docs
example printed docs/  Reference: existing forms as printed PDFs
Logo/, Logo.zip        Brand assets
*.pdf                  Stationery PDFs (letterhead, business cards, envelopes)
Flex/                  Local Flex installation snapshot (NOT for editing; see below)
```

### What Flex/ is

`Flex/` is a local snapshot of the self-hosted Flex install (binary `flex.exe`, `installer.exe`, `nssm` for service mgmt, `db/`, `public/`, `schema.graphql`, etc.). It's here as a reference for the schema and for occasional debugging. **Don't edit anything in `Flex/`.** Production lives at the office on a different machine; this folder is read-only context.

The `schema.graphql` is the most directly useful artifact in there: it shows the Flex GraphQL API surface, which is helpful when figuring out what's available for automation.

## Authoring a new template

1. Copy the right `_starter-*.html` from `new-templates/`.
2. Author at letter size (8.5x11"), 0.55in margins, max-width 7.5in, base 10.5pt, line-height 1.55. CSS variables for the brand colors live in the starter.
3. For emails: use table-based layout, inline every style, absolute image URLs.
4. For forms: keep merge tokens as `{{variable_name}}`. Flex substitutes them on render.
5. Preview locally: open the HTML in a browser, or use the per-project `preview/` workflow.
6. Final pass: paste into Flex's BEE Editor (emails) or import as a form template (forms). BEE silently strips unsupported HTML, so always verify in Flex itself before declaring done.

## Brand standards

Same as `patient-documents/` (see that project's `CLAUDE.md` for the full spec):

- **Fonts**: Nord (headings), Henderson Sans (body). Fallback: Segoe UI.
- **Colors**: `--cad-granite #454545`, `--cad-mountain #447E8A`, `--cad-sand #FFEAD6`, `--cad-sky #B3DBE2`, `--cad-aspen #B9B765`, `--cad-orange #FFB456`.

## Gotchas

- Flex strips most CSS classes. If a style isn't inline, assume it'll be lost.
- `<style>` blocks survive in some contexts and not others. Test before committing to one.
- Image URLs in Flex emails must be absolute and publicly accessible (not localhost paths or data URIs).
- BEE Editor's preview ≠ Flex's actual render. Always send a test send and view it in real Gmail/Outlook before declaring an email shippable.
- Forms render inside an iframe. Don't use `position: fixed` or full-viewport tricks; they break inside the wrapper.
