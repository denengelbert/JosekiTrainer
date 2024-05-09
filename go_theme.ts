
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

export const lea_theme: CustomThemeConfig = {
    name: 'lea',
    properties: {

				// =~= Theme Properties =~=
				"--theme-font-family-base": `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
				"--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
				"--theme-font-color-base": "0 0 0",
				"--theme-font-color-dark": "0 0 0",
				"--theme-rounded-base": "6px",
				"--theme-rounded-container": "4px",
				"--theme-border-base": "1px",
				// =~= Theme On-X Colors =~=
				"--on-primary": "255 255 255",
				"--on-secondary": "255 255 255",
				"--on-tertiary": "0 0 0",
				"--on-success": "0 0 0",
				"--on-warning": "0 0 0",
				"--on-error": "255 255 255",
				"--on-surface": "0 0 0",
				// =~= Theme Colors  =~=
				// primary | #584c78 
				"--color-primary-50": "230 228 235", // #e6e4eb
				"--color-primary-100": "222 219 228", // #dedbe4
				"--color-primary-200": "213 210 221", // #d5d2dd
				"--color-primary-300": "188 183 201", // #bcb7c9
				"--color-primary-400": "138 130 161", // #8a82a1
				"--color-primary-500": "88 76 120", // #584c78
				"--color-primary-600": "79 68 108", // #4f446c
				"--color-primary-700": "66 57 90", // #42395a
				"--color-primary-800": "53 46 72", // #352e48
				"--color-primary-900": "43 37 59", // #2b253b
				// secondary | #351f7e 
				"--color-secondary-50": "225 221 236", // #e1ddec
				"--color-secondary-100": "215 210 229", // #d7d2e5
				"--color-secondary-200": "205 199 223", // #cdc7df
				"--color-secondary-300": "174 165 203", // #aea5cb
				"--color-secondary-400": "114 98 165", // #7262a5
				"--color-secondary-500": "53 31 126", // #351f7e
				"--color-secondary-600": "48 28 113", // #301c71
				"--color-secondary-700": "40 23 95", // #28175f
				"--color-secondary-800": "32 19 76", // #20134c
				"--color-secondary-900": "26 15 62", // #1a0f3e
				// tertiary | #268ffb 
				"--color-tertiary-50": "222 238 254", // #deeefe
				"--color-tertiary-100": "212 233 254", // #d4e9fe
				"--color-tertiary-200": "201 227 254", // #c9e3fe
				"--color-tertiary-300": "168 210 253", // #a8d2fd
				"--color-tertiary-400": "103 177 252", // #67b1fc
				"--color-tertiary-500": "38 143 251", // #268ffb
				"--color-tertiary-600": "34 129 226", // #2281e2
				"--color-tertiary-700": "29 107 188", // #1d6bbc
				"--color-tertiary-800": "23 86 151", // #175697
				"--color-tertiary-900": "19 70 123", // #13467b
				// success | #18cb16 
				"--color-success-50": "220 247 220", // #dcf7dc
				"--color-success-100": "209 245 208", // #d1f5d0
				"--color-success-200": "197 242 197", // #c5f2c5
				"--color-success-300": "163 234 162", // #a3eaa2
				"--color-success-400": "93 219 92", // #5ddb5c
				"--color-success-500": "24 203 22", // #18cb16
				"--color-success-600": "22 183 20", // #16b714
				"--color-success-700": "18 152 17", // #129811
				"--color-success-800": "14 122 13", // #0e7a0d
				"--color-success-900": "12 99 11", // #0c630b
				// warning | #f5c211 
				"--color-warning-50": "254 246 219", // #fef6db
				"--color-warning-100": "253 243 207", // #fdf3cf
				"--color-warning-200": "253 240 196", // #fdf0c4
				"--color-warning-300": "251 231 160", // #fbe7a0
				"--color-warning-400": "248 212 88", // #f8d458
				"--color-warning-500": "245 194 17", // #f5c211
				"--color-warning-600": "221 175 15", // #ddaf0f
				"--color-warning-700": "184 146 13", // #b8920d
				"--color-warning-800": "147 116 10", // #93740a
				"--color-warning-900": "120 95 8", // #785f08
				// error | #b50423 
				"--color-error-50": "244 217 222", // #f4d9de
				"--color-error-100": "240 205 211", // #f0cdd3
				"--color-error-200": "237 192 200", // #edc0c8
				"--color-error-300": "225 155 167", // #e19ba7
				"--color-error-400": "203 79 101", // #cb4f65
				"--color-error-500": "181 4 35", // #b50423
				"--color-error-600": "163 4 32", // #a30420
				"--color-error-700": "136 3 26", // #88031a
				"--color-error-800": "109 2 21", // #6d0215
				"--color-error-900": "89 2 17", // #590211
				// surface | #8fa8db 
				"--color-surface-50": "238 242 250", // #eef2fa
				"--color-surface-100": "233 238 248", // #e9eef8
				"--color-surface-200": "227 233 246", // #e3e9f6
				"--color-surface-300": "210 220 241", // #d2dcf1
				"--color-surface-400": "177 194 230", // #b1c2e6
				"--color-surface-500": "143 168 219", // #8fa8db
				"--color-surface-600": "129 151 197", // #8197c5
				"--color-surface-700": "107 126 164", // #6b7ea4
				"--color-surface-800": "86 101 131", // #566583
				"--color-surface-900": "70 82 107", // #46526b
				
			}
		}