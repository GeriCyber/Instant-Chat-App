import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styles: []
})
export class ChatsComponent implements OnInit {

  mensaje = '';
  elemento: any;

  constructor(public chatService: ChatService) {
    this.chatService.cargarMensajes()
    .subscribe(() => {
      setTimeout(() => {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);
    });
   }
   ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
   }

  enviarMensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this.chatService.agregarMensaje(this.mensaje)
    .then(() => {
      console.log('Mensaje enviado!');
      this.mensaje = '';
    })
    .catch((err) => {
      console.error('Error al enviar mensaje. ', err);
    });
  }

}
