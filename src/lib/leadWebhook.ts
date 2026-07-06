type WebhookResult = { ok: true } | { ok: false; status: number; error: string };

export async function forwardToLeadWebhook(
  payload: Record<string, unknown>
): Promise<WebhookResult> {
  const webhookUrl = process.env.GAS_ROI_LEAD_WEBHOOK_URL;
  const secret = process.env.GAS_ROI_LEAD_SECRET;

  if (!webhookUrl || !secret) {
    console.error("Missing GAS_ROI_LEAD_WEBHOOK_URL or GAS_ROI_LEAD_SECRET env var");
    return { ok: false, status: 500, error: "Server chưa cấu hình nhận lead." };
  }

  try {
    const gasResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, submittedAt: new Date().toISOString(), ...payload }),
    });

    // Apps Script Web Apps always return HTTP 200 for ContentService output,
    // so success/failure must be read from the JSON body, not the status code.
    const result: { ok?: boolean; error?: string } | null = await gasResponse
      .json()
      .catch(() => null);

    if (!gasResponse.ok || !result?.ok) {
      console.error("Apps Script webhook error:", gasResponse.status, result);
      return { ok: false, status: 502, error: "Không thể ghi nhận yêu cầu, vui lòng thử lại." };
    }

    return { ok: true };
  } catch (err) {
    console.error("Failed to reach Apps Script webhook:", err);
    return { ok: false, status: 502, error: "Không thể kết nối hệ thống tiếp nhận lead." };
  }
}
