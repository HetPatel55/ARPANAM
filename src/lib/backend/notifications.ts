import type { Enquiry } from "@/lib/backend/types";

function enquiryText(enquiry: Enquiry) {
  return [
    "New Arpanam enquiry",
    `Parent: ${enquiry.parentName}`,
    `Phone: ${enquiry.phone}`,
    enquiry.childName ? `Child: ${enquiry.childName}` : "",
    enquiry.program ? `Programme: ${enquiry.program}` : "",
    enquiry.message ? `Message: ${enquiry.message}` : "",
    `Received: ${enquiry.createdAt}`
  ]
    .filter(Boolean)
    .join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function enquiryHtml(enquiry: Enquiry) {
  const rows = [
    ["Parent", enquiry.parentName],
    ["Phone", enquiry.phone],
    ["Child", enquiry.childName],
    ["Programme", enquiry.program],
    ["Message", enquiry.message],
    ["Received", enquiry.createdAt]
  ].filter(([, value]) => value);

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.5">
      <h2 style="margin:0 0 16px">New Arpanam enquiry arrived</h2>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border:1px solid #e2e8f0;padding:10px;font-weight:700;background:#f8fafc">${label}</td>
                <td style="border:1px solid #e2e8f0;padding:10px">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

async function sendEmailNotification(enquiry: Enquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_EMAIL;
  const from = process.env.ENQUIRY_NOTIFY_FROM || "Arpanam Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return;
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New enquiry from ${enquiry.parentName}`,
      text: enquiryText(enquiry),
      html: enquiryHtml(enquiry)
    })
  });
}

async function sendWhatsAppNotification(enquiry: Enquiry) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_NOTIFY_TO;

  if (!token || !phoneNumberId || !to) {
    return;
  }

  await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: {
        preview_url: false,
        body: enquiryText(enquiry)
      }
    })
  });
}

export async function notifyNewEnquiry(enquiry: Enquiry) {
  const results = await Promise.allSettled([
    sendEmailNotification(enquiry),
    sendWhatsAppNotification(enquiry)
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Enquiry notification failed", result.reason);
    }
  }
}
