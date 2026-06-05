import {F1Parser} from '../F1Parser';
import { TimeTrialDataSet } from './types';

export class TimeTrialDataSetParser extends F1Parser<TimeTrialDataSet> {
  constructor(packetFormat: number) {
    super();
    this.endianess('little').uint8('m_carIdx');

    // F1 26 widens team id to uint16 for a larger database.
    if (packetFormat >= 2026) {
      this.uint16le('m_teamId');
    } else {
      this.uint8('m_teamId');
    }

    this.uint32('m_lapTimeInMS')
      .uint32('m_sector1TimeInMS')
      .uint32('m_sector2TimeInMS')
      .uint32('m_sector3TimeInMS')
      .uint8('m_tractionControl')
      .uint8('m_gearboxAssist')
      .uint8('m_antiLockBrakes')
      .uint8('m_equalCarPerformance')
      .uint8('m_customSetup')
      .uint8('m_valid');
  }
}
