var cantidadCasos;
var dimensionesCubo;
var numeroOperaciones;
var controlOperaciones;
var notificacion;
var controlCantCasos


function Cambia_entrada(){
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
		controlCantCasos = controlCantCasos + 1;
		$( '#entrada' ).show();
		$( "#N" ).prop( 'disabled',true );
		$( "#M" ).prop( 'disabled',true );
		$( "#enviaCubo" ).prop( 'disabled',true );
		$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
	}
}

function Enviar_Actualizacion(){
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
		$("p.caption").html("Actualización realizada correctamente");
		$('#dialog').dialog('open').css('font-weight', 'bold');
		$( '#x' ).val('1');
		$( '#y' ).val('1');
		$( '#z' ).val('1');
		$( '#W' ).val('1');
		controlOperaciones = controlOperaciones + 1;
	}
}

function Enviar_Requerimiento(){
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
		$( '#salida' ).show();
		$( "html, body" ).animate({ scrollTop: $(document).height()-$(window).height() });
		controlOperaciones = controlOperaciones + 1;
	}
}

function Resetear_Todo(){
	$( '#cubo' ).hide();
	$( "#T" ).prop( 'disabled',false );
	$( "#enviaCasos" ).prop( 'disabled',false );
	$( "#T" ).val('1');
	cantidadCasos = 0;
	controlCantCasos = 0;
}

function Resetear_Operaciones(){
	controlOperaciones = 0;
	notificacion = 0;
	$( '#salida' ).hide();
	$( '#actualiza' ).hide();
	$( '#requiere' ).hide();
	$( '#entrada' ).hide();
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