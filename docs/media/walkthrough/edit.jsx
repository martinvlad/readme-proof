/** Native Higgsedit walkthrough. Inputs must be real captured UI, never generated UI.
 * Run from directory containing input-ui.mp4. Output relative to project directory.
 * Audio is mixed after native rendering using the companion reproducible recipe.
 */
export default async ({ project }) => {
  const p=await project({dir:'readme-proof-walkthrough',size:'1920x1080',fps:30,background:'#0b101b'});
  const footage=await p.add('../input-ui.mp4');
  const github=await p.add('../input-github.png');
  const scenes=[];
  const compose=(node,{at=0,dur,name})=>scenes.push(<frame name={name} at={at} duration={dur} width={1920} height={1080} layout="none">{node}</frame>);
  const enter=[{property:'opacity',from:0,to:1,duration:0.4},{property:'offsetY',from:26,to:0,duration:0.5,easing:'ease-out'}];
  compose(<frame width={1920} height={1080} layout="none">
    <rect x={92} y={88} width={14} height={850} fill="#baff55" animate={[{property:'scaleY',from:0,to:1,duration:0.6}]}/>
    <text x={144} y={106} width={1400} height={60} fontFamily="Montserrat" fontSize={30} color="#baff55" letterSpacing={7}>README PROOF</text>
    <text x={144} y={325} width={1580} height={240} fontFamily="Montserrat" fontWeight={700} fontSize={108} color="#ffffff" animate={enter}>Your first run.{"\n"}Checked before release.</text>
    <text x={150} y={748} width={1450} height={80} fontFamily="Montserrat" fontSize={39} color="#b9c5d8">Static README checks. Real product footage.</text>
  </frame>,{at:0,dur:3,name:'Opening'});
  compose(<frame width={1920} height={1080} layout="none">
    <text x={96} y={32} width={1150} height={55} fontFamily="Montserrat" fontWeight={700} fontSize={30} color="#ffffff">README PROOF</text>
    <text x={1400} y={35} width={430} height={45} fontFamily="Montserrat" fontSize={21} color="#baff55" align="right">ACTUAL APP WALKTHROUGH</text>
    <rect x={75} y={112} width={1770} height={860} fill="#192334" radius={18}/>
    <media file={footage} x={85} y={122} width={1750} height={840} fit="contain" trimStart={0} muted={true}/>
    <rect x={85} y={999} width={1750} height={3} fill="#243043"/>
    <rect x={85} y={999} width={1750} height={3} fill="#baff55" animate={[{property:'scaleX',from:0,to:1,duration:19,easing:'linear'}]}/>
  </frame>,{at:3,dur:19,name:'Actual interface'});
  compose(<media file={github} x={85} y={122} width={1750} height={840} fit="contain"/>,{at:15,dur:7,name:'Actual GitHub target screenshot'});
  const labels=[['01 / INSPECT','Paste or open your README.',3,5],['02 / REVIEW','Find broken image paths and risky commands.',8,7],['03 / COMPARE TARGETS','Switch npm and GitHub checks. Export JSON evidence.',15,7]];
  for(const [tag,label,at,dur] of labels)compose(<frame width={1920} height={1080} layout="none"><rect x={96} y={1022} width={1700} height={50} fill="#0b101b"/><text x={96} y={1028} width={330} height={40} fontFamily="Montserrat" fontSize={21} fontWeight={700} color="#baff55">{tag}</text><text x={430} y={1028} width={1350} height={40} fontFamily="Montserrat" fontSize={23} color="#ffffff">{label}</text></frame>,{at,dur,name:tag});
  compose(<frame width={1920} height={1080} layout="none">
    <rect x={94} y={118} width={88} height={88} radius={18} fill="#baff55"/><text x={110} y={128} width={70} height={80} fontFamily="Montserrat" fontWeight={700} fontSize={48} color="#0b101b">R</text><path x={140} y={166} d="M0 8 L9 17 L26 0" width={29} height={22} stroke={{color:'#ffffff',width:5,cap:'round'}}/>
    <text x={96} y={294} width={1700} height={130} fontFamily="Montserrat" fontWeight={700} fontSize={86} color="#ffffff" animate={enter}>Make the first run count.</text>
    <rect x={96} y={492} width={1720} height={130} radius={18} fill="#172133"/>
    <text x={136} y={524} width={1640} height={74} fontFamily="Montserrat" fontSize={39} color="#baff55">npx readme-proof@next analyze README.md</text>
    <text x={100} y={715} width={1660} height={80} fontFamily="Montserrat" fontSize={35} color="#c8d2e2">CLI  /  Browser UI  /  MCP  /  Portable RVF evidence</text>
    <text x={100} y={905} width={1660} height={60} fontFamily="Montserrat" fontSize={30} color="#ffffff">github.com/ruvnet/readme-proof</text>
  </frame>,{at:22,dur:6,name:'Install and review'});
  p.compose(scenes,{at:0,dur:28,name:'Complete walkthrough'});
  await p.frame(8,'renders/thumbnail.png');
  await p.frame(6,'renders/gallery-inspect.png');
  await p.frame(13,'renders/gallery-review.png');
  await p.frame(19,'renders/gallery-evidence.png');
  const icon=await project({dir:'readme-proof-icon',size:'240x240',fps:30,background:'#0b101b'});
  icon.compose(<frame width={240} height={240} layout="none"><rect x={20} y={20} width={200} height={200} radius={40} fill="#baff55"/><text x={51} y={47} width={142} height={152} fontFamily="Montserrat" fontSize={120} fontWeight={700} color="#0b101b">R</text><path x={137} y={142} d="M0 20 L18 38 L52 0" width={60} height={48} stroke={{color:'#ffffff',width:12,cap:'round'}}/></frame>,{dur:1});
  await icon.frame(0,'renders/icon.png');
  await p.render('renders/silent.mp4',{depth:8,bitrate:8000000,concurrency:2,shards:2});
};
