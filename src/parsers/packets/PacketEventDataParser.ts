import { Parser } from 'binary-parser';

import { EVENT_CODES } from '../../constants';
import { F1Parser } from '../F1Parser';

import { PacketHeaderParser } from './PacketHeaderParser';
import { PacketEventData } from './types';
import { EVENT_CODES_INDEX } from '../../constants/eventCodes';

export interface FastestLap {
  vehicleIdx: number;
  lapTime: number;
}

export interface Retirement {
  vehicleIdx: number;
  reason?: number;
}

export interface DRSDisabled {
  reason: number;
}

export interface TeamMateInPits {
  vehicleIdx: number;
}

export interface RaceWinner {
  vehicleIdx: number;
}

export interface Penalty {
  penaltyType: number;
  infringementType: number;
  vehicleIdx: number;
  otherVehicleIdx: number;
  time: number;
  lapNum: number;
  placesGained: number;
}

export interface SpeedTrap {
  vehicleIdx: number;
  speed: number;
  isOverallFastestInSession: number;
  isDriverFastestInSession: number;
  fastestVehicleIdxInSession: number;
  fastestSpeedInSession: number;
}

export interface StartLights {
  numLights: number;
}

export interface DriveThroughPenaltyServed {
  vehicleIdx: number;
}

export interface StopGoPenaltyServed {
  vehicleIdx: number;
  stopTime?: number;
}

export interface Flashback {
  flashbackFrameIdentifier: number;
  flashbackSessionTime: number;
}

export interface Buttons {
  buttonStatus: number;
}

export interface Overtake {
  overtakingVehicleIdx: number;
  beingOvertakenVehicleIdx: number;
}

export interface SafetyCar {
  safetyCarType: number;
  eventType: number;
}

export interface Collision {
  vehicle1Idx: number;
  vehicle2Idx: number;
}


export class FastestLapParser extends F1Parser<FastestLap> {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx').floatle('lapTime');
  }
}

export class RetirementParser extends F1Parser<Retirement> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').uint8('vehicleIdx');

    if (packetFormat >= 2025) {
      this.floatle('reason');
    }
  }
}

export class DRSDisabledParser extends F1Parser<DRSDisabled> {
  constructor() {
    super();

    this.floatle('reason');
  }
}

export class TeamMateInPitsParser extends F1Parser<TeamMateInPits> {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}

export class RaceWinnerParser extends F1Parser<RaceWinner> {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}

export class PenaltyParser extends F1Parser<Penalty> {
  constructor() {
    super();

    this.endianess('little')
      .uint8('penaltyType')
      .uint8('infringementType')
      .uint8('vehicleIdx')
      .uint8('otherVehicleIdx')
      .uint8('time')
      .uint8('lapNum')
      .uint8('placesGained');
  }
}

export class SpeedTrapParser extends F1Parser<SpeedTrap> {
  constructor() {
    super();

    this.endianess('little')
      .uint8('vehicleIdx')
      .floatle('speed')
      .uint8('isOverallFastestInSession')
      .uint8('isDriverFastestInSession')
      .uint8('fastestVehicleIdxInSession')
      .floatle('fastestSpeedInSession');
  }
}

export class StartLightsParser extends F1Parser<StartLights> {
  constructor() {
    super();

    this.endianess('little').uint8('numLights');
  }
}

export class DriveThroughPenaltyServedParser extends F1Parser<DriveThroughPenaltyServed> {
  constructor() {
    super();

    this.endianess('little').uint8('vehicleIdx');
  }
}

export class StopGoPenaltyServedParser extends F1Parser<StopGoPenaltyServed> {
  constructor(packetFormat: number) {
    super();

    this.endianess('little').uint8('vehicleIdx');
    if (packetFormat >= 2025) {
      this.floatle('stopTime');
    }
  }
}

export class FlashbackParser extends F1Parser<Flashback> {
  constructor() {
    super();

    this.endianess('little')
      .uint32le('flashbackFrameIdentifier')
      .floatle('flashbackSessionTime');
  }
}

export class ButtonsParser extends F1Parser<Buttons> {
  constructor() {
    super();

    this.endianess('little').uint32le('buttonStatus');
  }
}

export class OvertakeParser extends F1Parser<Overtake> {
  constructor() {
    super();

    this.endianess('little')
      .uint8('overtakingVehicleIdx')
      .uint8('beingOvertakenVehicleIdx');
  }
}

export class SafetyCarParser extends F1Parser<SafetyCar> {
  constructor() {
    super();

    this.endianess('little').uint8('safetyCarType').uint8('eventType');
  }
}

export class CollisionParser extends F1Parser<Collision> {
  constructor() {
    super();

    this.endianess('little').uint8('vehicle1Idx').uint8('vehicle2Idx');
  }
}

export class PacketEventDataParser extends F1Parser<PacketEventData> {

