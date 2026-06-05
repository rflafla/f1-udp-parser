import { F1Parser } from '../F1Parser';
import { FinalClassificationDataParser } from './FinalClassificationDataParser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketFinalClassificationData } from './types';

export class PacketFinalClassificationDataParser extends F1Parser<PacketFinalClassificationData> {

  constructor(packetFormat: number) {
    super();

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .uint8('m_numCars')
      .array('m_classificationData', {
        length: cars,
        type: new FinalClassificationDataParser(packetFormat),
      });

  }
}
