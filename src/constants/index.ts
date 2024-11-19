export const DBId = import.meta.env.VITE_DB_ID;
export const DBKey = import.meta.env.VITE_DB_KEY;

export const SSGTable = 'ssgs';
export const ProfileTable = 'profiles';
export const SSGProfileTable = 'rel_ssg_profile';

export const YearFormat = new Intl.NumberFormat('en-US', { useGrouping: false });
export const OneDecimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
export const TwoDecimalFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 1 });
export const PercentFormat = new Intl.NumberFormat('en-US', { style: 'percent', useGrouping: false, maximumFractionDigits: 1, minimumFractionDigits: 1 });

export const NumericKeys = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Numpad0', 'Numpad1', 'Numpad2', 'Numpad3', 'Numpad4', 'Numpad5', 'Numpad6', 'Numpad7', 'Numpad8', 'Numpad9' ];
export const ControlKeys = [ 'Enter', 'Escape', 'Tab' ];