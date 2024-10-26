type ParamsType = {
  func: () => void | Promise<void>;
  processName: string;
  successMessage?: string;
  errorMessage?: string;
  hiddenSuccessMessage?: boolean;
};

export default async function logProcessTime({
  func,
  processName,
  successMessage,
  errorMessage,
  hiddenSuccessMessage = false,
}: ParamsType): Promise<number> {
  const start = process.hrtime();

  try {
    await func();

    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    if (!hiddenSuccessMessage) {
      console.log(`✨[${processName}] succeeded in ${durationMs}ms`);
      if (successMessage) console.log(`✨${successMessage}`);
    }

    return parseFloat(durationMs);
  } catch (error) {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    console.error(`❌[${processName}] failed after ${durationMs}ms.`);
    throw new Error(errorMessage || (error as Error).message);
  }
}
