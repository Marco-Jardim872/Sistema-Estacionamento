
document.getElementById('carros').addEventListener('submit', cadastrarVeiculo);
document.getElementById('saida').addEventListener('click', sair);

function sair() {
	let placa = document.getElementById('pV').value;
	let veiculos = JSON.parse(localStorage.getItem('patio'));
	let patioResultado = document.getElementById('resultados');
	let HS = new Date();
    
        
	for(var i = 0 ; i < veiculos.length; i++){
		if (veiculos[i].placa == placa) {
			veiculos[i].hs = HS.getHours();
			veiculos[i].ms = HS.getMinutes();
            veiculos[i].totalPagar = totalPagar();
            function totalPagar(){
                let p1 = 10;
                let p2 = 15;
                let p3 = 22;
                let p4 = 7;
                let horasConsumidas = (veiculos[i].hs - veiculos[i].hora);
                let minutosConsumidos = (veiculos[i].ms -veiculos[i].minutos);
                if( horasConsumidas === 0 & minutosConsumidos<=30){
                    return p1
                }else if(horasConsumidas === 0 & minutosConsumidos>30){
                    return p2
                }else if( horasConsumidas === 1 & minutosConsumidos<=30){
                    return p3
                }else if( horasConsumidas === 1 & minutosConsumidos>30){
                    return p3 + p4
                }else{
                    return ((veiculos[i].hs) -1.5)*p4
                }
            };
            patioResultado.innerHTML = '';

			for (let i = 0; i < veiculos.length; i++) {
				let modelo = veiculos[i].modelo;
				let placa = veiculos[i].placa;
                let cor = veiculos[i].cor;
				let hora = veiculos[i].hora;
				let minutos = veiculos[i].minutos;
				let hs = veiculos[i].hs;
				let ms = veiculos[i].ms;
                let pagamento = veiculos[i].totalPagar;
                               
				patioResultado.innerHTML += '<tr><td>' + modelo + '</td>' +
					'<td>' + placa + '</td>' +
                    '<td>'+ cor + '</td>' +
					'<td>' + hora + ':' + minutos + '</td>' +
					'<td>' + hs + ':' + ms + '</td>' +
                    '<td>'+ "R$ " + pagamento +'</td>'+
                    '<td><button onclick="" class="btnRem"><img src="./imagens/imp.png" style= "width:50px; height: 20px; margin: auto"></button></td>'+
					'<td><button onclick="removeVeiculo(\'' + placa + '\')" class="btnRem">Remover</button></td>' +
					'</tr>';
				
			}
            

		}
        
		localStorage.setItem('patio', JSON.stringify(veiculos));
		
	}
	document.getElementById('carros').reset();
	
};

function cadastrarVeiculo(e){
	
	let modeloVeiculo = document.getElementById('mV').value;
	let placaVeiculo = document.getElementById('pV').value;
    let corVeiculo = document.getElementById('cV').value;
	let horaEntrada = new Date();

   	if(!modeloVeiculo || !placaVeiculo || !corVeiculo){
		alert("Preencha todos os campos!");
		return false;
	} 

	let veiculo = {
		modelo: modeloVeiculo,
		placa: placaVeiculo,
        cor: corVeiculo,
		hora: horaEntrada.getHours(),
		minutos: horaEntrada.getMinutes(),
		hs: "",
		ms: "",
        totalPagar:""
    };

	if(localStorage.getItem('patio') === null){
		let veiculos = [];
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));
	} else {
		let veiculos = JSON.parse(localStorage.getItem('patio'));
		veiculos.push(veiculo);
		localStorage.setItem('patio', JSON.stringify(veiculos));
	}

	document.getElementById('carros').reset();

	mostraPatio();

	e.preventDefault();
}

function removeVeiculo(placa){
	let patio = JSON.parse(localStorage.getItem('patio'));
	

	 for(let i = 0 ; i < patio.length; i++){
		if(patio[i].placa == placa){
			patio.splice(i, 1);
		}
	}

	localStorage.setItem('patio', JSON.stringify(patio));

	mostraPatio();
}

function mostraPatio(){
	
	let veiculos = JSON.parse(localStorage.getItem('patio'));
	let patioResultado = document.getElementById('resultados');

	patioResultado.innerHTML = '';

	for(let i = 0; i < veiculos.length; i++){
		let modelo = veiculos[i].modelo;
		let placa = veiculos[i].placa;
        let cor = veiculos[i].cor;
		let hora = veiculos[i].hora;
		let minutos = veiculos[i].minutos;
		let hs = veiculos[i].hs;
		let ms = veiculos[i].ms;
        let totalPagar = veiculos[i].totalPagar;
		 patioResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
		 							 	 '<td>'+ placa + '</td>' +
                                         '<td>'+ cor + '</td>' +
										 '<td>' + hora + ':' + minutos + '</td>' +
										 '<td>'+ hs + ':' + ms + '</td>' +
                                         '<td>'+ totalPagar +'</td>'+
                                         '<td><button onclick="" class="btnRem"><img src="./imagens/imp.png" style= "width:50px; height: 20px; margin: auto"   ></button></td>'+
		 							 	 '<td><button onclick="removeVeiculo(\''+ placa +'\')" class="btnRem">Remover</button></td>'+
		 							 '</tr>';
	}
	
}
