import {F1Parser} from '../F1Parser';
import {TyreSetDataParser} from './TyreSetDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketTyreSetsData} from './types';

export class PacketTyreSetsDataParser extends F1Parser<PacketTyreSetsData> {
  constructor() {
    super();

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .uint8('m_carIdx')
      .array('m_tyreSetData', {
        length: 20,
        type: new TyreSetDataParser(),
      })
      .uint8('m_fittedIdx');
  }
}
