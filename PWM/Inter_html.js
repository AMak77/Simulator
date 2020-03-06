//Valores iniciais para as componentes do circuito
var Vin = 100;																
var Ind=5e-3;
var Res=10;								
var WL;																					
var Imp;
var tau=Ind/Res;

//Valores iniciais para o desenho dos gráficos											
var Vpico=1;
var Freq=50;
var ref=0.33;
var nref=-0.33;
var T=1/Freq;


//Varíaveis de Calculo
var min1;
var min2;
var max1;
var max2;
var Max_io=9.99;
var Vo_max;							
var amp_harm=140;
var di3=0;											
var t1,t2,t3,t4,t5,t6,t7,t8,t9,t10,t11,t12,t13,t14,t15,t16,t17,t18,t19,t20;		


//Variaveis de Cor Legenda
var Cor_Vs=0;																		
var Cor_Vref=0;										
var Cor_Vrefn=0;										
var Cor_Vpor=0;
var Cor_Vout=0;
var Cor_T1=0;
var Cor_T2=0;
var Cor_T3=0;
var Cor_T4=0;
var Cor_io=0;
var Cor_Harm=0;


// Variaveis Escala

var Auto_1=true;
var Auto_2=true;
var Auto_4=true;									
var Man_1=false;									
var Man_2=false;																	
var Man_4=false;																	
var New_MinY;										
var New_MaxY;									
var Int_2; 										

//Variaveis Controlo de Visualização
var vsin=1;
var vpor=1;									
var vref=1;									
var vrefn=1;								
var vout=1;
var render_vin1=1;
var desenha_T1=0;
var desenha_T3=0;
var desenha_T4=0;
var desenha_T2=0;
var render_io=1;	
var render_del=1;
var render_harm=1;
var render_Z1=0;
var render_Z2=0;									


//Onda Portadora Triângular
var Vpor = function(x) 
{	T=1/Freq;
	for (p = 0; p < 100; p++){
		if (x>T/2+p*T && x<T+p*T)
			return -4*Vpico*x/T+(4*p+3)*Vpico;
		
		if (x>0+p*T && x<3*T/4+p*T)
			return 4*Vpico*x/T-(4*p+1)*Vpico;
	}
}

//Onda Sinusoidal
var Vs = function (x) {
	return Vin*Math.sqrt(2)*Math.sin(2*Math.PI*Freq*x-Math.PI/2) ;
} ;

//Tensão de Referência Positiva
var Vref = function(x) {
	return ref ;						
} ;

//Tensão de Referência Negativa
var Vrefn = function(x)
{
	return nref ;					
} ;

//Função da tensão de saída
var Vout = function (x)
{
	if (Vpor(x)>0 && Vpor(x)<Vref(x) || Vpor(x)<0 && Vpor(x)>Vrefn(x)){
		return 0;
   }
	if (Vpor(x)>0 && Vpor(x)>Vref(x)){
		return Vin;
	}
	if (Vpor(x)<0 && Vpor(x)<Vrefn(x)){
		return -Vin;
	}
}

var Voutquad = function(x){
	// if (Vpor(x)>0 && Vpor(x)<Vref(x) || Vpor(x)<0 && Vpor(x)>Vrefn(x)){
	// 	return 0;
   	// }
	if (Vpor(x)>0 && Vpor(x)>Vref(x)){
		return Vin*Vin;
	}
	if (Vpor(x)<0 && Vpor(x)<Vrefn(x)){
		return Vin*Vin;
	}
	else return 0;
}

//Funções utilizadas no calculo do Delta
var Z1 = function (x){
		return Vpor(x)-Vref(x);
}

var Z2 = function (x){
		return Vpor(x)-Vrefn(x);
}


function harm(){
	var vh;
	var drad=di3*2*Math.PI/0.02;
	if(Vin==0 || Freq==0)
		return;
	if(ref>=Vpico)
	{
		for(var y=1; y<20; y+=2)
		{
			ci.moveTo(y*(38),285);
			ci.lineTo(y*(38),285);
		}
	}
	else
	{
		for(var y=1; y<24; y+=2)
		{
			vh=Math.abs(4*Vin/(Math.PI*y)*Math.cos(y*drad/2));
			if(y==1)
			{
				amp_harm=vh;
			}
			addLineSubPath(y,vh);
			vh=0;
		}
	}
};



function addLineSubPath(y,vh){
			var c = document.getElementById('xy2-graph');
			ci = c.getContext('2d');
			ci.beginPath();
			ci.lineWidth=2;
			ci.strokeStyle='red';
			ci.moveTo(y*(38),285);
			ci.lineTo(y*(38),285-vh);
			ci.stroke();	
}



