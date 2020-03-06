
//Variaveis do circuito de potência
var Vin=100;																									
var Ind=5e-3;											
var Res=10;
var tau=Ind/Res;																					
var Vpico=1;
var Vpico1=0.2;
var Vpico_sin=0.8;
var Freq=50;
var T=1/Freq;
var Freq_por=50;
var Vpico_por=1;

//Variaveis Temporais e de Cálculo
									
var Max_io=9.99;																				
var Vo_max=Vin;										
var Vo_min;											
var Vo_med;											
var Io_med;	
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var t10;
var t11;
var t12;
var t13;
var t14;
var t15;
var t16;
var t17;
var t18;
var t19;
var t20;	
					
					


//Variaveis de Cor
var Cor_Vpor1=0;
var Cor_Vmod1=0;
var Cor_Vmod2=0;
var Cor_U=0;
var Cor_V=0;
var Cor_W=0;
var Cor_Vcon1=0;
var Cor_Vcon2=0;
var Cor_Vo=0;
var Cor_Io=0;



//Variaveis de Escala
var Auto_1=true;									
var Auto_2=false;								
var Man_1=false;									
var Man_2=false;									
var New_MinY;									
var New_MaxY;															

//Variaveis de desenhaização dos gráficos
var desenha_U=0;									
var desenha_W=0;									
var desenha_V=0;
var desenha_vpor=0;									
var desenha_vo=1;
var desenha_mod1=1;
var desenha_mod2=1;
var desenha_vpor1=1;
var desenha_vcon1=1;
var desenha_vcon2=1;
var desenha_calculario1=0;
var desenha_calculario2=0;
var desenha_io=1;


//Fase U
var U = function (x) {
	return Vpico_sin*Math.sin(2*Math.PI*Freq*x+Math.PI/2) ;
} ;

//Fase V
var V= function(x) {	
	return Vpico_sin*Math.sin(2*Math.PI*Freq*x-2*Math.PI/3+Math.PI/2) ;		
} ;


//Fase W
var W = function(x)
{	
	return Vpico_sin*Math.sin(2*Math.PI*Freq*x+2*Math.PI/3+Math.PI/2) ;		
} ;



//Onda Portadora
var Vpor1 = function(x) 
{	T=1/(Freq_por);
	for (p = 0; p < 100; p++){
		if (x>T/2+p*T && x<T+p*T)
			return -4*Vpico_por*x/T+(4*p+3)*Vpico_por;
		
		if (x>0+p*T && x<3*T/4+p*T)
			return 4*Vpico_por*x/T-(4*p+1)*Vpico_por;
	}
};

//Onda Portadora com o Triplo da Frequência utilizada no calculo dos sinais moduladores
var Vpor = function(x) 
{	T=1/(3*Freq);
	for (p = 0; p < 100; p++){
		if (x>T/2+p*T && x<T+p*T)
			return -4*Vpico1*x/T+(4*p+3)*Vpico1;
		
		if (x>0+p*T && x<3*T/4+p*T)
			return 4*Vpico1*x/T-(4*p+1)*Vpico1;
	}
};


//Sinal modulador 1
var Vmod1= function(x){
	return U(x)+Vpor(x);
}

//Sinal modulador2
var Vmod2= function(x){
	return V(x)+Vpor(x);
}


//Sinal de Controlo 1
var Vcon1 = function (x){
	if(Vpor1(x)>Vmod1(x))
		return 0;
	else return 1;		
}

//Sinal de Controlo 2
var Vcon2 = function (x){
	if(Vpor1(x)>Vmod2(x))
		return 0;
	else return 1;	
}


//Tensão de Saída
var Vo = function(x){
	if(Vmod2(x)<=Vpor1(x) && Vpor1(x)<=Vmod1(x) && Vmod2(x)<=Vmod1(x))
		return Vin;
	else if(Vmod1(x)<=Vpor1(x) && Vpor1(x)<=Vmod2(x) && Vmod1(x)<=Vmod2(x))
		return -Vin;
	else
		return 0;
}

//Tensão de Saída utilizada no calculo da tensão eficaz
var Vor = function(x){
	if(Vmod2(x)<Vpor1(x) && Vpor1(x)<Vmod1(x) && Vmod2(x)<Vmod1(x))
		return Vin*Vin;
	if(Vmod1(x)<Vpor1(x) && Vpor1(x)<Vmod2(x) && Vmod1(x)<Vmod2(x))
		return -Vin*(-Vin);
	else return 0;
}

var calculario1=function(x){
	return Vmod1(x)-Vpor1(x);
}

var calculario2=function(x){
	return Vmod2(x)-Vpor1(x);
}


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


function calcula_zeros(){
	var List=[];
	var z=t=0;
	var l=o=0;
	var k=0;
	var z1,z2;
	for(var p=0;p<20;p++)
	{

		z=Encontrar_Zeros(calculario1,z+0.00001,0.12,0.00001);
		if(z!=0){
			List.push(z);
		}
		l=Encontrar_Zeros(calculario2,l+0.00001,0.12,0.00001);
		if(l!=0){
				List.push(l);
		}
		if(Vin==0 || Vpico==0 || Freq==0)
		{
			z=0;
			List.push(z);
		}
			
	}
	

	// var newArray = List.map(x => x !== undefined ? x : "-");
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
	// var txt=List.toString();
	// document.getElementById("t1").innerHTML=t1;
	// document.getElementById("t2").innerHTML=t2;
	// document.getElementById("t3").innerHTML=t3;
	// document.getElementById("t4").innerHTML=t4;
	// document.getElementById("t5").innerHTML=t5;
	// document.getElementById("t6").innerHTML=t6;
	// document.getElementById("t7").innerHTML=t7;
	// document.getElementById("t8").innerHTML=t8;
	// document.getElementById("t9").innerHTML=t9;
	// document.getElementById("t10").innerHTML=t10;
	// document.getElementById("t11").innerHTML=t11;
	// document.getElementById("t12").innerHTML=t12;
	// document.getElementById("t13").innerHTML=t13;
	// document.getElementById("t14").innerHTML=t14;
	// document.getElementById("t15").innerHTML=t15;
	// document.getElementById("t16").innerHTML=t16;
}

