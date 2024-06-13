import { API_HOST, USE_MOCK } from '@/env';

export const API_URL = USE_MOCK === 'true' ? '' : API_HOST;
