import {
  PacketCarDamageDataParser,
  PacketCarSetupDataParser,
  PacketCarStatusDataParser,
  PacketCarTelemetryDataParser,
  PacketEventDataParser,
  PacketFinalClassificationDataParser,
  PacketLapDataParser,
  PacketLobbyInfoDataParser,
  PacketMotionDataParser,
  PacketParticipantsDataParser,
  PacketSessionDataParser,
  PacketSessionHistoryDataParser,
  PacketTyreSetsDataParser,
  PacketMotionExDataParser,
  PacketTimeTrialDataParser,
  PacketLapPositionsDataParser,
} from './parsers/packets';

import { PacketTimeTrialData, PacketMotionExData, PacketTyreSetsData, PacketSessionHistoryData, PacketSessionData, PacketMotionData, PacketLapData, PacketEventData, PacketParticipantsData, PacketCarSetupData, PacketCarTelemetryData, PacketCarStatusData, PacketCarDamageData, PacketFinalClassificationData, PacketLobbyInfoData, PacketLapPositionsData } from './parsers/packets/types';

export interface Options {
  port?: number;
  forwardAddresses?: Address[] | undefined;
  skipParsing?: boolean;
  testModeActive?: boolean;
}

export interface TestMode {
  bufferStream: NodeJS.WritableStream;
  fileCount: number;
  bufferCount: number;
  logDir: string;
}

export interface Address {
  port: number;
  ip?: string;
}

export type Parsers = PacketTimeTrialDataParser
  | PacketMotionExDataParser
  | PacketTyreSetsDataParser
  | PacketSessionHistoryDataParser
  | PacketSessionDataParser
  | PacketMotionDataParser
  | PacketLapDataParser
  | PacketEventDataParser
  | PacketParticipantsDataParser
  | PacketCarSetupDataParser
  | PacketCarTelemetryDataParser
  | PacketCarStatusDataParser
  | PacketCarDamageDataParser
  | PacketFinalClassificationDataParser
  | PacketLobbyInfoDataParser
  | PacketLapPositionsDataParser;

export interface ParsedMessage {
  packetID: string;
  packetData:
  | PacketTimeTrialData
  | PacketMotionExData
  | PacketTyreSetsData
  | PacketSessionHistoryData
  | PacketSessionData
  | PacketMotionData
  | PacketLapData
  | PacketEventData
  | PacketParticipantsData
  | PacketCarSetupData
  | PacketCarTelemetryData
  | PacketCarStatusData
  | PacketCarDamageData
  | PacketFinalClassificationData
  | PacketLobbyInfoData
  | PacketLapPositionsData
  | null;
}