  constructor(packetFormat: number) {
    super();

    this.useContextVars(true)
      .endianess('little').nest('m_header', {
        type: new PacketHeaderParser(),
      })
      .string('m_eventStringCode', {
        length: 4,
        formatter: function (item) {
          (this as any).m_eventStringCodeId = EVENT_CODES_INDEX[item];
          return item;
        }
      });
    this.choice({
      tag: 'm_eventStringCodeId',
      choices: {
        [EVENT_CODES_INDEX[EVENT_CODES.FastestLap]]: new FastestLapParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.Retirement]]: new RetirementParser(packetFormat),
        [EVENT_CODES_INDEX[EVENT_CODES.DRSDisabled]]: new DRSDisabledParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.TeammateInPits]]: new TeamMateInPitsParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.RaceWinner]]: new RaceWinnerParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.PenaltyIssued]]: new PenaltyParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.SpeedTrapTriggered]]: new SpeedTrapParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.StartLights]]: new StartLightsParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.DriveThroughServed]]: new DriveThroughPenaltyServedParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.StopGoServed]]: new StopGoPenaltyServedParser(packetFormat),
        [EVENT_CODES_INDEX[EVENT_CODES.Flashback]]: new FlashbackParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.ButtonStatus]]: new ButtonsParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.Overtake]]: new OvertakeParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.SafetyCar]]: new SafetyCarParser(),
        [EVENT_CODES_INDEX[EVENT_CODES.Collision]]: new CollisionParser(),
      },
      defaultChoice: Parser.start(),
    });

    // if (packetFormat === 2022) {
    //   this.unpack2022Format(packetFormat);
    // }

    // if (packetFormat === 2023) {
    //   this.unpack2023Format(packetFormat);
    // }

    // if (packetFormat === 2024) {
    //   this.unpack2024Format(packetFormat);
    // }

    // if (packetFormat === 2025) {
    //   this.unpack2025Format(packetFormat);
    // }
  }

  // unpack2022Format = (packetFormat: number) => {
  //   const eventStringCode = this.getEventStringCode(buffer, packetFormat);

  //   if (eventStringCode === EVENT_CODES.FastestLap) {
  //     this.nest('m_eventDetails', { type: new FastestLapParser() });
  //   } else if (eventStringCode === EVENT_CODES.Retirement) {
  //     this.nest('m_eventDetails', { type: new RetirementParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.TeammateInPits) {
  //     this.nest('m_eventDetails', { type: new TeamMateInPitsParser() });
  //   } else if (eventStringCode === EVENT_CODES.RaceWinner) {
  //     this.nest('m_eventDetails', { type: new RaceWinnerParser() });
  //   } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
  //     this.nest('m_eventDetails', { type: new PenaltyParser() });
  //   } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
  //     this.nest('m_eventDetails', { type: new SpeedTrapParser() });
  //   } else if (eventStringCode === EVENT_CODES.StartLights) {
  //     this.nest('m_eventDetails', { type: new StartLightsParser() });
  //   } else if (eventStringCode === EVENT_CODES.DriveThroughServed) {
  //     this.nest('m_eventDetails', {
  //       type: new DriveThroughPenaltyServedParser(),
  //     });
  //   } else if (eventStringCode === EVENT_CODES.StopGoServed) {
  //     this.nest('m_eventDetails', { type: new StopGoPenaltyServedParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.Flashback) {
  //     this.nest('m_eventDetails', { type: new FlashbackParser() });
  //   } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
  //     this.nest('m_eventDetails', { type: new ButtonsParser() });
  //   }
  // };

  // unpack2023Format = (packetFormat: number) => {
  //   const eventStringCode = this.getEventStringCode(buffer, packetFormat);

  //   if (eventStringCode === EVENT_CODES.FastestLap) {
  //     this.nest('m_eventDetails', { type: new FastestLapParser() });
  //   } else if (eventStringCode === EVENT_CODES.Retirement) {
  //     this.nest('m_eventDetails', { type: new RetirementParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.TeammateInPits) {
  //     this.nest('m_eventDetails', { type: new TeamMateInPitsParser() });
  //   } else if (eventStringCode === EVENT_CODES.RaceWinner) {
  //     this.nest('m_eventDetails', { type: new RaceWinnerParser() });
  //   } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
  //     this.nest('m_eventDetails', { type: new PenaltyParser() });
  //   } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
  //     this.nest('m_eventDetails', { type: new SpeedTrapParser() });
  //   } else if (eventStringCode === EVENT_CODES.StartLights) {
  //     this.nest('m_eventDetails', { type: new StartLightsParser() });
  //   } else if (eventStringCode === EVENT_CODES.DriveThroughServed) {
  //     this.nest('m_eventDetails', {
  //       type: new DriveThroughPenaltyServedParser(),
  //     });
  //   } else if (eventStringCode === EVENT_CODES.StopGoServed) {
  //     this.nest('m_eventDetails', { type: new StopGoPenaltyServedParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.Flashback) {
  //     this.nest('m_eventDetails', { type: new FlashbackParser() });
  //   } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
  //     this.nest('m_eventDetails', { type: new ButtonsParser() });
  //   } else if (eventStringCode === EVENT_CODES.Overtake) {
  //     this.nest('m_eventDetails', { type: new OvertakeParser() });
  //   }
  // };

  // unpack2024Format = (packetFormat: number) => {
  //   const eventStringCode = this.getEventStringCode(buffer, packetFormat);

  //   if (eventStringCode === EVENT_CODES.FastestLap) {
  //     this.nest('m_eventDetails', { type: new FastestLapParser() });
  //   } else if (eventStringCode === EVENT_CODES.Retirement) {
  //     this.nest('m_eventDetails', { type: new RetirementParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.TeammateInPits) {
  //     this.nest('m_eventDetails', { type: new TeamMateInPitsParser() });
  //   } else if (eventStringCode === EVENT_CODES.RaceWinner) {
  //     this.nest('m_eventDetails', { type: new RaceWinnerParser() });
  //   } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
  //     this.nest('m_eventDetails', { type: new PenaltyParser() });
  //   } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
  //     this.nest('m_eventDetails', { type: new SpeedTrapParser() });
  //   } else if (eventStringCode === EVENT_CODES.StartLights) {
  //     this.nest('m_eventDetails', { type: new StartLightsParser() });
  //   } else if (eventStringCode === EVENT_CODES.DriveThroughServed) {
  //     this.nest('m_eventDetails', {
  //       type: new DriveThroughPenaltyServedParser(),
  //     });
  //   } else if (eventStringCode === EVENT_CODES.StopGoServed) {
  //     this.nest('m_eventDetails', { type: new StopGoPenaltyServedParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.Flashback) {
  //     this.nest('m_eventDetails', { type: new FlashbackParser() });
  //   } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
  //     this.nest('m_eventDetails', { type: new ButtonsParser() });
  //   } else if (eventStringCode === EVENT_CODES.Overtake) {
  //     this.nest('m_eventDetails', { type: new OvertakeParser() });
  //   } else if (eventStringCode === EVENT_CODES.SafetyCar) {
  //     this.nest('m_eventDetails', { type: new SafetyCarParser() });
  //   } else if (eventStringCode === EVENT_CODES.Collision) {
  //     this.nest('m_eventDetails', { type: new CollisionParser() });
  //   }
  // };

  // unpack2025Format = (packetFormat: number) => {
  //   const eventStringCode = this.getEventStringCode(buffer, packetFormat);

  //   if (eventStringCode === EVENT_CODES.FastestLap) {
  //     this.nest('m_eventDetails', { type: new FastestLapParser() });
  //   } else if (eventStringCode === EVENT_CODES.Retirement) {
  //     this.nest('m_eventDetails', { type: new RetirementParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.DRSDisabled) {
  //     this.nest('m_eventDetails', { type: new DRSDisabledParser() });
  //   } else if (eventStringCode === EVENT_CODES.TeammateInPits) {
  //     this.nest('m_eventDetails', { type: new TeamMateInPitsParser() });
  //   } else if (eventStringCode === EVENT_CODES.RaceWinner) {
  //     this.nest('m_eventDetails', { type: new RaceWinnerParser() });
  //   } else if (eventStringCode === EVENT_CODES.PenaltyIssued) {
  //     this.nest('m_eventDetails', { type: new PenaltyParser() });
  //   } else if (eventStringCode === EVENT_CODES.SpeedTrapTriggered) {
  //     this.nest('m_eventDetails', { type: new SpeedTrapParser() });
  //   } else if (eventStringCode === EVENT_CODES.StartLights) {
  //     this.nest('m_eventDetails', { type: new StartLightsParser() });
  //   } else if (eventStringCode === EVENT_CODES.DriveThroughServed) {
  //     this.nest('m_eventDetails', {
  //       type: new DriveThroughPenaltyServedParser(),
  //     });
  //   } else if (eventStringCode === EVENT_CODES.StopGoServed) {
  //     this.nest('m_eventDetails', { type: new StopGoPenaltyServedParser(packetFormat) });
  //   } else if (eventStringCode === EVENT_CODES.Flashback) {
  //     this.nest('m_eventDetails', { type: new FlashbackParser() });
  //   } else if (eventStringCode === EVENT_CODES.ButtonStatus) {
  //     this.nest('m_eventDetails', { type: new ButtonsParser() });
  //   } else if (eventStringCode === EVENT_CODES.Overtake) {
  //     this.nest('m_eventDetails', { type: new OvertakeParser() });
  //   } else if (eventStringCode === EVENT_CODES.SafetyCar) {
  //     this.nest('m_eventDetails', { type: new SafetyCarParser() });
  //   } else if (eventStringCode === EVENT_CODES.Collision) {
  //     this.nest('m_eventDetails', { type: new CollisionParser() });
  //   }
  // };

  // getEventStringCode = (buffer: Buffer, packetFormat: number) => {
  //   const headerParser = new Parser()
  //     .endianess('little')
  //     .nest('m_header', {
  //       type: new PacketHeaderParser(packetFormat),
  //     })
  //     .string('m_eventStringCode', { length: 4 });
  //   const { m_eventStringCode } = headerParser.parse(buffer);
  //   return m_eventStringCode;
  // };
}
