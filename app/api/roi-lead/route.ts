import { NextResponse } from "next/server";
import { forwardToLeadWebhook } from "@/src/lib/leadWebhook";

type RoiLeadPayload = {
  selectedProblems?: string[];
  dynValues?: Record<string, string>;
  contact?: {
    name?: string;
    company?: string;
    phone?: string;
    email?: string;
  };
};

export async function POST(request: Request) {
  let payload: RoiLeadPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const contact = payload.contact;
  if (!contact?.name || !contact?.company || !contact?.phone || !contact?.email) {
    return NextResponse.json({ error: "Thiếu thông tin liên hệ bắt buộc." }, { status: 400 });
  }

  const result = await forwardToLeadWebhook({
    formType: "roi",
    contact,
    selectedProblems: payload.selectedProblems ?? [],
    dynValues: payload.dynValues ?? {},
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ ok: true });
}
