import { EventCode } from './types';

export const EVENT_CODES: { [index: string]: EventCode; } = {
  SessionStarted: 'SSTA',
  SessionEnded: 'SEND',
  FastestLap: 'FTLP',
  Retirement: 'RTMT',
  DRSEnabled: 'DRSE',
  DRSDisabled: 'DRSD',
  TeammateInPits: 'TMPT',
  ChequeredFlag: 'CHQF',
  RaceWinner: 'RCWN',
  PenaltyIssued: 'PENA',
  SpeedTrapTriggered: 'SPTP',
  StartLights: 'STLG',
  LightsOut: 'LGOT',
  DriveThroughServed: 'DTSV',
  StopGoServed: 'SGSV',
  Flashback: 'FLBK',
  ButtonStatus: 'BUTN',
  RedFlag: 'RDFL',
  Overtake: 'OVTK',
  SafetyCar: 'SCAR',
  Collision: 'COLL',
};

export const EVENT_CODES_INDEX: { [key: string]: number; } = {};
let i = 0;
for (const key of Object.values(EVENT_CODES)) {
  EVENT_CODES_INDEX[key] = i++;
}