var io = function(x){
	if(Freq_por==0 || Res==0){
	 	return 0;
	} 
	// document.getElementById("outrms").innerHTML=Max_io.toFixed(2);
	//Max_io=Math.max(a,b,c,d,e,f,g,i,j,k,l,mm,nn,oo,pp,qq,rr);
	var val1=Vo(t1/2)/Res-(Vo(t1/2)/Res)*Math.exp(-t1/tau);
	var val2=Vo((t1+t2)/2)/Res-(Vo((t1+t2)/2)/Res-val1)*Math.exp(-(t2-t1)/tau);
	var val3=Vo((t2+t3)/2)/Res-(Vo((t2+t3)/2)/Res-val2)*Math.exp(-(t3-t2)/tau);
	var val4=Vo((t3+t4)/2)/Res-(Vo((t3+t4)/2)/Res-val3)*Math.exp(-(t4-t3)/tau);
	var val5=Vo((t4+t5)/2)/Res-(Vo((t4+t5)/2)/Res-val4)*Math.exp(-(t5-t4)/tau);
	var val6=Vo((t5+t6)/2)/Res-(Vo((t5+t6)/2)/Res-val5)*Math.exp(-(t6-t5)/tau);
	var val7=Vo((t6+t7)/2)/Res-(Vo((t6+t7)/2)/Res-val6)*Math.exp(-(t7-t6)/tau);
	var val8=Vo((t7+t8)/2)/Res-(Vo((t7+t8)/2)/Res-val7)*Math.exp(-(t8-t7)/tau);
	var val9=Vo((t8+t9)/2)/Res-(Vo((t8+t9)/2)/Res-val8)*Math.exp(-(t9-t8)/tau);
	var val10=Vo((t9+t10)/2)/Res-(Vo((t9+t10)/2)/Res-val9)*Math.exp(-(t10-t9)/tau);
	var val11=Vo((t10+t11)/2)/Res-(Vo((t10+t11)/2)/Res-val10)*Math.exp(-(t11-t10)/tau);
	var val12=Vo((t11+t12)/2)/Res-(Vo((t11+t12)/2)/Res-val11)*Math.exp(-(t12-t11)/tau);
	var val13=Vo((t12+t13)/2)/Res-(Vo((t12+t13)/2)/Res-val12)*Math.exp(-(t13-t12)/tau);
	var val14=Vo((t13+t14)/2)/Res-(Vo((t13+t14)/2)/Res-val13)*Math.exp(-(t14-t13)/tau);
	var val15=Vo((t14+t15)/2)/Res-(Vo((t14+t15)/2)/Res-val14)*Math.exp(-(t15-t14)/tau);
	var val16=Vo((t15+t16)/2)/Res-(Vo((t15+t16)/2)/Res-val15)*Math.exp(-(t16-t15)/tau);
	var val17=Vo((t16+t17)/2)/Res-(Vo((t16+t17)/2)/Res-val16)*Math.exp(-(t17-t16)/tau);
	var val18=Vo((t17+t18)/2)/Res-(Vo((t17+t18)/2)/Res-val17)*Math.exp(-(t18-t17)/tau);
	var val19=Vo((t18+t19)/2)/Res-(Vo((t18+t9)/2)/Res-val18)*Math.exp(-(t19-t18)/tau);

	var oldArray=[val1,val2,val3,val4,val5,val6,val7,val8,val9,val10,val11,val12,val13,val14,val15,val16,val17,val18,val19];
  	var test=Math.max.apply(null, oldArray.filter(function (x) {
    return isFinite(x);}));
	Max_io=test;

	
	if(x>0 && x<t1){
		return Vo(x)/Res-(Vo(x)/Res)*Math.exp(-x/tau);
	}
	if(x>t1 && x<t2){
		return Vo(x)/Res-(Vo(x)/Res-val1)*Math.exp(-(x-t1)/tau);
	}
	if(x>t2 && x<t3){
		return Vo(x)/Res-(Vo(x)/Res-val2)*Math.exp(-(x-t2)/tau);
	}
	if(x>t3 && x<t4){
		return Vo(x)/Res-(Vo(x)/Res-val3)*Math.exp(-(x-t3)/tau);
	}
	if(x>t4 && x<t5){
		return Vo(x)/Res-(Vo(x)/Res-val4)*Math.exp(-(x-t4)/tau);
	}
	if(x>t5 && x<t6){
		return Vo(x)/Res-(Vo(x)/Res-val5)*Math.exp(-(x-t5)/tau);
	}
	if(x>t6 && x<t7){
		return Vo(x)/Res-(Vo(x)/Res-val6)*Math.exp(-(x-t6)/tau);
	}
	if(x>t7 && x<t8){
		return Vo(x)/Res-(Vo(x)/Res-val7)*Math.exp(-(x-t7)/tau);
	}
	if(x>t8 && x<t9){
		return Vo(x)/Res-(Vo(x)/Res-val8)*Math.exp(-(x-t8)/tau);
	}
	if(x>t9 && x<t10){
		return Vo(x)/Res-(Vo(x)/Res-val9)*Math.exp(-(x-t9)/tau);
	}
	if(x>t10 && x<t11){
		return Vo(x)/Res-(Vo(x)/Res-val10)*Math.exp(-(x-t10)/tau);
	}
	if(x>t11 && x<t12){
		return Vo(x)/Res-(Vo(x)/Res-val11)*Math.exp(-(x-t11)/tau);
	}
	if(x>t12 && x<t13){
		return Vo(x)/Res-(Vo(x)/Res-val12)*Math.exp(-(x-t12)/tau);
	}
	if(x>t13 && x<t14){
		return Vo(x)/Res-(Vo(x)/Res-val13)*Math.exp(-(x-t13)/tau);
	}
	if(x>t14 && x<t15){
		return Vo(x)/Res-(Vo(x)/Res-val14)*Math.exp(-(x-t14)/tau);
	}
	if(x>t15 && x<t16){
		return Vo(x)/Res-(Vo(x)/Res-val15)*Math.exp(-(x-t15)/tau);
	}
	if(x>t16 && x<t17){
		return Vo(x)/Res-(Vo(x)/Res-val16)*Math.exp(-(x-t16)/tau);
	}
	if(x>t17 && x<t18){
		return Vo(x)/Res-(Vo(x)/Res-val17)*Math.exp(-(x-t17)/tau);
	}
	if(x>t18 && x<t19){
		return Vo(x)/Res-(Vo(x)/Res-val18)*Math.exp(-(x-t18)/tau);
	}
	if(x>t19 && x<t20){
		return Vo(x)/Res-(Vo(x)/Res-val19)*Math.exp(-(x-t19)/tau);
	}
	else return 0;
	
}

var ior =function(x){
	return io(x)*io(x);
}
//Função calcula Vorms
function vo_rms()
{
	var rms=Math.sqrt((1/0.04)*integrate(0,0.04,0.00001,Vor));
	document.getElementById("outrms").innerHTML = rms.toFixed(2)+" V";
}


//altera imagem
function alterar_imagem(value){
	if(value=='Potência'){
		document.getElementById("montagem_oqpc").src="../Imagens/potenciapwm.png";
	}
	if(value=='Controlo'){
		document.getElementById("montagem_oqpc").src="../Imagens/controlosvm.png";
	}
}

//Envia para o HTML
function Alerta_Io_Max()
{	
	alert("O valor Máximo de Io é de " + Max_io.toFixed(4) + " A");			
}

function Alerta_Io_rms()
{	
	var io_rms=Math.sqrt((1/0.04)*integrate(0,0.04,0.00001,ior));
	// document.getElementById("outrms").innerHTML = io_rms.toFixed(2)+" A";
	alert("O valor eficaz de Io é de " + io_rms.toFixed(4) + " V");;	
}


