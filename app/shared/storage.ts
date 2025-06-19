import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export default storage;

export const IS_ADMIN_KEY = 'isAdmin';
export const LANGUAGE_KEY = 'language';
