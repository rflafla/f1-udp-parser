import {F1Parser} from '../F1Parser';
import {CarTelemetry2DataParser} from './CarTelemetry2DataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarTelemetry2Data} from './types';

export class PacketCarTelemetry2DataParser extends F1Parser<PacketCarTelemetry2Data> {
  constructor(packetFormat: number) {
    super();

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carTelemetry2Data', {
        length: cars,
        type: new CarTelemetry2DataParser(),
      });
  }
}