function Alerta_Vo_Max()
{	
	var Vo_max=Vin;
	alert("O valor Máximo de Vo é de " + Vo_max + " V");;		
}



function Altera_Var()
{
	
	var Min = document.getElementById("Min_Val").value;
	var Max = document.getElementById("Max_Val").value;
	
	var Verifica_Vpicop = document.getElementById("alt_vpicop").checked;
	var Verifica_Freq = document.getElementById("alt_freq").checked;
	var Verifica_Vin = document.getElementById("alt_vin").checked;
	var Verifica_R = document.getElementById("alt_r").checked;
	var Verifica_L = document.getElementById("alt_l").checked;
	
	
	if( (Max < Min || Min > Max) || (Max.length == 0 ) || (Min.length == 0) || (Verifica_Vpicop == false) && (Verifica_Freq == false) &&  (Verifica_Vin == false)  && (Verifica_Vin == false) && (Verifica_R == false) && (Verifica_L == false) )
	{
		if( (Max.length == 0 ) && (Min.length == 0) && ( (Verifica_Vpicop == false) && (Verifica_Freq == false) && (Verifica_Vin == false)  && (Verifica_Vin == false) && (Verifica_R == false) && (Verifica_L == false) ))
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
			
			if( (Verifica_Vpicop == false) && (Verifica_Freq == false) && (Verifica_Vin == false)  && (Verifica_Vin == false) && (Verifica_R == false) && (Verifica_L == false) )
			{
			alert("Nenhuma Variável Selecionada!");
			}	
		}	
	}
	else
	{
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
				$('#myModal5').modal('hide');															
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
				if( Max < Freq_por )																		
				{
					atualiza_freq(Max);																	
				}
				if ( Min > Freq_por)																		
				{
					atualiza_freq(Min);																	
				}
				document.getElementById("freq1").min = Min;												
				document.getElementById("freq1").max = Max;
				$('#myModal5').modal('hide');																
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
				$('#myModal5').modal('hide');	
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
				$('#myModal5').modal('hide');	
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
			$('#myModal5').modal('hide');
			}																	
		}
	}
}





function cores()
{

	if(desenha_U == 1)							
	{
		Cor_U = document.getElementById("out_cor_U").value;
		document.getElementById("Leg1_U").style.color = Cor_U;
	}
	if(desenha_W == 1)							
	{
		Cor_W = document.getElementById("out_cor_W").value;
		document.getElementById("Leg1_W").style.color = Cor_W;
	}
	if(desenha_V == 1)							
	{
		Cor_V = document.getElementById("out_cor_V").value;
		document.getElementById("Leg1_V").style.color = Cor_V;
	}
	
	if(desenha_vpor1== 1)            				
	{
		Cor_Vpor1 = document.getElementById("out_cor_vpor1").value;
	 	document.getElementById("Leg1_Vpor1").style.color = Cor_Vpor1;
	}

	if(desenha_mod1 == 1)								
	{
	 	Cor_Vmod1 = document.getElementById("out_cor_mod1").value;
		document.getElementById("Leg1_mod1").style.color = Cor_Vmod1;
	}

	if(desenha_mod2 == 1)							
	{
		Cor_Vmod2 = document.getElementById("out_cor_mod2").value;
		document.getElementById("Leg1_mod2").style.color = Cor_Vmod2;
	}
	if(desenha_vcon1 == 1)							
	{
		Cor_Vcon1 = document.getElementById("out_cor_vcon1").value;
		document.getElementById("Leg2_Vcon1").style.color = Cor_Vcon1;
	}
	if(desenha_vcon2 == 1)							
	{
		Cor_Vcon2 = document.getElementById("out_cor_vcon2").value;
		document.getElementById("Leg3_Vcon2").style.color = Cor_Vcon2;
	}
	if(desenha_vo == 1)							
	{
		Cor_Vo = document.getElementById("out_cor_vo").value;
		document.getElementById("Leg4_Vo").style.color = Cor_Vo;
	}

	if(desenha_io == 1)							
	{
		Cor_Io = document.getElementById("out_cor_io").value;
		document.getElementById("Leg5_Io").style.color = Cor_Io;
	}
	$('#myModal2').modal('hide');					
}


