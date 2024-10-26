export default defineEventHandler(async (event) => {
  const start = process.hrtime();

  event.node.res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const durationMs = (seconds * 1000 + nanoseconds / 1e6).toFixed(0);

    function statusStartsWith(n: number): boolean {
      return event.node.res.statusCode.toString().startsWith(n.toString());
    }
    function getStatusColor(): string {
      return statusStartsWith(2)
        ? "\x1b[32m" // 绿色
        : statusStartsWith(3)
          ? "\x1b[33m" // 橙色
          : "\x1b[31m"; // 红色
    }

    const currentDate = `\x1b[90m${new Date().toLocaleString()}\x1b[37m`; // 灰色
    const requestMethod = event.node.req.method; // 白色
    const responseStatus = `${getStatusColor()}${event.node.res.statusCode}\x1b[37m`; // 2**：绿色；3**：橙色；其他：红色
    const requestURL = `\x1b[34m${event.node.req.originalUrl}\x1b[37m`; // 蓝色
    const responseTime = `${durationMs}ms`; // 白色

    console.log(
      `${currentDate}  ${requestMethod}  ${responseStatus}  ${responseTime}  ${requestURL}`,
    );
  });
});
