
//valores do circuito de potencia
var Vin = 100;																			
var Res=10;	
var Ind=0.005;
var tau=Ind/Res;																															
var Vpico=1;
var Vpicoref=0.8;
var F_por=100;
var F_ref=50;
var vo1p;

//variaveis de calculo												
var Vo_max;
var Max_io=14.69;										
var Vo_min;										
var Vo_med=0;
var t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20;		
var max,min,max1,min1,max2,min2,max3,min3,max4,min4,max5,min5,max6,min6,max7,min7,max8,min8,max9,maxg,ming;							



//variaveis de cor
var Cor_Vpor=0;										
var Cor_Vref=0;										
var Cor_Vpwm1=0;
var Cor_Vpwm2=0;										
var Cor_Vo=0;										
var Cor_Vo1=0;										
var Cor_Io=0;										


//variaveis de rendereização
var vpor=1;									
var vref=1;									
var vpwm1=1;
var vpwm2=0;
var vo=1;
var vo1=1;
var desenha_io=1;
var desenha_teste=0;										


//onda de referência
var Vref = function(x) 
{
	return Vpicoref*Math.sin(2*Math.PI*F_ref*x) ;						
} ;

var calculario=function(x)
{
	
	return Vref(x)-Vpor(x);
}


//onda portadora
var Vpor = function(x) 
{	T=1/F_por;
	// if(x>0 && x<T/4)
		// return 4*Vpico*x/T;
	// for (p = 0; p < 100; p++){
		// if (x>3*T/4+p*T && x<5*T/4+p*T)
			// return 4*Vpico*x/T-4*(p+1)*Vpico;
		
		// if (x>T/4+p*T && x<3*T/4+p*T)
			// return -4*Vpico*x/T+(2+4*p)*Vpico;
	// }
	for (p = 0; p < 100; p++){
		if (x>T/2+p*T && x<T+p*T)
			return -4*Vpico*x/T+(4*p+3)*Vpico;
		
		if (x>0+p*T && x<3*T/4+p*T)
			return 4*Vpico*x/T-(4*p+1)*Vpico;
	}
	var mf=F_por/F_ref;
	var ma=Vpicoref/Vpico;
	document.getElementById("myText").innerHTML = mf.toFixed(2);
	document.getElementById("myText1").innerHTML = ma.toFixed(2);
} ;

//sinal de controlo
var Vpwm_1 = function (x) {
	if (Vref(x)>Vpor(x))
		return 1;
	// if (Vref(x)>0 && Vref(x)<Vpor(x) || Vref(x)<0 && Vref(x)<Vpor(x))
	// 	return 0;
	else return 0;
} ;

var Vpwm_2 = function (x) {
	// if (Vref(x)>0 && Vref(x)>Vpor(x) || Vref(x)<0 && Vref(x)>Vpor(x))
	// 	return 0;
	if (Vref(x)<Vpor(x))
		return 1;
	else return 0;
} ;

//tensao de saida
var Vo= function(x){
	// if (Vref(x)>0 && Vref(x)>Vpor(x) || Vref(x)<0 && Vref(x)>Vpor(x))
	// 	return Vin;
	// else if (Vref(x)>0 && Vref(x)<Vpor(x) || Vref(x)<0 && Vref(x)<Vpor(x))
	// 	return -Vin;
	// else return 0;
	if (Vref(x)>Vpor(x))
		return Vin;
	else if (Vref(x)<Vpor(x))
		return -Vin;
	else return 0;
}

var Vor= function(x){
	if (Vref(x)>Vpor(x))
		return Vin*Vin;
	if (Vref(x)<Vpor(x))
		return -Vin*(-Vin);
	else return 0;
}

//componente fundamental
var Vo1=function(x){
	ma=Vpicoref/Vpico;
	vo1p=ma*Vin;
	return vo1p*Math.sin(2*Math.PI*F_ref*x);
}

function vo_rms()
{	

		var rms=Math.sqrt((1/T)*integrate(0,T,0.00001,Vor));
		document.getElementById("myText2").innerHTML = rms.toFixed(2)+" V";
	
}


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


function getts()
{
	var List=[];
	var z=0;
	var k=0;
	for(var p=0;p<20;p++)
	{
		z=Encontrar_Zeros(calculario,z+0.0005,0.06,0.00001);
		if(z!=0)
			List.push(z);
		if(Vin==0 || F_por==0){
			z=0;
			List.push(z);
		}
		
	}
	if(1)
		List=List.filter(onlyUnique);
	List=List.sort();
	t1=List[0];
	t2=List[1];
	t3=List[2];
	t4=List[3];
	t5=List[4];
	t6=List[5];
	t7=List[6];
	t8=List[7];
	t9=List[8];
	t10=List[9];
	t11=List[10];
	t12=List[11];
	t13=List[12];
	t14=List[13];
	t15=List[14];
	t16=List[15];
	t17=List[16];
	t18=List[17];
	t19=List[18];
	t20=List[19];
}

var iormsonda=function(x){
	return io(x)*io(x);
}

