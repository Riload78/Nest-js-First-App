import { SetMetadata } from '@nestjs/common';
import { ACCESS_LEVEL_KEY, PUBLIC_KEY } from 'src/constants/key-decorators';

export const AccessLevelAccess = (level: number) => SetMetadata(ACCESS_LEVEL_KEY, level);
