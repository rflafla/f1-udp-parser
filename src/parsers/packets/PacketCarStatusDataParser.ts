import { F1Parser } from '../F1Parser';
import { CarStatusDataParser } from './CarStatusDataParser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketCarStatusData } from './types';

export class PacketCarStatusDataParser extends F1Parser<PacketCarStatusData> {

  constructor(packetFormat: number) {
    super();

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carStatusData', {
        length: cars,
        type: new CarStatusDataParser(packetFormat),
      });

  }
}
