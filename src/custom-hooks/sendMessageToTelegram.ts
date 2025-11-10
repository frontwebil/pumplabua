import axios from "axios";

type Props = {
  htmlSend: string;
};

export async function SendMessageToTelegram({ htmlSend }: Props) {
  const botToken = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN; // 🔒
  const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID; // 🔒

  if (!botToken || !chatId) {
    throw new Error("Telegram credentials are missing");
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await axios.post(url, {
      chat_id: chatId,
      text: htmlSend,
      parse_mode: "HTML",
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error("Telegram API Error:", error.response.data);
        throw new Error(
          `Telegram error: ${JSON.stringify(error.response.data, null, 2)}`
        );
      } else if (error.request) {
        console.error("No response from Telegram:", error.request);
        throw new Error("No response from Telegram API");
      }
    } else if (error instanceof Error) {
      console.error("Unknown Error:", error.message);
      throw new Error(`Unknown error: ${error.message}`);
    } else {
      throw new Error("Unexpected error");
    }
  }
}
