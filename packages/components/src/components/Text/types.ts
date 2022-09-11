import { ReactNode } from 'react'

export type TextPropsType =
  | TextOnWhite
  | TextOnGrey050
  | TextOnGrey100
  | TextOnGrey200
  | TextOnGrey300
  | TextOnGrey400
  | TextOnGrey500
  | TextOnGrey600
  | TextOnGrey700
  | TextOnGrey800
  | TextOnGrey900
  | TextOnPrimary050
  | TextOnPrimary100
  | TextOnPrimary200
  | TextOnPrimary300
  | TextOnPrimary400
  | TextOnPrimary500
  | TextOnPrimary600
  | TextOnPrimary700
  | TextOnPrimary800
  | TextOnPrimary900
  | TextOnPrimaryLighter
  | TextOnPrimary
  | TextOnPrimaryDarker
  | TextOnSuccess050
  | TextOnSuccess100
  | TextOnSuccess200
  | TextOnSuccess300
  | TextOnSuccess400
  | TextOnSuccess500
  | TextOnSuccess600
  | TextOnSuccess700
  | TextOnSuccess800
  | TextOnSuccess900
  | TextOnSuccessLighter
  | TextOnSuccess
  | TextOnSuccessDarker
  | TextOnWarning050
  | TextOnWarning100
  | TextOnWarning200
  | TextOnWarning300
  | TextOnWarning400
  | TextOnWarning500
  | TextOnWarning600
  | TextOnWarning700
  | TextOnWarning800
  | TextOnWarning900
  | TextOnWarningLighter
  | TextOnWarning
  | TextOnWarningDarker
  | TextOnDanger050
  | TextOnDanger100
  | TextOnDanger200
  | TextOnDanger300
  | TextOnDanger400
  | TextOnDanger500
  | TextOnDanger600
  | TextOnDanger700
  | TextOnDanger800
  | TextOnDanger900
  | TextOnDangerLighter
  | TextOnDanger
  | TextOnDangerDarker

type ColorType =
  | 'white'
  | 'grey-050'
  | 'grey-100'
  | 'grey-200'
  | 'grey-300'
  | 'grey-400'
  | 'grey-500'
  | 'grey-600'
  | 'grey-700'
  | 'grey-800'
  | 'grey-900'
  | 'primary-050'
  | 'primary-100'
  | 'primary-200'
  | 'primary-300'
  | 'primary-400'
  | 'primary-500'
  | 'primary-600'
  | 'primary-700'
  | 'primary-800'
  | 'primary-900'
  | 'primary-lighter'
  | 'primary'
  | 'primary-darker'
  | 'success-050'
  | 'success-100'
  | 'success-200'
  | 'success-300'
  | 'success-400'
  | 'success-500'
  | 'success-600'
  | 'success-700'
  | 'success-800'
  | 'success-900'
  | 'success-lighter'
  | 'success'
  | 'success-darker'
  | 'warning-050'
  | 'warning-100'
  | 'warning-200'
  | 'warning-300'
  | 'warning-400'
  | 'warning-500'
  | 'warning-600'
  | 'warning-700'
  | 'warning-800'
  | 'warning-900'
  | 'warning-lighter'
  | 'warning'
  | 'warning-darker'
  | 'danger-050'
  | 'danger-100'
  | 'danger-200'
  | 'danger-300'
  | 'danger-400'
  | 'danger-500'
  | 'danger-600'
  | 'danger-700'
  | 'danger-800'
  | 'danger-900'
  | 'danger-lighter'
  | 'danger'
  | 'danger-darker'

type TextCommon = {
  children?: ReactNode
  tag?: 'span' | 'div'
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
}

// /* GREY 000 ******************************************************************** */

type TextOnWhite = TextCommon & {
  on: 'white'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}

// --color-white: #ffffff;

// --text-on-white: #051317;
// --text-on-white--subdued: #3d4548;

// --text-on-white--grey: #00809b;
// --text-on-white--grey-subdued--UNSAFE: #40a0b4;
// --text-on-white--primary: #00809b;
// --text-on-white--primary-subdued--UNSAFE: #40a0b4;
// --text-on-white--success: #00809b;
// --text-on-white--success-subdued--UNSAFE: #40a0b4;
// --text-on-white--warning: #00809b;
// --text-on-white--warning-subdued--UNSAFE: #40a0b4;
// --text-on-white--danger: #00809b;
// --text-on-white--danger-subdued--UNSAFE: #40a0b4;

// /* GREY 050 ******************************************************************** */
// --color-grey-050: #f4f7f8;

