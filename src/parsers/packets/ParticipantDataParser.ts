import { F1Parser } from '../F1Parser';
import { LiveryColour, ParticipantData } from './types';

export class LiveryColourParser extends F1Parser<LiveryColour> {
  constructor() {
    super();

    this.uint8('red')
      .uint8('blue')
      .uint8('green');
  }
}

export class ParticipantDataParser extends F1Parser<ParticipantData> {
  constructor(packetFormat: number) {
    super();

    this.uint8('m_aiControlled');

    // F1 26 widens the driver/network/team ids to uint16 for a larger database.
    if (packetFormat >= 2026) {
      this.uint16le('m_driverId')
        .uint16le('m_networkId')
        .uint16le('m_teamId');
    } else {
      this.uint8('m_driverId').uint8('m_networkId').uint8('m_teamId');
    }

    this.uint8('m_myTeam').uint8('m_raceNumber').uint8('m_nationality');

    if (packetFormat >= 2025) {
      this.string('m_name', {
        length: 32,
        stripNull: true,
      });
    } else {
      this.string('m_name', {
        length: 48,
        stripNull: true,
      });
    }

    this.uint8('m_yourTelemetry');

    if (packetFormat === 2023) {
      this.uint8('m_showOnlineNames').uint8('m_platform');
    }

    if (packetFormat >= 2024) {
      this.uint8('m_showOnlineNames')
        .uint16le('m_techLevel')
        .uint8('m_platform');
    }

    if (packetFormat >= 2025) {
      this.uint8('m_numColours')
        .array('m_liveryColours', {
          length: 4,
          type: new LiveryColourParser(),
        });
    }
  }
}
