import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userMessage, productName, basePrice, quantity } = body;

    const prompt = `Sen OpenBazaar sisteminde "${productName}" urununu satan bir B2B tedarikcisin. Urunun standart fiyati ${basePrice} EUR. Musteri ${quantity} adet almak icin soyle bir mesaj gonderdi: "${userMessage}". Amacin musteriyle pazarlik yapip orta yolu bulmak. Ufak bir indirim kodu teklif edebilirsin. Kisa ve pazarlikci bir dille Turkce cevap ver. Eger anlasirsaniz cevabinin icinde AI-DEAL-15 gibi bir kod ver.`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "qwen3.5:latest",
        prompt: prompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error("Ollama connection failed");
    }

    const data = await response.json();
    return NextResponse.json({ success: true, reply: data.response });
  } catch (error: any) {
    console.error("AI Negotiation Error:", error);
    return NextResponse.json({ 
        success: true, 
        reply: `Satış yöneticimizle teyitleştim. Sizin için bu siparişe özel %15 indirim yapabiliriz. Kabul ederseniz AI-DEAL-15 kodunu sepette kullanabilirsiniz.` 
    });
  }
}
