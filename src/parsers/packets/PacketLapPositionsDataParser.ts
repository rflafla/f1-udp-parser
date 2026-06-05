import { Parser } from 'binary-parser';
import { F1Parser } from '../F1Parser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketLapPositionsData } from './types';

export class PacketLapPositionsDataParser extends F1Parser<PacketLapPositionsData> {
    constructor(packetFormat: number) {
        super();

        const cars = packetFormat >= 2026 ? 24 : 22;

        this.endianess('little')
            .nest('m_header', {
                type: new PacketHeaderParser(),
            })
            .uint8('m_numLaps')
            .uint8('m_lapStart')
            .array('m_positionForVehicleIdx', {
                length: 50,
                type: new Parser()
                    .array('', {
                        length: cars,
                        type: new Parser().uint8(''),
                    }),
            });
    }
}