var io=function(x)
{	
	if(F_por==0 || Vin==0)
		return 0;
	max=Vin/Res-(Vin/Res)*Math.exp(-t1/tau);
	min=-Vin/Res-(-Vin/Res-max)*Math.exp(-(t2-t1)/tau);
	max1=Vin/Res-(Vin/Res-min)*Math.exp(-(t3-t2)/tau);
	min1=-Vin/Res-(-Vin/Res-max1)*Math.exp(-(t4-t3)/tau);
	max2=Vin/Res-(Vin/Res-min1)*Math.exp(-(t5-t4)/tau);
	min2=-Vin/Res-(-Vin/Res-max2)*Math.exp(-(t6-t5)/tau);
	max3=Vin/Res-(Vin/Res-min2)*Math.exp(-(t7-t6)/tau);
	min3=-Vin/Res-(-Vin/Res-max3)*Math.exp(-(t8-t7)/tau);
	max4=Vin/Res-(Vin/Res-min3)*Math.exp(-(t9-t8)/tau);
	min4=-Vin/Res-(-Vin/Res-max4)*Math.exp(-(t10-t9)/tau);
	max5=Vin/Res-(Vin/Res-min4)*Math.exp(-(t11-t10)/tau);
	min5=-Vin/Res-(-Vin/Res-max5)*Math.exp(-(t12-t11)/tau);
	max6=Vin/Res-(Vin/Res-min5)*Math.exp(-(t13-t12)/tau);
	min6=-Vin/Res-(-Vin/Res-max6)*Math.exp(-(t14-t13)/tau);
	max7=Vin/Res-(Vin/Res-min6)*Math.exp(-(t15-t14)/tau);
	min7=-Vin/Res-(-Vin/Res-max7)*Math.exp(-(t16-t15)/tau);
	max8=Vin/Res-(Vin/Res-min7)*Math.exp(-(t17-t16)/tau);
	min8=-Vin/Res-(-Vin/Res-max8)*Math.exp(-(x-t7)/tau);
	max9=Vin/Res-(Vin/Res-min8)*Math.exp(-(t19-t18)/tau);
	var oldArray=[max,max1,max2,max3,max4,max5,max6,max7,max8,max9];
  	var test=Math.max.apply(null, oldArray.filter(function (x) {
    return isFinite(x);}));
	Max_io=test;
	if(x>0 && x<t1)
		return Vin/Res-(Vin/Res)*Math.exp(-x/tau);	
	else if(x>t1 && x<t2)
		return -Vin/Res-(-Vin/Res-max)*Math.exp(-(x-t1)/tau);
	else if(x>t2 && x<t3)
		return Vin/Res-(Vin/Res-min)*Math.exp(-(x-t2)/tau);
	else if(x>t3 && x<t4)
		return -Vin/Res-(-Vin/Res-max1)*Math.exp(-(x-t3)/tau);
	else if(x>t4 && x<t5)
		return Vin/Res-(Vin/Res-min1)*Math.exp(-(x-t4)/tau);
	else if(x>t5 && x<t6)
	{
		return -Vin/Res-(-Vin/Res-max2)*Math.exp(-(x-t5)/tau);
	}
	else if(x>t6 && x<t7)
	{
		return Vin/Res-(Vin/Res-min2)*Math.exp(-(x-t6)/tau);
	}
	else if(x>t7 && x<t8){
		return -Vin/Res-(-Vin/Res-max3)*Math.exp(-(x-t7)/tau);
	}
	else if(x>t8 && x<t9){
		return Vin/Res-(Vin/Res-min3)*Math.exp(-(x-t8)/tau);
	}
	else if(x>t9 && x<t10){
		return -Vin/Res-(-Vin/Res-max4)*Math.exp(-(x-t9)/tau);
	}
	else if(x>t10 && x<t11){
		return Vin/Res-(Vin/Res-min4)*Math.exp(-(x-t10)/tau);
	}
	else if(x>t11 && x<t12){
		return -Vin/Res-(-Vin/Res-max5)*Math.exp(-(x-t11)/tau);
	}
	else if(x>t12 && x<t13){
		return Vin/Res-(Vin/Res-min5)*Math.exp(-(x-t12)/tau);
	}
	else if(x>t13 && x<t14){
		return -Vin/Res-(-Vin/Res-max6)*Math.exp(-(x-t13)/tau);
	}
	else if(x>t14 && x<t15){
		return Vin/Res-(Vin/Res-min6)*Math.exp(-(x-t14)/tau);
	}
	else if(x>t15 && x<t16){
		return -Vin/Res-(-Vin/Res-max7)*Math.exp(-(x-t15)/tau);
	}
	else if(x>t16 && x<t17){
		return Vin/Res-(Vin/Res-min7)*Math.exp(-(x-t16)/tau);
	}
	else if(x>t17 && x<t18){
		return -Vin/Res-(-Vin/Res-max8)*Math.exp(-(x-t7)/tau);
	}
	else if(x>t18 && x<t19){
		return Vin/Res-(Vin/Res-min8)*Math.exp(-(x-t18)/tau);
	}
	else if(x>t19 && x<t20){
		return -Vin/Res-(-Vin/Res-max9)*Math.exp(-(x-t19)/tau);
	}
	else return 0;

}


// envia alerta para o html
function Alerta_Io_Max()
{	
	alert("O valor Máximo de Io é de " + Max_io.toFixed(4) + " A");			
}

function Alerta_Io_Rms()
{	
	var iorms=Math.sqrt((1/0.04)*integrate(0,0.04,0.00001,iormsonda));
	alert("O valor eficaz de Io é de " + iorms.toFixed(4) + " A");			
}

function Alerta_Vo_Max()
{
	var Vo_max=Vin;
	alert("O valor Máximo de Vo é de " + Vo_max + " V");
}

function Alerta_Vpico_Fundamental()
{
	alert("O valor de pico da componente fundamental é de " + vo1p.toFixed(4) + " V");			
}


//funcao para alterar imagem do circuito html
function alterar_imagem(value){
	if(value=='Potência'){
		document.getElementById("montagem_oqmp").src="../Imagens/potenciapwm.png";
	}
	if(value=='Controlo'){
		document.getElementById("montagem_oqmp").src="../Imagens/controlospwm.png";
	}
}




function Altera_Cores()
{
	if(vpor == 1)            					
	{
		Cor_Vpor = document.getElementById("out_cor_vpor").value;
		document.getElementById("Leg1_Vpor").style.color = Cor_Vpor;
	}
	if(vref== 1)							
	{
		Cor_Vref = document.getElementById("out_cor_vref").value;
		document.getElementById("Leg1_Vref").style.color = Cor_Vref;
	}
	if(vpwm1 == 1)								
	{
		Cor_Vpwm1 = document.getElementById("out_cor_vpwm1").value;
		document.getElementById("Leg2_Vpwm1").style.color = Cor_Vpwm1;
	}
	if(vpwm2 == 1)								
	{
		Cor_Vpwm2 = document.getElementById("out_cor_vpwm2").value;
		document.getElementById("Leg2_Vpwm2").style.color = Cor_Vpwm2;
	}

	if(vo == 1)								
	{
		Cor_Vo = document.getElementById("out_cor_vo").value;
		document.getElementById("Leg3_Vo").style.color = Cor_Vo;
	}

	if(vo1 == 1)							
	{
		Cor_Vo1 = document.getElementById("out_cor_vo1").value;
		document.getElementById("Leg3_Vo1").style.color = Cor_Vo1;
	}
	if(desenha_io == 1)								
	{
		Cor_Io = document.getElementById("out_cor_io").value;
		document.getElementById("Leg4_Io").style.color = Cor_Io;
	}
	$('#myModal3').modal('hide');					//Fecha Modal
}


