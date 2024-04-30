# Calculadora de Tarifas de Envío

Esta aplicación web permite calcular tarifas de envío utilizando la API de Andreani. Permite calcular tarifas estándar y aplicar descuentos y recargos según configuración.

## Requisitos

Para utilizar esta aplicación, es necesario tener acceso a internet ya que utiliza la API de Andreani para obtener las tarifas de envío.

## Uso

1. Abre el archivo `index.html` en tu navegador web.
2. Completa los campos requeridos:
   - Código Postal de Destino (CP)
   - Tipo de Contrato
   - Valor Declarado
   - Volumen del Envío
   - Peso en Kilogramos
   - Dimensiones del Paquete (alto, largo, ancho)
3. Opcionalmente, puedes activar o desactivar el recargo y el descuento.
4. Haz clic en el botón "Calcular Tarifa".
5. Se mostrará un resumen de la tarifa de envío calculada.

## Funciones Principales

- **Eliminar Resultado:** Permite limpiar el resultado anterior antes de realizar un nuevo cálculo.
- **Mostrar Spinner:** Muestra un indicador de carga mientras se realiza la consulta a la API.
- **Ocultar Spinner:** Oculta el indicador de carga una vez se completa la consulta.
- **Formato Pesos:** Formatea el monto en moneda local (ARS).

## Consideraciones Especiales

- Para los códigos postales en el rango 3300 a 3399 (Misiones), se aplican tarifas especiales con descuentos adicionales.

## Notas

- La aplicación utiliza JavaScript para realizar las llamadas a la API de Andreani y manipular los resultados dinámicamente en el DOM del navegador.
- Se recomienda revisar la documentación de la API de Andreani para obtener más detalles sobre los parámetros y la estructura de respuesta.

## Autor

Lucas Ponzoni  
Av. Bordabehere 4893  
Rosario, República Argentina  
Correo electrónico: lucasponzoni@gmail.com.ar
