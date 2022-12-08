import { faker } from "@faker-js/faker";
import {
	AREA_TYPE,
	CAPITAL_TYPE,
	FLAG_TYPE,
	POPULATION_TYPE,
} from "../state/questionConstants";

export function selectCountries(countries) {
	//let dontHaveThree=true;
	let countries2 = JSON.parse(JSON.stringify(countries));
	let countrieNames = [];
	for (let i = 0; i < 3; i++) {
		let randomNumber = Math.ceil(Math.random() * countries.length);
		const element = countries2[randomNumber];
		countries2 = countries2.filter((country) => country !== element);
		countrieNames.push(element);
	}
	return countrieNames;
}

export function generateQuestion(countries) {
	
	let countries2 = JSON.parse(JSON.stringify(countries));
	let randomNumber = Math.ceil(Math.random() * countries.length);
	let element = countries2[randomNumber];
	countries2 = countries2.filter((country) => country !== element);
	let nameArray = selectCountries(countries2);
	//console.log(element);
	let randomIndex = Math.round(Math.random() * nameArray.length);
	nameArray.splice(randomIndex, 0, element);
	//console.log(nameArray);

    randomNumber = Math.round(Math.random() );
    let type = null;
    let questionText ="";
    let maxCountry=null;
    switch (randomNumber) {
		case 0:
			type = FLAG_TYPE;
            questionText ="Which country does this flag belongst to?";
			break;
		case 1:
			type = CAPITAL_TYPE;
            questionText =`Which country's capital is ${element.capital} ? `;
			break;
		case 2:
			type = AREA_TYPE;
            questionText =`Which country is the largest of four?`;
            maxCountry = nameArray.reduce((a, b) => Math.max(a.area, b.area), -Infinity);
            //console.log(maxCountry);
            element=maxCountry;
			break;
		case 3:
			type = POPULATION_TYPE;
            questionText =`Which country's population is the largest of four?`;
            console.log(nameArray);
            maxCountry = nameArray.sort((country1,country2)=>{
            return (country1.population<country2.population) ? 0 : 1
            }
            
            )[0];
            console.log(nameArray);
            element=maxCountry;
			break;
		default:
			break;
	}
    nameArray=nameArray.map(country => country.name.common);
	
    return{
        type:type,
        question:questionText,
        options:nameArray,
        answer:element,
    }
}
