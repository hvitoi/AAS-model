// Packages
const express = require("express");
const sharp = require("sharp");

// DB connection
require("../db/connection");

// Models
const Asset = require("../db/models/asset");

// Middlewares
const { uploadPicture, uploadPdf } = require("../db/middlewares/upload");

// -------------------------

// Create route
const router = new express.Router();

// Register AAS
router.post("/aas", async (req, res) => {
  try {
    // Create new instance of "Asset" model
    const asset = new Asset(req.body);

    // Save to DB
    await asset.save();

    // Response
    res.status(201).send(asset.getPublicOverview());
  } catch (err) {
    res.status(400).send();
  }
});

// List AAS's
router.get("/aas", async (req, res) => {
  try {
    const assetList = await Asset.find({});
    res.status(200).send(assetList.map((asset) => asset.getPublicOverview()));
  } catch (err) {
    res.status(500).send();
  }
});

// Find AAS by ID
router.get("/aas/:id", async (req, res) => {
  try {
    // Find asset
    const asset = await Asset.findById(req.params.id);

    // If no asset is found
    if (!asset) {
      return res.status(404).send();
    }

    // Response
    res.status(200).send(asset.getPublicOverview());
  } catch (err) {
    res.status(500).send();
  }
});

// Update AAS by ID
router.patch("/aas/:id", async (req, res) => {
  const updateKeys = Object.keys(req.body);
  const allowedKeys = [
    "namePlate",
    "manufacturer",
    "description",
    "country",
    "isAvailable",
  ];
  const isValidUpdate = updateKeys.every((updateKey) =>
    allowedKeys.includes(updateKey)
  );

  if (!isValidUpdate) {
    return res.status(400).send();
  }

  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(404).send();
    }

    updateKeys.forEach((updateKey) => (asset[updateKey] = req.body[updateKey]));
    await asset.save();
    res.status(200).send(asset.getPublicOverview());
  } catch (err) {
    res.status(400).send();
  }
});

// Delete AAS by ID
router.delete("/aas/:id", async (req, res) => {
  try {
    // Find asset
    const asset = await Asset.findById(req.params.id);

    // If asset is not found
    if (!asset) {
      return res.status(404).send();
    }

    // Delete from DB
    await asset.remove();

    // Response
    res.status(200).send(asset.getPublicOverview());
  } catch (err) {
    res.status(500).send();
  }
});

// Upload document (picture)
router.post(
  "/aas/:id/picture",
  uploadPicture.single("document"),
  async (req, res) => {
    try {
      // Look up for the asset with the matching id
      const asset = await Asset.findById(req.params.id);

      // If asset is not found
      if (!asset) {
        return res.status(404).send();
      }

      // Convert the image to PNG
      const imageBuffer = await sharp(req.file.buffer).png().toBuffer();

      // Add new document with its description
      asset.documents = asset.documents.concat({
        document: imageBuffer,
        description: req.body.description,
        type: "image/png",
      });

      // Save to DB
      await asset.save();

      // Response
      res.status(200).send(asset.getPublicOverview());
    } catch (err) {
      res.status(400).send();
    }
  }
);

// Upload document (pdf)
router.post("/aas/:id/pdf", uploadPdf.single("document"), async (req, res) => {
  try {
    // Look up for the asset with the matching id
    const asset = await Asset.findById(req.params.id);

    // If asset is not found
    if (!asset) {
      return res.status(404).send();
    }

    // Add new document with its description
    asset.documents = asset.documents.concat({
      document: req.file.buffer,
      description: req.body.description,
      type: "document/pdf",
    });

    // Save to DB
    await asset.save();

    // Response
    res.status(200).send(asset.getPublicOverview());
  } catch (err) {
    res.status(400).send();
  }
});

module.exports = router;
