
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const go_theme: CustomThemeConfig = {
    name: 'go_theme',
    properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "4px",
		"--theme-border-base": "0px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "255 255 255",
		"--on-tertiary": "255 255 255",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "255 255 255",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #16abee 
		"--color-primary-50": "220 242 252", // #dcf2fc
		"--color-primary-100": "208 238 252", // #d0eefc
		"--color-primary-200": "197 234 251", // #c5eafb
		"--color-primary-300": "162 221 248", // #a2ddf8
		"--color-primary-400": "92 196 243", // #5cc4f3
		"--color-primary-500": "22 171 238", // #16abee
		"--color-primary-600": "20 154 214", // #149ad6
		"--color-primary-700": "17 128 179", // #1180b3
		"--color-primary-800": "13 103 143", // #0d678f
		"--color-primary-900": "11 84 117", // #0b5475
		// secondary | #2c236f 
		"--color-secondary-50": "223 222 233", // #dfdee9
		"--color-secondary-100": "213 211 226", // #d5d3e2
		"--color-secondary-200": "202 200 219", // #cac8db
		"--color-secondary-300": "171 167 197", // #aba7c5
		"--color-secondary-400": "107 101 154", // #6b659a
		"--color-secondary-500": "44 35 111", // #2c236f
		"--color-secondary-600": "40 32 100", // #282064
		"--color-secondary-700": "33 26 83", // #211a53
		"--color-secondary-800": "26 21 67", // #1a1543
		"--color-secondary-900": "22 17 54", // #161136
		// tertiary | #574176 
		"--color-tertiary-50": "230 227 234", // #e6e3ea
		"--color-tertiary-100": "221 217 228", // #ddd9e4
		"--color-tertiary-200": "213 208 221", // #d5d0dd
		"--color-tertiary-300": "188 179 200", // #bcb3c8
		"--color-tertiary-400": "137 122 159", // #897a9f
		"--color-tertiary-500": "87 65 118", // #574176
		"--color-tertiary-600": "78 59 106", // #4e3b6a
		"--color-tertiary-700": "65 49 89", // #413159
		"--color-tertiary-800": "52 39 71", // #342747
		"--color-tertiary-900": "43 32 58", // #2b203a
		// success | #64b43d 
		"--color-success-50": "232 244 226", // #e8f4e2
		"--color-success-100": "224 240 216", // #e0f0d8
		"--color-success-200": "216 236 207", // #d8eccf
		"--color-success-300": "193 225 177", // #c1e1b1
		"--color-success-400": "147 203 119", // #93cb77
		"--color-success-500": "100 180 61", // #64b43d
		"--color-success-600": "90 162 55", // #5aa237
		"--color-success-700": "75 135 46", // #4b872e
		"--color-success-800": "60 108 37", // #3c6c25
		"--color-success-900": "49 88 30", // #31581e
		// warning | #7f5f3c 
		"--color-warning-50": "236 231 226", // #ece7e2
		"--color-warning-100": "229 223 216", // #e5dfd8
		"--color-warning-200": "223 215 206", // #dfd7ce
		"--color-warning-300": "204 191 177", // #ccbfb1
		"--color-warning-400": "165 143 119", // #a58f77
		"--color-warning-500": "127 95 60", // #7f5f3c
		"--color-warning-600": "114 86 54", // #725636
		"--color-warning-700": "95 71 45", // #5f472d
		"--color-warning-800": "76 57 36", // #4c3924
		"--color-warning-900": "62 47 29", // #3e2f1d
		// error | #9c2f30 
		"--color-error-50": "240 224 224", // #f0e0e0
		"--color-error-100": "235 213 214", // #ebd5d6
		"--color-error-200": "230 203 203", // #e6cbcb
		"--color-error-300": "215 172 172", // #d7acac
		"--color-error-400": "186 109 110", // #ba6d6e
		"--color-error-500": "156 47 48", // #9c2f30
		"--color-error-600": "140 42 43", // #8c2a2b
		"--color-error-700": "117 35 36", // #752324
		"--color-error-800": "94 28 29", // #5e1c1d
		"--color-error-900": "76 23 24", // #4c1718
		// surface | #3d6197 
		"--color-surface-50": "226 231 239", // #e2e7ef
		"--color-surface-100": "216 223 234", // #d8dfea
		"--color-surface-200": "207 216 229", // #cfd8e5
		"--color-surface-300": "177 192 213", // #b1c0d5
		"--color-surface-400": "119 144 182", // #7790b6
		"--color-surface-500": "61 97 151", // #3d6197
		"--color-surface-600": "55 87 136", // #375788
		"--color-surface-700": "46 73 113", // #2e4971
		"--color-surface-800": "37 58 91", // #253a5b
		"--color-surface-900": "30 48 74", // #1e304a
		
	}
}