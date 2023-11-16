import countries from "world-countries";


let filteredcountries = countries.map((country,index)=>({
    label:country.name.common,
    flag:country.flag,
    value:country.cca2,
    latlng:country.latlng,
    region:country.region
})) 

export const getAllCountries = () => {
    return filteredcountries
}

export const getByValue = (value: string) => {
    return filteredcountries.find((item)=> item.value === value)
}




