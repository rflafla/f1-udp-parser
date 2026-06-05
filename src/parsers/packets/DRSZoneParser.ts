import {F1Parser} from '../F1Parser';
import {DRSZone} from './types';

export class DRSZoneParser extends F1Parser<DRSZone> {
  constructor() {
    super();
    this.endianess('little').floatle('m_zoneStart').floatle('m_zoneEnd');
  }
}
