const resultadoClean = document.getElementById('resultado');
const spinner = document.querySelector(".loader");

function eliminarResultado() {
    resultadoClean.innerHTML = ""}

const button = document.getElementById('button');
button.addEventListener('click', function() {
    calcularTarifa();
    });
    

//!FUNCION MOSTRAR SPINNER
function showSpinner() {
    spinner.style.display = "block";
}

//!FUNCION OCULTAR SPINNER
function hideSpinner() {
    spinner.style.display = "none";
}


function calcularTarifa() {
    eliminarResultado();
    showSpinner();   

    const cpDestino = document.getElementById('cpDestino').value;
    const contrato = document.getElementById('contrato').value;
    const cliente = "0012007490";
    const sucursalOrigen = "PRC";
    const valorDeclarado = document.getElementById('valorDeclarado').value;
    const volumen = document.getElementById('volumen').value;
    const kilos = document.getElementById('kilos').value;
    const altoCm = document.getElementById('altoCm').value;
    const largoCm = document.getElementById('largoCm').value;
    const anchoCm = document.getElementById('anchoCm').value;

    const porcentaje = document.getElementById('porcentaje').value;
    const switchActivado = document.getElementById('flexSwitchCheckDefault').checked;
    const descuento = document.getElementById('descuento').value;
    const switchDescuentoActivado = document.getElementById('flexSwitchCheckDefaultDescuento').checked;

    const apiUrl = `https://apis.andreani.com/v1/tarifas?cpDestino=${cpDestino}&contrato=${contrato}&cliente=${cliente}&sucursalOrigen=${sucursalOrigen}&bultos[0][valorDeclarado]=${valorDeclarado}&bultos[0][volumen]=${volumen}&bultos[0][kilos]=${kilos}&bultos[0][altoCm]=${altoCm}&bultos[0][largoCm]=${largoCm}&bultos[0][anchoCm]=${anchoCm}`;

    // Mostrar datos enviados
    console.log("Datos enviados por la API:", {
        cpDestino,
        contrato,
        cliente,
        sucursalOrigen,
        valorDeclarado,
        volumen,
        kilos,
        altoCm,
        largoCm,
        anchoCm
    });
    
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        console.log("Datos de respuesta API:", data);

        const recargo = switchActivado ? (porcentaje / 100) * data.tarifaSinIva.total : 0;
        const descuentoAplicado = switchDescuentoActivado ? (descuento / 100) * (data.tarifaConIva.total + recargo) : 0;
        const descuentoAplicadoSinIva = switchDescuentoActivado ? (descuento / 100) * (data.tarifaSinIva.total + recargo) : 0;
        const totalConRecargoSinIva = data.tarifaSinIva.total + recargo;
        const totalConRecargo = data.tarifaConIva.total + recargo;
        const totalConRecargoEntero = parseInt(totalConRecargo);
        const totalConRecargoEnteroSinIva = parseInt(totalConRecargoSinIva);

        const resultadoDiv = document.getElementById('resultado');

        // Lógica adicional para código postal en el rango 3300 a 3399
        if (cpDestino >= 3300 && cpDestino <= 3399) {
            resultadoDiv.innerHTML = `
                <h2 class="resultado">Tarifa especial MISIONES:</h2>
                <div class="row">
                    <div class="col-md-12">
                        <p class="aforado">📦 Peso Aforado: ${parseInt(data.pesoAforado / 1000)} kg</p> <!-- Corrigiendo el peso -->
                    </div>
                </div>
                <img class="parcel" src="./elements/parcel-box-with-seal-5708250-4748231.webp">
                <div class="row">
                    <div class="col-md-12 con-iva resultadoTarifa">
                        <p class="tarifa tarifaIva">Tarifa con IVA: ⚠️</p>
                        <ul>
                            <li class="total">Total con IVA: ${formatoPesos(data.tarifaConIva.total)}</li>
                            ${switchActivado ? `<li>Total con IVA + Recargo aplicado: ${formatoPesos(parseInt(data.tarifaConIva.total + recargo))}</li>` : ''}
                            ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: ${formatoPesos(parseInt(data.tarifaConIva.total - descuentoAplicado))}</li>` : ''}
                            ${switchActivado ? `<li class="fake">Costo fake para mostrar: ${formatoPesos(parseInt((totalConRecargoEntero + recargo) * 2))}</li>` : ''}
                            ${switchActivado ? `<li>Total con IVA + Recargo aplicado: ${formatoPesos(parseInt(totalConRecargoEntero + recargo))}</li>` : ''}
                            ${switchDescuentoActivado ? `<li class="fake">Descuento del 50% sobre el envio: ${formatoPesos(parseInt((totalConRecargoEntero + recargo - descuentoAplicado) * 1.5))}</li>` : ''}
                            ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: ${formatoPesos(parseInt(totalConRecargoEntero + recargo - descuentoAplicado))}</li>` : ''}
                            <li class="misiones">Tarifa MISIONES con Ingresos Brutos:</li>
                            <ul>
                                <li>Total final con ingresos brutos Misiones: ${formatoPesos(parseInt(totalConRecargoEntero + ((valorDeclarado / 100 * 79) / 100 * 4.5)))}</li>
                            </ul>
                        </ul>
                    </div>
                </div>
            `;
        } else {
            // Resultado estándar
            resultadoDiv.innerHTML = `
                <div class="row">
                    <div class="col-md-12">
                        <p class="aforado">📦 Peso Aforado: ${parseInt(data.pesoAforado / 1000)} kg</p> <!-- Corrigiendo el peso -->
                    </div>
                </div>
                <h2 class="resultado-nueva text-center mt-4">Resultado de la Tarifa:</h2>
                <div class="envio-info mt-4 text-center">
                    <div class="row justify-content-center">
                        <div class="col-md-5">
                            <div class="alert alert-danger d-flex flex-column align-items-center justify-content-center square" role="alert">
                                <i class="bi bi-cash" style="font-size: 2rem; color: #dc3545;"></i>
                                <p class="tarifa-nueva">Tarifa sin IVA:</p>
                                <ul>
                                    <li class="total-sin-iva">Total sin IVA: ${formatoPesos(data.tarifaSinIva.total)}</li>
                                    ${switchActivado ? `<li>Total sin IVA + Recargo aplicado: ${formatoPesos(parseInt(totalConRecargoEnteroSinIva + recargo))}</li>` : ''}
                                    ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: ${formatoPesos(parseInt(data.tarifaSinIva.total + recargo - descuentoAplicadoSinIva))}</li>` : ''}
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="alert alert-primary d-flex flex-column align-items-center justify-content-center square" role="alert">
                                <i class="bi bi-cash" style="font-size: 2rem; color: #0d6efd;"></i>
                                <p class="tarifa-nueva tarifa-iva">Tarifa con IVA:</p>
                                <ul>
                                    <li class="total-con-iva">Total con IVA: ${formatoPesos(data.tarifaConIva.total)}</li>
                                    ${switchActivado ? `<li class="costo-fake">Costo fake para mostrar: ${formatoPesos(parseInt((totalConRecargoEntero + recargo) * 2))}</li>` : ''}
                                    ${switchActivado ? `<li>Total con IVA + Recargo aplicado: ${formatoPesos(parseInt(totalConRecargoEntero + recargo))}</li>` : ''}
                                    ${switchDescuentoActivado ? `<li class="costo-fake">Descuento del 50% sobre el envío: ${formatoPesos(parseInt((totalConRecargoEntero + recargo - descuentoAplicado) * 1.5))}</li>` : ''}
                                    ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: ${formatoPesos(parseInt(totalConRecargoEntero + recargo - descuentoAplicado))}</li>` : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Verificar condiciones para mostrar "Llega Hoy" y "Llega Mañana"
            if (cpDestino >= 1000 && cpDestino <= 1400) {
                const selectElement = document.getElementById('skuSelect'); // Asumiendo que tienes un select para los SKU
                if (selectElement.value) {
                    const skuSeleccionado = selectElement.options[selectElement.selectedIndex];
                    const descripcionSku = skuSeleccionado.getAttribute('data-descripcion');

                    const divEnvio = `