function Ondas_Visualizadas()
{
	contador = 0;																	
	
	if(vpor == 1)																	
	{
		contador+=1;														
		document.getElementById("legenda_vpor").style.display = "block";					
	}
	else
	{
		document.getElementById("legenda_vpor").style.display = "none";					
	}
	
	if(vref == 1)																
	{
		contador+=1;														
		document.getElementById("legenda_vref").style.display = "block";					
		if(contador == 1)															
		{
			document.getElementById("mudacor_vref").style.top = "40px";						
			document.getElementById("texto_leg_vref").style.top = "40px";
		}
		else
		{
			document.getElementById("mudacor_vref").style.top = "80px";						
			document.getElementById("texto_leg_vref").style.top = "80px";
		}
	}
	else
	{
		document.getElementById("legenda_vref").style.display = "none";						
	}	
	
	if(vpwm1 == 1)																
	{																						
		document.getElementById("legenda_vpwm1").style.display = "block";				
	}
	else
	{
		document.getElementById("legenda_vpwm1").style.display = "none";					
	}

	if(vpwm2 == 1)																
	{																					
		document.getElementById("legenda_vpwm2").style.display = "block";					
	}
	else
	{
		document.getElementById("legenda_vpwm2").style.display = "none";				
	}

	contador=0;
	if(vo == 1)																	
	{
		contador+=1;														
		document.getElementById("legenda_vo").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_vo").style.top = "40px";
				document.getElementById("texto_leg_vo").style.top = "40px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_vo").style.display = "none";							
	}	

	if(vo1 == 1)																	
	{
		contador+=1;														
		document.getElementById("legenda_vo1").style.display = "block";					
		switch (contador)															
		{
			case 1:																		
				document.getElementById("mudacor_vo1").style.top = "40px";
				document.getElementById("texto_leg_vo1").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_vo1").style.top = "80px";					
				document.getElementById("texto_leg_vo1").style.top = "80px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_vo1").style.display = "none";						
	}	
	

	if(desenha_io== 1)															
	{
		document.getElementById("legenda_io").style.display = "block";					
		{
			document.getElementById("mudacor_io").style.top = "40px";						
			document.getElementById("texto_leg_io").style.top = "40px";
		}
	}
	else
	{
		document.getElementById("legenda_io").style.display = "none";						
	}
}




function avalia_ondas()
{
	if(document.getElementById("Gra1_Leg").checked == true)											
	{
		document.getElementById("Ondas_V1").style.display = "block";
		document.getElementById("Ondas_V2").style.display = "none";
		document.getElementById("Ondas_V3").style.display = "none";
		document.getElementById("Ondas_V4").style.display = "none";
		if(vpor == 1)																			
		{
			document.getElementById("Vpor_onda").checked = true;										
		}
		if(vpor == 0)
		{
			document.getElementById("Vpor_onda").checked = false;
		}									
		
		if(vref == 1)
		{
			document.getElementById("Vref_onda").checked = true;									
		}
		if(vref == 0)
		{
			document.getElementById("Vref_onda").checked = false;									
		}
		
	}	

	if(document.getElementById("Gra2_Leg").checked == true)											
	{																																				
		document.getElementById("Ondas_V1").style.display = "none";									
		document.getElementById("Ondas_V2").style.display = "block";
		document.getElementById("Ondas_V3").style.display = "none";
		document.getElementById("Ondas_V4").style.display = "none";
		if(vpwm1 == 1)
		{
			document.getElementById("Vpwm1_onda").checked = true;									
		}
		if(vpwm1 == 0)
		{
			document.getElementById("Vpwm1_onda").checked = false;									
		}
		if(vpwm2 == 1)
		{
			document.getElementById("Vpwm2_onda").checked = true;										
		}
		if(vpwm2 == 0)
		{
			document.getElementById("Vpwm2_onda").checked = false;	
		}									
	}

	if(document.getElementById("Gra3_Leg").checked == true)											
	{																																			
		document.getElementById("Ondas_V1").style.display = "none";									
		document.getElementById("Ondas_V2").style.display = "none";
		document.getElementById("Ondas_V3").style.display = "block";
		document.getElementById("Ondas_V4").style.display = "none";
		if(vo == 1)
		{
			document.getElementById("Vo_onda").checked = true;										
		}
		if(vo == 0)
		{
			document.getElementById("Vo_onda").checked = false;										
		}
		if(vo1 == 1)
		{
			document.getElementById("Vo1_onda").checked = true;										
		}
		if(vo1 == 0)
		{
			document.getElementById("Vo1_onda").checked = false;										
		}

	}
	if(document.getElementById("Gra4_Leg").checked == true)											
	{																																					
		document.getElementById("Ondas_V1").style.display = "none";									
		document.getElementById("Ondas_V2").style.display = "none";
		document.getElementById("Ondas_V3").style.display = "none";
		document.getElementById("Ondas_V4").style.display = "block";
		if(desenha_io == 1)
		{
			document.getElementById("Io_onda").checked = true;										
		}
		if(desenha_io == 0)
		{
			document.getElementById("Io_onda").checked = false;										
		}
	}


}


