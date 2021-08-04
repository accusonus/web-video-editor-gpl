import {
  formatSizeWithUnits, 
  returnFileName
} from './';
  
describe('various', () => {
  it('formatSizeWithUnits works as expected', () => {
    // bytes are undefined or null
    expect(formatSizeWithUnits(undefined)).toBe(null);
    expect(formatSizeWithUnits(null)).toBe(null);
    
    // various use cases
    expect(formatSizeWithUnits('435')).toBe('435 bytes');
    expect(formatSizeWithUnits('3398')).toBe('3.32 KB');
    expect(formatSizeWithUnits('490398')).toBe('479 KB');
    expect(formatSizeWithUnits('6544528')).toBe('6.24 MB');
    expect(formatSizeWithUnits('23483023')).toBe('22 MB');
    expect(formatSizeWithUnits('3984578493')).toBe('3.71 GB');
    expect(formatSizeWithUnits('30498505889')).toBe('28 GB');
    expect(formatSizeWithUnits('9485039485039445')).toBe('8.42 PB');
  });

  it('returnFileName works as expected', () => {
    // file name undefined or null
    expect(returnFileName(undefined)).toBe(null);
    expect(returnFileName(null)).toBe(null);

    // file name is < 24 characters
    expect(returnFileName('trimmed-video.mov')).toBe('trimmed-video.mov');

    // file name is > 24 character
    expect(returnFileName('trimmed-videoismorethantwentycharacters.mov')).toBe('trimmed-videoismoret.mov');
    expect(returnFileName('trimmed-videoismorethantwentycharacters.mp4')).toBe('trimmed-videoismoret.mp4');
    expect(returnFileName('trimmed-video.ismorethantwentycharacters.mp4')).toBe('trimmed-video.ismore.mp4');

    // file name is <= 24 characters and no extension is given
    expect(returnFileName('trimmed-myvideo')).toBe('trimmed-myvideo');
    // file name is > 24 characters and no extension is given
    expect(returnFileName('trimmed-myvideovideoismorethantwentycharacters')).toBe('trimmed-myvideovideoismo');
    expect(returnFileName('trimmed-video.ismorethantwentycharacters')).toBe('trimmed-video.ismorethan');
  });
});