function calcula_delta(){
	di3=t2-t1;
	if(ref==0){
		di3=0;
	}
	if(!isNaN(di3) && Freq>0){
	var dg=di3*360/0.02;
	var dr=di3*2*Math.PI/0.02;
	vo_rms(dr);
	document.getElementById("outdeltagra").innerHTML=dg.toFixed(2)+"&#176;, ";
	document.getElementById("outdeltarad").innerHTML=dr.toFixed(2)+" rad";
	}
	else{
		document.getElementById("outdeltagra").innerHTML="Fora dos Limites";
		document.getElementById("outdeltarad").innerHTML="";
		document.getElementById("outvrms").innerHTML="erro";
	}
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


function calcula_zeros(){
	var List=[];
	var z=t=0;
	var l=o=0;
	var k=0;
	for(var p=0;p<20;p++)
	{
		if(Vin==0 || Vpico==0 || Freq==0 || ref>=Vpico)
		{
			z=0;
			List.push(z);
		}
		else{
			z=Encontrar_Zeros(Z2,z+0.00001,0.6,0.00001);
		if(z!=0){
			List.push(z);
		}
		l=Encontrar_Zeros(Z1,l+0.00001,0.6,0.00001);
		if(l!=0){
				List.push(l);
		}
		if(Vin==0 || Vpico==0 || Freq==0 || ref>=Vpico)
		{
			z=0;
			List.push(z);
		}
		}
	}
	// if(1)
	// 	List=List.filter(onlyUnique);
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

var io = function(x){
	if(Freq==0 || Res==0 || ref>=Vpico){
		return 0;
	}
	var min1=-Vin/Res-(-Vin/Res)*Math.exp(-t1/tau);
	var max1=min1*Math.exp(-(t2-t1)/tau);
	var max2=Vin/Res-(Vin/Res-max1)*Math.exp(-(t3-t2)/tau);
	var min2=max2*Math.exp(-(t4-t3)/tau);
	var min3=-Vin/Res-(-Vin/Res-min2)*Math.exp(-(t5-t4)/tau);
	var max3=min3*Math.exp(-(t2-t1)/tau);
	var max4=Vin/Res-(Vin/Res-max3)*Math.exp(-(t3-t2)/tau);
	var min4=max4*Math.exp(-(t4-t3)/tau);
	
	var oldArray=[max1,max2,max3,max4];
  	var test=Math.max.apply(null, oldArray.filter(function (x) {
    return isFinite(x);}));
	Max_io=test;
	if(x>0 && x<t1){
		return -Vin/Res-(-Vin/Res)*Math.exp(-x/tau);
	}
	else if(x>t1 && x<t2){
		return min1*Math.exp(-(x-t1)/tau);
	}
	else if(x>t2 && x<t3){
		return Vin/Res-(Vin/Res-max1)*Math.exp(-(x-t2)/tau);
	}
	else if(x>t3 && x<t4){
		return max2*Math.exp(-(x-t3)/tau);
	}
	if(x>t4 && x<t5){
		return -Vin/Res-(-Vin/Res-min2)*Math.exp(-(x-t4)/tau);
	}
	if(x>t5 && x<t6){
		return min3*Math.exp(-(x-t5)/tau);
	}
	if(x>t6 && x<t7){
		return Vin/Res-(Vin/Res-max3)*Math.exp(-(x-t6)/tau);
	}
	if(x>t7 && x<t8){
		return max4*Math.exp(-(x-t7)/tau);
	}
	if(x>t8 && x<t9){
		return -Vin/Res-(-Vin/Res-min4)*Math.exp(-(x-t8)/tau);
	}
	if(x>t9 && x<t10){
		return min3*Math.exp(-(x-t9)/tau);
	}
	if(x>t10 && x<t11){
		return Vin/Res-(Vin/Res-max3)*Math.exp(-(x-t10)/tau);
	}
	if(x>t11 && x<t12){
		return max4*Math.exp(-(x-t11)/tau);
	}
	if(x>t12 && x<t13){
		return -Vin/Res-(-Vin/Res-min4)*Math.exp(-(x-t12)/tau);
	}
	if(x>t13 && x<t14){
		return min3*Math.exp(-(x-t13)/tau);
	}
	if(x>t14 && x<t15){
		return Vin/Res-(Vin/Res-max3)*Math.exp(-(x-t14)/tau);
	}
	if(x>t15 && x<t16){
		return max4*Math.exp(-(x-t15)/tau);
	}
	if(x>t16 && x<t17){
		return -Vin/Res-(-Vin/Res-min4)*Math.exp(-(x-t16)/tau);
	}
	if(x>t17 && x<t18){
		return min3*Math.exp(-(x-t17)/tau);
	}
	if(x>t18 && x<t19){
		return Vin/Res-(Vin/Res-max3)*Math.exp(-(x-t18)/tau);
	}
	else return 0;
}


var ioquad=function(x){
	return io(x)*io(x);
}


//Função que representa a tensão no interruptor TA+
var T1 = function(x){
	if(Vpor(x)>Vref(x)){
		return 0;
	}
	else return Vin;
}

//Função que representa a tensão no interruptor TB-
var T2 = function(x){
	if(Vpor(x)<Vrefn(x)){
		return 0;
	}
	else return Vin;
}

//Função que representa a tensão no interruptor TA-
var T3 = function(x){
	if(Vpor(x)>Vref(x)){
		return Vin;
	}
	else return 0;
}

//Função que representa a tensão no interruptor TB+
var T4 = function(x){
	if(Vpor(x)<Vrefn(x)){
		return Vin;
	}
	else return 0;
}





//Função que calcula a tensão eficaz de saída
function vo_rms(Delta){
	var vorms=Math.sqrt((1/0.04)*integrate(0,0.04,0.00001,Voutquad));;
	if(!isNaN(vorms)){
		document.getElementById("outvrms").innerHTML=vorms.toFixed(2)+" V";
	}
	else 
	{
		document.getElementById("outvrms").innerHTML="erro";
	}
}


function alterar_imagem(value){
	if(value=='Potência'){
		document.getElementById("montagem_oqpc").src="../Imagens/potenciapwm.png";
	}
	if(value=='Controlo'){
		document.getElementById("montagem_oqpc").src="../Imagens/controlopwm.png";
	}
}


function Alerta_Io_rms()
{	
	var io_rms=Math.sqrt((1/0.04)*integrate(0,0.04,0.00001,ioquad));;
	alert("O valor eficaz de Io é de " + io_rms.toFixed(4) + " A");			
}


function Alerta_Io_Max()
{	
	alert("O valor Máximo de Io é de " + Max_io.toFixed(4) + " A");			
}

function Alerta_Vo_Max()
{
	var Vo_max=Vin;
	alert("O valor Máximo de Vo é de " + Vo_max + " V");;		
}

function Alerta_Amp_Vh()
{
	alert("A amplitude do 1º harmónico é de " + amp_harm.toFixed(4) + " V");			
}



function cores()
{	
	//Gráfico 1
	if(vpor== 1)            					
	{
		Cor_Vpor = document.getElementById("out_cor_vpor").value;
		document.getElementById("Leg1_Vpor").style.color = Cor_Vpor;
	}
	if(vref == 1)								
	{
		Cor_Vref = document.getElementById("out_cor_vref").value;
		document.getElementById("Leg1_Vref").style.color = Cor_Vref;
	}
	if(vrefn == 1)							   
	{
		Cor_Vrefn = document.getElementById("out_cor_vrefn").value;
		document.getElementById("Leg1_Vrefn").style.color = Cor_Vrefn;
	}

	//Gráfico 2
	if(vsin == 1)							
	{
		Cor_Vs = document.getElementById("out2_cor_vsin").value;
		document.getElementById("Leg2_Vsin").style.color = Cor_Vs;
	}
	if(vout == 1)							
	{
		Cor_Vo = document.getElementById("out2_cor_vo").value;
		document.getElementById("Leg2_Vo").style.color = Cor_Vo;
	}

	if(desenha_T1 == 1)							  
	{
		Cor_T1 = document.getElementById("out_cor_T1").value;
		document.getElementById("Leg2_T1").style.color = Cor_T1;
	}
	if(desenha_T3== 1)							     
	{
		Cor_T3 = document.getElementById("out_cor_T3").value;
		document.getElementById("Leg2_T3").style.color = Cor_T3;
	}
	if(desenha_T4 == 1)							
	{
		Cor_T4 = document.getElementById("out_cor_T4").value;
		document.getElementById("Leg2_T4").style.color = Cor_T4;
	}
	if(desenha_T2 == 1)							
	{
		Cor_T2 = document.getElementById("out_cor_T2").value;
		document.getElementById("Leg2_T2").style.color = Cor_T2;
	}

	//Gráfico 3
	if(render_harm == 1)						
	{
		Cor_Harm = document.getElementById("out_cor_harm").value;
		document.getElementById("Leg3_Voh").style.color = Cor_Harm;
	}

	//Gráfico 4
	if(render_io == 1)							
	{
		Cor_io = document.getElementById("out_cor_io").value;
		document.getElementById("Leg4_Io").style.color = Cor_io;
	}
	$('#myModal3').modal('hide');					
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
	
	if(vrefn == 1)																	
	{
		contador+=1;														
		document.getElementById("legenda_vrefn").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_vrefn").style.top = "40px";
				document.getElementById("texto_leg_vrefn").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_vrefn").style.top = "80px";					
				document.getElementById("texto_leg_vrefn").style.top = "80px";
				break;
			case 3:
				document.getElementById("mudacor_vrefn").style.top = "120px";					
				document.getElementById("texto_leg_vrefn").style.top = "120px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_vrefn").style.display = "none";							
	}


	//Gráfico 2

	contador=0;

	//Onda Sinusoidal
	if(vsin == 1)																	
	{
		contador+=1;														
		document.getElementById("legenda_vs").style.display = "block";					
		document.getElementById("mudacor2_vs").style.top = "40px";
		document.getElementById("texto_leg2_vs").style.top = "40px";
	}
	else
	{
		document.getElementById("legenda_vs").style.display = "none";					
	}	

	//Tensão de Saída
	if(vout == 1)																
	{
		contador+=1;														
		document.getElementById("legenda_vo").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor2_vo").style.top = "40px";
				document.getElementById("texto_leg2_vo").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor2_vo").style.top = "80px";					
				document.getElementById("texto_leg2_vo").style.top = "80px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_vo").style.display = "none";						
	}
	
	if(desenha_T1 == 1)
	{
		contador+=1;
		document.getElementById("legenda_T1").style.display="block";
		switch(contador){
			case 1:
				document.getElementById("mudacor2_T1").style.top="40px";
				document.getElementById("texto_leg2_T1").style.top="40px";
				break;
			case 2:
				document.getElementById("mudaco2_T1").style.top="80px";
				document.getElementById("texto_leg2_T1").style.top="80px";
				break;
			case 3:
				document.getElementById("mudacor2_T1").style.top="120px";
				document.getElementById("texto_leg2_T1").style.top="120px";
				break;

		}
	}
	else
	{
		document.getElementById("legenda_T1").style.display="none";
	}

	if(desenha_T4 == 1)
	{
		contador+=1;
		document.getElementById("legenda_T4").style.display="block";
		switch(contador){
			case 1:
				document.getElementById("mudacor2_T4").style.top="40px";
				document.getElementById("texto_leg2_T4").style.top="40px";
				break;
			case 2:
				document.getElementById("mudaco2_T4").style.top="80px";
				document.getElementById("texto_leg2_T4").style.top="80px";
				break;
			case 3:
				document.getElementById("mudacor2_T4").style.top="120px";
				document.getElementById("texto_leg2_T4").style.top="120px";
				break;

		}
	}
	else
	{
		document.getElementById("legenda_T4").style.display="none";
	}

	if(desenha_T3== 1)
	{
		contador+=1;
		document.getElementById("legenda_T3").style.display="block";
		switch(contador){
			case 1:
				document.getElementById("mudacor2_T3").style.top="40px";
				document.getElementById("texto_leg2_T3").style.top="40px";
				break;
			case 2:
				document.getElementById("mudaco2_T3").style.top="80px";
				document.getElementById("texto_leg2_T3").style.top="80px";
				break;
			case 3:
				document.getElementById("mudacor2_T3").style.top="120px";
				document.getElementById("texto_leg2_T3").style.top="120px";
				break;

		}
	}
	else
	{
		document.getElementById("legenda_T3").style.display="none";
	}

	if(desenha_T2 == 1)
	{
		contador+=1;
		document.getElementById("legenda_T2").style.display="block";
		switch(contador){
			case 1:
				document.getElementById("mudacor2_T2").style.top="40px";
				document.getElementById("texto_leg2_T2").style.top="40px";
				break;
			case 2:
				document.getElementById("mudaco2_T2").style.top="80px";
				document.getElementById("texto_leg2_T2").style.top="80px";
				break;
			case 3:
				document.getElementById("mudacor2_T2").style.top="120px";
				document.getElementById("texto_leg2_T2").style.top="120px";
				break;

		}
	}
	else
	{
		document.getElementById("legenda_T2").style.display="none";
	}

	//Gráfico 3
	//Harmónicos
	if(render_harm == 1)																	
	{
		document.getElementById("legenda_harm").style.display = "block";					
	}
	else
	{
		document.getElementById("legenda_harm").style.display = "none";						
	}	
	
	//Gráfico 4
	//Corrente na Carga
	if(render_io== 1)																	
	{
		document.getElementById("legenda_io").style.display = "block";					
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
		document.getElementById("Ondas_1").style.display = "block";
		document.getElementById("Ondas_2").style.display = "none";
		document.getElementById("Ondas_3").style.display = "none";
		document.getElementById("Ondas_4").style.display = "none";
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
		
		if(vrefn == 1)
		{
			document.getElementById("Vrefn_onda").checked = true;									
		}
		if(vrefn == 0)
		{
			document.getElementById("Vrefn_onda").checked = false;										
		}
	}
	
	if(document.getElementById("Gra2_Leg").checked == true)											
	{																																			
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "block";
		document.getElementById("Ondas_3").style.display = "none";
		document.getElementById("Ondas_4").style.display = "none";
		if(vsin == 1)
		{
			document.getElementById("Vsin_onda").checked = true;										
		}
		if(vsin == 0)
		{
			document.getElementById("Vsin_onda").checked = false;										
		}
		if(vout == 1)
		{
			document.getElementById("Vo_onda").checked = true;										
		}
		if(vout == 0)
		{
			document.getElementById("Vo_onda").checked = false;										
		}
		if(desenha_T1== 1)
		{
			document.getElementById("T1_onda").checked = true;										
		}
		if(desenha_T1 == 0)
		{
			document.getElementById("T1_onda").checked = false;										
		}
		if(desenha_T3== 1)
		{
			document.getElementById("T3_onda").checked = true;									
		}
		if(desenha_T3== 0)
		{
			document.getElementById("T3_onda").checked = false;										
		}
		if(desenha_T4== 1)
		{
			document.getElementById("T4_onda").checked = true;										
		}
		if(desenha_T4 == 0)
		{
			document.getElementById("T4_onda").checked = false;										
		}
		if(desenha_T2== 1)
		{
			document.getElementById("T2_onda").checked = true;										
		}
		if(desenha_T2 == 0)
		{
			document.getElementById("T2_onda").checked = false;										
		}

	}
	if(document.getElementById("Gra3_Leg").checked == true)										
	{
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "none";
		document.getElementById("Ondas_3").style.display = "block";
		document.getElementById("Ondas_4").style.display = "none";
		if(render_harm == 1)																		
		{
			document.getElementById("Voh_onda").checked = true;									
		}
		if(render_harm == 0)
		{
			document.getElementById("Voh_onda").checked = false;									
		}
	}

	if(document.getElementById("Gra4_Leg").checked == true)											
	{
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "none";
		document.getElementById("Ondas_3").style.display = "none";
		document.getElementById("Ondas_4").style.display = "block";
		if(render_io == 1)																			
		{
			document.getElementById("Io_onda").checked = true;										
		}
		if(render_io == 0)
		{
			document.getElementById("Io_onda").checked = false;									
		}
	}
}


