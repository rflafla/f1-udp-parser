import {F1Parser} from '../F1Parser';
import { PacketHeaderFormat } from './types';

export class PacketFormatParser extends F1Parser<PacketHeaderFormat> {
  constructor() {
    super();
    this.endianess('little').uint16le('m_packetFormat');
  }
}
