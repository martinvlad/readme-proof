# README Proof native walkthrough

Editable native Higgsedit composition: `edit.jsx`.

Output: 28 seconds, 1920×1080, 30 fps, H.264 video and AAC instrumental audio.
The UI footage and GitHub target screenshot are actual captures of the published application. The npm panel reports one error, one warning and two commands; the GitHub panel reports zero errors, one warning and two commands. No README command runs during the capture or composition.

## Inputs

Download these into the directory containing `edit.jsx`:

* `input-ui.mp4`: https://github.com/ruvnet/readme-proof/releases/download/v0.1.0-next.0/readme-proof-walkthrough.mp4
* `input-github.png`: https://github.com/ruvnet/readme-proof/releases/download/v0.1.0-next.0/readme-proof-github.png
* `music.mp3`: https://v3b.fal.media/files/b/0aadfb32/MDLHwCIr0qJJD-H3fNZkj_music_generated.mp3

The soundtrack was generated using fal `elevenlabs/music/v2.5`. Native graphics and editing use Higgsedit. A separate Cognitum narration asset was generated but is not included in this cut.

## Reproduce

```sh
higgsedit build edit.jsx
ffmpeg -i readme-proof-walkthrough/renders/silent.mp4 -i music.mp3 -filter_complex '[1:a]atempo=0.8,volume=0.5,afade=t=in:st=0:d=0.5,afade=t=out:st=25:d=3[a]' -map 0:v -map '[a]' -c:v copy -c:a aac -b:a 192k -t 28 -movflags +faststart readme-proof-demo.mp4
```

The build also renders thumbnail, three gallery images, and a dedicated 240×240 icon. The transcript labels are editable native text; there are no synthesized interface screens.

## Verification

Native render completed for all 840 frames. ffprobe verified 28.000 seconds, 1920×1080, H.264 plus AAC. The final file is 2,085,541 bytes. Thumbnail, icon and GitHub comparison gallery image were inspected visually. Audio presence is verified by stream inspection. Mean level is -21.7 dB and peak is -7.3 dB; silence detection found no interval below -45 dB lasting at least one second. Human listening review remains outstanding. Final SHA256: `7c352c4c3f18a89f8aff5f761c3c13b5f2051fecc2252be8423ce32ae9762c08`.

The public upload receipt is `199203bf-3c26-43e3-a90b-bb8a22d22d51`; final project distribution should use the repository release assets. Product Hunt remains draft.