function alterar_visual()
{
	var Onda_Vpor = document.getElementById("Vpor_onda").checked;
	var Onda_Vref = document.getElementById("Vref_onda").checked;
	var Onda_Vrefn = document.getElementById("Vrefn_onda").checked;
	var Onda_Vsin = document.getElementById("Vsin_onda").checked;
	var Onda_Vo = document.getElementById("Vo_onda").checked;
	var Onda_T1 = document.getElementById("T1_onda").checked;
	var Onda_T3 = document.getElementById("T3_onda").checked;
	var Onda_T4 = document.getElementById("T4_onda").checked;
	var Onda_T2 = document.getElementById("T2_onda").checked;
	var Onda_Voh = document.getElementById("Voh_onda").checked;
	var Onda_Io = document.getElementById("Io_onda").checked;
	
	
		
	if(document.getElementById("Gra1_Leg").checked == true)								
		{
			contador=0;
			if(Onda_Vpor == true){
				contador+=1;
			}
			if(Onda_Vref == true){
				contador+=1;
			}
			if(Onda_Vrefn == true){
				contador+=1;
			}
			switch(contador){
				case 0:
					document.getElementById("rect_leg1").style.display="none";
					break;
				case 1: 
					document.getElementById("rect_leg1").style.width="1.9vw";
					break;
				case 2:
					document.getElementById("rect_leg1").style.width="3.9vw";
					break;
				case 3: 
					document.getElementById("rect_leg1").style.width="5.9vw";
					break;
			}

			contador=0;

			//Onda Portadora
			if(Onda_Vpor == false)
			{
				vpor=0;
				document.getElementById("Leg1_Vpor").style.display = "none";
			}
			else if(Onda_Vpor == true)
			{
				vpor=1;
				contador+=1;
				document.getElementById("Leg1_Vpor").style.display = "block";
			}

			//Sinal de Referência
			if(Onda_Vref == false)
			{
				vref=0;	
				document.getElementById("Leg1_Vref").style.display= "none";
			}
			else if(Onda_Vref == true)
			{
				vref=1;
				contador+=1;
				document.getElementById("Leg1_Vref").style.display = "block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg1_Vref").style.left = "84.20vw";
						break;
					case 2:
						document.getElementById("Leg1_Vref").style.left = "86.17vw";
						
				}
			}

			//Sinal de Referência Negativo
			if(Onda_Vrefn == false)
			{
				vrefn=0;
				document.getElementById("Leg1_Vrefn").style.display= "none";
			}
			else if(Onda_Vrefn == true)
			{
				contador+=1;
				document.getElementById("Leg1_Vrefn").style.display = "block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg1_Vrefn").style.left = "84.20vw";
						break;
					case 2:															 
						document.getElementById("Leg1_Vrefn").style.left = "86.17vw";		 
						break;
					case 3:
						document.getElementById("Leg1_Vrefn").style.left = "88.15vw";	
					break;
				}
				vrefn=1;
			}
			$('#myModal2').modal('hide');		
		}
			
													
	
	
		if(document.getElementById("Gra2_Leg").checked == true){						
			
			contador=0;
	
			if(Onda_Vsin ==true)
			{
				contador+=1;
			}
			if(Onda_Vo ==true)
			{
				contador+=1;
			}
			if(Onda_T1 == true){
				contador+=1;
			}
			if(Onda_T3 == true){
				contador+=1;
			}
			if(Onda_T4 == true){
				contador+=1;
			}
			if(Onda_T2 == true){
				contador+=1;
			}

			if (contador>2 || Onda_Vo==true && Onda_T1==true || Onda_Vo==true && Onda_T2==true || Onda_Vo==true && Onda_T3==true || Onda_Vo==true && Onda_T4==true || Onda_Vsin==true && Onda_T1==true || Onda_Vsin==true && Onda_T2==true || Onda_Vsin==true && Onda_T3==true || Onda_Vsin==true && Onda_T4==true || Onda_T1==true && Onda_T2==true || Onda_T1==true && Onda_T3==true || Onda_T1==true && Onda_T4==true || Onda_T2==true && Onda_T3==true || Onda_T2==true && Onda_T4==true)
				alert("Para uma melhor precepção, selecione apenas a tensão de um tíristor!");
			else
			{
			switch (contador)
			{	
				case 0:
					document.getElementById("rect_leg2").style.display="none";
					break;
				case 1:
					document.getElementById("rect_leg2").style.width = "2vw";
					break;
				case 2:
					document.getElementById("rect_leg2").style.width = "3.64vw";
					break;
			}
			
			contador=0;
	
			//Onda Sinusoidal
			if(Onda_Vsin == false)
			{
				
				vsin = 0;
				document.getElementById("Leg2_Vsin").style.display="none";
			}
			else if(Onda_Vsin == true)
			{ 
				contador+=1;
				document.getElementById("Leg2_Vsin").style.display="block";														
				vsin = 1;
			}
			
			//Onda de Saída
			if(Onda_Vo == false)
			{
				vout = 0;
				document.getElementById("Leg2_Vo").style.display="none";
			}
			else if(Onda_Vo == true)
			{
				contador+=1;
				document.getElementById("Leg2_Vo").style.display="block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg2_Vo").style.left = "84.80vw";
						break;
					case 2:															
						document.getElementById("Leg2_Vo").style.left = "86.51vw";
						break;
				}
				vout = 1;	
			}

			if(Onda_T1== false)
			{
				desenha_T1 = 0;
				document.getElementById("Leg2_T1").style.display="none";
			}
			else if(Onda_T1 == true)
			{
				contador+=1;
				document.getElementById("Leg2_T1").style.display="block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg2_T1").style.left = "84.20vw";
						break;
					case 2:															
						document.getElementById("Leg2_T1").style.left = "86.17vw";
						break;
					case 3:
						document.getElementById("Leg2_T1").style.left = "88.15vw";
						break;
				}
				desenha_T1 = 1;	
			}

			//Onda de Tirístor 2
			if(Onda_T4== false)
			{
				desenha_T4 = 0;
				document.getElementById("Leg2_T4").style.display="none";
			}
			else if(Onda_T4 == true)
			{
				contador+=1;
				document.getElementById("Leg2_T4").style.display="block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg2_T4").style.left = "84.20vw";
						break;
					case 2:															
						document.getElementById("Leg2_T4").style.left = "86.17vw";
						break;
					case 3:
						document.getElementById("Leg2_T4").style.left = "88.15vw";
						break;
				}
				desenha_T4= 1;	
			}

			//Onda de Tirístor 3
			if(Onda_T3== false)
			{
				desenha_T3 = 0;
				document.getElementById("Leg2_T3").style.display="none";
			}
			else if(Onda_T3 == true)
			{
				contador+=1;
				document.getElementById("Leg2_T3").style.display="block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg2_T3").style.left = "84.20vw";
						break;
					case 2:															
						document.getElementById("Leg2_T3").style.left = "86.17vw";
						break;
					case 3:
						document.getElementById("Leg2_T3").style.left = "88.15vw";
						break;
				}
				desenha_T3= 1;	
			}

			//Onda de Tirístor 4
			if(Onda_T2== false)
			{
				desenha_T2 = 0;
				document.getElementById("Leg2_T2").style.display="none";
			}
			else if(Onda_T2 == true)
			{
				contador+=1;
				document.getElementById("Leg2_T2").style.display="block";
				switch (contador)
				{
					case 1:															
						document.getElementById("Leg2_T2").style.left = "84.20vw";
						break;
					case 2:															
						document.getElementById("Leg2_T2").style.left = "86.17vw";
						break;
					case 3:
						document.getElementById("Leg2_T2").style.left = "88.15vw";
						break;
				}
				desenha_T2= 1;	
			}

			$('#myModal2').modal('hide');
			}

		}
		if(document.getElementById("Gra3_Leg").checked == true){
			if(Onda_Voh == false){
				render_harm=0;
				document.getElementById("Leg3_Voh").style.display="none";
				document.getElementById("rect_leg3").style.display="none";
			}
			else if(Onda_Voh == true)
			{
					render_harm=1;
					document.getElementById("Leg3_Voh").style.display= "block";
					document.getElementById("rect_leg3").style.display="block";
			}
			
			$('#myModal2').modal('hide');
		}
		if(document.getElementById("Gra4_Leg").checked == true){
			if(Onda_Io == false){
				render_io=0;
				document.getElementById("Leg4_Io").style.display="none";
				document.getElementById("rect_leg4").style.display="none";
			}
			else if(Onda_Io == true)
			{
					render_io=1;
					document.getElementById("Leg4_Io").style.display= "block";
					document.getElementById("rect_leg4").style.display="block";
			}
			$('#myModal2').modal('hide');
		}
												
}