function alterar_visual()
{
	var Onda_Vpor = document.getElementById("Vpor_onda").checked;
	var Onda_Vref = document.getElementById("Vref_onda").checked;
	var Onda_Vpwm1 = document.getElementById("Vpwm1_onda").checked;
	var Onda_Vpwm2 = document.getElementById("Vpwm2_onda").checked;
	var Onda_Vo = document.getElementById("Vo_onda").checked;
	var Onda_Vo1 = document.getElementById("Vo1_onda").checked;
	var Onda_io= document.getElementById("Io_onda").checked;
	
		if(document.getElementById("Gra1_Leg").checked == true)									
		{
			contador=0;
			
			if(Onda_Vpor == false)
			{
				vpor=0;
				document.getElementById("Leg1_Vpor").style.display = "none";
			}
			else if(Onda_Vpor == true)
			{
					contador+=1;
					vpor=1;
					document.getElementById("rect_leg1").style.width = "2.5vw";
					document.getElementById("Leg1_Vpor").style.display = "block";
			}

			if(Onda_Vref == false)
			{
				vref = 0;
				document.getElementById("Leg1_Vref").style.display = "none";
			}
			else if(Onda_Vref == true)
			{
					contador+=1;
					document.getElementById("Leg1_Vref").style.display="block";
					if(contador == 1)
					{	
						document.getElementById("rect_leg1").style.width="2.5vw";
						document.getElementById("Leg1_Vref").style.left = "84.80vw"; 			
					}
					else
					{
						document.getElementById("rect_leg1").style.width="3.9vw";
						document.getElementById("Leg1_Vref").style.left = "86.71vw";			
					}
				vref=1;
			}

			if(contador==0){
				document.getElementById("rect_leg1").style.display="none";
			}
			else{
				document.getElementById("rect_leg1").style.display="block";
			}
			$('#myModal2').modal('hide');	
		}
		
		if(document.getElementById("Gra3_Leg").checked == true)
		{
			contador=0;
			if(Onda_Vo == false)
			{
				vo = 0;
				document.getElementById("Leg3_Vo").style.display="none";
			}
			else
			{
				if(Onda_Vo == true)
				{
					contador=contador+1;				
					vo = 1;
					document.getElementById("Leg3_Vo").style.display="block";
					document.getElementById("rect_leg3").style.width="1.9vw";
				}
			}
			
			if(Onda_Vo1 == false)
			{
				vo1 = 0;
				document.getElementById("Leg3_Vo1").style.display="none";
			}
			else if(Onda_Vo1 == true)
			{ 
					contador=contador+1;
					switch (contador)
					{
						case 1:															 
							document.getElementById("rect_leg3").style.width="1.9vw";
							document.getElementById("Leg3_Vo1").style.left = "84.80vw";
							break;
						case 2:	
							document.getElementById("rect_leg3").style.width="3.9vw";														 
							document.getElementById("Leg3_Vo1").style.left = "86.61vw";		 
							break;
					
					}
					vo1 = 1;
			}
					
			if(contador==0){
				document.getElementById("rect_leg3").style.display="none";
			}
			else{
				document.getElementById("rect_leg3").style.display="block";
			}
			$('#myModal2').modal('hide');
		}
			
	
		if(document.getElementById("Gra2_Leg").checked == true)							
		{
			contador=0;

			if(Onda_Vpwm1 == false)
			{	
				vpwm1 = 0;
				document.getElementById("Leg2_Vpwm1").style.display = "none";
			}
			else
			{	
				if(Onda_Vpwm1 == true)
				{
					contador=contador+1;
					vpwm1 = 1;
					document.getElementById("rect_leg2").style.width="3.5vw";
					document.getElementById("Leg2_Vpwm1").style.display = "block";
				}
			}

			if(Onda_Vpwm2 == false)
			{
				vpwm2 = 0;
				document.getElementById("Leg2_Vpwm2").style.display = "none";
			}
			else if(Onda_Vpwm2 == true)
			{
					contador=contador+1;
					switch(contador){
						case 1:
							document.getElementById("rect_leg2").style.width="3.5vw";															 
							document.getElementById("Leg2_Vpwm2").style.left = "84.80vw";
							break;
						case 2:
							document.getElementById("rect_leg2").style.width="7vw";															 
							document.getElementById("Leg2_Vpwm2").style.left = "87.92vw";		 
							break;
					}
					vpwm2 = 1;
					document.getElementById("Leg2_Vpwm2").style.display = "block";
			}
			
			if(contador==0){
				document.getElementById("rect_leg2").style.display="none";
			}
			else{
				document.getElementById("rect_leg2").style.display="block";
			}

			$('#myModal2').modal('hide');												//Fecha o Modal
		}

		if(document.getElementById("Gra4_Leg").checked == true){
			if(Onda_io == false)
			{
				
				desenha_io = 0;
				document.getElementById("rect_leg4").style.display="none";
				document.getElementById("Leg4_Io").style.display="none";
			}
			else if(Onda_io == true)
			{
					
					contador+=1;
					document.getElementById("rect_leg4").style.display="block";
					document.getElementById("Leg4_Io").style.display="block";
					desenha_io = 1;
					
			}
			if(contador==0){
				document.getElementById("rect_leg4").style.display="none";
			}		
			$('#myModal2').modal('hide');
		}
}




function Altera_Var()
{
	
	var Min = document.getElementById("Min_Val").value;
	var Max = document.getElementById("Max_Val").value;
	
	var Verifica_Vpicop = document.getElementById("alt_vpicop").checked;
	var Verifica_Freq = document.getElementById("alt_freq").checked;
	var Verifica_Vpicor = document.getElementById("alt_vpicor").checked;
	var Verifica_Vin = document.getElementById("alt_vin").checked;
	var Verifica_R = document.getElementById("alt_r").checked;
	var Verifica_L = document.getElementById("alt_l").checked;
	
	
	if( (Max < Min || Min > Max) || (Max.length == 0 ) || (Min.length == 0) || (Verifica_Vpicop == false) && (Verifica_Freq == false) && (Verifica_Vpicor == false) && (Verifica_Vin == false)  && (Verifica_Vin == false) && (Verifica_R == false) && (Verifica_L == false) )
	{
		if( (Max.length == 0 ) && (Min.length == 0) && ( (Verifica_Vpicop == false) && (Verifica_Freq == false) && (Verifica_Vpicor == false) && (Verifica_Vin == false)  && (Verifica_Vin == false) && (Verifica_R == false) && (Verifica_L == false) ))
		{
		alert("Sem Dados Para Recolher!");
		}
		else
		{
			if(Max < Min || Min > Max)
			{
			alert("Valores Mínimos e Máximos Incoorentes!");
			}
			
			if(Max.length == 0 && Min.length == 0)
			{
			alert("Valores Mínimos e Máximos Não Introduzidos!");
			}
			
			if( (Verifica_Vpicop == false) && (Verifica_Freq == false) && (Verifica_Vpicor == false) && (Verifica_Vin == false)  && (Verifica_Vin == false) && (Verifica_R == false) && (Verifica_L == false) )
			{
			alert("Nenhuma Variável Selecionada!");
			}	
		}	
	}
	else
	{
		//Caso não haja erros então verifica qual variável foi selecionada:
		if(Verifica_Vpicop == true)																				
		{
			if(Max<0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor da Tensão de Pico da Portadora necessita de ser positivo!");		
			}
			else
			{
				if( (Max) < Vpico )																			
				{
					atualiza_vpico(Max);																	
				}
				if ( Min > Vpico )																			
				{
					atualiza_vpico(Min);																	
				}	
				document.getElementById("tensao_pico").min = Min;												
				document.getElementById("tensao_pico").max = Max;
				// document.getElementById("tensao_pico").step = ((Max-Min)*0.001);
				$('#myModal').modal('hide');																
			}
		}
		
		if(Verifica_Freq == true)																			
		{
			if(Max<0 || Min<0 )													
			{
				alert("Valor Introduzidos Impossíveis! Valor da Frequencia tem que ser positivo!");		
			}
			else
			{
				if( Max < F_por )																		
				{
					atualiza_freq(Max);																	
				}
				if ( Min > F_por)																		
				{
					atualiza_freq(Min);																	
				}
				document.getElementById("freq1").min = Min;												
				document.getElementById("freq1").max = Max;
				$('#myModal').modal('hide');																
			}
		}
		
		if(Verifica_Vpicor== true)																				
		{
			if(Max<=0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor Da Tensão de Pico Necessita de ser positivo!");	
			}
			else
			{
				if( (Max) < Vpicoref )																			
				{
					atualiza_vpicor(Max);																	
				}
				if ( Min > Vpicoref )																			
				{
					atualiza_vpicor(Min);																	
				}
				document.getElementById("tensaoref").min = Min;												
				document.getElementById("tensaoref").max = Max;
				$('#myModal').modal('hide');															
			}
		}
		
		if(Verifica_Vin == true)																				
		{
			if(Max<0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor da Tensão Necessita de ser positivo!");	
			}
			else
			{
				if( (Max) < Vin )																			
				{
					atualiza_vin(Max);																	
				}
				if ( Min > Vin )																		
				{
					atualiza_vin(Min);																	
				}
				document.getElementById("tensao_id").min = Min;												
				document.getElementById("tensao_id").max = Max;
				// document.getElementById("tensao_id").step = ((Max-Min)*0.001);
				$('#myModal').modal('hide');	
			}																								
		}

		if(Verifica_R == true)																				
		{
			if(Max<0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor da Resistência Necessita de ser positivo!");	
			}
			else
			{
				if( (Max) < Res )																			
				{
					atualiza_Res(Max);																
				}
				if ( Min > Res )																			
				{
					atualiza_Res(Min);																	
				}
				document.getElementById("Res_id").min = Min;												
				document.getElementById("Res_id").max = Max;
				// document.getElementById("Res_id").step = ((Max-Min)*0.001);
				$('#myModal').modal('hide');	
			}																								
		}
		
		if(Verifica_L == true)																				
		{
			if(Max<0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor da Indutãncia Necessita de ser positivo!");	
			}
			else{
			if( (Max) < Ind )																			
			{
				atualiza_L(Max);																		
			}
			if ( Min > Ind )																				
			{								
				atualiza_L(Min);																			
			}
			document.getElementById("Ind_id").min = Min;														
			document.getElementById("Ind_id").max = Max;
			$('#myModal').modal('hide');
			}																	
		}
	}
}



