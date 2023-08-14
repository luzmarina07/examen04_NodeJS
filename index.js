require('dotenv').config();
const{leerInput,
inquirerMenu,
pausa,
listadoLugares
}=require('./helpers/inquirer');
const Busquedas=require('./models/busqueda');
//console.log(process.env);
const main=async()=>{
    let opt;
    const busquedas=new Busquedas();
       do{
        opt = await inquirerMenu();
        //console.log({opt});
          //opt=await inquerirMenu();
    switch(opt)
    {
        case 1:
            const  termino=await leerInput('Ciudad:');
            const lugares=await busquedas.ciudad(termino);
            const id=await listadoLugares(lugares);
            if(id==0) continue;
            //guardar en la base d edatos
            busquedas.agregarHistorial(lugarSel.nombre)
            const lugarSel=lugares.find(L=>l.id==id);
           // console.log({id});
            //console.log(lugares);
            const clima=await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
            //await busquedas.ciudad(lugar);
            console.log('\n Informacion de la ciudas\n'.green);
            console.log("Ciudad:",lugarSel.nombre);
            console.log('lat:',lugarSel.lat);
            console.log('Lng',lugarSel.lng);
            console.log('temperatura',clima.temp);
            console.log('Minima',clima.min);
            console.log('Maxima',clima.max);
            console.log('como esta el clima',clima.desc);
        break;
        case  2:
            busquedas.historialCapitalizado.forEach((Lugar,i)=>{
const idx=`${i+1}.`.green;
console.log(`${idx}${lugar}`);
            })
            break;
    }

    if(opt!==0)await pausa();

    }while (opt!==0);

} 
main();