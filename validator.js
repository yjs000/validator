"use strict";
//const data = {
//		name: "geㅁd",
//		nickname : "geonlee23!",
//		age: "37d",
//		email: "geonleekakao.com",
//		phone: "010-50422100",
//		url : "https://aljjabaegi.tistory.com/449",
//		date : "21?03?04",
//		func : () => {}
//	}
//const config = {
//	name : VT.string().char().required().min(3).max(6),
//	nickname : VT.string().char().pattern(/_/).required(),
//	eamil : VT.string().email(),
//	date : VT.date().min("2021-01-01").max("2022-04-01")
//	
//	required는 모든곳에서
//}
window.onload = function() {
	const v = new Validator();
	v.config = {
		name : v.string().char().min(3).required(), //object에 함수들을 달아놓고,
		email : v.string().email().min(6).required(),
	}
	v.validate({
		name : "jisu3",
		email : "jisu",
	}); 
	v.validate({
		name : "haen2",
		email : "hye@naver.com"
	});
}

class Common{
	constructor(){
		this.validator = {};
	}
	assert(expression, msg){
		const result = expression;
		if(result === true){
			return true;
		} else if (result === false) {
			return msg;
		} else {
			return result;
		}
	}
	required(){
		const required = (value) => {
			const result = !!value;
			if(!result){
				return "필수값입니다.";
			} else {
				return result;
			}
		}
		this.validator.required = required;
		return this;
	}
}
class String extends Common{
	constructor(){
		super();
		this.pattern = {
			char : /^[a-zㄱ-ㅎㅏ-ㅣ가-힣]+$/i,
			email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
		}
		const string = (value) => { 
			return this.assert(typeof value === "string", "타입이 string 이어야 합니다")
		}
		this.validator.string = string;
	}
	char(){
		const char = (value) => {
			return this.assert(this.pattern.char.test(value), "문자만 가능합니다.")
		};
		this.validator.char = char;
		return this;
	}
	email(){
		const email = (value) => {
			return this.assert(this.pattern.email.test(value), "이메일 형태가 올바르지 않습니다. id@site.com");
		}
		this.validator.email = email;
		return this;
	}
	min(num){
		const min = (value) => {
			return this.assert(value.length >= num, `길이가 ${num} 이상 이어야 합니다.`);
		}
		this.validator.min = min;
		return this;
	}
	max(){
		
	}
}

class Validator{
	constructor(){
		this.config = {};
	}
	string(){
		return new String();
	}
	//call validation
	validate(data){
		for(const[key, val] of Object.entries(this.config)){
			console.log(key, val)
			const validator = val.validator;
			this.validation(validator, data[key], key);
		}
	}
	//실제 validation진행
	validation(validator, data, key){
		this.msg = [];
		for(const method of Object.values(validator)){
			const result = method(data);
			if(result !== true){
				this.msg.push(`${result}`);
			}
		}
		if(this.msg.length > 0){
			for(const msg of this.msg){
				console.error(`${key} error\n ${this.msg.join("\n")}`);
			}
		}
	}
//	getErrorMsg(){
//	}
}
