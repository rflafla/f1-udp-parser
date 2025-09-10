import { Parser } from 'binary-parser';
import { F1Parser } from '../F1Parser';
import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketLapPositionsData } from './types';

export class PacketLapPositionsDataParser extends F1Parser<PacketLapPositionsData> {
    constructor() {
        super();

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
                        length: 22,
                        type: new Parser().uint8(''),
                    }),
            });
    }
}
