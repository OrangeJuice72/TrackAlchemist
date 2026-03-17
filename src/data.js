export const GENRE_DATA = {
  hipHop: {
    label: 'Hip-Hop',
    flavorGenres: [
      'Boom Bap',
      'Jazz Rap',
      'Conscious Rap',
      'Cloud Rap',
      'Drill',
      'Alternative Hip-Hop',
      'Underground Hip-Hop',
      'Southern Hip-Hop',
      'West Coast Hip-Hop',
      'East Coast Hip-Hop',
      'Experimental Hip-Hop',
      'Lo-Fi Hip-Hop'
    ],
    bpmRanges: [[70, 78], [82, 90], [92, 100], [130, 145]],
    scales: ['Natural Minor', 'Dorian', 'Phrygian', 'Harmonic Minor', 'Minor Pentatonic', 'Aeolian'],
    instrumentationPalettes: [
      ['808 Sub', 'Dusty Kick', 'Snappy Snare', 'Rhodes Chords', 'Vinyl Crackle'],
      ['Sample Chop', 'Tight Hats', 'Rim Click', 'Muted Bass', 'Tape Delay FX'],
      ['Warm Keys', 'Pocket Drums', 'Soul Guitar', 'Sub Layer', 'Crowd Texture'],
      ['Filtered Loop', 'Punchy Kick', 'Perc Fills', 'Bell Motif', 'Reverse FX']
    ],
    signatureSounds: [
      'Pitch-shifted soul chops',
      'Dusty drums with neck-snapping swing',
      'Bell lead floating over a deep sub',
      'Layered vocal fragments in the transitions',
      'Filtered intros that slam into full drums',
      'Tape-warped melodic loops'
    ],
    energyFeels: ['Smoky', 'Confident', 'Reflective', 'Streetwise', 'Brooding', 'Focused', 'Laid-Back', 'Bouncy']
  },
  trap: {
    label: 'Trap',
    flavorGenres: ['Melodic Trap', 'Dark Trap', 'Rage', 'Trap Soul'],
    bpmRanges: [[120, 135], [138, 150], [70, 78], [80, 88]],
    scales: ['Natural Minor', 'Phrygian', 'Harmonic Minor', 'Locrian', 'Dorian', 'Minor Pentatonic'],
    instrumentationPalettes: [
      ['808 Glide', 'Stutter Hats', 'Hard Clap', 'Choir Pad', 'Lead Bell'],
      ['Distorted Bass', 'Punch Kick', 'Laser FX', 'Dark Keys', 'Texture Riser'],
      ['Plucked Synth', 'Triplet Hats', 'Snare Rolls', 'Wide Pad', 'Reverse Piano'],
      ['Electric Piano', 'Tight Perc', 'Sub Boom', 'Atmosphere Layer', 'Vocal Chop']
    ],
    signatureSounds: [
      '808 slides that answer the melody',
      'Rapid-fire hat rolls and snare bursts',
      'Menacing choir textures under hard drums',
      'Digital synth leads with clipped distortion',
      'Huge stop-start transitions before the drop',
      'Sparse melodies hanging over massive low end'
    ],
    energyFeels: ['Aggressive', 'Icy', 'Menacing', 'Hypnotic', 'Luxurious', 'Nocturnal', 'Volatile', 'Swaggering']
  },
  rnb: {
    label: 'R&B',
    flavorGenres: ['Alt R&B', 'Contemporary R&B', 'Bedroom R&B', 'Neo-Soul R&B'],
    bpmRanges: [[68, 78], [80, 92], [94, 108], [110, 118]],
    scales: ['Major', 'Natural Minor', 'Dorian', 'Mixolydian', 'Lydian', 'Major Pentatonic'],
    instrumentationPalettes: [
      ['Silky Electric Piano', 'Soft Kick', 'Finger Snaps', 'Warm Sub', 'Air Pad'],
      ['Muted Guitar', 'Loose Drums', 'Analog Bass', 'Velvet Synth', 'Vocal Texture'],
      ['Rhodes Stack', 'Shaker Groove', 'Subby Bass', 'Ambient Chords', 'Reverse Cymbal'],
      ['Moody Keys', 'Tight Snare', 'Pluck Accent', 'Tape Pad', 'Perc Sparkle']
    ],
    signatureSounds: [
      'Breathy chord stacks with room to float',
      'Late-night bass under glossy keys',
      'Filtered vocal textures that feel intimate',
      'Dry drums paired with lush harmony beds',
      'Neo-soul chord voicings with modern punch',
      'Satin-soft synth leads'
    ],
    energyFeels: ['Intimate', 'Sultry', 'Smooth', 'Tender', 'Moody', 'Luxury', 'Romantic', 'Dreamy']
  },
  pop: {
    label: 'Pop',
    flavorGenres: ['Dance Pop', 'Synth Pop', 'Indie Pop', 'Dream Pop'],
    bpmRanges: [[96, 108], [110, 120], [122, 128], [130, 136]],
    scales: ['Major', 'Minor', 'Mixolydian', 'Lydian', 'Major Pentatonic', 'Dorian'],
    instrumentationPalettes: [
      ['Bright Piano', 'Pop Kick', 'Clap Stack', 'Wide Bass', 'Shimmer Pad'],
      ['Palm-Muted Guitar', 'Tight Drums', 'Pluck Hook', 'Sub Bass', 'Ear Candy FX'],
      ['Glass Synth', 'Four-On-The-Floor Kick', 'Stereo Perc', 'Air Vox', 'Hook Lead'],
      ['Chunky Bass', 'Snappy Snare', 'Chord Stabs', 'Delay Throw', 'Sweep FX']
    ],
    signatureSounds: [
      'A hook-first synth line that sticks instantly',
      'Glossy top end with wide claps',
      'Sidechained chorus chords that feel huge',
      'Vocal-like lead stacks driving the chorus',
      'Punchy drums with polished transitions',
      'Sparkling arps tucked behind the topline'
    ],
    energyFeels: ['Uplifting', 'Anthemic', 'Flirty', 'Radiant', 'Punchy', 'Hopeful', 'Confident', 'Feel-Good']
  },
  kpop: {
    label: 'K-Pop',
    flavorGenres: ['Bright K-Pop', 'Dark K-Pop', 'Future Pop K-Pop', 'Bubblegum K-Pop'],
    bpmRanges: [[96, 110], [112, 124], [126, 136], [138, 150]],
    scales: ['Major', 'Minor', 'Dorian', 'Mixolydian', 'Lydian', 'Harmonic Minor'],
    instrumentationPalettes: [
      ['Hybrid Drums', 'Supersaw Layer', 'Sub Bass', 'Pluck Lead', 'FX Hits'],
      ['Tight Kick', 'Snare Stack', 'Chop Vox', 'Bright Synth', 'Riser FX'],
      ['Funky Guitar', 'Pop Drums', 'Bass Synth', 'Chord Stabs', 'Impact Cymbal'],
      ['Digital Plucks', '808 Layer', 'Wide Pad', 'Lead Hook', 'Perc Candy']
    ],
    signatureSounds: [
      'Abrupt section changes that still feel polished',
      'Big hook synths with percussive verses',
      'Cheerful top lines over hard-hitting drums',
      'Cinematic pre-chorus lifts into explosive drops',
      'Glossy vocal chop effects and clean low end',
      'Unexpected beat switches with pop precision'
    ],
    energyFeels: ['Hyper', 'Playful', 'Stylized', 'Bold', 'Shiny', 'Dramatic', 'Hooky', 'Electric']
  },
  rock: {
    label: 'Rock',
    flavorGenres: ['Alt Rock', 'Indie Rock', 'Arena Rock', 'Garage Rock'],
    bpmRanges: [[88, 102], [104, 118], [120, 132], [134, 150]],
    scales: ['Minor Pentatonic', 'Natural Minor', 'Major', 'Dorian', 'Mixolydian', 'Blues Scale'],
    instrumentationPalettes: [
      ['Crunch Guitar', 'Live Kit', 'Electric Bass', 'Room Ambience', 'Tambourine'],
      ['Clean Arpeggio', 'Punch Snare', 'Fuzz Lead', 'Organ Pad', 'Feedback FX'],
      ['Overdriven Rhythm', 'Big Kick', 'Octave Bass', 'Gang Claps', 'Plate Reverb'],
      ['Jangle Guitar', 'Toms', 'Warm Bass', 'Noise Layer', 'Stereo Slapback']
    ],
    signatureSounds: [
      'Wide guitar walls with a gritty center',
      'Big-room snares pushing the chorus',
      'Feedback swells leading into riffs',
      'Tight bass and drums under soaring hooks',
      'Raw amp breakup that keeps the edges alive',
      'Tom-driven builds with live-room energy'
    ],
    energyFeels: ['Defiant', 'Driving', 'Raw', 'Restless', 'Triumphant', 'Explosive', 'Earnest', 'Rebellious']
  },
  metal: {
    label: 'Metal',
    flavorGenres: ['Metalcore', 'Thrash Metal', 'Dj ent', 'Symphonic Metal'],
    bpmRanges: [[90, 110], [120, 140], [145, 170], [175, 210]],
    scales: ['Phrygian', 'Natural Minor', 'Harmonic Minor', 'Locrian', 'Chromatic', 'Phrygian Dominant'],
    instrumentationPalettes: [
      ['Downtuned Guitars', 'Double-Kick Kit', 'Bass Growl', 'Orchestral Layer', 'Cymbal Wash'],
      ['Palm-Muted Riffs', 'Crack Snare', 'Sub Drop', 'Choir Pad', 'Noise Rise'],
      ['Polyrhythm Guitar', 'Punchy Kick', 'Bass Distortion', 'Synth Texture', 'Impact Hit'],
      ['Lead Guitar', 'Floor Toms', 'Drone Layer', 'Reverse FX', 'Tight Room Verb']
    ],
    signatureSounds: [
      'Machine-gun double kicks under brutal riffs',
      'Syncopated chugs locking to the kick pattern',
      'Orchestral swells making the breakdown feel massive',
      'Whiplash tempo shifts into half-time heaviness',
      'Harsh guitar saturation with a precise low end',
      'Huge cymbal blooms around hard stops'
    ],
    energyFeels: ['Ferocious', 'Relentless', 'Apocalyptic', 'Punishing', 'Massive', 'Tense', 'Militant', 'Dark']
  },
  punk: {
    label: 'Punk',
    flavorGenres: ['Pop Punk', 'Skate Punk', 'Post-Punk', 'Hardcore Punk'],
    bpmRanges: [[120, 140], [145, 165], [170, 190], [95, 115]],
    scales: ['Major', 'Natural Minor', 'Mixolydian', 'Minor Pentatonic', 'Dorian', 'Blues Scale'],
    instrumentationPalettes: [
      ['Fast Guitars', 'Live Drums', 'Pick Bass', 'Gang Shouts', 'Room Verb'],
      ['Buzzsaw Chords', 'Snare Drive', 'Octave Bass', 'Feedback Layer', 'Crash Cymbals'],
      ['Chorus Guitar', 'Tight Kick', 'Dark Bass', 'Synth Drone', 'Tape Saturation'],
      ['Muted Verse Guitar', 'Tom Fills', 'Punch Bass', 'Shout FX', 'Spring Reverb']
    ],
    signatureSounds: [
      'Rapid downstroke guitars and urgent drums',
      'Gang-vocal style accents in the hooks',
      'Raw amp tone with almost no polish',
      'Driving bass lines that keep the momentum high',
      'Explosive fills snapping into simple choruses',
      'Post-punk guitar textures with anxious space'
    ],
    energyFeels: ['Urgent', 'Scrappy', 'Unfiltered', 'Youthful', 'Defiant', 'Fast', 'Chaotic', 'Cathartic']
  },
  country: {
    label: 'Country',
    flavorGenres: ['Modern Country', 'Outlaw Country', 'Country Pop', 'Country Rock'],
    bpmRanges: [[72, 84], [86, 98], [100, 114], [116, 128]],
    scales: ['Major', 'Mixolydian', 'Major Pentatonic', 'Minor Pentatonic', 'Dorian', 'Natural Minor'],
    instrumentationPalettes: [
      ['Acoustic Guitar', 'Snare Brush', 'Electric Bass', 'Pedal Steel', 'Tambourine'],
      ['Strummed Guitar', 'Live Kit', 'Telecaster Lead', 'Warm Organ', 'Hand Percussion'],
      ['Banjo Layer', 'Kick Drum', 'Bass Guitar', 'Mandolin', 'Room Reverb'],
      ['Piano', 'Claps', 'Slide Guitar', 'Subtle Pad', 'Shaker']
    ],
    signatureSounds: [
      'Twangy lead licks answering the vocal space',
      'Warm acoustic strums with clear backbeat',
      'Pedal steel swells bringing emotional lift',
      'Live-room drums with radio-ready polish',
      'Road-trip groove with heartland guitar layers',
      'Rustic textures balanced by modern low end'
    ],
    energyFeels: ['Heartland', 'Warm', 'Open-Road', 'Earnest', 'Upbeat', 'Reflective', 'Proud', 'Rowdy']
  },
  folk: {
    label: 'Folk',
    flavorGenres: ['Indie Folk', 'Americana Folk', 'Chamber Folk', 'Acoustic Folk'],
    bpmRanges: [[65, 78], [80, 92], [94, 106], [108, 118]],
    scales: ['Major', 'Natural Minor', 'Dorian', 'Mixolydian', 'Major Pentatonic', 'Aeolian'],
    instrumentationPalettes: [
      ['Fingerpicked Guitar', 'Soft Kick', 'Upright Bass', 'Violin', 'Room Tone'],
      ['Acoustic Strums', 'Brush Kit', 'Mandolin', 'Piano', 'Ambient Reverb'],
      ['Banjo', 'Hand Percussion', 'Cello', 'Harmony Ooohs', 'Tape Texture'],
      ['Nylon Guitar', 'Stomp Perc', 'Pump Organ', 'Shaker', 'Field Recording']
    ],
    signatureSounds: [
      'Natural room ambience and intimate picking',
      'Layered acoustic strings that feel handmade',
      'Subtle harmonies wrapping around a simple motif',
      'Organic percussion from stomps and taps',
      'Warm low mids with pastoral melodic lines',
      'Roots textures preserved without overproduction'
    ],
    energyFeels: ['Earthy', 'Gentle', 'Sincere', 'Pastoral', 'Reflective', 'Homely', 'Wistful', 'Hopeful']
  },
  soul: {
    label: 'Soul',
    flavorGenres: ['Neo-Soul', 'Retro Soul', 'Gospel Soul', 'Psychedelic Soul'],
    bpmRanges: [[70, 82], [84, 96], [98, 110], [112, 122]],
    scales: ['Major', 'Dorian', 'Mixolydian', 'Natural Minor', 'Major Pentatonic', 'Blues Scale'],
    instrumentationPalettes: [
      ['Rhodes', 'Pocket Drums', 'Bass Guitar', 'Horns', 'Tape Saturation'],
      ['Wurlitzer', 'Clap Snare', 'Warm Bass', 'Organ', 'Tambourine'],
      ['Electric Guitar', 'Live Kit', 'Choir Layer', 'Subtle Strings', 'Room Reverb'],
      ['Piano', 'Shaker', 'Bass Pocket', 'Bell Accents', 'Analog Pad']
    ],
    signatureSounds: [
      'Deep-pocket grooves with expressive chords',
      'Horn stabs that answer the main phrase',
      'Church-inspired harmony stacked over warm bass',
      'Vintage saturation gluing live players together',
      'Slinky drum feel with tasteful ghost notes',
      'Soulful keys carrying emotional weight'
    ],
    energyFeels: ['Warm', 'Groovy', 'Uplifting', 'Heartfelt', 'Velvet', 'Spiritual', 'Rich', 'Human']
  },
  funk: {
    label: 'Funk',
    flavorGenres: ['P-Funk', 'Disco Funk', 'Electro Funk', 'Jazz Funk'],
    bpmRanges: [[92, 104], [106, 118], [120, 128], [130, 138]],
    scales: ['Mixolydian', 'Dorian', 'Minor Pentatonic', 'Major Pentatonic', 'Blues Scale', 'Major'],
    instrumentationPalettes: [
      ['Slap Bass', 'Tight Drums', 'Wah Guitar', 'Clavinet', 'Horn Shots'],
      ['Disco Bass', 'Four-On-The-Floor Kick', 'String Layer', 'Rhythm Guitar', 'Hand Claps'],
      ['Synth Bass', 'Electronic Drums', 'Talkbox Lead', 'Perc Loops', 'Noise FX'],
      ['Muted Guitar', 'Live Kit', 'Rhodes', 'Brass Stabs', 'Shaker']
    ],
    signatureSounds: [
      'Syncopated bass that owns the groove',
      'Sharp guitar scratches and tight pocket drums',
      'Horn punches locking with clavinet riffs',
      'Disco-inspired strings over a greasy rhythm section',
      'Talkbox or synth lead giving it character',
      'Busy ghost-note drumming with dance-floor bounce'
    ],
    energyFeels: ['Groovy', 'Slinky', 'Playful', 'Showy', 'Danceable', 'Saucy', 'Loose', 'Electric']
  },
  jazz: {
    label: 'Jazz',
    flavorGenres: ['Smooth Jazz', 'Jazz Fusion', 'Modal Jazz', 'Loft Jazz'],
    bpmRanges: [[68, 82], [84, 98], [100, 118], [120, 145]],
    scales: ['Dorian', 'Mixolydian', 'Lydian', 'Major', 'Melodic Minor', 'Whole Tone'],
    instrumentationPalettes: [
      ['Upright Bass', 'Brush Kit', 'Piano', 'Tenor Sax', 'Room Ambience'],
      ['Electric Piano', 'Fusion Drums', 'Bass Guitar', 'Lead Synth', 'Chorus Guitar'],
      ['Ride Cymbal', 'Acoustic Bass', 'Trumpet', 'Piano Voicings', 'Tape Hiss'],
      ['Broken Beat Drums', 'Rhodes', 'Muted Bass', 'Clarinet', 'Plate Reverb']
    ],
    signatureSounds: [
      'Extended chords moving with elegance',
      'Improvised lead phrases over rich comping',
      'Brushwork and upright bass holding intimate time',
      'Fusion textures mixing virtuosity with groove',
      'Modal vamping that lets the harmony breathe',
      'Late-night club ambience around the ensemble'
    ],
    energyFeels: ['Sophisticated', 'Fluid', 'Smoky', 'Improvised', 'Polished', 'Late-Night', 'Nimble', 'Cool']
  },
  lofi: {
    label: 'Lo-Fi',
    flavorGenres: ['Lo-Fi Hip-Hop', 'Chillhop', 'Study Beats', 'Lo-Fi Jazz'],
    bpmRanges: [[60, 72], [74, 84], [86, 94], [96, 104]],
    scales: ['Natural Minor', 'Dorian', 'Major 7 Mood', 'Major', 'Minor Pentatonic', 'Mixolydian'],
    instrumentationPalettes: [
      ['Dusty Drums', 'Rhodes', 'Sub Bass', 'Vinyl Crackle', 'Rain Foley'],
      ['Soft Kick', 'Jazz Guitar', 'Tape Pad', 'Muted Snare', 'Cassette Noise'],
      ['Lazy Hats', 'Warm Keys', 'Upright Bass', 'Ambient Texture', 'Reverse Chime'],
      ['Sampled Chords', 'Boomy Kick', 'Lo-Fi Perc', 'Mellow Lead', 'Field Recording']
    ],
    signatureSounds: [
      'Worn-out tape flutter across the chords',
      'Sleepy swing and soft transient edges',
      'Rainy ambience tucked behind mellow keys',
      'Dusty jazz harmony with understated drums',
      'Filtered samples that feel nostalgic and close',
      'Subtle imperfections making the loop human'
    ],
    energyFeels: ['Cozy', 'Nostalgic', 'Sleepy', 'Mellow', 'Reflective', 'Warm', 'Study-Friendly', 'Hazy']
  },
  edm: {
    label: 'EDM',
    flavorGenres: ['Festival EDM', 'Big Room', 'Future Bass', 'Melodic EDM'],
    bpmRanges: [[124, 128], [128, 132], [138, 150], [150, 160]],
    scales: ['Minor', 'Major', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian'],
    instrumentationPalettes: [
      ['Supersaw Stack', 'Club Kick', 'Sub Bass', 'Impact FX', 'Noise Risers'],
      ['Pluck Arp', 'Snare Build', 'Wide Chords', 'Drop Lead', 'Reverse Sweeps'],
      ['Vocal Chops', 'Punch Kick', 'Reese Bass', 'Glitter Top Synth', 'Crash FX'],
      ['Future Chords', 'Tight Clap', 'Detuned Lead', 'Atmosphere Pad', 'Low-End Drop']
    ],
    signatureSounds: [
      'Oversized drops built around bright synth hooks',
      'Snare-roll builds slamming into open low end',
      'Sidechain pumping that keeps everything moving',
      'Wide vocal chop motifs driving the topline',
      'Cinematic risers setting up release moments',
      'Festival-scale stereo imaging and energy'
    ],
    energyFeels: ['Euphoric', 'Explosive', 'Festival-Ready', 'Glowing', 'Adrenalized', 'Huge', 'Propulsive', 'Cinematic']
  },
  house: {
    label: 'House',
    flavorGenres: ['Deep House', 'Tech House', 'Piano House', 'Afro House'],
    bpmRanges: [[120, 124], [124, 126], [126, 128], [128, 130]],
    scales: ['Minor', 'Dorian', 'Mixolydian', 'Major', 'Phrygian', 'Minor Pentatonic'],
    instrumentationPalettes: [
      ['Four-On-The-Floor Kick', 'Offbeat Bass', 'Chord Stabs', 'Shaker Loop', 'Ride Cymbal'],
      ['Punchy Kick', 'Perc Groove', 'Vocal Chop', 'Pluck Synth', 'Noise Sweep'],
      ['Piano Chords', 'Clap Layer', 'Sub Bass', 'Open Hat', 'FX Wash'],
      ['Tribal Percussion', 'Deep Bass', 'Pad Layer', 'Bell Accent', 'Atmosphere FX']
    ],
    signatureSounds: [
      'Relentless kick-and-bass pocket with subtle movement',
      'Filtered builds opening into clean grooves',
      'Short chord stabs with dance-floor urgency',
      'Percussion layers that keep the loop alive',
      'Soulful house piano phrases lifting the track',
      'Club-ready low end with crisp hats'
    ],
    energyFeels: ['Hypnotic', 'Danceable', 'Sleek', 'Nightlife', 'Warm', 'Rolling', 'Velvet', 'Club-Focused']
  },
  techno: {
    label: 'Techno',
    flavorGenres: ['Minimal Techno', 'Peak-Time Techno', 'Industrial Techno', 'Melodic Techno'],
    bpmRanges: [[124, 128], [130, 136], [138, 145], [145, 152]],
    scales: ['Minor', 'Phrygian', 'Dorian', 'Locrian', 'Chromatic', 'Harmonic Minor'],
    instrumentationPalettes: [
      ['Heavy Kick', 'Rumble Bass', 'Closed Hat', 'Synth Stab', 'Noise FX'],
      ['Driving Percussion', 'Acid Line', 'Open Hat', 'Drone Pad', 'Impact Hit'],
      ['Industrial Hits', 'Distorted Bass', 'Metallic Perc', 'Dark Arp', 'Atmosphere Layer'],
      ['Pulse Synth', 'Tom Groove', 'Sub Layer', 'Filtered Lead', 'Reverse FX']
    ],
    signatureSounds: [
      'Machine-like repetition with small evolving details',
      'Rumble low end under a punishing kick',
      'Dark synth pulses that steadily intensify',
      'Minimal motifs stretched across long transitions',
      'Industrial textures scraping through the groove',
      'Hypnotic arps with stark club pressure'
    ],
    energyFeels: ['Hypnotic', 'Mechanical', 'Dark', 'Driving', 'Tense', 'Industrial', 'Cold', 'Late-Night']
  },
  drumAndBass: {
    label: 'Drum & Bass',
    flavorGenres: ['Liquid DnB', 'Neurofunk', 'Jump Up', 'Atmospheric DnB'],
    bpmRanges: [[160, 168], [170, 174], [174, 178], [178, 182]],
    scales: ['Natural Minor', 'Dorian', 'Phrygian', 'Major', 'Harmonic Minor', 'Minor Pentatonic'],
    instrumentationPalettes: [
      ['Breakbeat Kit', 'Reese Bass', 'Pad Wash', 'Sub Layer', 'FX Sweeps'],
      ['Tight Snare', 'Rolling Hats', 'Bass Modulation', 'Lead Stab', 'Impact Hit'],
      ['Amen Slice', 'Punch Kick', 'Atmosphere Texture', 'Pluck Motif', 'Reverse Cymbal'],
      ['Liquid Keys', 'Sub Bass', 'Perc Shuffle', 'Airy Vocal Layer', 'Noise Uplifter']
    ],
    signatureSounds: [
      'Rapid breakbeats wrapping around deep sub pressure',
      'Bass resampling with aggressive movement',
      'Liquid chords smoothing out high-speed drums',
      'Snare cracks that define the entire groove',
      'Detailed fills and edits between phrases',
      'Tension-heavy builds exploding into rolling momentum'
    ],
    energyFeels: ['Relentless', 'High-Velocity', 'Futuristic', 'Tense', 'Aerodynamic', 'Intense', 'Sharp', 'Rushing']
  },
  ambient: {
    label: 'Ambient',
    flavorGenres: ['Dark Ambient', 'Space Ambient', 'Meditation Ambient', 'Drone Ambient'],
    bpmRanges: [[50, 65], [66, 78], [79, 90], [91, 100]],
    scales: ['Major', 'Minor', 'Dorian', 'Lydian', 'Whole Tone', 'Aeolian'],
    instrumentationPalettes: [
      ['Pad Swells', 'Sub Drone', 'Textural Noise', 'Soft Piano', 'Field Recording'],
      ['Granular Synth', 'Atmosphere Layer', 'Sparse Perc', 'Chime Accent', 'Reverse Reverb'],
      ['Choir Pad', 'Low String Drone', 'Air FX', 'Warm Bass Bloom', 'Tape Texture'],
      ['Glass Tones', 'Noise Bed', 'Slow Pulse', 'Reverb Tail', 'Organic Foley']
    ],
    signatureSounds: [
      'Long evolving pads with almost no hard edges',
      'Field recordings blending into harmonic wash',
      'Granular textures that drift rather than groove',
      'Sparse piano notes suspended in reverb',
      'Low drones creating depth without clutter',
      'Immersive sonic space over rhythmic urgency'
    ],
    energyFeels: ['Weightless', 'Meditative', 'Ethereal', 'Patient', 'Expansive', 'Still', 'Dreamlike', 'Suspended']
  },
  cinematic: {
    label: 'Cinematic',
    flavorGenres: ['Trailer', 'Hybrid Orchestral', 'Epic Drama', 'Sci-Fi Score'],
    bpmRanges: [[70, 88], [90, 105], [108, 124], [126, 140]],
    scales: ['Natural Minor', 'Harmonic Minor', 'Phrygian', 'Dorian', 'Aeolian', 'Locrian'],
    instrumentationPalettes: [
      ['Low Strings', 'Taikos', 'Brass Stabs', 'Choir Pad', 'Braam Hits'],
      ['Piano Motif', 'String Ostinato', 'Sub Boom', 'Granular Synth', 'Impacts'],
      ['Cello Pulse', 'Epic Drums', 'Drone Layer', 'Reverse Swells', 'High Strings'],
      ['Hybrid Percussion', 'Pulse Bass', 'Wide Atmospheres', 'Trailer FX', 'French Horn']
    ],
    signatureSounds: [
      'Huge percussion and braams framing the arrangement',
      'Tension-building ostinatos under dark harmonic motion',
      'Massive impacts punctuating dramatic transitions',
      'Haunting piano themes against enormous low end',
      'Hybrid orchestral layers meeting synthetic sound design',
      'Crescendo structures built for visual storytelling'
    ],
    energyFeels: ['Epic', 'Tense', 'Heroic', 'Cataclysmic', 'Brooding', 'Mysterious', 'Triumphant', 'Doomed']
  },
  reggae: {
    label: 'Reggae',
    flavorGenres: ['Roots Reggae', 'Dub Reggae', 'Lovers Rock', 'Modern Reggae'],
    bpmRanges: [[68, 80], [82, 92], [94, 104], [106, 116]],
    scales: ['Major', 'Mixolydian', 'Dorian', 'Natural Minor', 'Major Pentatonic', 'Minor Pentatonic'],
    instrumentationPalettes: [
      ['Skank Guitar', 'One-Drop Drums', 'Round Bass', 'Organ Bubble', 'Spring Reverb'],
      ['Dub Chords', 'Deep Kick', 'Melodica', 'Tape Delay FX', 'Percussion'],
      ['Clean Guitar', 'Snare Rim', 'Warm Bass', 'Horn Line', 'Room Ambience'],
      ['Keys Stabs', 'Soft Drums', 'Sub Layer', 'Shaker', 'Delay Throw']
    ],
    signatureSounds: [
      'Offbeat guitar chops sitting above a heavy bass line',
      'Dub-style delay tails shaping the groove',
      'One-drop drums with laid-back authority',
      'Melodica or organ carrying the top line',
      'Deep pocket and wide spring reverb space',
      'Relaxed rhythmic tension that still moves'
    ],
    energyFeels: ['Easygoing', 'Sunlit', 'Spiritual', 'Rooted', 'Laid-Back', 'Positive', 'Warm', 'Grounded']
  },
  afrobeats: {
    label: 'Afrobeats',
    flavorGenres: ['Afro Pop', 'Afro Swing', 'Amapiano Afrobeats', 'Afro Fusion'],
    bpmRanges: [[95, 105], [106, 112], [113, 118], [119, 124]],
    scales: ['Major', 'Minor', 'Mixolydian', 'Dorian', 'Major Pentatonic', 'Natural Minor'],
    instrumentationPalettes: [
      ['Log Drum', 'Shaker Groove', 'Pluck Guitar', 'Sub Bass', 'Vocal Chop'],
      ['Percussion Stack', 'Soft Kick', 'Electric Piano', 'Lead Synth', 'FX Rise'],
      ['Bouncy Bass', 'Rim Perc', 'Bright Keys', 'Pad Layer', 'Crowd Texture'],
      ['Guitar Licks', 'Snare Groove', 'Amapiano Chords', 'Bell Accent', 'Atmosphere FX']
    ],
    signatureSounds: [
      'Interlocking percussion patterns that never stop moving',
      'Bouncy bass and log-drum phrases driving the hook',
      'Bright melodic guitar lines above relaxed drums',
      'Polished club energy with warm rhythmic swing',
      'Amapiano-inspired textures woven into pop structure',
      'Melodies that feel celebratory without overcrowding'
    ],
    energyFeels: ['Vibrant', 'Sunset', 'Swaying', 'Confident', 'Warm', 'Danceable', 'Smooth', 'Celebratory']
  },
  latin: {
    label: 'Latin',
    flavorGenres: ['Latin Pop', 'Salsa Fusion', 'Bachata Pop', 'Latin Trap'],
    bpmRanges: [[88, 100], [102, 112], [114, 124], [126, 138]],
    scales: ['Major', 'Minor', 'Dorian', 'Mixolydian', 'Harmonic Minor', 'Major Pentatonic'],
    instrumentationPalettes: [
      ['Latin Percussion', 'Bass Guitar', 'Acoustic Guitar', 'Piano', 'Brass Hits'],
      ['Dem Bow Perc', 'Sub Bass', 'Synth Pluck', 'FX Sweep', 'Clap Layer'],
      ['Bachata Guitar', 'Soft Kick', 'Shaker', 'Warm Pad', 'Reverse Cymbal'],
      ['Piano Montuno', 'Timbales', 'Congas', 'Horn Section', 'Room Reverb']
    ],
    signatureSounds: [
      'Rhythmic percussion layers carrying the pulse',
      'Acoustic and electronic textures blending naturally',
      'Dance-ready grooves anchored by melodic guitar',
      'Horn and piano phrases creating uplift',
      'Dem bow influence tightening the low end',
      'Romantic chord movement with club polish'
    ],
    energyFeels: ['Passionate', 'Dance-Ready', 'Festive', 'Sultry', 'Colorful', 'Rhythmic', 'Joyful', 'Hot']
  },
  reggaeton: {
    label: 'Reggaeton',
    flavorGenres: ['Classic Reggaeton', 'Romantic Reggaeton', 'Dark Reggaeton', 'Club Reggaeton'],
    bpmRanges: [[88, 94], [95, 100], [101, 106], [107, 112]],
    scales: ['Minor', 'Major', 'Dorian', 'Phrygian', 'Natural Minor', 'Mixolydian'],
    instrumentationPalettes: [
      ['Dem Bow Drums', 'Sub Bass', 'Pluck Synth', 'FX Vocal Chop', 'Pad Layer'],
      ['Tight Kick', 'Snare Accent', 'Latin Perc', 'Dark Keys', 'Reverse FX'],
      ['Romantic Guitar', 'Perc Loop', 'Warm Bass', 'Bell Lead', 'Air Texture'],
      ['Club Drums', 'Synth Hook', 'Wide Chords', 'Impact Hit', 'Riser FX']
    ],
    signatureSounds: [
      'Dem bow rhythm driving every section forward',
      'Reggaeton drums paired with polished synth hooks',
      'Romantic melodies softening the club groove',
      'Punchy low end and minimalist arrangement choices',
      'Dark keys and filtered transitions adding tension',
      'Percussive vocal chops decorating the bounce'
    ],
    energyFeels: ['Sensual', 'Nightlife', 'Confident', 'Danceable', 'Sleek', 'Hot', 'Bouncy', 'Magnetic']
  },
  phonk: {
    label: 'Phonk',
    flavorGenres: ['Drift Phonk', 'Cowbell Phonk', 'Memphis Phonk', 'Street Phonk'],
    bpmRanges: [[80, 92], [124, 136], [138, 150], [150, 165]],
    scales: ['Natural Minor', 'Phrygian', 'Harmonic Minor', 'Minor Pentatonic', 'Locrian', 'Aeolian'],
    instrumentationPalettes: [
      ['Cowbell Lead', 'Distorted 808', 'Crunchy Snare', 'Vocal Sample', 'Tape Noise'],
      ['Memphis Vocal Chop', 'Punch Kick', 'Dark Pad', 'Bell Motif', 'Brake FX'],
      ['Aggressive Bass', 'Drift Hats', 'FX Risers', 'Synth Stab', 'Texture Layer'],
      ['Filtered Keys', 'Sub Boom', 'Perc Loop', 'Reverse Reverb', 'Cassette Saturation']
    ],
    signatureSounds: [
      'Cowbell melodies over blown-out low end',
      'Memphis-style vocal sampling with distorted drums',
      'Drift-ready energy driven by clipped transients',
      'Grimy textures and saturated stereo width',
      'Dark loops that feel fast and dangerous',
      'Crunchy masters intentionally pushing into red'
    ],
    energyFeels: ['Gritty', 'Menacing', 'Fast', 'Underground', 'Adrenalized', 'Dirty', 'Dark', 'Reckless']
  }
};

export const SONG_STRUCTURES = [
  'Intro - Verse - Chorus - Verse - Chorus - Bridge - Chorus - Outro',
  'Intro - Hook - Verse - Hook - Verse - Hook - Outro',
  'Ambient Intro - Drop - Breakdown - Drop - Outro',
  'Verse - Pre-Chorus - Chorus - Verse - Pre-Chorus - Chorus - Bridge - Chorus',
  'Intro - Verse - Refrain - Verse - Refrain - Outro',
  'Intro - Verse - Chorus - Post-Chorus - Verse - Chorus - Post-Chorus - Bridge - Chorus',
  'Intro - Build - Drop - Verse - Build - Drop - Outro',
  'Intro - Verse - Chorus - Instrumental Break - Chorus - Outro',
  'Intro - Verse - Verse - Chorus - Verse - Chorus - Outro',
  'Cold Open - Verse - Chorus - Verse - Chorus - Bridge - Double Chorus',
  'Intro - Hook - Verse - Pre-Hook - Hook - Verse - Hook - Outro',
  'Intro - Theme - Variation - Breakdown - Theme Return - Outro',
  'Verse - Chorus - Verse - Chorus - Solo - Chorus',
  'Intro - A Section - B Section - A Section - C Section - A Section',
  'Drone Intro - Pulse Section - Lift - Impact Section - Fade Outro',
  'Intro - Verse - Chorus - Verse - Bridge - Final Chorus - Tag',
  'Intro - Refrain - Verse - Refrain - Breakdown - Refrain - Outro',
  'Percussion Intro - Verse - Hook - Verse - Hook - Bridge - Hook',
  'Intro - Verse - Pre-Chorus - Chorus - Drop - Verse - Chorus - Drop',
  'Sketch Intro - Main Loop - Switch-Up - Main Loop - Outro',
  'Intro - Verse - Chorus - Verse - Chorus - Breakdown - Chorus - Outro',
  'Hook Intro - Verse - Hook - Verse - Bridge - Hook - Outro',
  'Cinematic Intro - Tension Build - Impact - Recovery - Final Impact - Outro',
  'Intro - Groove A - Groove B - Groove A - Solo Section - Groove A',
  'Intro - Verse - Pre-Chorus - Chorus - Post-Chorus - Verse - Chorus - Outro',
  'Intro - Motif - Expansion - Climax - Resolution',
  'Noise Intro - Beat Entrance - Chorus Lift - Beat Switch - Final Chorus',
  'Intro - Verse - Hook - Breakdown - Verse - Hook - Outro',
  'Intro - Chorus - Verse - Chorus - Verse - Bridge - Chorus',
  'Atmosphere Intro - Verse - Lift - Drop - Breakdown - Final Drop - Outro',
  'Intro - Verse - Chorus - Rap Break - Chorus - Bridge - Chorus',
  'Intro - Jam Section - Hook Section - Jam Section - Breakdown - Hook Section',
  'Intro - Verse - Chorus - Verse - Chorus - Key Change Chorus - Outro',
  'Intro - Theme A - Theme B - Percussion Break - Theme A - Finale',
  'Intro - Verse - Build - Chorus - Verse - Build - Chorus - Outro',
  'Pulse Intro - Verse - Chorus - Half-Time Break - Chorus - Outro',
  'Intro - Verse - Lift - Chorus - Verse - Lift - Chorus - Outro',
  'Cold Open - Hook - Verse - Hook - Breakdown - Final Hook',
  'Atmosphere Intro - Groove - Refrain - Groove - Switch-Up - Refrain - Outro',
  'Intro - Motif - Verse - Chorus - Motif Return - Final Chorus',
  'Scene Setter - Verse - Chorus - Drop - Verse - Final Chorus - Outro',
  'Intro - Verse - Chorus - Turnaround - Verse - Chorus - Tag',
  'Prelude - Theme - Break - Theme Return - Climax - Fade',
  'Percussion Intro - Verse - Lift - Hook - Bridge - Hook - Outro',
  'Intro - Verse - Chorus - Breakdown - Lift - Final Chorus - Outro',
  'Ambient Intro - Verse - Refrain - Drop - Refrain - Outro',
  'Hook Intro - Verse - Lift - Hook - Verse - Bridge - Double Hook',
  'Intro - Main Loop - Verse - Hook - Switch-Up - Hook - Outro',
  'Drone Intro - Verse - Impact - Recovery - Final Impact - Outro',
  'Intro - Verse - Chorus - Instrumental Lift - Chorus - Outro',
  'Theme Intro - Verse - Build - Impact - Verse - Final Impact',
  'Intro - Chorus - Verse - Lift - Chorus - Bridge - Chorus - Outro',
  'Intro - Refrain - Verse - Lift - Refrain - Breakdown - Refrain',
  'Pulse Intro - Hook - Verse - Hook - Switch-Up - Final Hook',
  'Intro - Verse - Chorus - Verse - Lift - Chorus - Outro',
  'Cinematic Intro - Verse - Chorus - Fallout - Final Chorus - Outro'
];

export const ERAS = [
  "1960's",
  "1970's",
  "1980's",
  "1990's",
  "2000's",
  "2010's",
  "2020's",
  "Future"
];

export const MOOD_TAGS = [
  'Dark',
  'Romantic',
  'Triumphant',
  'Heartbroken',
  'Revenge',
  'Summer',
  'Winter',
  'Spiritual',
  'Luxury',
  'Street',
  'Dreamy',
  'Melancholy',
  'Euphoric',
  'Nostalgic',
  'Cinematic',
  'Seductive',
  'Hopeful',
  'Chaotic',
  'Lonely',
  'Victory',
  'Night Drive',
  'Sunrise',
  'Afterparty',
  'Introspective',
  'Restless',
  'Weightless',
  'Neon',
  'Smoky',
  'Velvet',
  'Frozen',
  'Burning',
  'Oceanic',
  'Desert',
  'Rainy',
  'Golden Hour',
  'Midnight',
  'Dangerous',
  'Playful',
  'Elegant',
  'Mythic',
  'Hazy',
  'Mechanical',
  'Dreamstate',
  'Brutal',
  'Tender',
  'Ghostly',
  'Radiant',
  'Sinister',
  'Widescreen',
  'Fever Dream',
  'Reckless',
  'Sacred',
  'Stormy',
  'Glacial',
  'Smoldering',
  'Uplifted',
  'Cathartic',
  'Magnetic',
  'Cruel Summer',
  'City Lights',
  'Moonlit',
  'Dusty',
  'Chrome',
  'Otherworldly',
  'Tropical',
  'Underground',
  'Tense',
  'Fragile',
  'Defiant',
  'Blissful',
  'Paranoid',
  'Floating',
  'Locked-In'
];

export const ARRANGEMENT_SECTION_TYPES = [
  'Intro',
  'Verse',
  'Pre-Chorus',
  'Chorus',
  'Post-Chorus',
  'Bridge',
  'Breakdown',
  'Drop',
  'Outro'
];

export const ARRANGEMENT_NOTES = {
  Intro: [
    'Start sparse with filtered textures and a teaser melody',
    'Open with atmosphere only before drums arrive',
    'Use a stripped-down motif to establish the mood'
  ],
  Verse: [
    'Keep the groove focused and leave space for the topline',
    'Let the drums and bass carry the momentum with minimal harmony changes',
    'Introduce the main motif in a restrained way'
  ],
  'Pre-Chorus': [
    'Lift the tension with added percussion and rising harmony',
    'Thin the drums briefly, then build into the chorus',
    'Use transitional effects to create anticipation'
  ],
  Chorus: [
    'Open the full arrangement with the widest version of the hook',
    'Push the low end and let the lead melody feel undeniable',
    'Make the drums hit harder with layered textures'
  ],
  'Post-Chorus': [
    'Let a catchy instrumental tag answer the chorus',
    'Use a rhythmic lead or vocal-like chop as the payoff',
    'Hold the energy but simplify the harmony'
  ],
  Bridge: [
    'Change the chord color to reset the ear',
    'Pull the drums back and spotlight a new melodic idea',
    'Use contrast here before the final lift'
  ],
  Breakdown: [
    'Drop to drums, bass, and atmosphere for impact',
    'Let tension breathe before the next section hits',
    'Use FX and negative space to reset the arrangement'
  ],
  Drop: [
    'Hit with the biggest drums and lead stack here',
    'Let the rhythm and bass dominate with minimal distraction',
    'Make this the peak-energy section'
  ],
  Outro: [
    'Strip layers away until only the core mood remains',
    'Fade on the hook motif with softened percussion',
    'Let the final chord or texture trail out naturally'
  ]
};
