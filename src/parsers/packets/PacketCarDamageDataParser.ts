import {F1Parser} from '../F1Parser';
import {CarDamageDataParser} from './CarDamageDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarDamageData} from './types';

export class PacketCarDamageDataParser extends F1Parser<PacketCarDamageData> {

  constructor(packetFormat: number) {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carDamageData', {
        length: 22,
        type: new CarDamageDataParser(packetFormat),
      });

  }
}
