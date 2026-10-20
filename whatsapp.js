// TEMPORARY TEST NUMBER: replace with the gym's official WhatsApp number later.
const WHATSAPP_NUMBER = "201207023297";

function createWhatsAppUrl(message) {
  if (!/^\d{8,15}$/.test(WHATSAPP_NUMBER)) return "";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsAppMessage(message, statusElement = document.querySelector("#form-status"), copy = null) {
  const whatsAppUrl = createWhatsAppUrl(message);
  if (!whatsAppUrl) {
    if (statusElement) statusElement.textContent = copy?.errorWhatsApp || "WhatsApp is unavailable because its number is missing or invalid. No message was sent.";
    return false;
  }

  const whatsAppWindow = window.open(whatsAppUrl, "_blank");
  if (whatsAppWindow) {
    whatsAppWindow.opener = null;
    if (statusElement) statusElement.textContent = copy?.readyWhatsApp || "WhatsApp opened with your draft. Review and send it there; it has not been sent yet.";
    return true;
  }

  if (statusElement) {
    statusElement.replaceChildren(document.createTextNode(copy?.blockedWhatsApp || "Your browser blocked the WhatsApp window. "));
    const fallbackLink = document.createElement("a");
    fallbackLink.href = whatsAppUrl;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.textContent = copy?.openInquiry || "Open your WhatsApp draft";
    statusElement.append(fallbackLink);
  }
  return false;
}
