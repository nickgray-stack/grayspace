// One contact behaviour for the whole site: copy the email + toast, mailto fallback.
// Mirrors the prototype's single `data-contact` handler in shared.js.
export const EMAIL = "hello@grayspc.com";

export function showToast(msg) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("gs:toast", { detail: msg }));
}

export function copyContact() {
  if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(EMAIL).then(
      () => showToast("Email copied — " + EMAIL),
      () => {
        window.location.href = "mailto:" + EMAIL;
      }
    );
  } else {
    window.location.href = "mailto:" + EMAIL;
  }
}
