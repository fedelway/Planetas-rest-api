# Planetas API Rest

Planetas API Rest, es una API rest que permite acceder a la información 
del clima.
Para ello expone dos endpoints:
. /clima?dia=x : Especificamos el día y nos devuelve la predicción del 
clima de ese día.
. /reporte: Nos da un reporte con la cantidad de días en los que se 
presentan los climas correspondientes.

# Uso local

. Para probar localmente se debe correr:
'''
node ./express_api/runLocal.js
'''
. Esto abrirá un servidor local que escucha en el puerto 5555. Con 
postman, curl o cualquier cliente HTTP se puede probar la api.

# Uso cloud

La API esta hosteada en firebase cloud en la URL:
'''
https://us-central1-meli-planetas-restapi.cloudfunctions.net/api/
'''