function Altera_Var()
{
	var Min = document.getElementById("Min_Val").value;
	var Max = document.getElementById("Max_Val").value;
	
	var Verifica_Vref = document.getElementById("alt_Vref").checked;
	var Verifica_Vpico = document.getElementById("alt_Vpico").checked;
	var Verifica_Freq= document.getElementById("alt_Freq").checked;
	var Verifica_E = document.getElementById("alt_E").checked;
	var Verifica_R = document.getElementById("alt_R").checked;
	var Verifica_L = document.getElementById("alt_L").checked;
	

	if( (Max < Min || Min > Max) || (Max.length == 0 ) || (Min.length == 0) || ( (Verifica_Vref == false) && (Verifica_Vpico == false) && (Verifica_Freq == false) && (Verifica_E == false)  && (Verifica_L == false) && (Verifica_R == false)) )
	{
		if( (Max.length == 0 ) && (Min.length == 0) && ( (Verifica_Vref == false) && (Verifica_Vpico == false) && (Verifica_Freq == false) && (Verifica_R == false)  && (Verifica_L == false) && (Verifica_E == false) ) )
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
			
			if( (Verifica_Vref == false) && (Verifica_Vpico == false) && (Verifica_Freq == false) && (Verifica_L == false)  && (Verifica_R == false) && (Verifica_E == false) )
			{
			alert("Nenhuma Variável Selecionada!");
			}	
		}	
	}
	else
	{
		
		if(Verifica_Vref == true)																				
		{
			if(Max<0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor da Tensão de Referência necssita de ser positivo!");		
			}
			else
			{
				if( (Max) < Vref )																			
				{
					atualiza_vref(Max);																	
				}
				if ( Min > Vref )																			
				{
					atualiza_vref(Min);																	
				}	
				document.getElementById("tensao_ref").min = Min;												
				document.getElementById("tensao_ref").max = Max;
				document.getElementById("tensao_ref").step = ((Max-Min)*0.001);
				$('#myModal').modal('hide');																
			}
		}
		
		if(Verifica_Vpico == true)																		
		{
			if(Max<0 || Min<0 )													
			{
				alert("Valor Introduzidos Impossíveis! Valor da Tensão de Pico tem que ser positivo!");		
			}
			else
			{
				if( Max < Vpico )
				{
					atualiza_vpico(Max);																	
				}
				if ( Min > Vpico)																		
				{
					atualiza_vpico(Min);																	
				}
				document.getElementById("tensao_pico").min = Min;												
				document.getElementById("tensao_pico").max = Max;
				$('#myModal').modal('hide');																
			}
		}
		
		if(Verifica_Freq == true)																				
		{
			if(Max<=0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor Da Frequência Necessita de ser positivo!");	
			}
			else
			{
				if( (Max) < Freq )																			
				{
					atualiza_freq(Max);																	
				}
				if ( Min > Freq )																			
				{
					atualiza_freq(Min);																	
				}
				document.getElementById("freq1").min = Min;												
				document.getElementById("freq1").max = Max;
				$('#myModal').modal('hide');																
			}
		}
		
		if(Verifica_E == true)																				
		{
			if(Max<0 || Min<0)																			
			{
				alert("Valor Introduzidos Impossíveis! Valor da Tensão Necessita de ser positivo!");	
			}
			else
			{
				if( (Max) < Vs )																			
				{
					atualiza_vin(Max);																	
				}
				if ( Min > Vs )																			
				{
					atualiza_vin(Min);																	
				}
				document.getElementById("tensao_id").min = Min;												
				document.getElementById("tensao_id").max = Max;
				document.getElementById("tensao_id").step = ((Max-Min)*0.001);
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
				document.getElementById("Res_id").step = ((Max-Min)*0.001);
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

//------------------------------------------------------------------------------------  
//Funções que atualizam o software com o valor dos sliders 

function atualiza_vref(val) 
{	
	document.querySelector('#outtensaoref').value = val + " V";
	ref = val;
	nref=(-1)*ref;
	Draw();
}



function atualiza_freq(val) 
{	
	document.querySelector('#outfreqs').value= val + " Hz";
	Freq = val;
	Draw();
}
		

function atualiza_vin(val) 
{
	document.querySelector('#outtensaocirc').value=val+" V";
	Vin = val;
	//Vo_max=Vin;
	Draw();
}
		

function atualiza_vpico(val) 
{
	document.querySelector('#outtensaopicopor').value= val + " V";
	Vpico= val;
	Draw();
}

function atualiza_Res(val) 
{
	document.querySelector('#outRes').value=val+ " Ω";
	Res= val;
	tau=Ind/Res;
	Draw();
}


function atualiza_L(val) 
{
	document.querySelector('#outInd').value=val+" mH";
	Ind= val*10e-4;
	tau=Ind/Res;
	Draw();
}


			



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
	calcula_delta();
	Draw();
	Vrms = Vin/(Math.sqrt(2));
	document.getElementById("Leg1_Vpor").style.color = "black";
	document.getElementById("Leg1_Vref").style.color = "#008000";
	document.getElementById("Leg1_Vrefn").style.color = "#0000ff";
	document.getElementById("Leg2_Vsin").style.color = "#black";
	document.getElementById("Leg2_Vo").style.color = "#FF0000";
	document.getElementById("Leg2_T1").style.color = "#006400";
	document.getElementById("Leg2_T3").style.color = "#FFA500";
	document.getElementById("Leg2_T4").style.color = "#7CFC00";
	document.getElementById("Leg2_T2").style.color = "#ff6600";
	document.getElementById("Leg2_T1").style.display = "none";
	document.getElementById("Leg2_T3").style.display = "none";
	document.getElementById("Leg2_T4").style.display = "none";
	document.getElementById("Leg2_T2").style.display = "none";
	document.getElementById("Leg3_Voh").style.color= "red";
	document.getElementById("Leg4_Io").style.color= "#47b445";
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


function MaxY() {	
	return 1.25;
}

function MinY() {
	return -1.25;
}


function MaxX1() {
  return 0.04;
}

function MinX1() {
  return 0;
}

function MaxY1() {
	return parseInt(Vin) + 100;
}


function MinY1() {
	return parseInt(Vin) * (-1) - 100;
}

function MaxX2() {
  return 1100;
}

function MinX2() {
  return 0;
}

function MaxY2() {
	return 285 ;
}

function MinY2() {
	return -15;
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


//Retorna o lugar físico de uma coordenada lógica dos eixo XX

function XC(x) 
{
  return (x - MinX()) / (MaxX() - MinX()) * Width ;
}

//Retorna o lugar físico de uma coordenada lógica dos eixo YY
function YC(y) 
{
  return Height - (y - MinY()) / (MaxY() - MinY()) * Height ;
}

function XC1(x) 
{
  return (x - MinX1()) / (MaxX1() - MinX1()) * Width ;
}

//Retorna o lugar físico de uma coordenada lógica dos eixo YY do 2ºGráfico
function YC1(y) {
  return Height - (y - MinY1()) / (MaxY1() - MinY1()) * Height ;
}

function XC2(x) 
{
  return (x - MinX2()) / (MaxX2() - MinX2()) * Width ;
}

//Retorna o lugar físico de uma coordenada lógica dos eixo YY do 2ºGráfico
function YC2(y) {
  return Height - (y - MinY2()) / (MaxY2() - MinY2()) * Height ;
}


function XC3(x) 
{
  return (x - MinX3()) / (MaxX3() - MinX3()) * Width ;
}

//Retorna o lugar físico de uma coordenada lógica dos eixo YY do 2ºGráfico
function YC3(y) {
  return Height - (y - MinY3()) / (MaxY3() - MinY3()) * Height ;
}


//-------------------Renderizar as Funções---------------------------------------

function Draw() {
	calcula_zeros();
	calcula_delta();
 if (Canvas.getContext) 
 {
	//Atribui e Desenha os limites 1ºGráfico:
	Ctx = Canvas.getContext('2d');
	Ctx.clearRect(0,0,Width,Height) ;

	//Atribui e Desenha os limites 2ºGráfico::
	Ctx1 = Canvas1.getContext('2d');
	Ctx1.clearRect(0,0,Width,Height) ;

	// //Atribui e Desenha os limites 3ºGráfico::
	Ctx2 = Canvas2.getContext('2d');
	Ctx2.clearRect(0,0,Width,Height) ;

	Ctx3 = Canvas3.getContext('2d');
	Ctx3.clearRect(0,0,Width,Height) ;
 
 
	//Desenha os eixos dos 4 gráficos
	Eixos1();

	Eixos2();
	
	Eixos3();

	Eixos4();
	
	
	if(vpor == 1)
	{
		Desenha1(Vpor);
	}

	if(vref == 1)
	{
		Desenha1(Vref);
	}
	
	if(vrefn == 1)
	{
		Desenha1(Vrefn);
	}

	if (render_Z1==1){
		Desenha1(Z1);
	}

	if (render_Z2==1) {
		Desenha1(Z2);
	}

	if(desenha_T1 == 1){
		Desenha2(T1);
	}

	if(desenha_T3== 1){
		Desenha2(T3);
	}


	if(desenha_T4 == 1){
		Desenha2(T4);
	}

	if(desenha_T2 == 1){
		Desenha2(T2);
	}

	if(vsin == 1){
		Desenha2(Vs);
	}
	

	if(vout == 1)
	{
		Desenha2(Vout);
	}


	if(render_harm == 1)
	{
		harm();
	}


	if(render_io == 1)
	{
		Desenha4(io);
	}
	
}
}


//Intervalo entre as marcas de referência
function XTickDelta() 
{
  return 0.01 ;
}

function YTickDelta() 
{
  return ( MaxY()/5) ;												
}

function YTickDelta1() 
{
	return (MaxY1()/5);												
}

function YTickDelta2() 
{
	return (MaxY2()/10);												
}

function YTickDelta3() 
{
	return (MaxY3()/10);												
}

function XTickDelta2() 
{
	return 100;											
}




//Funções que desenham os eixos nos gráficos


function Eixos1() 
{
 	Ctx.font = "10px Arial";
 	Ctx.save() ;															
 	Ctx.lineWidth = 2 ;
 	Ctx.strokeStyle="#000000";
 	var esc;															
 
 	// Eixo dos YY Positivo
 	Ctx.beginPath() ;
 	Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(0),YC(MaxY())) ;
 	Ctx.stroke() ;

 	// Eixo dos YY Negativo
 	Ctx.beginPath() ;
 	Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(0),YC(MinY())) ;
 	Ctx.stroke() ;

 	// Marcas de Referência Escalar nos Eixos dos YY (Positivo).
 	var delta = YTickDelta() ;
 	for (var i = 1; (i * delta) < MaxY() ; ++i) {
		esc = (MaxY() / 5)*i;
		Ctx.beginPath() ;
		Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
		Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
		Ctx.stroke() ; 
		Ctx.fillText(esc.toFixed(2),XC(0)+8,YC(i*delta)+3); 			 // Escreve o número de referência da escala dos Eixo dos YY (Positivo)
 	}
 
 	// Marcas de Referência Escalar nos Eixos dos YY (Negativo).
 	var delta = YTickDelta() ;
 	for (var i = -1; (i * delta) > MinY() ; --i) {
	 	esc = (MaxY() / 5)*i;
		Ctx.beginPath() ;
		Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
		Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
		Ctx.stroke() ;
		Ctx.fillText(esc.toFixed(2),XC(0)+8,YC(i*delta)+3)  			 // Escreve o número de referência da escala dos Eixo dos YY (Negativo)
 	}  

 	// Eixo dos XX Positivo
 	Ctx.beginPath() ;
 	Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(MaxX()),YC(0)) ;
 	Ctx.stroke() ;

 	// Eixo dos XX Negativo
 	Ctx.beginPath() ;
 	Ctx.moveTo(XC(0),YC(0)) ;
 	Ctx.lineTo(XC(MinX()),YC(0)) ;
 	Ctx.stroke() ;

 	// Marcas de Referência Escalar nos Eixos dos XX.
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
  		Ctx.fillText(i+"\u03a0",XC(i * delta)-5,YC(0)+12); 					// Escreve o número de referência da escala dos Eixo dos XX (Negativo)
 }
 
 Ctx.restore() ;														//Restaura os estilos que guardou anteriormente.		
}

