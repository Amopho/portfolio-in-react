export function canShowTestimonial(
  entry,
  { isDevelopment = false, previewUnapproved = false } = {},
) {
  if (!entry) return false;

  return (
    entry.approved === true ||
    (isDevelopment === true && previewUnapproved === true)
  );
}
