let btnEncrip = document.getElementById("btnEncrip");
let btnDecrip = document.getElementById("btnDecrip");
let btnCopiar = document.getElementById("btnCopiar");
let copTxt = null;
let textoEntrada = null;

let encrip = () => {

  textoEntrada = document.getElementById("areaTxt").value;
  if (textoEntrada.trim() === "") {
    alerta('¡Error!', 'No hay ningún texto para encriptar');
    return;
  }

  let vocales = {
    a: "bora",
    e: "tiru",
    i: "ins",
    o: "lai",
    u: "peli",
  };

  let textoEncrip = textoEntrada.replace(/[aeiou]/gi, (remplazarVocales) => {
    return vocales[remplazarVocales.toLowerCase()];
  });
  copTxt = textoEncrip;
  actualizarDOM(textoEncrip);
}

let decrip = () => {
  textoEntrada = document.getElementById("areaTxt").value;
  if (textoEntrada.trim() === "") {
    alerta('¡Error!', 'No hay ningún texto para desencriptar');
    return;
  }

  let rempVocales = {
    bora: "a",
    tiru: "e",
    ins: "i",
    lai: "o",
    peli: "u",
  };

  let textoDecrip = textoEntrada.replace(
    /(bora|tiru|ins|lai|peli)/gi,
    (remplazarVocales) => {
      return rempVocales[remplazarVocales.toLowerCase()];
    }
  );
  copTxt = textoDecrip;
  actualizarDOM(textoDecrip);
}

async function copiar() {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(copTxt);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = copTxt;
      textarea.style.cssText = 'position:fixed; left:-9999px; top:-9999px;';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "¡Copiado correctamente!"
    });
  } catch (err) {
    console.error("Error al copiar al portapapeles: ", err);
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      title: "¡Oopss..! Error al copiar."
    });
  }
}

function actualizarDOM(texto) {
  let flotante = document.getElementById('flotante');
  let resTxt = document.getElementById('resTxt');
  let imagenFlotante = document.getElementById('imgFlotante');
  let primTxt = document.getElementById('primTxt');
  let segTxt = document.getElementById('segTxt');
  let btnCopiar = document.getElementById('btnCopiar')
  imagenFlotante.style.display = "none";
  primTxt.style.display = "none";
  segTxt.style.display = "none";
  flotante.style.justifyContent = "space-between";
  flotante.style.padding = "2rem 0rem 2.5rem 0rem";
  resTxt.style.color = "#495057";
  btnCopiar.style.display = "block";
  btnCopiar.style.width = "15rem";
  resTxt.innerText = texto;
}

function alerta(text, message) {
  let timerInterval;
  Swal.fire({
    title: text,
    html: message,
    timer: 1750,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
  return;
}

btnEncrip.addEventListener("click", encrip);
btnDecrip.addEventListener("click", decrip);
btnCopiar.addEventListener("click", copiar);

