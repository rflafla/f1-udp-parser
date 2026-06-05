import {F1Parser} from '../F1Parser';
import {ActiveAeroZone} from './types';

export class ActiveAeroZoneParser extends F1Parser<ActiveAeroZone> {
  constructor() {
    super();
    this.endianess('little').floatle('m_zoneStart').floatle('m_zoneEnd');
  }
}
