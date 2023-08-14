const fs=require('fs');

const axios =require('axios');
class Busquedas{
    historial=[];
    dbPath='./db/database.json';
    constructor(){
this.lerrBD();
    }
    get historialCapitalizado(){
        return this.historial.map(lugar=>{
            let palabras=palabras.map(p=>p[0].toUpperCase()+p.substring(1));
            return palabras.json('');
        })
    }
    get paramMapBox(){
        return{
            'acces_token':process.env.MAPBOX_KEY,
           // 'acces_token':'pk.eyJ1Ijoia2VydmVyb3NiZWxjZWJ1IiwiYSI6ImNsa3lucnI5bDAzbHAzbG1xY29kd2pxM3kifQ.07D-5xJJk9ubcNW-eiIYzg',
            'limit':5,
            'lenguaje':'es'
        }
    }
    get paramsWeather(){
return{
 appid:process.env.OPENWEATHER_KEY,
  units:'metric',
  lang:'es'

      }
}
async ciudad(lugar=''){
    try{
       const intance=axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramMapBox
       });
        const resp=await intance.get('');
        //console.log(resp.data.features);
        return resp.data.features.map(
            lugar=>({
                id:lugar.id,
                nombre:lugar.place_name,
                lng:lugar.center[0],
                lst:lugar.center[i]
            }));
    }catch(error){
        return [];
    }
 }
 async climaLugar(Lat,Lon){
    try{
        const instance=axios.create({
            baseURL:`https://api.openweathermap.org/data/2.5/weather`,
            params: { ...this.paramsWeather,lat,lon}
        })
        const resp=await instance.get();
        const{weather,main}=resp.data;
        //console.log(weather);
        return{
        desc:weather[0].description,
        min:main.temp_min,
        max:main.temp_max, 
        temp:main.temp   
        }
    }catch(error){
        console.log(error);
    }
 }
 agregarHistorial(lugar=''){
    //todo:prevenir
    if (this.historial.includes(lugar.toLocaleLowerCase()))
    {return;
    }
    this.historial.unshift(lugar.toLocaleLowerCase());
    this.historial=this.historial.splice(0,5);
    //grbar
    this.guardarBD();

 }
 guardarBD(){
    const payload={
        historial:this.historial
    };
    fs.writeFileSync(this.dbPath,JSON.stringify(payload));
 }
 leerBD(){
    if(!fs.existsSync(this.dbPath))return;
    const info=fs.readFileSync(this.dbPath,{encoding:'uft-8'});
    const data=JSON.parse(info);
    this.historial=data.historial;
 }
}
module.exports=Busquedas;