import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({namespace: '/chat'})
export class ChatGateway implements OnGatewayInit{
  private logger: Logger = new Logger('ChatGateway');
  @WebSocketServer() wss: Server;
  
  afterInit(server: any) {
    this.logger.log('chat Initialized');
  }
  
  
  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, payload: {sender: string, message: string}): void {
    this.wss.emit('chatToClient', payload);
  }
}
