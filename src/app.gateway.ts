import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WsResponse, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');
  
  @WebSocketServer() wss: Server; // broadcasting
  afterInit(server: any) {
    this.logger.log('initialized');
  }

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`Client connected : ${client.id}`);
  }
  
  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected : ${client.id}`);
  }

  @SubscribeMessage('messageToServer')
  handleMessage(client: Socket, text: string): void {
    // return {event: 'messageToClient', data: text};
    this.wss.emit('messageToClient', text);
  }
}
