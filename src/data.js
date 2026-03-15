export const GENRE_DATA = {
  hipHop: {
    label: 'Hip-Hop',
    flavorGenres: ['Boom Bap', 'Trap Soul', 'Jazz Rap', 'Drill', 'Cloud Rap', 'Experimental Hip-Hop'],
    bpmRanges: [
      [68, 78],
      [82, 96],
      [130, 150]
    ],
    scales: ['Natural Minor', 'Dorian', 'Phrygian', 'Harmonic Minor'],
    instrumentationPalettes: [
      ['808 Sub', 'Dusty Kick', 'Snappy Snare', 'Lo-Fi Electric Piano', 'Vinyl Texture'],
      ['Gliding Bass', 'Punchy Kick', 'Wide Pad', 'Bell Lead', 'Perc Loop'],
      ['Filtered Sample Chop', 'Tight Hat Roll', 'Rim Click', 'Moody Keys', 'Reverse FX']
    ],
    signatureSounds: [
      'Pitch-warped vocal fragments',
      'Detuned bell lead with tape wobble',
      'Soul sample chops through vinyl saturation',
      'Dark sub drops with filtered transitions'
    ],
    energyFeels: ['Smoky', 'Aggressive', 'Late-Night', 'Confident', 'Brooding', 'Bouncy']
  },
  pop: {
    label: 'Pop',
    flavorGenres: ['Dance Pop', 'Synth Pop', 'Indie Pop', 'Electro Pop', 'Dream Pop'],
    bpmRanges: [
      [96, 110],
      [112, 124],
      [126, 132]
    ],
    scales: ['Major', 'Minor', 'Mixolydian', 'Lydian'],
    instrumentationPalettes: [
      ['Bright Piano', 'Punchy Drums', 'Pluck Synth', 'Wide Bass', 'Airy Pad'],
      ['Palm-Muted Guitar', 'Clap Stack', 'Shimmer Synth', 'Sub Bass', 'Pop FX'],
      ['Glass Keys', 'Four-On-The-Floor Kick', 'Hook Lead', 'Vocal Chop Texture', 'Stereo Percussion']
    ],
    signatureSounds: [
      'Huge glossy chorus lead',
      'Stacked claps with sparkling top end',
      'Earworm pluck hook with sidechain pulse',
      'Polished vocal-like synth stabs'
    ],
    energyFeels: ['Uplifting', 'Radiant', 'Flirty', 'Anthemic', 'Punchy', 'Hopeful']
  },
  rock: {
    label: 'Rock',
    flavorGenres: ['Alt Rock', 'Indie Rock', 'Arena Rock', 'Pop Rock', 'Garage Rock'],
    bpmRanges: [
      [88, 104],
      [108, 124],
      [126, 144]
    ],
    scales: ['Minor Pentatonic', 'Natural Minor', 'Major', 'Dorian'],
    instrumentationPalettes: [
      ['Crunch Rhythm Guitar', 'Live Kit', 'Electric Bass', 'Ambient Guitar Layer', 'Room Reverb'],
      ['Overdriven Guitar', 'Big Snare', 'Octave Bass', 'Organ Pad', 'Feedback FX'],
      ['Clean Guitar Arpeggio', 'Punchy Drums', 'Fuzz Lead', 'Subtle Synth Bed', 'Tambourine']
    ],
    signatureSounds: [
      'Wide guitar wall with gritty center tone',
      'Arena-sized snare smack',
      'Feedback swells into hook riffs',
      'Dirty bass under soaring guitars'
    ],
    energyFeels: ['Defiant', 'Driving', 'Raw', 'Explosive', 'Restless', 'Triumphant']
  },
  edm: {
    label: 'EDM',
    flavorGenres: ['Future Bass', 'House', 'Melodic Dubstep', 'Progressive House', 'Dancefloor'],
    bpmRanges: [
      [120, 126],
      [128, 132],
      [140, 150]
    ],
    scales: ['Minor', 'Major', 'Phrygian', 'Dorian'],
    instrumentationPalettes: [
      ['Supersaw Stack', 'Sidechained Chords', 'Club Kick', 'Sub Bass', 'Impact FX'],
      ['Pluck Arp', 'Four-On-The-Floor Drums', 'Reese Bass', 'Noise Risers', 'Vocal Chop'],
      ['Future Bass Chords', 'Snare Build', 'Detuned Lead', 'Glitter Top Synth', 'Low-End Drop']
    ],
    signatureSounds: [
      'Massive supersaw drop',
      'Sidechained shimmer chords',
      'Cinematic riser into explosive release',
      'Vocal chop hook with stereo motion'
    ],
    energyFeels: ['Euphoric', 'Explosive', 'Festival-Ready', 'Cinematic', 'Adrenaline', 'Glowing']
  },
  cinematic: {
    label: 'Cinematic',
    flavorGenres: ['Trailer', 'Hybrid Orchestral', 'Dark Ambient', 'Epic Drama', 'Sci-Fi Score'],
    bpmRanges: [
      [70, 90],
      [92, 110],
      [112, 132]
    ],
    scales: ['Natural Minor', 'Harmonic Minor', 'Phrygian', 'Dorian'],
    instrumentationPalettes: [
      ['Low Strings', 'Braam Hits', 'Taiko Drums', 'Pulsing Synth', 'Choir Pad'],
      ['Piano Motif', 'String Ostinato', 'Sub Boom', 'Cinematic Percussion', 'Atmosphere Texture'],
      ['Cello Pulse', 'Granular Pad', 'Epic Drums', 'Brass Stabs', 'Reverse Impacts']
    ],
    signatureSounds: [
      'Thunderous braam accents',
      'Tension-building string ostinato',
      'Huge trailer percussion with dark low end',
      'Haunting piano against massive impacts'
    ],
    energyFeels: ['Tense', 'Epic', 'Brooding', 'Heroic', 'Mysterious', 'Cataclysmic']
  }
};
