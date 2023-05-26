const express = require('express');
const path = require('path');
const cors = require('cors');
const { createSSRApp } = require('vue');
const { renderToString } = require('@vue/server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const fs = require('fs');
const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'text/javascript');
  }
  next();
});

const template = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');

// const renderer = createBundleRenderer(serverBundle, {
//   runInNewContext: false,
//   template,
//   clientManifest,
// });

const plants = [
  {
    "id": 1,
    "common_name": "European Silver Fir",
    "scientific_name": ["Abies alba"],
    "other_name": ["Common Silver Fir"],
    "cycle": "Perennial",
    "watering": "Frequent",
    "sunlight": [],
    "default_image": {
      "image_id": 9,
      "license": 5,
      "license_name": "Attribution-ShareAlike License",
      "license_url": "https://creativecommons.org/licenses/by-sa/2.0/",
      "original_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg",
      "regular_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",
      "medium_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/medium/49255769768_df55596553_b.jpg",
      "small_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/small/49255769768_df55596553_b.jpg",
      "thumbnail": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/thumbnail/49255769768_df55596553_b.jpg"
    }
  },
  {
    "id": 2,
    "common_name": "Pyramidalis Silver Fir",
    "scientific_name": ["Abies alba 'Pyramidalis'"],
    "cycle": "Perennial",
    "watering": "Frequent",
    "sunlight": [],
    "other_name": null,
    "default_image": {
      "image_id": 9,
      "license": 5,
      "license_name": "Attribution-ShareAlike License",
      "license_url": "https://creativecommons.org/licenses/by-sa/2.0/",
      "original_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg",
      "regular_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg",
      "medium_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/medium/49255769768_df55596553_b.jpg",
      "small_url": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/small/49255769768_df55596553_b.jpg",
      "thumbnail": "https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/thumbnail/49255769768_df55596553_b.jpg"
    }
  }
];


app.get('/plants', (req, res) => {
  console.log('data? ', res)
  res.json({ data: plants });
});

app.get('/plants/:id', (req, res) => {
  const plantId = parseInt(req.params.id);
  const plant = plants.find((plant) => plant.id === plantId);
  if (plant) {
    res.json({ data: plant });
  } else {
    res.status(404).json({ error: 'Plant not found' });
  }
});

app.get('/plantsearch', (req, res) => {
  const searchTerm = req.query.searchTerm;
  let searchResults = plants;
  if (searchTerm) {
    searchResults = plants.filter(
      (plant) => plant.common_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  res.json({ data: searchResults });
});

app.post('/gardenpage', (req, res) => {
  const plantToAdd = req.body;
  const isDuplicate = plants.some(
    (p) =>
      p.common_name === plantToAdd.commonName &&
      p.default_image.thumbnail === plantToAdd.thumbnail &&
      p.cycle === plantToAdd.cycle
  );
  if (!isDuplicate) {
    const newPlantId = plants.length > 0 ? plants[plants.length - 1].id + 1 : 1;
    const newPlant = { ...plantToAdd, id: newPlantId };
    plants.push(newPlant);
    res.status(201).json({ message: 'Plant added to the garden', plant: newPlant });
  } else {
    res.status(400).json({ error: 'Plant already exists in the garden' });
  }
});



app.get('*', (req, res) => {
  const appContent = createSSRApp(appContent);

  const renderer = renderToString.createRenderer({
    template,
    serverBundle,
    clientManifest,
  });

  renderer.renderToString(appContent).then((html) => {
    res.status(200).send(html);
  }).catch((err) => {
    console.error(err);
    res.status(500).end('Internal Server Error');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
