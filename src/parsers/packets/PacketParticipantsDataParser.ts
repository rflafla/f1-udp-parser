import {F1Parser} from '../F1Parser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {ParticipantDataParser} from './ParticipantDataParser';
import {PacketParticipantsData} from './types';

export class PacketParticipantsDataParser extends F1Parser<PacketParticipantsData> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').nest('m_header', {
      type: new PacketHeaderParser(),
    });

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.uint8('m_numActiveCars');

    this.array('m_participants', {
      length: cars,
      type: new ParticipantDataParser(packetFormat),
    });
  }
}
