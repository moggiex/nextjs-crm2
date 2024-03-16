import { z } from 'zod';

import SystemSettingSchema from '@/lib/server/system/zod.SystemSetting';

export type SystemSetting = z.infer<typeof SystemSettingSchema>;