type TextOnGrey050 = TextCommon & {
  on: 'grey-050'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-050: #051317;
// --text-on-grey-050--subdued: #3b4447;

// --text-on-grey-050--grey: #007c97;
// --text-on-grey-050--grey-subdued--UNSAFE: #3d9baf;
// --text-on-grey-050--primary: #007c97;
// --text-on-grey-050--primary-subdued--UNSAFE: #3d9baf;
// --text-on-grey-050--success: #007c97;
// --text-on-grey-050--success-subdued--UNSAFE: #3d9baf;
// --text-on-grey-050--warning: #007c97;
// --text-on-grey-050--warning-subdued--UNSAFE: #3d9baf;
// --text-on-grey-050--danger: #007c97;
// --text-on-grey-050--danger-subdued--UNSAFE: #3d9baf;

// /* GREY 100 ******************************************************************** */
// --color-grey-100: #e2e9ec;

type TextOnGrey100 = TextCommon & {
  on: 'grey-100'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-100: #051317;
// --text-on-grey-100--subdued: #374145;

// --text-on-grey-100--grey: #00728b;
// --text-on-grey-100--grey-subdued--UNSAFE: #3990a3;
// --text-on-grey-100--primary: #00728b;
// --text-on-grey-100--primary-subdued--UNSAFE: #3990a3;
// --text-on-grey-100--success: #00728b;
// --text-on-grey-100--success-subdued--UNSAFE: #3990a3;
// --text-on-grey-100--warning: #00728b;
// --text-on-grey-100--warning-subdued--UNSAFE: #3990a3;
// --text-on-grey-100--danger: #00728b;
// --text-on-grey-100--danger-subdued--UNSAFE: #3990a3;

// /* GREY 200 ******************************************************************** */
// --color-grey-200: #cdd6d9;

type TextOnGrey200 = TextCommon & {
  on: 'grey-200'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-200: #051317;
// --text-on-grey-200--subdued: #333d41;

// --text-on-grey-200--grey: #00657b;
// --text-on-grey-200--grey-subdued--UNSAFE: #338193;
// --text-on-grey-200--primary: #00657b;
// --text-on-grey-200--primary-subdued--UNSAFE: #338193;
// --text-on-grey-200--success: #00657b;
// --text-on-grey-200--success-subdued--UNSAFE: #338193;
// --text-on-grey-200--warning: #00657b;
// --text-on-grey-200--warning-subdued--UNSAFE: #338193;
// --text-on-grey-200--danger: #00657b;
// --text-on-grey-200--danger-subdued--UNSAFE: #338193;

// /* GREY 300 ******************************************************************** */
// --color-grey-300: #aeb7bb;

type TextOnGrey300 = TextCommon & {
  on: 'grey-300'
  kind?:
    | 'subdued--UNSAFE'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-300: #051317;
// --text-on-grey-300--subdued--UNSAFE: #2d373b;

// --text-on-grey-300--grey: #004e60;
// --text-on-grey-300--grey-subdued--UNSAFE: #2c6877;
// --text-on-grey-300--primary: #004e60;
// --text-on-grey-300--primary-subdued--UNSAFE: #2c6877;
// --text-on-grey-300--success: #004e60;
// --text-on-grey-300--success-subdued--UNSAFE: #2c6877;
// --text-on-grey-300--warning: #004e60;
// --text-on-grey-300--warning-subdued--UNSAFE: #2c6877;
// --text-on-grey-300--danger: #004e60;
// --text-on-grey-300--danger-subdued--UNSAFE: #2c6877;

// /* GREY 400 ******************************************************************** */
// --color-grey-400: #8d989c;

type TextOnGrey400 = TextCommon & {
  on: 'grey-400'
  kind?:
    | 'subdued--UNSAFE'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-400: #051317;
// --text-on-grey-400--subdued--UNSAFE: #263134;

// --text-on-grey-400--grey: #003441;
// --text-on-grey-400--grey-subdued--UNSAFE: #234d58;
// --text-on-grey-400--primary: #003441;
// --text-on-grey-400--primary-subdued--UNSAFE: #234d58;
// --text-on-grey-400--success: #003441;
// --text-on-grey-400--success-subdued--UNSAFE: #234d58;
// --text-on-grey-400--warning: #003441;
// --text-on-grey-400--warning-subdued--UNSAFE: #234d58;
// --text-on-grey-400--danger: #003441;
// --text-on-grey-400--danger-subdued--UNSAFE: #234d58;

// /* GREY 500 ******************************************************************** */
// --color-grey-500: #6d7679;

type TextOnGrey500 = TextCommon & {
  on: 'grey-500'
  kind?:
    | 'subdued--UNSAFE'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-500: #ffffff;
// --text-on-grey-500--subdued--UNSAFE: #d9dbdc;

// --text-on-grey-500--grey: #f7fdff;
// --text-on-grey-500--grey-subdued--UNSAFE: #d4dbdd;
// --text-on-grey-500--primary: #f7fdff;
// --text-on-grey-500--primary-subdued--UNSAFE: #d4dbdd;
// --text-on-grey-500--success: #f7fdff;
// --text-on-grey-500--success-subdued--UNSAFE: #d4dbdd;
// --text-on-grey-500--warning: #f7fdff;
// --text-on-grey-500--warning-subdued--UNSAFE: #d4dbdd;
// --text-on-grey-500--danger: #f7fdff;
// --text-on-grey-500--danger-subdued--UNSAFE: #d4dbdd;

// /* GREY 600 ******************************************************************** */
// --color-grey-600: #545d61;

type TextOnGrey600 = TextCommon & {
  on: 'grey-600'
  kind?:
    | 'subdued--UNSAFE'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-600: #ffffff;
// --text-on-grey-600--subdued--UNSAFE: #d1d4d5;

// --text-on-grey-600--grey: #81e0ff;
// --text-on-grey-600--grey-subdued--UNSAFE: #76bfd7;
// --text-on-grey-600--primary: #81e0ff;
// --text-on-grey-600--primary-subdued--UNSAFE: #76bfd7;
// --text-on-grey-600--success: #81e0ff;
// --text-on-grey-600--success-subdued--UNSAFE: #76bfd7;
// --text-on-grey-600--warning: #81e0ff;
// --text-on-grey-600--warning-subdued--UNSAFE: #76bfd7;
// --text-on-grey-600--danger: #81e0ff;
// --text-on-grey-600--danger-subdued--UNSAFE: #76bfd7;

// /* GREY 700 ******************************************************************** */
// --color-grey-700: #394144;

type TextOnGrey700 = TextCommon & {
  on: 'grey-700'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-700: #ffffff;
// --text-on-grey-700--subdued: #c9cccc;

// --text-on-grey-700--grey: #00bae0;
// --text-on-grey-700--grey-subdued--UNSAFE: #0e9cb9;
// --text-on-grey-700--primary: #00bae0;
// --text-on-grey-700--primary-subdued--UNSAFE: #0e9cb9;
// --text-on-grey-700--success: #00bae0;
// --text-on-grey-700--success-subdued--UNSAFE: #0e9cb9;
// --text-on-grey-700--warning: #00bae0;
// --text-on-grey-700--warning-subdued--UNSAFE: #0e9cb9;
// --text-on-grey-700--danger: #00bae0;
// --text-on-grey-700--danger-subdued--UNSAFE: #0e9cb9;

// /* GREY 800 ******************************************************************** */
// --color-grey-800: #1f272a;

type TextOnGrey800 = TextCommon & {
  on: 'grey-800'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-800: #ffffff;
// --text-on-grey-800--subdued: #c1c3c4;

// --text-on-grey-800--grey: #009abb;
// --text-on-grey-800--grey-subdued--UNSAFE: #087d97;
// --text-on-grey-800--primary: #009abb;
// --text-on-grey-800--primary-subdued--UNSAFE: #087d97;
// --text-on-grey-800--success: #009abb;
// --text-on-grey-800--success-subdued--UNSAFE: #087d97;
// --text-on-grey-800--warning: #009abb;
// --text-on-grey-800--warning-subdued--UNSAFE: #087d97;
// --text-on-grey-800--danger: #009abb;
// --text-on-grey-800--danger-subdued--UNSAFE: #087d97;

// /* GREY 900 ******************************************************************** */
// --color-grey-900: #0a1215;

type TextOnGrey900 = TextCommon & {
  on: 'grey-900'
  kind?:
    | 'subdued'
    | 'grey'
    | 'grey-subdued--UNSAFE'
    | 'primary'
    | 'primary-subdued--UNSAFE'
    | 'success'
    | 'success-subdued--UNSAFE'
    | 'warning'
    | 'warning-subdued--UNSAFE'
    | 'danger'
    | 'danger-subdued--UNSAFE'
}
// --text-on-grey-900: #ffffff;
// --text-on-grey-900--subdued: #babcbd;

// --text-on-grey-900--grey: #0087a4;
// --text-on-grey-900--grey-subdued--UNSAFE: #036a80;
// --text-on-grey-900--primary: #0087a4;
// --text-on-grey-900--primary-subdued--UNSAFE: #036a80;
// --text-on-grey-900--success: #0087a4;
// --text-on-grey-900--success-subdued--UNSAFE: #036a80;
// --text-on-grey-900--warning: #0087a4;
// --text-on-grey-900--warning-subdued--UNSAFE: #036a80;
// --text-on-grey-900--danger: #0087a4;
// --text-on-grey-900--danger-subdued--UNSAFE: #036a80;

// /* PRIMARY 050 ***************************************************************** */

type TextOnPrimary050 = TextCommon & {
  on: 'primary-050'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-050: #f9f5fe;

// --text-on-primary-050: #130f17;
// --text-on-primary-050--subdued: #444148;
// --text-on-primary-050--vivid: #7d4bff;
// --text-on-primary-050--vivid-subdued--UNSAFE: #a576ff;

// /* PRIMARY 100 ***************************************************************** */

type TextOnPrimary100 = TextCommon & {
  on: 'primary-100'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-100: #eee4fc;

// --text-on-primary-100: #130f17;
// --text-on-primary-100--subdued: #423d48;
// --text-on-primary-100--vivid: #6f3dff;
// --text-on-primary-100--vivid-subdued--UNSAFE: #9869ff;

// /* PRIMARY 200 ***************************************************************** */

type TextOnPrimary200 = TextCommon & {
  on: 'primary-200'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-200: #dfcdf9;

// --text-on-primary-200: #130f17;
// --text-on-primary-200--subdued: #3f3947;
// --text-on-primary-200--vivid: #5728ff;
// --text-on-primary-200--vivid-subdued--UNSAFE: #8756ff;

// /* PRIMARY 300 ***************************************************************** */

type TextOnPrimary300 = TextCommon & {
  on: 'primary-300'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-300: #c6a9f4;

// --text-on-primary-300: #130f17;
// --text-on-primary-300--subdued--UNSAFE: #3a3146;
// --text-on-primary-300--vivid: #2a00eb;
// --text-on-primary-300--vivid-subdued--UNSAFE: #683aee;

// /* PRIMARY 400 ***************************************************************** */

type TextOnPrimary400 = TextCommon & {
  on: 'primary-400'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-400: #a981f0;

// --text-on-primary-400: #130f17;
// --text-on-primary-400--subdued--UNSAFE: #342945;
// --text-on-primary-400--vivid: #1a00a3;
// --text-on-primary-400--vivid-subdued--UNSAFE: #4b27b6;

// /* PRIMARY 500 ***************************************************************** */

type TextOnPrimary500 = TextCommon & {
  on: 'primary-500'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-500: #8457e6;

// --text-on-primary-500: #ffffff;
// --text-on-primary-500--subdued--UNSAFE: #e4d4fa;
// --text-on-primary-500--vivid: #fcfaff;
// --text-on-primary-500--vivid-subdued--UNSAFE: #e1d0fa;

// /* PRIMARY 600 ***************************************************************** */

type TextOnPrimary600 = TextCommon & {
  on: 'primary-600'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-600: #6946b3;

// --text-on-primary-600: #ffffff;
// --text-on-primary-600--subdued--UNSAFE: #dbceed;
// --text-on-primary-600--vivid: #e1cbff;
// --text-on-primary-600--vivid-subdued--UNSAFE: #c4a8ec;

// /* PRIMARY 700 ***************************************************************** */

type TextOnPrimary700 = TextCommon & {
  on: 'primary-700'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-700: #49317e;

// --text-on-primary-700: #ffffff;
// --text-on-primary-700--subdued: #d1c7de;
// --text-on-primary-700--vivid: #bf98ff;
// --text-on-primary-700--vivid-subdued--UNSAFE: #a07ddd;

// /* PRIMARY 800 ***************************************************************** */

type TextOnPrimary800 = TextCommon & {
  on: 'primary-800'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-800: #2c1d4b;

// --text-on-primary-800: #ffffff;
// --text-on-primary-800--subdued: #c7c0cf;
// --text-on-primary-800--vivid: #9f70ff;
// --text-on-primary-800--vivid-subdued--UNSAFE: #805acf;

// /* PRIMARY 900 ***************************************************************** */

type TextOnPrimary900 = TextCommon & {
  on: 'primary-900'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --color-primary-900: #170a27;

// --text-on-primary-900: #ffffff;
// --text-on-primary-900--subdued: #bfbac4;
// --text-on-primary-900--vivid: #8d5cff;
// --text-on-primary-900--vivid-subdued--UNSAFE: #6d46c3;

type TextOnPrimaryLighter = TextCommon & {
  on: 'primary-lighter'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-primary-lighter
// --text-on-primary-lighter--subdued--UNSAFE
// --text-on-primary-lighter--vivid
// --text-on-primary-lighter--vivid-subdued--UNSAFE

type TextOnPrimary = TextCommon & {
  on: 'primary'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --text-on-primary
// --text-on-primary--subdued--UNSAFE
// --text-on-primary--vivid
// --text-on-primary--vivid-subdued--UNSAFE

type TextOnPrimaryDarker = TextCommon & {
  on: 'primary-darker'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-primary-darker
// --text-on-primary-darker--subdued--UNSAFE
// --text-on-primary-darker--vivid
// --text-on-primary-darker--vivid-subdued--UNSAFE

// --color-primary-lighter: var(--color-primary-400);
// --color-primary: var(--color-primary-500);
// --color-primary-darker: var(--color-primary-600);
// --text-on-primary-lighter: var(--text-on-primary-400);
// --text-on-primary-lighter--subdued--UNSAFE: var(
//   --text-on-primary-400--subdued--UNSAFE
// );
// --text-on-primary-lighter--vivid: var(--text-on-primary-400--vivid);
// --text-on-primary-lighter--vivid-subdued--UNSAFE: var(
//   --text-on-primary-400--vivid-subdued--UNSAFE
// );
// --text-on-primary: var(--text-on-primary-500);
// --text-on-primary--subdued--UNSAFE: var(--text-on-primary-500--subdued--UNSAFE);
// --text-on-primary--vivid: var(--text-on-primary-500--vivid);
// --text-on-primary--vivid-subdued--UNSAFE: var(
//   --text-on-primary-500--vivid-subdued--UNSAFE
// );
// --text-on-primary-darker: var(--text-on-primary-600);
// --text-on-primary-darker--subdued--UNSAFE: var(
//   --text-on-primary-600--subdued--UNSAFE
// );
// --text-on-primary-darker--vivid: var(--text-on-primary-600--vivid);
// --text-on-primary-darker--vivid-subdued--UNSAFE: var(
//   --text-on-primary-600--vivid-subdued--UNSAFE
// );

// /* SUCCESS 050 ***************************************************************** */
type TextOnSuccess050 = TextCommon & {
  on: 'success-050'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-050: #dfffe3;

// --text-on-success-050: #0a130c;
// --text-on-success-050--subdued: #39453c;
// --text-on-success-050--vivid: #00833d;
// --text-on-success-050--vivid-subdued--UNSAFE: #4fa164;

// /* SUCCESS 100 ***************************************************************** */
type TextOnSuccess100 = TextCommon & {
  on: 'success-100'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-100: #95ffad;

// --text-on-success-100: #0a130c;
// --text-on-success-100--subdued: #2b4531;
// --text-on-success-100--vivid: #007937;
// --text-on-success-100--vivid-subdued--UNSAFE: #329953;

// /* SUCCESS 200 ***************************************************************** */
type TextOnSuccess200 = TextCommon & {
  on: 'success-200'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-200: #04f477;

// --text-on-success-200: #0a130c;
// --text-on-success-200--subdued: #1a4327;
// --text-on-success-200--vivid: #006b30;
// --text-on-success-200--vivid-subdued--UNSAFE: #018b41;

// /* SUCCESS 300 ***************************************************************** */
type TextOnSuccess300 = TextCommon & {
  on: 'success-300'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-300: #0ad165;

// --text-on-success-300: #0a130c;
// --text-on-success-300--subdued--UNSAFE: #183c23;
// --text-on-success-300--vivid: #005324;
// --text-on-success-300--vivid-subdued--UNSAFE: #017033;

// /* SUCCESS 400 ***************************************************************** */
type TextOnSuccess400 = TextCommon & {
  on: 'success-400'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-400: #01ad52;

// --text-on-success-400: #0a130c;
// --text-on-success-400--subdued--UNSAFE: #15351f;
// --text-on-success-400--vivid: #003716;
// --text-on-success-400--vivid-subdued--UNSAFE: #005224;

// /* SUCCESS 500 ***************************************************************** */
type TextOnSuccess500 = TextCommon & {
  on: 'success-500'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-500: #06863f;

// --text-on-success-500: #ffffff;
// --text-on-success-500--subdued--UNSAFE: #c9e1cc;
// --text-on-success-500--vivid: #effff1;
// --text-on-success-500--vivid-subdued--UNSAFE: #bce0c2;

// /* SUCCESS 600 ***************************************************************** */
type TextOnSuccess600 = TextCommon & {
  on: 'success-600'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-600: #006b30;

// --text-on-success-600: #ffffff;
// --text-on-success-600--subdued--UNSAFE: #c4d9c7;
// --text-on-success-600--vivid: #00f678;
// --text-on-success-600--vivid-subdued--UNSAFE: #00d165;

// /* SUCCESS 700 ***************************************************************** */
type TextOnSuccess700 = TextCommon & {
  on: 'success-700'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-700: #024b20;

// --text-on-success-700: #ffffff;
// --text-on-success-700--subdued: #c0cfc2;
// --text-on-success-700--vivid: #00c65f;
// --text-on-success-700--vivid-subdued--UNSAFE: #02a54e;

// /* SUCCESS 800 ***************************************************************** */
type TextOnSuccess800 = TextCommon & {
  on: 'success-800'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-800: #002d10;

// --text-on-success-800: #ffffff;
// --text-on-success-800--subdued: #bbc6bc;
// --text-on-success-800--vivid: #00a34d;
// --text-on-success-800--vivid-subdued--UNSAFE: #00833d;

// /* SUCCESS 900 ***************************************************************** */
type TextOnSuccess900 = TextCommon & {
  on: 'success-900'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --color-success-900: #011504;

// --text-on-success-900: #ffffff;
// --text-on-success-900--subdued: #b9bdb9;
// --text-on-success-900--vivid: #008f42;
// --text-on-success-900--vivid-subdued--UNSAFE: #0c6d33;

type TextOnSuccessLighter = TextCommon & {
  on: 'success-lighter'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}
// --text-on-success-lighter
// --text-on-success-lighter--subdued--UNSAFE
// --text-on-success-lighter--vivid
// --text-on-success-lighter--vivid-subdued--UNSAFE

type TextOnSuccess = TextCommon & {
  on: 'success'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-success
// --text-on-success--subdued--UNSAFE
// --text-on-success--vivid
// --text-on-success--vivid-subdued--UNSAFE

type TextOnSuccessDarker = TextCommon & {
  on: 'success-darker'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-success-darker
// --text-on-success-darker--subdued--UNSAFE
// --text-on-success-darker--vivid
// --text-on-success-darker--vivid-subdued--UNSAFE

// --color-success-lighter: var(--color-success-400);
// --color-success: var(--color-success-500);
// --color-success-darker: var(--color-success-600);
// --text-on-success-lighter: var(--text-on-success-400);
// --text-on-success-lighter--subdued--UNSAFE: var(
//   --text-on-success-400--subdued--UNSAFE
// );
// --text-on-success-lighter--vivid: var(--text-on-success-400--vivid);
// --text-on-success-lighter--vivid-subdued--UNSAFE: var(
//   --text-on-success-400--vivid-subdued--UNSAFE
// );
// --text-on-success: var(--text-on-success-500);
// --text-on-success--subdued--UNSAFE: var(--text-on-success-500--subdued--UNSAFE);
// --text-on-success--vivid: var(--text-on-success-500--vivid);
// --text-on-success--vivid-subdued--UNSAFE: var(
//   --text-on-success-500--vivid-subdued--UNSAFE
// );
// --text-on-success-darker: var(--text-on-success-600);
// --text-on-success-darker--subdued--UNSAFE: var(
//   --text-on-success-600--subdued--UNSAFE
// );
// --text-on-success-darker--vivid: var(--text-on-success-600--vivid);
// --text-on-success-darker--vivid-subdued--UNSAFE: var(
//   --text-on-success-600--vivid-subdued--UNSAFE
// );

// /* WARNING 050 ***************************************************************** */
// --color-warning-050: #f8f7ef;

type TextOnWarning050 = TextCommon & {
  on: 'warning-050'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-050: #121106;
// --text-on-warning-050--subdued: #43423b;
// --text-on-warning-050--vivid: #747600;
// --text-on-warning-050--vivid-subdued--UNSAFE: #969447;

// /* WARNING 100 ***************************************************************** */
// --color-warning-100: #ece9cf;

type TextOnWarning100 = TextCommon & {
  on: 'warning-100'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-100: #121106;
// --text-on-warning-100--subdued: #404035;
// --text-on-warning-100--vivid: #6a6c00;
// --text-on-warning-100--vivid-subdued--UNSAFE: #8b893d;

// /* WARNING 200 ***************************************************************** */
// --color-warning-200: #dbd7a0;

type TextOnWarning200 = TextCommon & {
  on: 'warning-200'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-200: #121106;
// --text-on-warning-200--subdued: #3d3c2b;
// --text-on-warning-200--vivid: #5e6000;
// --text-on-warning-200--vivid-subdued--UNSAFE: #7d7c2e;

// /* WARNING 300 ***************************************************************** */
// --color-warning-300: #bcbb49;

type TextOnWarning300 = TextCommon & {
  on: 'warning-300'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-300: #121106;
// --text-on-warning-300--subdued--UNSAFE: #37361a;
// --text-on-warning-300--vivid: #4a4b00;
// --text-on-warning-300--vivid-subdued--UNSAFE: #656512;

// /* WARNING 400 ***************************************************************** */
// --color-warning-400: #999c00;

type TextOnWarning400 = TextCommon & {
  on: 'warning-400'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-400: #121106;
// --text-on-warning-400--subdued--UNSAFE: #303011;
// --text-on-warning-400--vivid: #313100;
// --text-on-warning-400--vivid-subdued--UNSAFE: #494a04;

// /* WARNING 500 ***************************************************************** */
// --color-warning-500: #767900;

type TextOnWarning500 = TextCommon & {
  on: 'warning-500'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-500: #ffffff;
// --text-on-warning-500--subdued--UNSAFE: #dfdcc1;
// --text-on-warning-500--vivid: #fffce2;
// --text-on-warning-500--vivid-subdued--UNSAFE: #dedaac;

// /* WARNING 600 ***************************************************************** */
// --color-warning-600: #5e6000;

type TextOnWarning600 = TextCommon & {
  on: 'warning-600'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-600: #ffffff;
// --text-on-warning-600--subdued--UNSAFE: #d7d5be;
// --text-on-warning-600--vivid: #dade00;
// --text-on-warning-600--vivid-subdued--UNSAFE: #b9bd00;

// /* WARNING 700 ***************************************************************** */
// --color-warning-700: #414300;

type TextOnWarning700 = TextCommon & {
  on: 'warning-700'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-700: #ffffff;
// --text-on-warning-700--subdued: #ceccbb;
// --text-on-warning-700--vivid: #afb300;
// --text-on-warning-700--vivid-subdued--UNSAFE: #929500;

// /* WARNING 800 ***************************************************************** */
// --color-warning-800: #282700;

type TextOnWarning800 = TextCommon & {
  on: 'warning-800'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-800: #ffffff;
// --text-on-warning-800--subdued: #c5c3b9;
// --text-on-warning-800--vivid: #8f9100;
// --text-on-warning-800--vivid-subdued--UNSAFE: #737505;

// /* WARNING 900 ***************************************************************** */
// --color-warning-900: #131100;

type TextOnWarning900 = TextCommon & {
  on: 'warning-900'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-900: #ffffff;
// --text-on-warning-900--subdued: #bdbcb9;
// --text-on-warning-900--vivid: #7f8100;
// --text-on-warning-900--vivid-subdued--UNSAFE: #62620a;

type TextOnWarningLighter = TextCommon & {
  on: 'warning-lighter'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-lighter
// --text-on-warning-lighter--subdued--UNSAFE
// --text-on-warning-lighter--vivid
// --text-on-warning-lighter--vivid-subdued--UNSAFE

type TextOnWarning = TextCommon & {
  on: 'warning'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning
// --text-on-warning--subdued--UNSAFE
// --text-on-warning--vivid
// --text-on-warning--vivid-subdued--UNSAFE

type TextOnWarningDarker = TextCommon & {
  on: 'warning'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-warning-darker
// --text-on-warning-darker--subdued--UNSAFE
// --text-on-warning-darker--vivid
// --text-on-warning-darker--vivid-subdued--UNSAFE

// --color-warning-lighter: var(--color-warning-400);
// --color-warning: var(--color-warning-500);
// --color-warning-darker: var(--color-warning-600);
// --text-on-warning-lighter: var(--text-on-warning-400);
// --text-on-warning-lighter--subdued--UNSAFE: var(
//   --text-on-warning-400--subdued--UNSAFE
// );
// --text-on-warning-lighter--vivid: var(--text-on-warning-400--vivid);
// --text-on-warning-lighter--vivid-subdued--UNSAFE: var(
//   --text-on-warning-400--vivid-subdued--UNSAFE
// );
// --text-on-warning: var(--text-on-warning-500);
// --text-on-warning--subdued--UNSAFE: var(--text-on-warning-500--subdued--UNSAFE);
// --text-on-warning--vivid: var(--text-on-warning-500--vivid);
// --text-on-warning--vivid-subdued--UNSAFE: var(
//   --text-on-warning-500--vivid-subdued--UNSAFE
// );
// --text-on-warning-darker: var(--text-on-warning-600);
// --text-on-warning-darker--subdued--UNSAFE: var(
//   --text-on-warning-600--subdued--UNSAFE
// );
// --text-on-warning-darker--vivid: var(--text-on-warning-600--vivid);
// --text-on-warning-darker--vivid-subdued--UNSAFE: var(
//   --text-on-warning-600--vivid-subdued--UNSAFE
// );

// /* DANGER 050 ****************************************************************** */

// --color-danger-050: #fff4f2;

type TextOnDanger050 = TextCommon & {
  on: 'danger-050'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-050: #190e0c;
// --text-on-danger-050--subdued: #4a403e;
// --text-on-danger-050--vivid: #e20028;
// --text-on-danger-050--vivid-subdued--UNSAFE: #f26055;

// /* DANGER 100 ****************************************************************** */

// --color-danger-100: #ffe2dd;

type TextOnDanger100 = TextCommon & {
  on: 'danger-100'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-100: #190e0c;
// --text-on-danger-100--subdued: #4a3c3a;
// --text-on-danger-100--vivid: #d30024;
// --text-on-danger-100--vivid-subdued--UNSAFE: #e5574e;

// /* DANGER 200 ****************************************************************** */

// --color-danger-200: #ffc7bf;

type TextOnDanger200 = TextCommon & {
  on: 'danger-200'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-200: #190e0c;
// --text-on-danger-200--subdued: #493734;
// --text-on-danger-200--vivid: #bb001f;
// --text-on-danger-200--vivid-subdued--UNSAFE: #d14a44;

// /* DANGER 300 ****************************************************************** */

// --color-danger-300: #ff9b8f;

type TextOnDanger300 = TextCommon & {
  on: 'danger-300'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-300: #190e0c;
// --text-on-danger-300--subdued--UNSAFE: #4a2e2b;
// --text-on-danger-300--vivid: #950016;
// --text-on-danger-300--vivid-subdued--UNSAFE: #b13532;

// /* DANGER 400 ****************************************************************** */

// --color-danger-400: #ff6057;

type TextOnDanger400 = TextCommon & {
  on: 'danger-400'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-400: #190e0c;
// --text-on-danger-400--subdued--UNSAFE: #4b231f;
// --text-on-danger-400--vivid: #66000a;
// --text-on-danger-400--vivid-subdued--UNSAFE: #8a1a1d;

// /* DANGER 500 ****************************************************************** */

// --color-danger-500: #e90029;

type TextOnDanger500 = TextCommon & {
  on: 'danger-500'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-500: #ffffff;
// --text-on-danger-500--subdued--UNSAFE: #ffcdc5;
// --text-on-danger-500--vivid: #fffaf9;
// --text-on-danger-500--vivid-subdued--UNSAFE: #ffcabf;

// /* DANGER 600 ****************************************************************** */

// --color-danger-600: #bb001f;

type TextOnDanger600 = TextCommon & {
  on: 'danger-600'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-600: #ffffff;
// --text-on-danger-600--subdued--UNSAFE: #f9c9c2;
// --text-on-danger-600--vivid: #ffcac2;
// --text-on-danger-600--vivid-subdued--UNSAFE: #f3a196;

// /* DANGER 700 ****************************************************************** */

// --color-danger-700: #860013;

type TextOnDanger700 = TextCommon & {
  on: 'danger-700'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-700: #ffffff;
// --text-on-danger-700--subdued: #e9c3bd;
// --text-on-danger-700--vivid: #ff8b7e;
// --text-on-danger-700--vivid-subdued--UNSAFE: #e16c61;

// /* DANGER 800 ****************************************************************** */

// --color-danger-800: #540002;

type TextOnDanger800 = TextCommon & {
  on: 'danger-800'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-800: #ffffff;
// --text-on-danger-800--subdued: #d8bdb9;
// --text-on-danger-800--vivid: #ff4645;
// --text-on-danger-800--vivid-subdued--UNSAFE: #d13434;

// /* DANGER 900 ****************************************************************** */

// --color-danger-900: #240800;

type TextOnDanger900 = TextCommon & {
  on: 'danger-900'
  kind?: 'subdued' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-900: #ffffff;
// --text-on-danger-900--subdued: #c3bab9;
// --text-on-danger-900--vivid: #fa002d;
// --text-on-danger-900--vivid-subdued--UNSAFE: #be1323;

type TextOnDangerLighter = TextCommon & {
  on: 'danger-lighter'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-lighter
// --text-on-danger-lighter--subdued--UNSAFE
// --text-on-danger-lighter--vivid
// --text-on-danger-lighter--vivid-subdued--UNSAFE

type TextOnDanger = TextCommon & {
  on: 'danger'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger
// --text-on-danger--subdued--UNSAFE
// --text-on-danger--vivid
// --text-on-danger--vivid-subdued--UNSAFE

type TextOnDangerDarker = TextCommon & {
  on: 'danger-darker'
  kind?: 'subdued--UNSAFE' | 'vivid' | 'vivid-subdued--UNSAFE'
}

// --text-on-danger-darker
// --text-on-danger-darker--subdued--UNSAFE
// --text-on-danger-darker--vivid
// --text-on-danger-darker--vivid-subdued--UNSAFE

// --color-danger-lighter: var(--color-danger-400);
// --color-danger: var(--color-danger-500);
// --color-danger-darker: var(--color-danger-600);
// --text-on-danger-lighter: var(--text-on-danger-400);
// --text-on-danger-lighter--subdued--UNSAFE: var(
//   --text-on-danger-400--subdued--UNSAFE
// );
// --text-on-danger-lighter--vivid: var(--text-on-danger-400--vivid);
// --text-on-danger-lighter--vivid-subdued--UNSAFE: var(
//   --text-on-danger-400--vivid-subdued--UNSAFE
// );
// --text-on-danger: var(--text-on-danger-500);
// --text-on-danger--subdued--UNSAFE: var(--text-on-danger-500--subdued--UNSAFE);
// --text-on-danger--vivid: var(--text-on-danger-500--vivid);
// --text-on-danger--vivid-subdued--UNSAFE: var(
//   --text-on-danger-500--vivid-subdued--UNSAFE
// );
// --text-on-danger-darker: var(--text-on-danger-600);
// --text-on-danger-darker--subdued--UNSAFE: var(
//   --text-on-danger-600--subdued--UNSAFE
// );
// --text-on-danger-darker--vivid: var(--text-on-danger-600--vivid);
// --text-on-danger-darker--vivid-subdued--UNSAFE: var(
//   --text-on-danger-600--vivid-subdued--UNSAFE
// );
