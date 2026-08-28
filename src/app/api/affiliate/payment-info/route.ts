import { NextResponse } from "next/server";
import { sql, ensureSchema } from "@/lib/db";
import { getCurrentAffiliate, validatePaymentInfo, type PaymentInfoInput } from "@/lib/affiliate";

export async function POST(request: Request) {
  const affiliate = await getCurrentAffiliate();
  if (!affiliate || affiliate.status !== "approved") {
    return NextResponse.json({ error: "Neautentificat." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const input: PaymentInfoInput = {
    paymentMethod: body.paymentMethod === "paypal" ? "paypal" : "bank",
    paymentFullName: typeof body.paymentFullName === "string" ? body.paymentFullName.trim() : "",
    paymentAddress: typeof body.paymentAddress === "string" ? body.paymentAddress.trim() : "",
    paymentIban: typeof body.paymentIban === "string" ? body.paymentIban.trim() : "",
    paymentBankName: typeof body.paymentBankName === "string" ? body.paymentBankName.trim() : "",
    paymentSwift: typeof body.paymentSwift === "string" ? body.paymentSwift.trim() : "",
    paypalEmail: typeof body.paypalEmail === "string" ? body.paypalEmail.trim() : "",
  };

  const validationError = validatePaymentInfo(input);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  try {
    await ensureSchema();
    const db = sql();

    await db`
      UPDATE affiliates SET
        payment_method = ${input.paymentMethod},
        payment_full_name = ${input.paymentFullName},
        payment_address = ${input.paymentAddress},
        payment_iban = ${input.paymentMethod === "bank" ? input.paymentIban : null},
        payment_bank_name = ${input.paymentMethod === "bank" ? input.paymentBankName : null},
        payment_swift = ${input.paymentMethod === "bank" ? input.paymentSwift || null : null},
        paypal_email = ${input.paymentMethod === "paypal" ? input.paypalEmail : null}
      WHERE id = ${affiliate.id}
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("affiliate payment-info update error", err);
    return NextResponse.json({ error: "A apărut o eroare la server." }, { status: 500 });
  }
}
