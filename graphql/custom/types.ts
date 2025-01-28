import { GQLEnums } from '@/prisma/generated/graphql/enums';
import { CustomTransactionsTypes } from './transactions/types';
import { CustomUserTypes } from './users/types';

const customTypes = [CustomUserTypes, CustomTransactionsTypes, GQLEnums];

export { customTypes };