//atualiza valores		
function atualiza_vpico(val) 
{
	document.querySelector("#outtensaops").value=val+" V";
	Vpico= val;
	Draw();
}


function atualiza_freq(val) 
{	
	document.querySelector("#outfreqs").value=val+" Hz";
	F_por = val;
	Draw();
}


function atualiza_vpicor(val) 
{	
	document.querySelector("#outtensaorefs").value=val+" V";
	Vpicoref = val;
	Draw();
}


function atualiza_vin(val) 
{
	document.querySelector("#outvin").value=val+" V";
	Vin = val;
	Draw();
}

function atualiza_Res(val) 
{
	document.querySelector("#outres").value=val+" Ω";
	Res= val;
	tau=Ind/Res;
	Draw();
}


function atualiza_L(val) 
{
	document.querySelector("#outind").value=val+" mH";
	Ind= val*10e-4;
	tau=Ind/Res;
	Draw();
}

// function atualiza_zeros(){
// 	var ii=[];
// 	var z;
// 	for(var i; i<5; i++)
// 	{
// 		if(i==0){
// 			z=Encontrar_Zeros(calculario,0.0005,0.04,0.00001);
// 			if(z==0.0005)
// 				z=0;
// 			ii.push(z);
// 		}
// 		else{
// 			z=Encontrar_Zeros(calculario,z+0.0005,0.004,0.00001);
// 		}
// 	}
// }
		

		

					

//MÉTODO DAS BISSECÇÕES SUCESSIVAS

	
	function sign(x) 
	{
	return (x < 0.0) ? -1 : (x > 0.0) ? 1 : 0;
	}
 
	function Encontrar_Zeros(f, lowerBound, upperBound, step) {
		var  x = lowerBound, ox = x,
		y = f(x), oy = y,
		s = sign(y), os = s;
		var zero = false;
 
		for (; x <= upperBound ; x += step) {
			s = sign(y = f(x));
			if (s == 0) {
				return x;
				zero = true;
	    }
	    else if (s != os) {
			var dx = x - ox;
			var dy = y - oy;
			var cx = x - dx * (y / dy);
			return cx;
			zero = true;
	    }

	    ox = x; oy = y; os = s;
	}
	
	//Valida se encontrou zeros
	if(zero == false)
	{
	return 0;
	}
	
}

function Encontrar_Zeros2(f, lowerBound, upperBound, step) 
{
	var  x = lowerBound, ox = x,
	y = f(x), oy = y,
	s = sign(y), os = s;
	var zero = false;
	var it1 = true;
		
	for (; x <= upperBound ; x += step) 
	{
		
		if(it1 == false)
		{
			var y = f(x);
			var dy = Math.abs(y - oy);
			if( (dy < 0.0000009) && (y<0.0009))
			{
			return x;
			zero = true;
			}
		}	
		it1 = false;
	    ox = x; oy = y; os = s;
	}
	
	//Valida se encontrou zeros
	if(zero == false)
	{
	return 0;
	}
}

//MÉTODO INTEGRAL

function integrate(a, b, dx, f) {
	
	// calculate the number of trapezoids
	n = (b - a) / dx;
	
	// define the variable for area
	Area = 0;
	
	//loop to calculate the area of each trapezoid and sum.
	for (i = 1; i <= n; i++) {
		//the x locations of the left and right side of each trapezpoid
		x0 = a + (i-1)*dx;
		x1 = a + i*dx;
		
		// the area of each trapezoid
		Ai = dx * (f(x0) + f(x1))/ 2.;
		
		// cumulatively sum the areas
		Area = Area + Ai	
		
	} 
	return Area;
}


// Função De Inicialização
function init() 
{
	Draw();
	document.getElementById("Leg1_Vpor").style.color = "#003399";
	document.getElementById("Leg1_Vref").style.color = "black";
	document.getElementById("Leg2_Vpwm1").style.color = "blue";
	document.getElementById("Leg2_Vpwm2").style.color = "green";
	document.getElementById("Leg2_Vpwm2").style.display = "none";
	document.getElementById("Leg3_Vo").style.color = "red";
	document.getElementById("Leg3_Vo1").style.color = "black";
	document.getElementById("Leg4_Io").style.color = "green";
}


var Canvas = document.getElementById('xy-graph');  
var Ctx = null ;

var Width = Canvas.width ;
var Height = Canvas.height ;


var Canvas1 = document.getElementById('xy1-graph');  
var Ctx1 = null ;

var Width = Canvas1.width ;
var Height = Canvas1.height ;

var Canvas2 = document.getElementById('xy2-graph');  
var Ctx2 = null ;

var Width = Canvas2.width ;
var Height = Canvas2.height ;

var Canvas3 = document.getElementById('xy3-graph');  
var Ctx3 = null ;

var Width = Canvas3.width ;
var Height = Canvas3.height ;



function MaxX() 
{
   return 0.04;
}


function MinX() 
{
  return 0;
}



function MaxY() 
{
	if(Vpico>Vpicoref)
		return Vpico*1.5;
	else if (Vpico<=Vpicoref)
		return Vpicoref*1.5;
}