function Ondas_Visualizadas()
{
	contador = 0;																	
	
	
	if(desenha_U == 1)															
	{
		contador+=1;														
		document.getElementById("legenda_U").style.display = "block";					
		if(contador == 1)																
		{
			document.getElementById("mudacor_U").style.top = "40px";						
			document.getElementById("texto_leg_U").style.top = "40px";
		}
		else
		{
			document.getElementById("mudacor_U").style.top = "80px";						
			document.getElementById("texto_leg_W").style.top = "80px";
		}
	}
	else
	{
		document.getElementById("legenda_U").style.display = "none";						
	}	
	
	if(desenha_W == 1)																
	{
		contador+=1;														
		document.getElementById("legenda_W").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_W").style.top = "40px";
				document.getElementById("texto_leg_W").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_W").style.top = "80px";				
				document.getElementById("texto_leg_W").style.top = "80px";
				break;
			case 3:
				document.getElementById("mudacor_W").style.top = "120px";					
				document.getElementById("texto_leg_W").style.top = "120px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_W").style.display = "none";					
	}

	if(desenha_V == 1)																
	{
		contador+=1;													
		document.getElementById("legenda_V").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_V").style.top = "40px";
				document.getElementById("texto_leg_V").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_V").style.top = "80px";					
				document.getElementById("texto_leg_V").style.top = "80px";
				break;
			case 3:
				document.getElementById("mudacor_V").style.top = "120px";				
				document.getElementById("texto_leg_V").style.top = "120px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_V").style.display = "none";					
	}

	if(desenha_vpor1 == 1)																
	{
		contador+=1;													
		document.getElementById("legenda_Vpor1").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_vpor1").style.top = "40px";
				document.getElementById("texto_leg_vpor1").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_vpor1").style.top = "80px";					
				document.getElementById("texto_leg_vpor1").style.top = "80px";
				break;
			case 3:
				document.getElementById("mudacor_vpor1").style.top = "120px";				
				document.getElementById("texto_leg_vpor1").style.top = "120px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_Vpor1").style.display = "none";					
	}

	if(desenha_mod1 == 1)																
	{
		contador+=1;													
		document.getElementById("legenda_mod1").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_mod1").style.top = "40px";
				document.getElementById("texto_leg_mod1").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_mod1").style.top = "80px";					
				document.getElementById("texto_leg_mod1").style.top = "80px";
				break;
			case 3:
				document.getElementById("mudacor_mod1").style.top = "120px";				
				document.getElementById("texto_leg_mod1").style.top = "120px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_mod1").style.display = "none";					
	}

	if(desenha_mod2 == 1)																
	{
		contador+=1;													
		document.getElementById("legenda_mod2").style.display = "block";					
		switch (contador)																
		{
			case 1:																		
				document.getElementById("mudacor_mod2").style.top = "40px";
				document.getElementById("texto_leg_mod2").style.top = "40px";
				break;
			case 2:
				document.getElementById("mudacor_mod2").style.top = "80px";					
				document.getElementById("texto_leg_mod2").style.top = "80px";
				break;
			case 3:
				document.getElementById("mudacor_mod2").style.top = "120px";				
				document.getElementById("texto_leg_mod2").style.top = "120px";
				break;
		}
	}
	else
	{
		document.getElementById("legenda_mod2").style.display = "none";					
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
		document.getElementById("Ondas_5").style.display = "none";
		
		
		if(desenha_U == 1)
		{
			document.getElementById("U_onda").checked = true;									
		}
		if(desenha_U == 0)
		{
			document.getElementById("U_onda").checked = false;									
		}
		
		if(desenha_W == 1)
		{
			document.getElementById("W_onda").checked = true;										
		}
		if(desenha_W == 0)
		{
			document.getElementById("W_onda").checked = false;										
		}
		if(desenha_V == 1)
		{
			document.getElementById("V_onda").checked = true;										
		}
		if(desenha_vpor1 == 0)
		{
			document.getElementById("Vpor1_onda").checked = false;										
		}
		if(desenha_vpor1 == 1)
		{
			document.getElementById("Vpor1_onda").checked = true;										
		}
		if(desenha_mod1 == 0)
		{
			document.getElementById("Vmod1_onda").checked = false;										
		}
		if(desenha_mod1 == 1)
		{
			document.getElementById("Vmod1_onda").checked = true;										
		}
		if(desenha_mod2 == 0)
		{
			document.getElementById("Vmod2_onda").checked = false;										
		}
		if(desenha_mod2 == 1)
		{
			document.getElementById("Vmod2_onda").checked = true;										
		}
	}
	
	if(document.getElementById("Gra2_Leg").checked == true)											
	{																																			
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "block";
		document.getElementById("Ondas_3").style.display = "none";
		document.getElementById("Ondas_4").style.display = "none";
		document.getElementById("Ondas_5").style.display = "none";

		if(desenha_vcon1 == 1)																			
		{
			document.getElementById("Vcon1_onda").checked = true;										
		}
		if(desenha_vcon1 == 0)
		{
			document.getElementById("Vcon1_onda").checked = false;								
		}
	}

	if(document.getElementById("Gra3_Leg").checked == true)											
	{																																			
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "none";
		document.getElementById("Ondas_3").style.display = "block";
		document.getElementById("Ondas_4").style.display = "none";
		document.getElementById("Ondas_5").style.display = "none";
		if(desenha_vcon2 == 1)																			
		{
			document.getElementById("Vcon2_onda").checked = true;										
		}
		if(desenha_vcon2 == 0)
		{
			document.getElementById("Vcon2_onda").checked = false;								
		}
	}

	if(document.getElementById("Gra4_Leg").checked == true)											
	{																																			
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "none";
		document.getElementById("Ondas_3").style.display = "none";
		document.getElementById("Ondas_4").style.display = "block";
		document.getElementById("Ondas_5").style.display = "none";
		if(desenha_vo == 1)																			
		{
			document.getElementById("Vo_onda").checked = true;										
		}
		if(desenha_vo == 0)
		{
			document.getElementById("Vo_onda").checked = false;								
		}
	}

	if(document.getElementById("Gra5_Leg").checked == true)											
	{																																			
		document.getElementById("Ondas_1").style.display = "none";
		document.getElementById("Ondas_2").style.display = "none";
		document.getElementById("Ondas_3").style.display = "none";
		document.getElementById("Ondas_4").style.display = "none";
		document.getElementById("Ondas_5").style.display = "block";
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
	var Onda_U = document.getElementById("U_onda").checked;
	var Onda_W= document.getElementById("W_onda").checked;
	var Onda_V = document.getElementById("V_onda").checked;
	var Onda_Vpor1= document.getElementById("Vpor1_onda").checked;
	var Onda_Vmod1= document.getElementById("Vmod1_onda").checked;
	var Onda_Vmod2= document.getElementById("Vmod2_onda").checked;
	var Onda_Vcon1= document.getElementById("Vcon1_onda").checked;
	var Onda_Vcon2= document.getElementById("Vcon2_onda").checked;
	var Onda_Vo= document.getElementById("Vo_onda").checked;
	var Onda_Io= document.getElementById("Io_onda").checked;
	
	
	if(document.getElementById("Gra1_Leg").checked == true)									
	{

			contador = 0;																				
			if(Onda_U ==true)
			{
				contador+=1;
			}
			if(Onda_W ==true)
			{
				contador+=1;
			}
			if(Onda_V ==true)
			{
				contador+=1;
			}
			if(Onda_Vpor1 ==true)
			{
				contador+=1;
			}
			if(Onda_Vmod1 ==true)
			{	
				contador+=1;
			}
			if(Onda_Vmod2 ==true)
			{
				contador+=1;
			}

			if(contador>3){
				alert("Selecione apenas 3 ondas para uma melhor percepção")
			}
			else
			{

				switch (contador)
				{	
					case 0:
						document.getElementById("rect_leg1").style.display="none";
					case 1:
						document.getElementById("rect_leg1").style.display="block";
						document.getElementById("rect_leg1").style.width = "2.45vw";
						break;
					case 2:
						document.getElementById("rect_leg1").style.display="block";
						document.getElementById("rect_leg1").style.width = "4.9vw";
						break;
					case 3:
						document.getElementById("rect_leg1").style.display="block";
						document.getElementById("rect_leg1").style.width = "6.25vw";
					break;
				}

				contador  = 0;

				if(Onda_U == false)
				{
					desenha_U=0;
					document.getElementById("Leg1_U").style.display= "none";
				}
				else if(Onda_U == true)
				{
					contador+=1;
					desenha_U=1;
					document.getElementById("Leg1_U").style.display = "block";
				}
			

				if(Onda_W == false)
				{
					desenha_W=0;
					document.getElementById("Leg1_W").style.display= "none";
				}
				else if(Onda_W == true)
				{
					contador+=1;
					switch (contador)
					{
						case 1:															 
							document.getElementById("Leg1_W").style.left = "84.20vw";
							break;
						case 2:															
							document.getElementById("Leg1_W").style.left = "86.17vw";		 
							break;
					}
					desenha_W=1;
					document.getElementById("Leg1_W").style.display = "block";
				}
			
			
				if(Onda_V == false)
				{
					desenha_V = 0;
					document.getElementById("Leg1_V").style.display="none";
				}
				else if(Onda_V == true)
				{
					contador+=1;
					switch (contador)
					{
						case 1:															
							document.getElementById("Leg1_V").style.left = "84.20vw";
							break;
						case 2:															 
							document.getElementById("Leg1_V").style.left = "86.17vw";		 
							break;
						case 3:															 
							document.getElementById("Leg1_V").style.left = "88.15vw";		 
							break;
					}
					desenha_V = 1;
					document.getElementById("Leg1_V").style.display="block";
				}

				if(Onda_Vpor1 == false)
				{
					desenha_vpor1 = 0;
					document.getElementById("Leg1_Vpor1").style.display="none";
				}
				else if(Onda_Vpor1 == true)
				{
					contador+=1;
					switch (contador)
					{
						case 1:															
							document.getElementById("Leg1_Vpor1").style.left = "84.20vw";
							break;
						case 2:															 
							document.getElementById("Leg1_Vpor1").style.left = "86.17vw";		 
							break;
						case 3:															 
							document.getElementById("Leg1_Vpor1").style.left = "88.15vw";		 
							break;
					}
					desenha_vpor1 = 1;
					document.getElementById("Leg1_Vpor1").style.display="block";
				}

				if(Onda_Vmod1 == false)
				{
					desenha_mod1 = 0;
					document.getElementById("Leg1_mod1").style.display="none";
				}
				else if(Onda_Vmod1 == true)
				{
					contador+=1;
					switch (contador)
					{
						case 1:															
							document.getElementById("Leg1_mod1").style.left = "84.20vw";
							break;
						case 2:															 
							document.getElementById("Leg1_mod1").style.left = "86.17vw";		 
							break;
						case 3:															 
							document.getElementById("Leg1_mod1").style.left = "88.15vw";		 
							break;
					}
					desenha_mod1 = 1;
					document.getElementById("Leg1_mod1").style.display="block";
				}

				if(Onda_Vmod2 == false)
				{
					desenha_mod2 = 0;
					document.getElementById("Leg1_mod2").style.display="none";
				}
				else if(Onda_Vmod2 == true)
				{
					contador+=1;
					switch (contador)
					{
						case 1:															
							document.getElementById("Leg1_mod2").style.left = "84.20vw";
							break;
						case 2:															 
							document.getElementById("Leg1_mod2").style.left = "86.17vw";		 
							break;
						case 3:															 
							document.getElementById("Leg1_mod2").style.left = "88.15vw";		 
							break;
					}
					desenha_mod2 = 1;
					document.getElementById("Leg1_mod2").style.display="block";
				}
			$('#myModal').modal('hide');	
			}
														
	}

	
	if(document.getElementById("Gra2_Leg").checked == true)							
	{
			
			if(Onda_Vcon1 == false)
			{
				desenha_vcon1=0;
				document.getElementById("rect_leg2").style.display="none";
				document.getElementById("Leg2_Vcon1").style.display = "none";
			}
			else if (Onda_Vcon1 == true)
			{
				desenha_vcon1=1;
				document.getElementById("rect_leg3").style.display="block";
				document.getElementById("Leg2_Vcon1").style.display = "block";
			}

			
			$('#myModal').modal('hide');												//Fecha o Modal
		
	}
	if(document.getElementById("Gra3_Leg").checked == true)
	{
			if(Onda_Vcon2 == false)
			{
				desenha_vcon2=0;
				document.getElementById("rect_leg3").style.display="none";
				document.getElementById("Leg3_Vcon2").style.display = "none";
			}
			else if (Onda_Vcon2 == true){
				desenha_vcon2=1;
				document.getElementById("rect_leg3").style.display="block";
				document.getElementById("Leg3_Vcon2").style.display = "block";
			}

			$('#myModal').modal('hide');
	}

	if(document.getElementById("Gra4_Leg").checked == true)
	{
			if(Onda_Vo == false)
			{
				desenha_vo=0;
				document.getElementById("rect_leg4").style.display="none";
				document.getElementById("Leg4_Vo").style.display = "none";
			}
			else if (Onda_Vo == true){
				desenha_vo=1;
				document.getElementById("rect_leg4").style.display="block";
				document.getElementById("Leg4_Vo").style.display = "block";
			}

			$('#myModal').modal('hide');
	}

	if(document.getElementById("Gra5_Leg").checked == true)
	{
			if(Onda_Io == false)
			{
				desenha_io=0;
				document.getElementById("rect_leg5").style.display="none";
				document.getElementById("Leg5_Io").style.display = "none";
			}
			else if (Onda_Io == true){
				desenha_io=1;
				document.getElementById("rect_leg5").style.display="block";
				document.getElementById("Leg5_Io").style.display = "block";
			}

			$('#myModal').modal('hide');
	}
}




