var a, b;
var calculator = {
	arr : [],
	status: false,
	num:    function(n) {
				act(n);
			},
	save:   function(n) {
				var x = this.arr;
				var y = /[+*/-]/;
				if (!isNaN(x[x.length-1])&&!isNaN(n)) {
					x[x.length-1] = x[x.length-1]+''+n;
				} else if (y.test(x[x.length-1])&&isNaN(n)) {
					x[x.length-1] = ''+ n;
				} else {
					x.push(n);
				}
			},
	disp:   function() {
				var x = "";
				for(var i = 0; i<this.arr.length; i++) {
					x += this.comma(this.arr[i]);
				}
				b.value = x;
			},
	bs:     function() {
				var x = this.arr.length-1;
				var y = this.arr[x];
				y = y.slice(0,y.length-1);
				this.arr[this.arr.length-1] = y;
				if(y === "") this.arr.pop();
			},
	result: function() {
				this.status = true;
				return String(eval(this.arr.join("")));
			},
	comma:  function(n) {
				var x = n, y = "", z = 0;
				while(x.length > 0) {
					if (++z % 3 === 1 && z > 3) {
						y = ","+ y;
						}
					y = x[x.length-1]+y;
					x = x.slice(0,x.length-1);
				}
				return y;
			}
}
function ac() {
	calculator.arr = [];
}
function act(n) {
	switch(n) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if(calculator.arr[calculator.arr.length-1] === "0") {
				calculator.arr.pop();
			}
			if(calculator.status) {
				ac();
				calculator.status = false;
			}
			calculator.save(n);
			break;
		case "(":
		case ")":
			calculator.save(n);
			break;
		case "/":
		case "*":
		case "-":
		case "+":
			if(calculator.status) {
				calculator.status = false;
			}
			calculator.save(n);
			break;
		case "BS":
			calculator.bs();
			break;
		case "AC":
			ac();
			break;
		case "=":
			var r = calculator.result();
			ac();
			calculator.arr.push(r);
			calculator.disp();
			break;
		default:
	}
	calculator.disp();
}
window.onload = function() {
	a = document.getElementById('calbody');
	b = document.getElementById('view');
	a.addEventListener("click", function() {calculator.num(event.target.getAttribute('name'))});
}
window.addEventListener("keydown", function press(n) {
	var x = n.which || n.keyCode;
		switch(x) {
			case 96:  case 48: act("0"); break;
			case 97:  case 49: act("1"); break;
			case 98:  case 50: act("2"); break;
			case 99:  case 51: act("3"); break;
			case 100: case 52: act("4"); break;
			case 101: case 53: act("5"); break;
			case 102: case 54: act("6"); break;
			case 103: case 55: act("7"); break;
			case 104: case 56: act("8"); break;
			case 105: case 57: act("9"); break;
			// case : act("("); break;
			// case : act(")"); break;
			case 111: act("/");  break;
			case 106: act("*");  break;
			case 109: act("-");  break;
			case 107: act("+");  break;
			case 8:   act("BS"); break;
			case 46:  act("AC"); break;
			case 13:  act("=");  break;
		}
	}
);