function MinY() 
{
	if(Vpico>Vpicoref)
		return (-1)*Vpico*1.5;
	else if (Vpico<=Vpicoref)
		return (-1)*Vpicoref*1.5;
}

function MaxX1() 
{
  return 0.04;
}

function MinX1() 
{
  return 0;
}



function MaxY1() 
{
	return 1.2;
}

function MinY1() 
{
	return -0.15;
}


function MaxX2() 
{
  return 0.04 ;
}

function MinX2() 
{
  return 0;
}


function MaxY2() 
{
	return parseInt(Vin)+25;

}

function MinY2() 
{
	return (-1)*parseInt(Vin)-25;
}


function MaxX3() 
{
   return 0.04;
}


function MinX3() 
{
  return 0;
}

function MaxY3() 
{
	if(!isNaN(Max_io))
		return Max_io+5;
	else return 10;
}

function MinY3() {
	if(!isNaN(Max_io))
		return (-1)*Max_io-5;
	else return -10;
}





function XC(x) 
{
  return (x - MinX()) / (MaxX() - MinX()) * Width ;
}


function YC(y) 
{
  return Height - (y - MinY()) / (MaxY() - MinY()) * Height ;
}

function XC1(x) 
{
  return (x - MinX1()) / (MaxX1() - MinX1()) * Width ;
}


function YC1(y) {
  return Height - (y - MinY1()) / (MaxY1() - MinY1()) * Height ;
}

function XC2(x) 
{
  return (x - MinX2()) / (MaxX2() - MinX2()) * Width ;
}


function YC2(y) {
  return Height - (y - MinY2()) / (MaxY2() - MinY2()) * Height ;
}

function XC3(x) 
{
  return (x - MinX3()) / (MaxX3() - MinX3()) * Width ;
}


function YC3(y) {
  return Height - (y - MinY3()) / (MaxY3() - MinY3()) * Height ;
}





function Draw() {
	if(F_por>0){
		getts();
		vo_rms();
	}
	else document.getElementById("myText2").innerHTML ="erro";
 if (Canvas.getContext) 
 {
	
	Ctx = Canvas.getContext('2d');
	Ctx.clearRect(0,0,Width,Height) ;
	
	
	Ctx1 = Canvas1.getContext('2d');
	Ctx1.clearRect(0,0,Width,Height) ;

	Ctx2 = Canvas2.getContext('2d');
	Ctx2.clearRect(0,0,Width,Height) ;

	Ctx3 = Canvas3.getContext('2d');
	Ctx3.clearRect(0,0,Width,Height) ;
 
	
	Eixos1();
	
	Eixos2();
	
	Eixos3();

	Eixos4();
	
	
	if(vref == 1)
	{
		
		desenhar1(Vref);
	}
	if(vpor == 1)
	{
		
		desenhar1(Vpor);
	}

	if(vpwm1 == 1)
	{
		desenhar2(Vpwm_1);
	}

	if(vpwm2 == 1)
	{
		desenhar2(Vpwm_2);
	}

	if(vo == 1)
	{
		desenhar3(Vo);
	}

	if(vo1==1)
	{
		desenhar3(Vo1);
	}

	if(desenha_io==1)
	{
		desenhar4(io);
	}
	
	
}
}


//distancia entre as referencias
function XTickDelta() 
{
  return 0.01 ;
}


function YTickDelta() 
{
  return ( MaxY()/10) ;												
}


function YTickDelta1() 
{
	return (MaxY1() / 6);												
}

function YTickDelta2() 
{
	return (MaxY2() / 5);												
}

function YTickDelta3() 
{
	return (MaxY3()/10);												
}


//desenha eixos dos gráficos
function Eixos1() 
{
 	Ctx.font = "10px Arial";
 	Ctx.save() ;															
 	Ctx.lineWidth = 2 ;
 	var mar_esc;															
 
 	// Eixo dos YY Positivo
 	Ctx.beginPath() ;
	 Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(0),YC(MaxY())) ;
 	Ctx.strokeStyle='black';
 	Ctx.stroke() ;

 	// Eixo dos YY Negativo
 	Ctx.beginPath() ;
	Ctx.moveTo(XC(0),YC(0)) ;
	Ctx.lineTo(XC(0),YC(MinY())) ;
	Ctx.stroke() ;

 
 	var delta = YTickDelta() ;
 	for (var i = 1; (i * delta) < MaxY() ; ++i) {
		mar_esc = (MaxY() / 10)*i;
		Ctx.beginPath() ;
		Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
		Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
		Ctx.stroke() ; 
		Ctx.fillText(mar_esc.toFixed(2),XC(0)+8,YC(i*delta)+3); 			
	}
 
 
 	var delta = YTickDelta() ;
 	for (var i = -1; (i * delta) > MinY() ; --i) 
 	{
	 	mar_esc = (MaxY() / 10)*i;
		Ctx.beginPath() ;
		Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
		Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
		Ctx.stroke() ;
		Ctx.fillText(mar_esc.toFixed(2),XC(0)+8,YC(i*delta)+3)  			
 	}  

 	// Eixo dos XX Positivo
	Ctx.beginPath() ;
	Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(MaxX()),YC(0)) ;
 	Ctx.stroke() ;

 
 	Ctx.beginPath() ;
 	Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(MinX()),YC(0)) ;
 	Ctx.stroke() ;

 
 	var delta = XTickDelta() ;
 	for (var i = 1; (i * delta) < MaxX() ; ++i) {
  	Ctx.beginPath() ;
 	Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  	Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  	Ctx.stroke() ;  
  	if(i==1)
  	{
		Ctx.fillText(i/100,XC(i * delta)-5,YC(0)+15);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
 	}
 	else
  	{
		Ctx.fillText(i/100,XC(i * delta)-8,YC(0)+15);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
  	}
 	}

 	var delta = XTickDelta() ;
 	for (var i = 0; (i * delta) > MinX() ; --i) {
  		Ctx.beginPath() ;
  		Ctx.moveTo(XC(i * delta),YC(0)-5) ;
  		Ctx.lineTo(XC(i * delta),YC(0)+5) ;
  		Ctx.stroke() ;  
  		Ctx.fillText(i/100,XC(i * delta)-5,YC(0)+12); 					
 	}
 	Ctx.restore() ;															
}



