import {CorsOptions} from 'cors'

export const corsConfig: CorsOptions={
    origin:function(origin,callback){
        const whiteList=[process.env.FRONT_END_URL]

        if(whiteList.includes(origin)){
            callback(null,true)
        }else{
            //callback(new Error('error cors'))
            console.error(`CORS error: Origin ${origin} no permitido.`);
            callback(new Error('CORS error: Acceso denegado por política de CORS.'));
        }
    }
}