<div class="envio-info mt-4 text-center">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="alert alert-success d-flex flex-column align-items-center justify-content-center square" role="alert">
                <span class="material-icons icon"><i class="bi bi-lightning-fill"></i></span>
                <div>
                    <strong>Envío Novogar Plus</strong><br>
                    <strong class="llega-hoy">Llega Hoy:</strong> <span class="precio">$5000</span>
                </div>
                <div class="timer">
                    <span class="timer-text">Comprando hasta:</span>
                    <span id="countdown" class="countdown"></span>
                    <span class="material-icons timer-icon">access_time</span>
                </div>
            </div>
        </div>
        <div class="col-md-5">
            <div class="alert alert-success d-flex flex-column align-items-center justify-content-center square" role="alert">
                <span class="material-icons icon"><i class="bi bi-lightning-fill"></i></span>
                <div>
                    <strong>Envío Novogar Plus</strong><br>
                    <strong>Llega Mañana:</strong> <span class="precio">$3500</span>
                </div>
            </div>
        </div>
    </div>
    <p class="recibi-hoy mt-3">Recibí hoy <strong>${descripcionSku}</strong> y disfruta de la comodidad de tu compra.</p>
</div>
`;

                    // Agregar el temporizador al cargar
                    document.addEventListener("DOMContentLoaded", function() {
                        startTimerUntil19h();
                    });

                    function startTimerUntil19h() {
                        const now = new Date();
                        const target = new Date();
                        target.setHours(19, 0, 0, 0); // Establecer la hora objetivo a las 19:00

                        if (now > target) {
                            target.setDate(target.getDate() + 1); // Si ya pasó las 19:00, establecer para el día siguiente
                        }

                        const duration = Math.floor((target - now) / 1000); // Duración en segundos
                        let countdownTime = duration;
                        const countdownElement = document.getElementById('countdown');

                        function updateCountdown() {
                            const hours = Math.floor(countdownTime / 3600);
                            const minutes = Math.floor((countdownTime % 3600) / 60);
                            const seconds = countdownTime % 60;

                            countdownElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                            
                            if (countdownTime > 0) {
                                countdownTime--;
                            } else {
                                clearInterval(countdownInterval);
                            }
                        }

                        updateCountdown(); // Actualizar inmediatamente
                        const countdownInterval = setInterval(updateCountdown, 1000);
                    }

                    resultadoDiv.innerHTML += divEnvio;
                }
            }
        }

        hideSpinner();
        startTimerUntil19h();
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        hideSpinner();
    });
}

function formatoPesos(monto) {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(monto);
}



