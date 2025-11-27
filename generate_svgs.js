const fs = require('fs');
const path = require('path');

const images = [
    { name: 'sea_turtle', text: 'Meeresschildkröte', color: '#4CAF50' },
    { name: 'great_white_shark', text: 'Weißer Hai', color: '#9E9E9E' },
    { name: 'giant_squid', text: 'Riesenkalmar', color: '#F44336' },
    { name: 'clownfish', text: 'Clownfisch', color: '#FF9800' },
    { name: 'humpback_whale', text: 'Buckelwal', color: '#2196F3' },
    { name: 'cod', text: 'Kabeljau', color: '#795548' },
    { name: 'leatherback_turtle', text: 'Lederschildkröte', color: '#3E2723' },
    { name: 'puffin', text: 'Papageientaucher', color: '#FFC107' },
    { name: 'manta_ray', text: 'Manta Rochen', color: '#607D8B' },
    { name: 'dugong', text: 'Dugong', color: '#8D6E63' },
    { name: 'whale_shark', text: 'Walhai', color: '#00BCD4' },
    { name: 'seahorse', text: 'Seepferdchen', color: '#FFEB3B' },
    { name: 'polar_bear', text: 'Eisbär', color: '#E0F7FA' }, // Light cyan for ice/white
    { name: 'narwhal', text: 'Narwal', color: '#90A4AE' },
    { name: 'walrus', text: 'Walross', color: '#6D4C41' },
    { name: 'beluga', text: 'Beluga', color: '#FFFFFF' }, // White
    { name: 'bowhead_whale', text: 'Grönlandwal', color: '#37474F' },
    { name: 'penguin', text: 'Kaiserpinguin', color: '#212121' },
    { name: 'leopard_seal', text: 'Seeleopard', color: '#757575' },
    { name: 'krill', text: 'Krill', color: '#FF5252' },
    { name: 'albatross', text: 'Wanderalbatros', color: '#FAFAFA' }
];

const outputDir = '/home/semus/Repo/EhlenAngularProjekt3/public/assets/images';

images.forEach(img => {
    const svgContent = `
<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${img.color}" />
  <text x="50%" y="50%" font-family="Arial" font-size="40" fill="black" text-anchor="middle" dominant-baseline="middle">${img.text}</text>
  <text x="50%" y="80%" font-family="Arial" font-size="20" fill="black" text-anchor="middle" dominant-baseline="middle">(Bild folgt)</text>
</svg>`;

    fs.writeFileSync(path.join(outputDir, `${img.name}.svg`), svgContent.trim());
    console.log(`Generated ${img.name}.svg`);
});
