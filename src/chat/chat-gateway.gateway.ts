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
  handleMessage(client: Socket, payload: {sender: string, room: string, message: string}): void {
    this.wss.to(payload.room).emit('chatToClient', payload);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('joinedRoom', room);
  }
  
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
