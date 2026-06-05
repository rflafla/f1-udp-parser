import {F1Parser} from '../F1Parser';
import {CarTelemetryDataParser} from './CarTelemetryDataParser';
import {PacketHeaderParser} from './PacketHeaderParser';
import {PacketCarTelemetryData} from './types';

export class PacketCarTelemetryDataParser extends F1Parser<PacketCarTelemetryData> {

  constructor(packetFormat: number) {
    super();

    const cars = packetFormat >= 2026 ? 24 : 22;

    this.endianess('little')
      .nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .array('m_carTelemetryData', {
        length: cars,
        type: new CarTelemetryDataParser(packetFormat),
      });

    this.uint8('m_mfdPanelIndex')
      .uint8('m_mfdPanelIndexSecondaryPlayer')
      .int8('m_suggestedGear');

  }
}