function atualiza_freqpor(val) 
{
	document.querySelector("#outfreq").value=val+" Hz";
	Freq_por = val;
	Draw();
}
		

function atualiza_vin(val) 
{
	document.querySelector("#outvin").value=val+" V";
	Vin = val;
	Draw();
}
		

function atualiza_vpicopor(val) 
{
	document.querySelector("#outvpicop").value=val+" V";
	Vpico_por= val;
	Draw();
}

function atualiza_Res(val) 
{
	document.querySelector('#outres').value=val+ " Ω";
	Res= val;
	tau=Ind/Res;
	Draw();
}


function atualiza_L(val) 
{
	document.querySelector('#outind').value=val+" mH";
	Ind= val*10e-4;
	tau=Ind/Res;
	Draw();
}



	
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
	document.getElementById("Leg1_U").style.color = "yellow";
	document.getElementById("Leg1_V").style.color = "orange";
	document.getElementById("Leg1_W").style.color = "purple";
	document.getElementById("Leg1_U").style.display = "none";
	document.getElementById("Leg1_V").style.display = "none";
	document.getElementById("Leg1_W").style.display = "none";
	document.getElementById("Leg1_Vpor1").style.color = "black";
	document.getElementById("Leg1_mod1").style.color = "green";
	document.getElementById("Leg1_mod2").style.color = "blue";
	document.getElementById("Leg2_Vcon1").style.color = "#A0522D";
	document.getElementById("Leg3_Vcon2").style.color = "#4682B4";
	document.getElementById("Leg4_Vo").style.color = "red";
	document.getElementById("Leg5_Io").style.color = "green";

}


var Canvas = document.getElementById('xy-graph');  
var Ctx = null ;

var Width = Canvas.width ;
var Height = Canvas.height ;


var Canvas1 = document.getElementById('xy1-graph');  
var Ctx1 = null ;

var Width1 = Canvas1.width ;
var Height1 = Canvas1.height ;


var Canvas2 = document.getElementById('xy2-graph');  
var Ctx2 = null ;

var Width1 = Canvas2.width ;
var Height1 = Canvas2.height ; 

var Canvas3 = document.getElementById('xy3-graph');  
var Ctx3 = null ;

var Width = Canvas3.width ;
var Height = Canvas3.height ; 

var Canvas4 = document.getElementById('xy4-graph');  
var Ctx4 = null ;

