import { readFile } from 'fs/promises';

export default defineEventHandler(async (event) => {
  const filePath = `./feed.xml`;
  const content = await readFile(filePath);
  event.node.res.setHeader('content-type', 'text/xml');
  event.node.res.end(content);
});
