import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { Chattings, ChattingsSchema } from './models/chattings.model';
import { SocketSchema, Socket as SocketModel } from './models/sockets.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chattings.name, schema: ChattingsSchema },
      { name: SocketModel.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