var Width = Canvas4.width ;
var Height = Canvas4.height ; 



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
	if(Auto_1 == true)
	{
		return parseInt(Vpico) + 0.25;
	}
	else
	{
		if(Man_1 == true)
		{
		return New_MaxY;
		}
		else
		{
		return 300;	
		}
	}
}
//Configura um Valor para o mínimo valor do Eixo dos YY.
function MinY() 
{
	if(Auto_1 == true)
	{
		return parseInt(Vpico) * (-1) - 0.25;
	}
	else
	{
		if(Man_1 == true)
		{
		return New_MinY;
		}
		else
		{
			return -300;
		}
	}	
}


function MaxX1() {
  return 0.04;
}

function MinX1() {
  return 0;
}


function MaxY1() {
	return 1.25;
}

function MinY1() {
	return -0.25;	
}



function MaxX2() {
  return 0.04 ;
}

function MinX2() {
  return 0;
}


function MaxY2() {
	return 1.25;
}


function MinY2() {
	return -0.25;
	
}

function MaxX3() {
  	return 0.04 ;
}

function MinX3() {
  return 0;
}


function MaxY3() {
	return parseInt(Vin)+25;
}


function MinY3() {
	return (-1)*parseInt(Vin)-25;
	
}

function MaxX4() {
	return 0.04 ;
}

function MinX4() {
return 0;
}

function MaxY4() 
{
	if(!isNaN(Max_io))
		return Max_io+5;
	else if(isNan(Max_io)) 
		return 10;
}

function MinY4() {
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
  return (x - MinX1()) / (MaxX1() - MinX1()) * Width1 ;
}


function YC1(y) {
  return Height1 - (y - MinY1()) / (MaxY1() - MinY1()) * Height1 ;
}

function XC2(x) 
{
  return (x - MinX2()) / (MaxX2() - MinX2()) * Width1 ;
}


function YC2(y) {
  return Height1 - (y - MinY2()) / (MaxY2() - MinY2()) * Height1 ;
}

function XC3(x) 
{
  return (x - MinX3()) / (MaxX3() - MinX3()) * Width ;
}


function YC3(y) {
  return Height - (y - MinY3()) / (MaxY3() - MinY3()) * Height ;
}

function XC4(x) 
{
  return (x - MinX4()) / (MaxX4() - MinX4()) * Width ;
}


function YC4(y) {
  return Height - (y - MinY4()) / (MaxY4() - MinY4()) * Height ;
}



function Draw() {
	vo_rms();
	calcula_zeros();
 if (Canvas.getContext) 
 {
	//Atribui e Desenha os limites dos gráficos:
	Ctx = Canvas.getContext('2d');
	Ctx.clearRect(0,0,Width,Height) ;
	
	
	Ctx1 = Canvas1.getContext('2d');
	Ctx1.clearRect(0,0,Width,Height) ;

	
	Ctx2 = Canvas2.getContext('2d');
	Ctx2.clearRect(0,0,Width1,Height1) ;

	Ctx3 = Canvas3.getContext('2d');
	Ctx3.clearRect(0,0,Width,Height) ;

	Ctx3 = Canvas3.getContext('2d');
	Ctx3.clearRect(0,0,Width,Height) ;

	Ctx4 = Canvas4.getContext('2d');
	Ctx4.clearRect(0,0,Width,Height) ;
	
	Eixos1();
	
	Eixos2();
	
	Eixos3();

	Eixos4();

	Eixos5();

	if(desenha_calculario1==1){
		desenha1(calculario1);
	}

	if(desenha_calculario2==1){
		desenha1(calculario2);
	}
	
	if(desenha_vpor1==1)
	{
		desenha1(Vpor1);
	}
	
	if(desenha_vpor==1)
	{
		desenha1(Vpor);
	}

	if(desenha_U== 1)
	{
		desenha1(U);
	}
	
	if(desenha_V== 1)
	{
		desenha1(V);
	}
	if(desenha_W== 1)
	{
		desenha1(W);
	}

	if(desenha_mod1== 1)
	{
		desenha1(Vmod1);
	}
	
	if(desenha_mod2 == 1)
	{
		desenha1(Vmod2);
	}


	if(desenha_vcon1 == 1)
	{
		desenha2(Vcon1);
	}

	if(desenha_vcon2 == 1)
	{
		desenha3(Vcon2);
	}


	if(desenha_vo == 1)
	{
		desenha4(Vo);
	}

	if(desenha_io == 1)
	{
		desenha5(io);
	}
	}
}


//distancia entre as referências do X
function XTickDelta() 
{
  return 0.01 ;
}

//distancia entre as referencia do Y
function YTickDelta() 
{
  return (MaxY()/5) ;												
}


function YTickDelta1() 
{
	return (MaxY1()/5);											
}

function YTickDelta2() 
{
	return (MaxY2()/5);												
}

function YTickDelta3() 
{
	return (MaxY3()/5);											
}

function YTickDelta4() 
{
	return (MaxY4()/5);											
}

//-----------------------------------DESENHAR OS EIXOS----------------------------------------------------

// DrawAxes draws the X ad Y axes, with tick marks.

// Desenha Eixos do Gráfico 1

function Eixos1() 
{
 Ctx.font = "10px Arial";
 Ctx.save() ;															//Entre Num Estado Save em que guarda, todos os estilos aplicados a este.
 Ctx.lineWidth = 2.5 ;
 Ctx.strokeStyle="#000000";
 var mar_esc;															//Variavel que guardara o valor para cada posição da escala dos YY.
 
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
	mar_esc = (MaxY() / 5)*i;
	Ctx.beginPath() ;
	Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
	Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
	Ctx.stroke() ; 
	Ctx.fillText(mar_esc.toFixed(2),XC(0)+8,YC(i*delta)+3); 			 // Escreve o número de referência da escala dos Eixo dos YY (Positivo)
 }
 
 // Marcas de Referência Escalar nos Eixos dos YY (Negativo).
 var delta = YTickDelta() ;
 for (var i = -1; (i * delta) > MinY() ; --i) {
	 mar_esc = (MaxY() / 5)*i;
	Ctx.beginPath() ;
	Ctx.moveTo(XC(0) - 5,YC(i * delta)) ;
	Ctx.lineTo(XC(0) + 5,YC(i * delta)) ;
	Ctx.stroke() ;
	Ctx.fillText(mar_esc.toFixed(2),XC(0)+8,YC(i*delta)+3)  			 // Escreve o número de referência da escala dos Eixo dos YY (Negativo)
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
  Ctx.fillText(i/100,XC(i * delta)-5,YC(0)+12); 					// Escreve o número de referência da escala dos Eixo dos XX (Negativo)
 }
 
 Ctx.restore() ;														//Entre Num Estado que Restaura todos os estilos que guardou anteriormente.		
}

//Desenha Eixos do 2ºGráfico

