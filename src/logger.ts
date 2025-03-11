const logLevels: Record<string, number> = {
  NONE: 0,
  ERROR: 1,
  INFO: 2,
  DEBUG: 3,
};
const LOG_LEVEL = logLevels[process.env.LOG_LEVEL ?? "INFO"] ?? logLevels.INFO;

export const logger = {
  timestamp: -1,
  player: "",
  info: (...args: any[]) => {
    if (LOG_LEVEL < logLevels.INFO) return;
    console.log(`[${logger.timestamp}]`, `[${logger.player}]`, ...args);
  },
  debug: (...args: any[]) => {
    if (LOG_LEVEL < logLevels.DEBUG) return;
    console.debug(`[${logger.timestamp}]`, `[${logger.player}]`, ...args);
  },
  error: (...args: any[]) => {
    if (LOG_LEVEL < logLevels.ERROR) return;
    console.error(`[${logger.timestamp}]`, `[${logger.player}]`, ...args);
  },
  setTimestamp: (timestamp: number) => {
    logger.timestamp = timestamp;
  },
  setPlayer: (player: string) => {
    logger.player = player;
  },
  resetTimestamp: () => {
    logger.timestamp = -1;
  },
  resetPlayer: () => {
    logger.player = "";
  },
};