function Eixos2() {
 	Ctx1.font = "10px Arial";
 	Ctx1.save() ;
 	Ctx1.lineWidth = 2 ;
 	Ctx1.strokeStyle="black";
 

 	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0)) ;
 	Ctx1.lineTo(XC1(0),YC1(MaxY1())) ;
 	Ctx1.stroke() ;

 
 	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0)) ;
 	Ctx1.lineTo(XC1(0),YC1(MinY1())) ;
 	Ctx1.stroke() ;

 	var mar_esc;
 	var delta = YTickDelta1() ;
 	for (var i = 1; (i * delta) < MaxY1() ; ++i) 
 	{
		mar_esc = (MaxY1() / 6)*i;

		Ctx1.beginPath() ;
		Ctx1.moveTo(XC1(0) - 5,YC1(i * delta)) ;
		Ctx1.lineTo(XC1(0) + 5,YC1(i * delta)) ;
		Ctx1.stroke() ; 
		Ctx1.fillText(mar_esc.toFixed(2),XC1(0)+5,YC1(i*delta)+3); 			

 }


 
	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0)) ;
	Ctx1.lineTo(XC1(MaxX1()),YC1(0)) ;
 	Ctx1.stroke() ;

 	// Eixo dos XX Negativo
 	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0));
 	Ctx1.lineTo(XC1(MinX1()),YC1(0)) ;
 	Ctx1.stroke() ;


 	var delta = XTickDelta() ;
 	for (var i = 1; (i * delta) < MaxX1() ; ++i) {
		Ctx1.beginPath() ;
		Ctx1.moveTo(XC1(i * delta),YC1(0)-5) ;
		Ctx1.lineTo(XC1(i * delta),YC1(0)+5) ;
		Ctx1.stroke() ;  
		if(i==1)
		{
			Ctx1.fillText(i/100,XC1(i * delta)-5,YC1(0)+12);  
		}
		else
		{
			Ctx1.fillText(i/100,XC1(i * delta)-8,YC1(0)+12);  
		}
 	}

 	var delta = XTickDelta() ;
 	for (var i = 0; (i * delta) > MinX1() ; --i) {
		Ctx1.beginPath() ;
		Ctx1.moveTo(XC1(i * delta),YC1(0)-5) ;
		Ctx1.lineTo(XC1(i * delta),YC1(0)+5) ;
		Ctx1.stroke() ;  
		Ctx1.fillText(i+"\u03a0",XC1(i * delta)-5,YC1(0)+12); 				
	}
 	Ctx1.restore() ;

}


function Eixos3() {
 	Ctx2.font = "10px Arial";
 	Ctx2.save() ;
 	Ctx2.lineWidth = 2 ;
 	Ctx2.strokeStyle = "black" ;
 	
 	// Eixo dos YY Positivo
 	Ctx2.beginPath() ;
 	Ctx2.moveTo(XC2(0),YC2(0)) ;
 	Ctx2.lineTo(XC2(0),YC2(MaxY2())) ;
 	Ctx2.stroke() ;

 	//Eixo dos YY Negativo
 	Ctx2.beginPath() ;
 	Ctx2.moveTo(XC2(0),YC2(0)) ;
 	Ctx2.lineTo(XC2(0),YC2(MinY2())) ;
 	Ctx2.stroke() ;

 
 	var mar_esc;
 	var delta = YTickDelta2() ;
 	for (var i = 1; (i * delta) < MaxY2() ; ++i) 
 	{
		mar_esc = (MaxY2() / 5)*i;

		Ctx2.beginPath() ;
		Ctx2.moveTo(XC2(0) - 5,YC2(i * delta)) ;
		Ctx2.lineTo(XC2(0) + 5,YC2(i * delta)) ;
		Ctx2.stroke() ; 
		Ctx2.fillText(mar_esc.toFixed(0),XC2(0)+8,YC2(i*delta)+3); 			

	 }

 	var delta = YTickDelta2();
 	for (var i=-1; (i*delta) > MinY2(); --i){
		mar_esc=(MaxY2() / 5)*i;
		Ctx2.beginPath();
		Ctx2.moveTo(XC2(0)-5,YC2(i*delta));
		Ctx2.lineTo(XC2(0) + 5,YC2(i*delta));
		Ctx2.stroke();
		Ctx2.fillText(mar_esc.toFixed(0),XC2(0) + 8, YC2(i*delta) + 3);
 	} 


 	// Eixo dos XX Positivo
 	Ctx2.beginPath() ;
 	Ctx2.moveTo(XC2(0),YC2(0)) ;
 	Ctx2.lineTo(XC2(MaxX2()),YC2(0)) ;
 	Ctx2.stroke() ;

 

 	var delta = XTickDelta() ;
	for (var i = 1; (i * delta) < MaxX2() ; ++i) {
		Ctx2.beginPath() ;
		Ctx2.moveTo(XC2(i * delta),YC2(0)-5) ;
		Ctx2.lineTo(XC2(i * delta),YC2(0)+5) ;
		Ctx2.stroke() ;  
		if(i==1)
		{
			Ctx2.fillText(i/100,XC2(i * delta)-5,YC2(0)+12);  
		}
		else
		{
			Ctx2.fillText(i/100,XC2(i * delta)-8,YC2(0)+12);
		}
 	}

 	var delta = XTickDelta() ;
 	for (var i = 0; (i * delta) > MinX2() ; --i) {
		Ctx2.beginPath() ;
		Ctx2.moveTo(XC2(i * delta),YC2(0)-5) ;
		Ctx2.lineTo(XC2(i * delta),YC2(0)+5) ;
		Ctx2.stroke() ;  
		Ctx2.fillText(i/100,XC2(i * delta)-5,YC2(0)+12); 				
 	}
 	Ctx2.restore() ;

}