//Desenha Eixos do 2ºGráfico

function Eixos2() {
 	Ctx1.font = "10px Arial";
 	Ctx1.save() ;
 	Ctx1.lineWidth = 2 ;
 	Ctx1.strokeStyle="#000000";
 	
 	// Eixo dos YY Positivo
 	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0)) ;
 	Ctx1.lineTo(XC1(0),YC1(MaxY1())) ;
 	Ctx1.stroke() ;

 	// Eixo dos YY Negativo
 	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0)) ;
 	Ctx1.lineTo(XC1(0),YC1(MinY1())) ;
 	Ctx1.stroke() ;


	var esc;
 	var delta = YTickDelta1() ;
 	for (var i = 1; (i * delta) < MaxY1() ; ++i) 
 	{
		esc = (MaxY1() / 5)*i;
		Ctx1.beginPath() ;
		Ctx1.moveTo(XC1(0) - 5,YC1(i * delta)) ;
		Ctx1.lineTo(XC1(0) + 5,YC1(i * delta)) ;
		Ctx1.stroke() ; 
		Ctx1.fillText(esc.toFixed(0),XC1(0)+5,YC1(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)

 	}

 	var delta = YTickDelta1();
 	for (var i=-1; (i*delta) > MinY1(); --i){
		esc=(MaxY1() / 5)*i;
		Ctx1.beginPath();
		Ctx1.moveTo(XC1(0)-5,YC1(i*delta));
		Ctx1.lineTo(XC1(0) + 5,YC1(i*delta));
		Ctx1.stroke();
		Ctx1.fillText(esc.toFixed(0),XC1(0) + 8, YC1(i*delta) + 3);
 	} 


 	// Eixo dos XX Positivo
	 Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0)) ;
 	Ctx1.lineTo(XC1(MaxX1()),YC1(0)) ;
 	Ctx1.stroke() ;

 	// Eixo dos XX Negativo
 	Ctx1.beginPath() ;
 	Ctx1.moveTo(XC1(0),YC1(0));
 	Ctx1.lineTo(XC1(MinX1()),YC1(0)) ;
 	Ctx1.stroke() ;

 	// Marcas de Referência Escalar nos Eixos dos XX.

 	var delta = XTickDelta() ;
 	for (var i = 1; (i * delta) < MaxX1() ; ++i) {
		Ctx1.beginPath() ;
		Ctx1.moveTo(XC1(i * delta),YC1(0)-5) ;
		Ctx1.lineTo(XC1(i * delta),YC1(0)+5) ;
		Ctx1.stroke() ;  
		if(i==1)
		{
			Ctx1.fillText(i/100,XC1(i * delta)-5,YC1(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
		}
		else
		{
			Ctx1.fillText(i/100,XC1(i * delta)-8,YC1(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
		}
 	}

 	var delta = XTickDelta() ;
 	for (var i = 0; (i * delta) > MinX1() ; --i) {
		Ctx1.beginPath() ;
		Ctx1.moveTo(XC1(i * delta),YC1(0)-5) ;
		Ctx1.lineTo(XC1(i * delta),YC1(0)+5) ;
		Ctx1.stroke() ;  
		Ctx1.fillText(i+"\u03a0",XC1(i * delta)-5,YC1(0)+12); 				//Escreve o número de referência da escala dos Eixo dos XX (Negativo)
 	}
 	Ctx1.restore() ;
}


//Desenha Eixos do 3ºGráfico

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


 	// Marcas de Referência Escalar nos Eixos dos YY.
 	var esc;
 	var delta = YTickDelta2() ;
 	for (var i = 1; (i * delta) < MaxY2() ; ++i) 
 	{
		esc = (MaxY2() / 10)*i;
		Ctx2.beginPath() ;
		Ctx2.moveTo(XC2(0) - 5,YC2(i * delta)) ;
		Ctx2.lineTo(XC2(0) + 5,YC2(i * delta)) ;
		Ctx2.stroke() ; 
		Ctx2.fillText(esc.toFixed(0),XC2(0)+8,YC2(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)

 	}

 	// Eixo dos XX Positivo
 	Ctx2.beginPath() ;
 	Ctx2.moveTo(XC2(0),YC2(0)) ;
 	Ctx2.lineTo(XC2(MaxX2()),YC2(0)) ;
 	Ctx2.stroke() ;

 	// Eixo dos XX Negativo
 	Ctx2.beginPath() ;
 	Ctx2.moveTo(XC2(0),YC2(0));
 	Ctx2.lineTo(XC2(MinX2()),YC2(0)) ;
	Ctx2.stroke() ;

 	// Marcas de Referência Escalar nos Eixos dos XX.
	var delta = XTickDelta2() ;
 	for (var i = 1; (i * delta) < MaxX2() ; ++i) {
		Ctx2.beginPath();
		Ctx2.strokeStyle="black";
		Ctx2.moveTo(XC2(i * delta),YC2(0)-5) ;
		Ctx2.lineTo(XC2(i * delta),YC2(0)+5) ;
		Ctx2.stroke() ;  
		if(i==1)
		{
			Ctx2.fillText("100",XC2(i * delta)-5,YC2(0)+10);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
		}
		else
		{
			Ctx2.fillText(i+"00",XC2(i * delta)-8,YC2(0)+10);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
		}
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


 	//Marcas de Referência Escalar nos Eixos dos YY
	var esc;
 	var delta = YTickDelta3() ;
 	for (var i = 1; (i * delta) < MaxY3() ; ++i) 
 	{
		esc = (MaxY3() / 10)*i;
		Ctx3.beginPath() ;
		Ctx3.moveTo(XC3(0) - 5,YC3(i * delta)) ;
		Ctx3.lineTo(XC3(0) + 5,YC3(i * delta)) ;
		Ctx3.stroke() ; 
		Ctx3.fillText(esc.toFixed(2),XC3(0)+5,YC3(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)
	}

 	var delta = YTickDelta3();
 	for (var i=-1; (i*delta) > MinY3(); --i){
		esc=(MaxY3() / 10)*i;
		Ctx3.beginPath();
		Ctx3.moveTo(XC3(0)-5,YC3(i*delta));
		Ctx3.lineTo(XC3(0) + 5,YC3(i*delta));
		Ctx3.stroke();
		Ctx3.fillText(esc.toFixed(2),XC3(0) + 8, YC3(i*delta) + 3);   //Escreve o número de referência da escala dos Eixo dos YY (Negativo)
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
			Ctx3.fillText(i/100,XC3(i * delta)-5,YC3(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
		}
		else
		{
			Ctx3.fillText(i/100,XC3(i * delta)-8,YC3(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
		}
 	}

 	var delta = XTickDelta() ;
 	for (var i = 0; (i * delta) > MinX3() ; --i) {
		Ctx3.beginPath() ;
		Ctx3.moveTo(XC3(i * delta),YC3(0)-5) ;
		Ctx3.lineTo(XC3(i * delta),YC3(0)+5) ;
		Ctx3.stroke() ;  
		Ctx3.fillText(i/100,XC3(i * delta)-5,YC3(0)+12); 				//Escreve o número de referência da escala dos Eixo dos XX (Negativo)
 	}
 	Ctx3.restore() ;

}



//Funções que desenham em cada gráfico
function Desenha1(f) 
{
	var first = true; 													
	var XSTEP = (MaxX()-MinX())/Width; 										
	Ctx.beginPath() ;
	Ctx.lineWidth = 2 ;													
		
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
  
	//Altera cores para cada uma das funções
	if(f(x) == Vpor(x))										
	{
		var muda_cor = Cor_Vpor;
		Ctx.lineWidth= 1.5;
		if( muda_cor == 0)												
		{
			Ctx.strokeStyle="#000000";									
		}
		else
		{
			Ctx.strokeStyle=muda_cor.toString();						
		}
	}

	else if (f(x) == Vref(x))
	{
			var muda_cor1 = Cor_Vref;	
			if( muda_cor1 == 0)
			{											
				Ctx.strokeStyle="#008000";
			}										
			else
			{ 
				Ctx.strokeStyle=muda_cor1.toString();
			}
	}							
	else if(f(x) == Vrefn(x))
	{
		var muda_cor2 = Cor_Vrefn;
		if( muda_cor2 == 0)
		{
				Ctx.strokeStyle="#0000ff";
		}
		else
		{
				Ctx.strokeStyle=muda_cor2.toString();
		}	
	}
	else 
	{
		Ctx.strokeStyle= 'black' ;
		
	}		
	Ctx.stroke();														
}



function Desenha2(f) 
{
	var first = true;													
	var XSTEP = (MaxX1()-MinX1())/Width ;								
	Ctx1.beginPath() ;													
  	Ctx1.lineWidth = 0.5 ;
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
	if(f(x)==Vs(x))											
	{
		var muda_cor7 = Cor_Vs;											
		if( muda_cor7 == 0)												
		{
			Ctx1.strokeStyle="#000000";									
		}
		else
		{
			Ctx1.strokeStyle=muda_cor7.toString();						
		}
	}

	else if(f(x)==Vout(x))										
	{
		var muda_cor8 = Cor_Vout;											
		if( muda_cor8 == 0)											
		{
			Ctx1.strokeStyle="#FF0000";	
			Ctx1.lineWidth = 2 ;								
		}
		else
		{
			Ctx1.strokeStyle=muda_cor8.toString();						
		}
	}
	if(desenha_T1==1)											
	{
		var muda_cor3 = Cor_T1;	
		Ctx1.lineWidth = 2 ;												
		if( muda_cor3 == 0)											
		{
			Ctx1.strokeStyle="#006400";									
		}
		else
		{
			Ctx1.strokeStyle=muda_cor3.toString();						
		}
	}

	else if(desenha_T3==1)											
	{
		var muda_cor4 = Cor_T3;
		Ctx1.lineWidth = 2 ;													
		if( muda_cor4 == 0)											
		{
			Ctx1.strokeStyle="#FFA500";								
		}
		else
		{
			Ctx1.strokeStyle=muda_cor4.toString();						
		}
	}

	else if(desenha_T4==1)											
	{
		var muda_cor5 = Cor_T4;
		Ctx1.lineWidth = 2 ;												
		if( muda_cor5 == 0)												
		{
			Ctx1.strokeStyle="#7CFC00";									
		}
		else
		{
			Ctx1.strokeStyle=muda_cor5.toString();						
		}
	}

	else if(desenha_T2==1)											
	{
		var muda_cor6 = Cor_T2;
		Ctx1.lineWidth = 2 ;												
		if( muda_cor6 == 0){												
			Ctx1.strokeStyle="#ff6600";									
		}
		else
		{
			Ctx1.strokeStyle=muda_cor6.toString();						
		}
	} 
	/* else 
	{
		Ctx1.strokeStyle= 'black' ;
		
	}	 */												
	Ctx1.stroke() ;		
}


function Desenha3(f) 
{
	var first = true;													
	var XSTEP = (MaxX2()-MinX2())/Width ;								
	Ctx2.beginPath() ;													
  	Ctx2.lineWidth = 2 ;
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
	if(f(x)==harm(x))
	{
		var muda_cor9= Cor_Harm;
		if(muda_cor9 == 0){
			Ctx2.strokeStyle= 'red';
		}
		else{
			Ctx2.strokeStyle=muda_cor9.toString();
		}
	}
	else
	{
		Ctx2.strokeStyle="black";
	}
	Ctx2.stroke();											
}



function Desenha4(f) 
{
	var first = true;													
	var XSTEP = (MaxX3()-MinX3())/Width ;								
	Ctx3.beginPath() ;	
	Ctx3.lineWidth = 2;												
  
	for (var x = MinX3(); x <= MaxX3(); x += XSTEP) 
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
		muda_cor10=Cor_io;
		if(muda_cor10==0){
			Ctx3.strokeStyle= "#47b445";	
		}
		else
		{
			Ctx3.strokeStyle=muda_cor10.toString();
		}
	}
	Ctx3.stroke();											
}
