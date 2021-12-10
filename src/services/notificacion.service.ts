import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  EnviarSMS ():void{
    console.log('HOLA SOY MARLIN, Revisa en tu celular');
    const accountSid = 'AC5d2654c825d41faebe98d26be15a28a9'; // Your Account SID from www.twilio.com/console
    const authToken = '678c60f64e9f212067445e16456a123f'; // Your Auth Token from www.twilio.com/console

    const twilio = require('twilio');
    const client = new twilio(accountSid, authToken);

    client.messages
    .create({
     body: 'Mensaje de Prueba team programmers, JENCY, MARLIN, FERNEY Y ROBERT DAW Ciclo 4, G3 Dic 10 de 2021s',
     to: '+573102150951', // Text this number
     from: '+15207294418', // From a valid Twilio number
  })
  .then((message: any) => console.log(message.sid));
  }
  
}
