import { F1Parser } from '../F1Parser';
import { CarSetupDataParser } from './CarSetupDataParser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketCarSetupData } from './types';

export class PacketCarSetupDataParser extends F1Parser<PacketCarSetupData> {

  constructor(packetFormat: number) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carSetups', {
        length: 22,
        type: new CarSetupDataParser(packetFormat),
      });

    if (packetFormat >= 2024) {
      this.floatle('m_nextFrontWingValue');
    }
  }
}
