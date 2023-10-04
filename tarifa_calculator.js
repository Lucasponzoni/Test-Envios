function calcularTarifa() {
    // Obtener elementos del formulario y spinner
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
    
    // Obtener el elemento del spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block'; // Mostrar el spinner
    
    // Construir la URL de la API
    const apiUrl = `https://apis.andreani.com/v1/tarifas?cpDestino=${cpDestino}&contrato=${contrato}&cliente=${cliente}&sucursalOrigen=${sucursalOrigen}&bultos[0][valorDeclarado]=${valorDeclarado}&bultos[0][volumen]=${volumen}&bultos[0][kilos]=${kilos}&bultos[0][altoCm]=${altoCm}&bultos[0][largoCm]=${largoCm}&bultos[0][anchoCm]=${anchoCm}`;
    
    // Realizar la solicitud GET a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Ocultar el spinner una vez que se completa la solicitud
            spinner.style.display = 'none';
            
            // Mostrar los resultados en pantalla
            const resultadoDiv = document.getElementById('resultado');
            resultadoDiv.innerHTML = `
                <h2>Resultado de la Tarifa:</h2>
                
                <!-- Fila 1: Peso Aforado -->
                <div class="row">
                    <div class="col-md-12">
                        <p>Peso Aforado: ${data.pesoAforado} kg</p>
                    </div>
                </div>

                <!-- Fila 2: Tarifas -->
                <div class="row">
                    <div class="col-md-6">
                        <p>Tarifa sin IVA:</p>
                        <ul>
                            <li>Seguro de Distribución: $${data.tarifaSinIva.seguroDistribucion}</li>
                            <li>Costo de Distribución: $${data.tarifaSinIva.distribucion}</li>
                            <li>Total sin IVA: $${data.tarifaSinIva.total}</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <p>Tarifa con IVA:</p>
                        <ul>
                            <li>Seguro de Distribución: $${data.tarifaConIva.seguroDistribucion}</li>
                            <li>Costo de Distribución: $${data.tarifaConIva.distribucion}</li>
                            <li>Total con IVA: $${data.tarifaConIva.total}</li>
                        </ul>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al calcular la tarifa:', error);
            // En caso de error, también ocultamos el spinner
            spinner.style.display = 'none';
        });
}
