import { t } from "@lingui/macro";

export const usernameRegex = /([A-Z]|[a-z]|[0-9]){4,}/;
export const usernameRegexDescription = t`Minimum 4 characters. Cannot contain symbols`;

export const passwordRegex = /.{6,}/;
export const passwordRegexDescription = t`Minimum 6 characters`;