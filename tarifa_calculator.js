function calcularTarifa() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.style.display = 'block';
    }

    const cpDestino = document.getElementById('cpDestino').value;
    const contrato = document.getElementById('contrato').value;
    const cliente = "0012007490";
    const sucursalOrigen = document.getElementById('sucursalOrigen').value;
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

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        const recargo = switchActivado ? (porcentaje / 100) * data.tarifaSinIva.total : 0;
        const descuentoAplicado = switchDescuentoActivado ? (descuento / 100) * (data.tarifaConIva.total + recargo) : 0;
        const descuentoAplicadoSinIva = switchDescuentoActivado ? (descuento / 100) * (data.tarifaSinIva.total + recargo) : 0;
        const totalConRecargoSinIva = data.tarifaSinIva.total + recargo;
        const totalConRecargo = data.tarifaConIva.total + recargo;
        const totalConRecargoEntero = parseInt(totalConRecargo);
        const totalConRecargoEnteroSinIva = parseInt(totalConRecargoSinIva);
        

        // Lógica adicional para código postal en el rango 3300 a 3399
        if (cpDestino >= 3300 && cpDestino <= 3399) {

            const resultadoDiv = document.getElementById('resultado');
            
            resultadoDiv.innerHTML = `
                <h2 class="resultado">Tarifa especial MISIONES:</h2>
                <div class="row">
                <div class="col-md-12">
                    <p class="aforado">Peso Aforado: ${data.pesoAforado} kg</p>
                </div>
            </div>
                <div class="row">
                    <div class="col-md-12 con-iva">
                        <p class="tarifa">Tarifa con IVA:</p>
                        <ul>
                        <li class="total" >Total con IVA: $${data.tarifaConIva.total}</li>
                            ${switchActivado ? `<li>Total con IVA + Recargo aplicado: $${parseInt(data.tarifaConIva.total + recargo)}</li>` : ''}
                            ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: $${parseInt(data.tarifaConIva.total - descuentoAplicadoMisiones)}</li>` : ''}
                            ${cpDestino >= 3300 && cpDestino <= 3399 ? `
                            
                                ${switchActivado ? `<li class="fake">Costo fake para mostrar: $${parseInt((totalConRecargoEntero + recargo) * 2)}</li>` : ''}
                                ${switchActivado ? `<li>Total con IVA + Recargo aplicado: $${parseInt(totalConRecargoEntero + recargo)}</li>` : ''}
                                ${switchDescuentoActivado ? `<li class="fake">Descuento del 50% sobre el envio: $${parseInt((totalConRecargoEntero + recargo - descuentoAplicado) * 1.5)}</li>` : ''}
                                ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: $${parseInt(totalConRecargoEntero + recargo - descuentoAplicado)}</li>` : ''}
    
                                <li class="misiones">Tarifa MISIONES con Ingresos Brutos:</li>
                                <ul>
                                <li>Total final con ingresos brutos Misiones: $${parseInt(totalConRecargoEntero + ((valorDeclarado / 100 * 79) / 100 * 4.5))}</li>
                                </ul>` : ''}
                        </ul>
                    </div>
                </div>
            `;
        } else {
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
                <h2 class="resultado">Resultado de la Tarifa:</h2>
                <div class="row">
                    <div class="col-md-12">
                        <p class="aforado">Peso Aforado: ${data.pesoAforado} kg</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <p class="tarifa">Tarifa sin IVA:</p>
                        <ul>
                            <li class="total" >Total sin IVA: $${data.tarifaSinIva.total}</li>
                            ${switchActivado ? `<li>Total sin IVA + Recargo aplicado: $${parseInt(totalConRecargoEnteroSinIva + recargo)}</li>` : ''}
                            ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: $${parseInt(data.tarifaSinIva.total + recargo - descuentoAplicadoSinIva)}</li>` : ''}
                        </ul>
                    </div>
                    <div class="col-md-6 con-iva">
                        <p class="tarifa">Tarifa con IVA:</p>
                        <ul>
                            <li class="total" >Total con IVA: $${data.tarifaConIva.total}</li>
                            ${switchActivado ? `<li class="fake">Costo fake para mostrar: $${parseInt((totalConRecargoEntero + recargo) * 2)}</li>` : ''}
                            ${switchActivado ? `<li>Total con IVA + Recargo aplicado: $${parseInt(totalConRecargoEntero + recargo)}</li>` : ''}
                            ${switchDescuentoActivado ? `<li class="fake">Descuento del 50% sobre el envio: $${parseInt((totalConRecargoEntero + recargo - descuentoAplicado) * 1.5)}</li>` : ''}
                            ${switchDescuentoActivado ? `<li>Total + Descuento aplicado: $${parseInt(totalConRecargoEntero + recargo - descuentoAplicado)}</li>` : ''}
                            </ul>
                    </div>
                </div>
            `;
        }

            if (spinner) {
                spinner.style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error al calcular la tarifa:', error);

            if (spinner) {
                spinner.style.display = 'none';
            }
        });
}