function Eixos4() {
 	Ctx3.font = "10px Arial";
 	Ctx3.save() ;
 	Ctx3.lineWidth = 2.5 ;
 	Ctx3.strokeStyle="#000000";

	// Eixo dos YY Positivo
 	Ctx3.beginPath() ;
 	Ctx3.moveTo(XC3(0),YC3(0)) ;
 	Ctx3.lineTo(XC3(0),YC3(MaxY3())) ;
 	Ctx3.stroke() ;

 	// Eixo dos YY Negativo
 	Ctx3.beginPath() ;
 	Ctx3.moveTo(XC3(0),YC3(0)) ;
 	Ctx3.lineTo(XC3(0),YC3(MinY3())) ;
 	Ctx3.stroke() ;


	var mar_esc;
 	var delta = YTickDelta3() ;
 	for (var i = 1; (i * delta) < MaxY3() ; ++i) 
 	{
		mar_esc = (MaxY3() / 10)*i;

		Ctx3.beginPath() ;
		Ctx3.moveTo(XC3(0) - 5,YC3(i * delta)) ;
		Ctx3.lineTo(XC3(0) + 5,YC3(i * delta)) ;
		Ctx3.stroke() ; 
		Ctx3.fillText(mar_esc.toFixed(2),XC3(0)+5,YC3(i*delta)+3); 			
 	}

 	var delta = YTickDelta3();
 	for (var i=-1; (i*delta) > MinY3(); --i){
		mar_esc=(MaxY3() / 10)*i;
		Ctx3.beginPath();
		Ctx3.moveTo(XC3(0)-5,YC3(i*delta));
		Ctx3.lineTo(XC3(0) + 5,YC3(i*delta));
		Ctx3.stroke();
		Ctx3.fillText(mar_esc.toFixed(2),XC3(0) + 8, YC3(i*delta) + 3);
 	} 


	// Eixo dos XX Positivo
 	Ctx3.beginPath() ;
 	Ctx3.moveTo(XC3(0),YC3(0)) ;
 	Ctx3.lineTo(XC3(MaxX3()),YC3(0)) ;
 	Ctx3.stroke() ;

 	// Eixo dos XX Negativo
 	Ctx3.beginPath() ;
 	Ctx3.moveTo(XC3(0),YC3(0));
 	Ctx3.lineTo(XC3(MinX3()),YC3(0)) ;
 	Ctx3.stroke() ;

 	// Marcas de Referência Escalar nos Eixos dos XX.

 	var delta = XTickDelta() ;
 	for (var i = 1; (i * delta) < MaxX3() ; ++i) {
		Ctx3.beginPath() ;
		Ctx3.moveTo(XC3(i * delta),YC3(0)-5) ;
		Ctx3.lineTo(XC3(i * delta),YC3(0)+5) ;
		Ctx3.stroke() ;  
		if(i==1)
		{
			Ctx3.fillText(i/100,XC3(i * delta)-5,YC3(0)+12); 
		}
		else
		{
			Ctx3.fillText(i/100,XC3(i * delta)-8,YC3(0)+12); 
		}
 	}

 	var delta = XTickDelta() ;
 	for (var i = 0; (i * delta) > MinX3() ; --i) {
		Ctx3.beginPath() ;
		Ctx3.moveTo(XC3(i * delta),YC3(0)-5) ;
		Ctx3.lineTo(XC3(i * delta),YC3(0)+5) ;
		Ctx3.stroke() ;  
		Ctx3.fillText(i+"\u03a0",XC3(i * delta)-5,YC3(0)+12); 				
 	}
 	Ctx3.restore() ;

}


//desenha nos gráficos
function desenhar1(f) 
{
	var first = true; 													
	var XSTEP = (MaxX()-MinX())/Width; 								
	Ctx.beginPath() ;
	Ctx.lineWidth=1;
		
	for (var x = MinX(); x <= MaxX(); x += XSTEP) 
	{
		var y = f(x);													
		if (first) 														
		{
			Ctx.moveTo(XC(x),YC(y)) ;									
			first = false ;												
		} 
		else 
		{
			Ctx.lineTo(XC(x),YC(y)) ;								
		}
	}
	
  
	if(f(x)==Vref(x))											
	{
		var muda_cor = Cor_Vref;										
		if( muda_cor == 0)												
		{
			Ctx.strokeStyle="#000000";									
		}
		else
		{
			Ctx.strokeStyle=muda_cor.toString();						
		}
	}
	else if(f(x)==Vpor(x)) 
	{
		var muda_cor1 = document.getElementById("out_cor_vpor").value;	
		if( muda_cor1 == 0)		
		{
		Ctx.strokeStyle="#003399";	
		Ctx.lineWidth=1.5;
		}
		else
		{
		Ctx.strokeStyle=muda_cor1.toString();							
		}
	}
	else{
		Ctx.strokeStyle="#000000";
	}
	Ctx.stroke();													
}


function desenhar2(f) 
{
	var first = true;													
	var XSTEP = (MaxX1()-MinX1())/Width ;								
	Ctx1.beginPath() ;												
  	Ctx1.lineWidth=1.5;
	for (var x = MinX1(); x <= MaxX1(); x += XSTEP) 
	{
		var y = f(x);													
		if (first) 														
		{
			Ctx1.moveTo(XC1(x),YC1(y)) ;								
			first = false ;												
		} 
		else 
		{
			Ctx1.lineTo(XC1(x),YC1(y)) ;								
		}
	}
	var muda_cor2=Cor_Vpwm1;
	if(f(x)==Vpwm_1(x)){
		var muda_cor2=Cor_Vpwm1;
		if(muda_cor2==0){
			Ctx1.strokeStyle="blue";  
		}
		else{
		Ctx1.strokeStyle=muda_cor2.toString();
		} 
	}
	if(f(x)==Vpwm_2(x)){
		var muda_cor2=Cor_Vpwm2;
		if(muda_cor2==0){
			Ctx1.strokeStyle="green";  
		}
		else{
		Ctx1.strokeStyle=muda_cor3.toString();
		} 
	}      	      								
	Ctx1.stroke() ;														
}



function desenhar3(f) 
{
	var first = true;													
	var XSTEP = (MaxX2()-MinX2())/Width ;								
	Ctx2.beginPath() ;	
	Ctx2.lineWidth = 2.5 ;											
  
	for (var x = MinX2(); x <= MaxX2(); x += XSTEP) 
	{
		var y = f(x);													
		if (first) 														
		{
			Ctx2.moveTo(XC2(x),YC2(y)) ;								
			first = false ;												
		} 
		else 
		{
			Ctx2.lineTo(XC2(x),YC2(y)) ;								
		}
	}
	if(f(x)==Vo(x)){
		muda_cor4=Cor_Vo;
		if(muda_cor4==0){
			Ctx2.strokeStyle= 'red';
		}
		else{
			Ctx2.strokeStyle=muda_cor4.toString();
		}
	}
	else{
		if(f(x)==Vo1(x)){
			muda_cor5=Cor_Vo1;
			Ctx2.lineWidth=0.5;
			if(muda_cor5==0){
				Ctx2.strokeStyle='black';
			}
			else{
				Ctx2.strokeStyle=muda_cor5.toString();
			}
		}
		
	}
	Ctx2.stroke();											
}

function desenhar4(f) 
{
	var first = true;													
	var XSTEP = (MaxX3()-MinX3())/Width ;								
	Ctx3.beginPath() ;
	Ctx3.lineWidth=1.5;													
  
	for (var x = MinX2(); x <= MaxX3(); x += XSTEP) 
	{
		var y = f(x);													
		if (first) 														
		{
			Ctx3.moveTo(XC3(x),YC3(y)) ;								
			first = false ;												
		} 
		else 
		{
			Ctx3.lineTo(XC3(x),YC3(y)) ;								
		}
	}
	if(f(x)==io(x)){
		muda_cor6=Cor_Io;
		if(muda_cor6==0){
			Ctx3.strokeStyle= 'green';
		}
		else{
			Ctx3.strokeStyle=muda_cor6.toString();
		}
	}
	Ctx3.stroke();											
}
