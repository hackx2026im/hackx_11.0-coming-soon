import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { name, university, phone, email, lang } = await req.json();

    if (!university || !phone) {
      return NextResponse.json(
        { error: "University name and WhatsApp number are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("hackx_leads")
      .insert([
        {
          name: name || null,
          university,
          phone,
          email: email || null,
          lang,
        },
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save your details. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
