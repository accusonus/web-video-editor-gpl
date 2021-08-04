let settings = {};

// Footer Env Variables
settings.PATH = {
  terms: process.env.NEXT_PUBLIC_PATH_TERMS === undefined ? '' : process.env.NEXT_PUBLIC_PATH_TERMS,
  policy: process.env.NEXT_PUBLIC_PATH_POLICY === undefined ? '' : process.env.NEXT_PUBLIC_PATH_POLICY,
  patents: process.env.NEXT_PUBLIC_PATH_PATENTS === undefined ? '' : process.env.NEXT_PUBLIC_PATH_PATENTS,
  source: 'https://github.com/accusonus/web-video-editor-gpl',
};

settings.MAIN_MENU_ACCUSONUS_LOGO = {
  url: process.env.NEXT_PUBLIC_ACCUSONUS_URL === undefined ? '' : process.env.NEXT_PUBLIC_ACCUSONUS_URL,
  title: 'Accusonus - Audio and Video Editing Software For Creators',
};

// Various Minor
settings.FOOTER = {
  terms: 'Terms of use',
  policy: 'Privacy Policy',
  patents: 'Patents',
  source: 'Get Source Code',
};

// Metadata
settings.METADATA_DESCRIPTION = 'This online video cutter works for free with no watermark! Cut any video file such us MP4, WebM, AVI, MPEG, FLV, MOV, 3GP directly in your browser.';

export default settings;
