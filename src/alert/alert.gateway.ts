import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway({namespace: '/alert'})
export class AlertGateway implements OnGatewayInit {
  private logger: Logger = new Logger();
  @WebSocketServer() wss: Server;
  
  afterInit(server: any) {
    this.logger.log(`Alert initialized`);
  }

  sendToAll(message: string) {
    this.wss.emit('alertToClient', {type: 'alert', message});
  }
}
