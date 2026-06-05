import { F1Parser } from '../F1Parser';
import { LapDataParser } from './LapDataParser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketLapData } from './types';

export class PacketLapDataParser extends F1Parser<PacketLapData> {

  constructor(packetFormat: number) {
    super();

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_lapData', {
        length: cars,
        type: new LapDataParser(packetFormat),
      });

    this.uint8('m_timeTrialPBCarIdx').uint8('m_timeTrialRivalCarIdx');
  }
}
