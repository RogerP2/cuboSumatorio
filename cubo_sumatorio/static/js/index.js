var cantidadCasos;
var dimensionesCubo;
var numeroOperaciones;
var controlOperaciones;
var notificacion;
var controlCantCasos;
var identCubo;


function Cambia_entrada(){
	//Funcion que de acuerdo al tipo de entrada seleccionado (Query/update) presenta el 
	//formulario de ingreso de datos correspondiente. 
	if ( $( '#tipoEntrada' ).val() == '1' ){
		$( '#actualiza' ).show();
		$( '#requiere' ).hide();
		$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
	}
	else{
		$( '#actualiza' ).hide();
		$( '#requiere' ).show();	
		$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
	}
}

function Enviar_nCasos(){
	//Valida la cantidad de casos T de acuerdo a las restricciones, guarda el valor si es 
	//correcto y presenta el formulario para ingresar las caracteristicas del cubo
	cantidadCasos = $( '#T' ).val();
	if ( cantidadCasos >= 1  && cantidadCasos <= 50 ){
		$( '#cubo' ).show();
		$( "#T" ).prop( 'disabled',true );
		$( "#enviaCasos" ).prop( 'disabled',true );
		$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
	}
	else {
		$("p.caption").html("La cantidad de casos de testeo no puede ser menor a 1 ni mayor a 50");
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
}

function Enviar_Cubo(){
	//Valida y guarda las variables número de operaciones M y dimensiones del cubo N, las dimensiones
	//del cubo son enviadas por POST al servidor para crear el objeto cubo, se incrementa la variable de control
	//de cantidad de casos y se presenta el formulario de ingreso de entradas.
	dimensionesCubo = $( '#N' ).val();
	numeroOperaciones = $( '#M' ).val();
	if ( dimensionesCubo < 1 || dimensionesCubo > 100 ){
		$("p.caption").html("Las dimensiones del cubo no pueden ser menores a 1 ni mayores a 100");
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( numeroOperaciones < 1 || numeroOperaciones > 1000 ){
		$("p.caption").html("La cantidad de operaciones no puede ser menor a 1 ni mayor a 1000");
		$('#dialog').dialog('open').css('font-weight', 'bold');	
	}
	else {
		$.ajax({
			type: 'POST',
         	encoding: 'utf-8',
         	url: '/cubo/',
         	data: {
         		'dimensiones': dimensionesCubo,
			},
            error: function (jqXHR, exception) {
                if (jqXHR.status == 0) {
                    alert('No hay conexión.\nPor favor verifique su conexión a internet.');
                } 
                else if (jqXHR.status == 404) {
                    alert('La página requerida no fue encontrada[404].\nReintente más tarde.');
                } 
                else if (jqXHR.status == 500) {
                    alert('Error interno del servidor [500].\nReintente más tarde.');
                } 
                else if (exception == 'parsererror') {
                    alert('Requerimiento JSON no ha llegado al servidor.\nReintente más tarde.');
                } 
                else if (exception == 'timeout') {
                    alert('Tiempo de espera agotado.');
                } 
                else if (exception == 'abort') {
                    alert('Petición de ajax abortada.');
                }
                else {
                    alert('Error desconocido.\n' + jqXHR.responseText);
                }
            },
            success: function(msg){
                if(msg.mensaje == true){
                	controlCantCasos = controlCantCasos + 1;
                	identCubo = msg.ide
					$( '#entrada' ).show();
					$( "#N" ).prop( 'disabled',true );
					$( "#M" ).prop( 'disabled',true );
					$( "#enviaCubo" ).prop( 'disabled',true );
					$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
                }
            }
    	});
	}
}

function Enviar_Actualizacion(){
	// Se realiza la operacion de actualización de una celda del cubo validando previamente los datos
	//ingresados para enviarlos al servidor y realizar la actualización. Se incrementa la variable de 
	//control de operaciones.
	if ( controlOperaciones == numeroOperaciones ){
		notificacion = 1;
		if ( controlCantCasos == cantidadCasos ){
			$("p.caption").html("Ha completado el total de casos de click en Aceptar para Reiniciar");
			$('#dialog').dialog('open').css('font-weight', 'bold');
		}
		else {	
			$("p.caption").html("Ha completado el total de operaciones para este caso de click en Aceptar para continuar");
			$('#dialog').dialog('open').css('font-weight', 'bold');
		}
	}
	else if ( $( '#x' ).val() < 1 || $( '#x' ).val() > dimensionesCubo ){
		$("p.caption").html("La coordenada en X no puede ser menor a 1 ni mayor a " + dimensionesCubo);
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( $( '#y' ).val() < 1 || $( '#y' ).val() > dimensionesCubo ){
		$("p.caption").html("La coordenada en Y no puede ser menor a 1 ni mayor a " + dimensionesCubo);
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( $( '#z' ).val() < 1 || $( '#z' ).val() > dimensionesCubo ){
		$("p.caption").html("La coordenada en Z no puede ser menor a 1 ni mayor a " + dimensionesCubo);
		$('#dialog').dialog('open').css('font-weight', 'bold');
	} 
	else if ( $( '#W' ).val() < -1000000000 || $( '#W' ).val() > 1000000000 ){
		$("p.caption").html("El valor a actualizar W no puede ser menor a -1000000000 ni mayor a 1000000000");
		$('#dialog').dialog('open').css('font-weight', 'bold');
	} 
	else {
		$.ajax({
			type: 'POST',
         	encoding: 'utf-8',
         	url: '/cubo/actualizar/',
         	data: {
         		'ide':identCubo,
         		'x': $( '#x' ).val(),
         		'y': $( '#y' ).val(),
         		'z': $( '#z' ).val(),
         		'valor': $( '#W' ).val(),
			},
            error: function (jqXHR, exception) {
                if (jqXHR.status == 0) {
                    alert('No hay conexión.\nPor favor verifique su conexión a internet.');
                } 
                else if (jqXHR.status == 404) {
                    alert('La página requerida no fue encontrada[404].\nReintente más tarde.');
                } 
                else if (jqXHR.status == 500) {
                    alert('Error interno del servidor [500].\nReintente más tarde.');
                } 
                else if (exception == 'parsererror') {
                    alert('Requerimiento JSON no ha llegado al servidor.\nReintente más tarde.');
                } 
                else if (exception == 'timeout') {
                    alert('Tiempo de espera agotado.');
                } 
                else if (exception == 'abort') {
                    alert('Petición de ajax abortada.');
                }
                else {
                    alert('Error desconocido.\n' + jqXHR.responseText);
                }
            },
            success: function(msg){
                if(msg.mensaje == true){
                	$( '#salida' ).hide();
                	$("p.caption").html("Actualización realizada correctamente");
					$('#dialog').dialog('open').css('font-weight', 'bold');
					$( '#x' ).val('1');
					$( '#y' ).val('1');
					$( '#z' ).val('1');
					$( '#W' ).val('1');
					controlOperaciones = controlOperaciones + 1;	
                }
            }
    	});
	}
}

function Enviar_Requerimiento(){
	//Realiza la operacion de consulta (Query), validando los datos ingresados de acuerdo a las
	//restricciones, si son correctos se envian al servidor para realizar la consulta y obtener 
	//la respuesta la cual se presenta en el formulario de Respuestas.
	if ( controlOperaciones == numeroOperaciones ){
		notificacion = 1;
		if ( controlCantCasos == cantidadCasos ){
			$("p.caption").html("Ha completado el total de casos de click en Aceptar para Reiniciar");
			$('#dialog').dialog('open').css('font-weight', 'bold');
		}
		else {	
			$("p.caption").html("Ha completado el total de operaciones para este caso de click en Aceptar para continuar");
			$('#dialog').dialog('open').css('font-weight', 'bold');
		}	
	}
	else if ( $( '#x2' ).val() < $( '#x1' ).val() || $( '#x2' ).val() > dimensionesCubo ){
		$("p.caption").html("La coordenada final en X no puede ser menor a " + $( '#x1' ).val() + " ni mayor a " + dimensionesCubo);
		$('#dialog').dialog('open').css('font-weight', 'bold');
	} 
	else if ( $( '#y2' ).val() < $( '#y1' ).val() || $( '#y2' ).val() > dimensionesCubo ){
		$("p.caption").html("La coordenada final en Y no puede ser menor a " + $( '#y1' ).val() + " ni mayor a " + dimensionesCubo);
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( $( '#z2' ).val() < $( '#z1' ).val() || $( '#z2' ).val() > dimensionesCubo ){
		$("p.caption").html("La coordenada final en Z no puede ser menor a " + $( '#z1' ).val() + " ni mayor a " + dimensionesCubo);
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( $( '#x1' ).val() < 1 || $( '#x1' ).val() > $( '#x2' ).val() ){
		$("p.caption").html("La coordenada inicial en X no puede ser menor a 1 ni mayor a " + $( '#x2' ).val());
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( $( '#y1' ).val() < 1 || $( '#y1' ).val() > $( '#y2' ).val() ){
		$("p.caption").html("La coordenada inicial en Y no puede ser menor a 1 ni mayor a " + $( '#y2' ).val());
		$('#dialog').dialog('open').css('font-weight', 'bold');
	}
	else if ( $( '#z1' ).val() < 1 || $( '#z1' ).val() > $( '#z2' ).val() ){
		$("p.caption").html("La coordenada inicial en Z no puede ser menor a 1 ni mayor a " + $( '#z2' ).val());
		$('#dialog').dialog('open').css('font-weight', 'bold');
	} 
	else {
		$.ajax({
			type: 'POST',
         	encoding: 'utf-8',
         	url: '/cubo/requerir/',
         	data: {
         		'ide':identCubo,
         		'x1': $( '#x1' ).val(),
         		'x2': $( '#x2' ).val(),
         		'y1': $( '#y1' ).val(),
         		'y2': $( '#y2' ).val(),
         		'z1': $( '#z1' ).val(),
         		'z2': $( '#z2' ).val(),
			},
            error: function (jqXHR, exception) {
                if (jqXHR.status == 0) {
                    alert('No hay conexión.\nPor favor verifique su conexión a internet.');
                } 
                else if (jqXHR.status == 404) {
                    alert('La página requerida no fue encontrada[404].\nReintente más tarde.');
                } 
                else if (jqXHR.status == 500) {
                    alert('Error interno del servidor [500].\nReintente más tarde.');
                } 
                else if (exception == 'parsererror') {
                    alert('Requerimiento JSON no ha llegado al servidor.\nReintente más tarde.');
                } 
                else if (exception == 'timeout') {
                    alert('Tiempo de espera agotado.');
                } 
                else if (exception == 'abort') {
                    alert('Petición de ajax abortada.');
                }
                else {
                    alert('Error desconocido.\n' + jqXHR.responseText);
                }
            },
            success: function(msg){
                if(msg.mensaje == true){
                	$( '#salidas' ).val(msg.respuesta)
           			$( '#salida' ).show();
					$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
					controlOperaciones = controlOperaciones + 1;     		
                }
            }
    	});
	}
}

function Resetear_Todo(){
	//Resetea todo el sistema al terminar los casos de prueba T.
	$( '#cubo' ).hide();
	$( "#T" ).prop( 'disabled',false );
	$( "#enviaCasos" ).prop( 'disabled',false );
	$( "#T" ).val('1');
	cantidadCasos = 0;
	controlCantCasos = 0;
	identCubo = 0;
}

function Resetear_Operaciones(){
	//Reinicia las variables correspodientes a las operaciones y caracteristicas del cubo,
	//al terminar el total de operaciones M para el cubo especificado.
	controlOperaciones = 0;
	notificacion = 0;
	$( '#salida' ).hide();
	$( '#actualiza' ).hide();
	$( '#requiere' ).hide();	$( '#entrada' ).hide();

	$( "#N" ).prop( 'disabled',false );
	$( "#M" ).prop( 'disabled',false );
	$( "#enviaCubo" ).prop( 'disabled',false );
	$( '#x1' ).val('1');
	$( '#y1' ).val('1');
	$( '#z1' ).val('1');
	$( '#x2' ).val('1');
	$( '#y2' ).val('1');
	$( '#z2' ).val('1');
	dimensionesCubo = 0 
	$( '#N' ).val('1');
	numeroOperaciones = 0 
	$( '#M' ).val('1');
	$('#tipoEntrada').prop('selectedIndex',0);
	if ( controlCantCasos == cantidadCasos ){
		Resetear_Todo();
	}
}

function Iniciar_Modal(){
	//Define el modal de Notificaciones. 
	$("#dialog").dialog({
	    modal: true,
	    autoOpen: false,
	    buttons: {
	        "Aceptar": function() {
	        	if ( notificacion != 0){
	        		Resetear_Operaciones();
	        	}
	            $( this ).dialog( "close" );
	        }
	    }
	});
}

function Inicio_index(){
	//Función de inicio del sistema, asigna las funciones a eventos sobre 
	//los elemento del Dom e inicializa variables y funciones.  
	$( 'select#tipoEntrada' ).change( Cambia_entrada );
	$( '#enviaCasos' ).click( Enviar_nCasos );
	$( '#enviaCubo' ).click( Enviar_Cubo );
	$( '#enviaActualiza' ).click( Enviar_Actualizacion );
	$( '#enviaPeticion' ).click( Enviar_Requerimiento );
	Iniciar_Modal();
	controlOperaciones = 0;
	notificacion = 0;
	controlCantCasos = 0;
}

$(document).ready(Inicio_index);