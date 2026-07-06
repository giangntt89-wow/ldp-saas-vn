import { NextResponse } from "next/server";
import { forwardToLeadWebhook } from "@/src/lib/leadWebhook";

type ContactLeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  scale?: string;
  request?: string;
  source?: "contact_section" | "popup_form";
};

export async function POST(request: Request) {
  let payload: ContactLeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.phone) {
    return NextResponse.json({ error: "Thiếu thông tin liên hệ bắt buộc." }, { status: 400 });
  }

  const result = await forwardToLeadWebhook({
    formType: "contact",
    contact: {
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      role: payload.role,
      scale: payload.scale,
      request: payload.request,
      source: payload.source,
    },
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
