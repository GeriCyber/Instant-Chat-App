import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';

@Component({
  selector: 'app-logn',
  templateUrl: './logn.component.html',
  styles: []
})
export class LognComponent {

  constructor(public chatService: ChatService) { }

  ingresar(proveedor: string) {
    console.log(proveedor);
    this.chatService.login(proveedor);
  }

}
