import { Parser } from 'binary-parser';
import { F1Parser } from '../F1Parser';
import { PacketHeader } from './types';


export const SINCE_2023 = function (tag: string, parser: Parser): Parser['options'] {
  return {
    choices: {
      2023: parser,
      2024: parser,
      2025: parser,
    },
    defaultChoice: Parser.start(),
    tag: tag,
  };
};

export class PacketHeaderParser extends F1Parser<PacketHeader> {
  static PARSER = new PacketHeaderParser();

  constructor() {
    super();

    this.useContextVars(true)
      .endianess('little').uint16le('m_packetFormat');

    this.choice(SINCE_2023('m_packetFormat',
      Parser.start()
        .uint8('m_gameYear'))
    );
    // if (packetFormat >= 2023) {
    //   this.uint8('m_gameYear');
    // }

    this.uint8('m_gameMajorVersion')
      .uint8('m_gameMinorVersion')
      .uint8('m_packetVersion')
      .uint8('m_packetId')
      .uint64('m_sessionUID')
      .floatle('m_sessionTime')
      .uint32('m_frameIdentifier');

    // if (packetFormat >= 2023) {
    //   this.uint32('m_overallFrameIdentifier');
    // }

    this.choice(SINCE_2023('m_packetFormat',
      Parser.start()
        .uint32('m_overallFrameIdentifier'))
    );

    this.uint8('m_playerCarIndex').uint8('m_secondaryPlayerCarIndex');
  }
}
