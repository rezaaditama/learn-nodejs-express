import { env } from '@/config/env';
import app, { logger } from './app';

const PORT = Number(env.PORT);

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
