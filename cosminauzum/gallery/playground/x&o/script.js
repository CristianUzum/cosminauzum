document.addEventListener("DOMContentLoaded", function(event){
	let mutare = 1;
	let incurs = true;

	let celule = document.querySelectorAll("#tabel-xo tr td");

	for(let i=0; i<celule.length; i++){

		let celula = celule[i];
		celula.onclick = function(e){
			if (celula.innerHTML == "" && incurs) {

				if(mutare % 2 == 1){
					celula.innerHTML = "X";
				}else{
					celula.innerHTML = "O";
				}
				mutare++;

				let semnulCastigator = verificareCastigator();

				if(semnulCastigator == '' || semnulCastigator == -1){
					return;
				}

				let jucatorCastigator = (semnulCastigator == "X") ? "1" : "2";
				alert("Castigator: Jucatorul" + jucatorCastigator);
				incurs = false;
			}
		}
	}
});

function verificareCastigator() {
	let celula1 = document.querySelector("#tabel-xo tr:nth-child(1) td:nth-child(1)").innerHTML;
	let celula2 = document.querySelector("#tabel-xo tr:nth-child(1) td:nth-child(2)").innerHTML;
	let celula3 = document.querySelector("#tabel-xo tr:nth-child(1) td:nth-child(3)").innerHTML;
	let celula4 = document.querySelector("#tabel-xo tr:nth-child(2) td:nth-child(1)").innerHTML;
	let celula5 = document.querySelector("#tabel-xo tr:nth-child(2) td:nth-child(2)").innerHTML;
	let celula6 = document.querySelector("#tabel-xo tr:nth-child(2) td:nth-child(3)").innerHTML;
	let celula7 = document.querySelector("#tabel-xo tr:nth-child(3) td:nth-child(1)").innerHTML;
	let celula8 = document.querySelector("#tabel-xo tr:nth-child(3) td:nth-child(2)").innerHTML;
	let celula9 = document.querySelector("#tabel-xo tr:nth-child(3) td:nth-child(3)").innerHTML;

	if ((celula1==celula2) && (celula2==celula3) && celula3 != ""){
		return celula3;
	}
	if ((celula4==celula5) && (celula5==celula6) && celula6 != ""){
		return celula6;
	}
	if ((celula7==celula8) && (celula8==celula9) && celula9 != ""){
		return celula9;
	}
	if ((celula1==celula4) && (celula4==celula7) && celula7 != ""){
		return celula7;
	}
	if ((celula2==celula5) && (celula5==celula8) && celula8 != ""){
		return celula8;
	}
	if ((celula3==celula6) && (celula6==celula9) && celula9 != ""){
		return celula9;
	}
	if ((celula1==celula5) && (celula5==celula9) && celula9 != ""){
		return celula9;
	}
	if ((celula3==celula5) && (celula5==celula7) && celula7 != ""){
		return celula7;
	}
	return -1;
}