function Eixos2() {
 Ctx1.font = "10px Arial";
 Ctx1.save() ;
 Ctx1.lineWidth = 2.5 ;
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

 // Marcas de Referência Escalar nos Eixos dos YY.
//  var mar_esc;
//  var delta = YTickDelta1() ;
//  for (var i = 1; (i * delta) < MaxY1() ; ++i) 
//  {
// 	mar_esc = (MaxY1() / 10)*i;

// 	Ctx1.beginPath() ;
// 	Ctx1.moveTo(XC1(0) - 5,YC1(i * delta)) ;
// 	Ctx1.lineTo(XC1(0) + 5,YC1(i * delta)) ;
// 	Ctx1.stroke() ; 
// 	Ctx1.fillText(mar_esc.toFixed(0),XC1(0)+8,YC1(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)

//  }
var mar_esc;
 var delta = YTickDelta1() ;
 for (var i = 1; (i * delta) < MaxY1() ; ++i) 
 {
	mar_esc = (MaxY1() / 5)*i;

	Ctx1.beginPath() ;
	Ctx1.moveTo(XC1(0) - 5,YC1(i * delta)) ;
	Ctx1.lineTo(XC1(0) + 5,YC1(i * delta)) ;
	Ctx1.stroke() ; 
	Ctx1.fillText(mar_esc.toFixed(2),XC1(0)+5,YC1(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)

 }

 // var delta = YTickDelta1();
 // for (var i=-1; (i*delta) > MinY1(); --i){
	// mar_esc=(MaxY1() / 5)*i;
	// Ctx1.beginPath();
	// Ctx1.moveTo(XC1(0)-5,YC1(i*delta));
	// Ctx1.lineTo(XC1(0) + 5,YC1(i*delta));
	// Ctx1.stroke();
	// Ctx1.fillText(mar_esc.toFixed(2),XC1(0) + 8, YC1(i*delta) + 3);
 // } 


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
 Ctx2.lineWidth = 2.5 ;
 Ctx2.strokeStyle="#000000";
 
 // Eixo dos YY Positivo
 Ctx2.beginPath() ;
 Ctx2.moveTo(XC2(0),YC2(0)) ;
 Ctx2.lineTo(XC2(0),YC2(MaxY2())) ;
 Ctx2.stroke() ;


 // Marcas de Referência Escalar nos Eixos dos YY.
 var mar_esc;
 var delta = YTickDelta2() ;
 for (var i = 1; (i * delta) < MaxY2() ; ++i) 
 {
	mar_esc = (MaxY2() / 5)*i;

	Ctx2.beginPath() ;
	Ctx2.moveTo(XC2(0) - 5,YC2(i * delta)) ;
	Ctx2.lineTo(XC2(0) + 5,YC2(i * delta)) ;
	Ctx2.stroke() ; 
	Ctx2.fillText(mar_esc.toFixed(2),XC2(0)+8,YC2(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)

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

 var delta = XTickDelta() ;
 for (var i = 1; (i * delta) < MaxX2() ; ++i) {
	Ctx2.beginPath() ;
	Ctx2.moveTo(XC2(i * delta),YC2(0)-5) ;
	Ctx2.lineTo(XC2(i * delta),YC2(0)+5) ;
	Ctx2.stroke() ;  
	if(i==1)
	{
		Ctx2.fillText(i/100,XC2(i * delta)-5,YC2(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
	}
	else
	{
		Ctx2.fillText(i/100,XC2(i * delta)-8,YC2(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
	}
 }

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
		esc = (MaxY3() / 5)*i;
		Ctx3.beginPath() ;
		Ctx3.moveTo(XC3(0) - 5,YC3(i * delta)) ;
		Ctx3.lineTo(XC3(0) + 5,YC3(i * delta)) ;
		Ctx3.stroke() ; 
		Ctx3.fillText(esc.toFixed(0),XC3(0)+5,YC3(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)
	}

 	var delta = YTickDelta3();
 	for (var i=-1; (i*delta) > MinY3(); --i){
		esc=(MaxY3() / 5)*i;
		Ctx3.beginPath();
		Ctx3.moveTo(XC3(0)-5,YC3(i*delta));
		Ctx3.lineTo(XC3(0) + 5,YC3(i*delta));
		Ctx3.stroke();
		Ctx3.fillText(esc.toFixed(0),XC3(0) + 8, YC3(i*delta) + 3);   //Escreve o número de referência da escala dos Eixo dos YY (Negativo)
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

function Eixos5() {
	Ctx4.font = "10px Arial";
  	Ctx4.save() ;
	Ctx4.lineWidth = 2.5 ;
	Ctx4.strokeStyle="#000000";

	// Eixo dos YY Positivo
   Ctx4.beginPath() ;
	Ctx4.moveTo(XC4(0),YC4(0)) ;
	Ctx4.lineTo(XC4(0),YC4(MaxY4())) ;
	Ctx4.stroke() ;

	// Eixo dos YY Negativo
	Ctx4.beginPath() ;
	Ctx4.moveTo(XC4(0),YC4(0)) ;
	Ctx4.lineTo(XC4(0),YC4(MinY4())) ;
	Ctx4.stroke() ;


	//Marcas de Referência Escalar nos Eixos dos YY
   var esc;
	var delta = YTickDelta4() ;
	for (var i = 1; (i * delta) < MaxY4() ; ++i) 
	{
	   esc = (MaxY4() / 5)*i;
	   Ctx4.beginPath() ;
	   Ctx4.moveTo(XC4(0) - 5,YC4(i * delta)) ;
	   Ctx4.lineTo(XC4(0) + 5,YC4(i * delta)) ;
	   Ctx4.stroke() ; 
	   Ctx4.fillText(esc.toFixed(2),XC4(0)+5,YC4(i*delta)+3); 			 //Escreve o número de referência da escala dos Eixo dos YY (Positivo)
   }

	var delta = YTickDelta4();
	for (var i=-1; (i*delta) > MinY4(); --i){
	   esc=(MaxY4() / 5)*i;
	   Ctx4.beginPath();
	   Ctx4.moveTo(XC4(0)-5,YC4(i*delta));
	   Ctx4.lineTo(XC4(0) + 5,YC4(i*delta));
	   Ctx4.stroke();
	   Ctx4.fillText(esc.toFixed(2),XC4(0) + 8, YC4(i*delta) + 3);   //Escreve o número de referência da escala dos Eixo dos YY (Negativo)
	} 


   // Eixo dos XX Positivo
	Ctx4.beginPath() ;
	Ctx4.moveTo(XC4(0),YC4(0)) ;
	Ctx4.lineTo(XC3(MaxX4()),YC4(0)) ;
	Ctx4.stroke() ;

	// Eixo dos XX Negativo
	Ctx4.beginPath() ;
	Ctx4.moveTo(XC4(0),YC4(0));
	Ctx4.lineTo(XC4(MinX4()),YC4(0)) ;
	Ctx4.stroke() ;

	// Marcas de Referência Escalar nos Eixos dos XX.
   var delta = XTickDelta() ;
	for (var i = 1; (i * delta) < MaxX4() ; ++i) {
	   Ctx4.beginPath() ;
	   Ctx4.moveTo(XC4(i * delta),YC4(0)-5) ;
	   Ctx4.lineTo(XC4(i * delta),YC4(0)+5) ;
	   Ctx4.stroke() ;  
	   if(i==1)
	   {
		   Ctx4.fillText(i/100,XC4(i * delta)-5,YC4(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
	   }
	   else
	   {
		   Ctx4.fillText(i/100,XC4(i * delta)-8,YC4(0)+12);  // Escreve o número de referência da escala dos Eixo dos XX (Positivo)
	   }
	}

	var delta = XTickDelta() ;
	for (var i = 0; (i * delta) > MinX4() ; --i) {
	   Ctx4.beginPath() ;
	   Ctx4.moveTo(XC4(i * delta),YC4(0)-5) ;
	   Ctx4.lineTo(XC4(i * delta),YC4(0)+5) ;
	   Ctx4.stroke() ;  
	   Ctx4.fillText(i/100,XC4(i * delta)-5,YC4(0)+12); 				//Escreve o número de referência da escala dos Eixo dos XX (Negativo)
	}
	Ctx4.restore() ;

}



//desenha no gráfico 1
function desenha1(f) 
{
	var first = true; 													
	var XSTEP = (MaxX()-MinX())/Width; 									
	Ctx.beginPath() ;
	Ctx.lineWidth = 1.5 ;											
		
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
  

	if(f(x) == Vmod1(x))											
	{
		var muda_cor = Cor_Vmod1;											
		if( muda_cor == 0)											
		{
			Ctx.strokeStyle="green";									
		}
		else
		{
			Ctx.strokeStyle=muda_cor.toString();						
		}
	}

	if (f(x) == Vmod2(x)){	
			var muda_cor1 = Cor_Vmod2;
			if( muda_cor1 == 0)
			{											
				Ctx.strokeStyle="blue";
			}										
			else
			{ 
				Ctx.strokeStyle=muda_cor1.toString();
			}
	}						
	if(f(x) == Vpor1(x)){
		var muda_cor2 = Cor_Vpor1;
		if( muda_cor2 == 0)
		{
				Ctx.lineWidth=1.5;
				Ctx.strokeStyle="black";
		}
		else
		{
				Ctx.strokeStyle=muda_cor2.toString();
		}	
	}
	if(f(x) == U(x)){
		var muda_cor3 = Cor_U;
		if( muda_cor3 == 0)
		{
				Ctx.strokeStyle="yellow";
		}
		else
		{
				Ctx.strokeStyle=muda_cor3.toString();
		}	
	}

	if(f(x) == V(x)){
		var muda_cor4 = Cor_V;
		if( muda_cor4 == 0)
		{
				Ctx.strokeStyle="orange";
		}
		else
		{
				Ctx.strokeStyle=muda_cor4.toString();
		}	
	}

	if(f(x) == W(x)){
		var muda_cor5 = Cor_V;
		if( muda_cor5 == 0)
		{
				Ctx.strokeStyle="purple";
		}
		else
		{
				Ctx.strokeStyle=muda_cor5.toString();
		}	
	}
	// else{
	// 	Ctx.strokeStyle="black";
	// }
	Ctx.stroke();														
}

//desenha no gráfico 2
function desenha2(f) 
{
	var first = true;													//Variavel de Referência que quando verdadeira indica que o indicador esta numa posição inicial e falso qunado o indicador já se moveu da sua posição.
	var XSTEP = (MaxX1()-MinX1())/Width1 ;								//Espaço Correspondente á distãncia que o ponto indicador do gráfico irá se mover em cada iteração.
	Ctx1.beginPath() ;													//Prepara Para Desenhar No 2ºGráfico
  	Ctx1.lineWidth = 2 ;
	for (var x = MinX1(); x <= MaxX1(); x += XSTEP) 
	{
		var y = f(x);													//Atribui à varivel Y o valor da coordenada dos YY da função f(x) - (Função que se pretende desenhar)
		if (first) 														//Avalia se o indicador ainda se encontra na sua posição inicial.
		{
			Ctx1.moveTo(XC1(x),YC1(y)) ;								//Caso não se tenha movido , Move Indicador para a Posição Desejada
			first = false ;												//Coloca Variavel first a Falso.
		} 
		else 
		{
			Ctx1.lineTo(XC1(x),YC1(y)) ;								//Caso já se tenha Movido então desenha uma linha até o ponto XC1(x),YC1(y);
		}
	}
	if(f(x) == Vcon1(x)){
		var muda_cor5 = Cor_Vcon1;
		if( muda_cor5 == 0)
		{
				Ctx1.strokeStyle="#A0522D";
		}
		else
		{
				Ctx1.strokeStyle=muda_cor5.toString();
		}	
	}
	else{
	Ctx1.strokeStyle="#000000";
	}												
	Ctx1.stroke() ;		
}


function desenha3(f) 
{
	var first = true;												
	var XSTEP = (MaxX2()-MinX2())/Width1 ;							
	Ctx2.beginPath() ;
	Ctx2.lineWidth=2;													
  
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
	if(f(x) == Vcon2(x))
	{
		var muda_cor6 = Cor_Vcon2;
		if( muda_cor6 == 0)
		{
				Ctx2.strokeStyle="#4682B4";
		}
		else
		{
				Ctx2.strokeStyle=muda_cor6.toString();
		}	
	}
	else{
		Ctx2.strokeStyle="black"; 
	}     								
	Ctx2.stroke() ;														
}


function desenha4(f) 
{
	var first = true;													
	var XSTEP = (MaxX3()-MinX3())/Width1 ;								
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
	if(f(x)==Vo(x)){
		muda_cor7=Cor_Vo;
		if(muda_cor7==0){
			Ctx3.strokeStyle= "red";	
		}
		else
		{
			Ctx3.strokeStyle=muda_cor7.toString();
		}
	}
	Ctx3.stroke();											
}

function desenha5(f) 
{
	var first = true;													
	var XSTEP = (MaxX4()-MinX4())/Width ;								
	Ctx4.beginPath() ;	
	Ctx4.lineWidth = 2;												
  
	for (var x = MinX4(); x <= MaxX4(); x += XSTEP) 
	{
		var y = f(x);													
		if (first) 														
		{
			Ctx4.moveTo(XC4(x),YC4(y)) ;								
			first = false ;												
		} 
		else 
		{
			Ctx4.lineTo(XC4(x),YC4(y)) ;							
		}
	}
	if(f(x)==io(x)){
		muda_cor8=Cor_Io;
		if(muda_cor8==0){
			Ctx4.strokeStyle= "green";	
		}
		else
		{
			Ctx4.strokeStyle=muda_cor8.toString();
		}
	}
	Ctx4.stroke();											
}
