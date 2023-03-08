let osc, gain, pan, ampEnv, img, shadowImg, coinSynth, shadowSynth;

function preload() {
  img = createImg('js/images/sonic.gif', 'sonic');
  shadowImg = createImg('js/images/shadow.gif', 'shadow');
  coinSynth = new Tone.MetalSynth({
    frequency: 100,
    envelope: {
      attack: 0.005,
      decay: 0.1,
      release: 0.05
    },
    harmonicity: 5,
    modulationIndex: 10,
    resonance: 5000,
    octaves: 1.5
  }).toDestination();
  shadowSynth = new Tone.MetalSynth({
    frequency: 100,
    envelope: {
      attack: 0.01,
      decay: 0.2,
      release: 0.05
    },
    harmonicity: 3,
    modulationIndex: 10,
    resonance: 5000,
    octaves: 0.5
  }).toDestination();
}

function setup() {
  createCanvas(600, 400);
  

  osc = new Tone.AMOscillator(600, 'sine', 'sine').start();
  gain = new Tone.Gain().toDestination();
  pan = new Tone.Panner().connect(gain);
  ampEnv = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.8
  }).connect(pan);
  osc.connect(ampEnv);

 
  img.position(width/4 - img.width/2, height/2 - img.height/2);
  shadowImg.position(width*3/5 - shadowImg.width/2, height/2 - shadowImg.height/2);
}

function draw() {
  background(255,100,255);
  textAlign(CENTER);
  textSize(20);
  text("Press sonic to hear a sound", width/2, 30);
  text("Press shadow to hear a sound", width/2, 60);
}


function mousePressed() {

  if (mouseX >= img.position().x && mouseX <= img.position().x + img.width &&
    mouseY >= img.position().y && mouseY <= img.position().y + img.height) {
    ampEnv.triggerAttack();
    coinSynth.triggerAttackRelease('8n');
  } else if (mouseX >= shadowImg.position().x && mouseX <= shadowImg.position().x + shadowImg.width &&
    mouseY >= shadowImg.position().y && mouseY <= shadowImg.position().y + shadowImg.height) {
    shadowSynth.triggerAttackRelease('8n');
  }
}

function mouseReleased() {
  ampEnv.triggerRelease();
}
