import { F1Parser } from '../F1Parser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { TimeTrialDataSetParser } from './TimeTrialDataSetParser';
import { PacketTimeTrialData } from './types';

export class PacketTimeTrialDataParser extends F1Parser<PacketTimeTrialData> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').nest('m_header', {
      type: new PacketHeaderParser(),
    });

    this.nest('m_playerSessionBestDataSet', {
      type: new TimeTrialDataSetParser(packetFormat),
    });

    this.nest('m_personalBestDataSet', {
      type: new TimeTrialDataSetParser(packetFormat),
    });

    this.nest('m_rivalDataSet', {
      type: new TimeTrialDataSetParser(packetFormat),
    });
  }
}
