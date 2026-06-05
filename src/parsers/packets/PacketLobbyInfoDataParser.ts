import { F1Parser } from '../F1Parser';
import { LobbyInfoDataParser } from './LobbyInfoDataParser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketLobbyInfoData } from './types';

export class PacketLobbyInfoDataParser extends F1Parser<PacketLobbyInfoData> {
  constructor(packetFormat: number) {
    super();

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .uint8('m_numPlayers')
      .array('m_lobbyPlayers', {
        length: cars,
        type: new LobbyInfoDataParser(packetFormat),
      });
  }
}
