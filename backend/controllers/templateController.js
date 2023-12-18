const Template = require("../schemas/template");

const createTemplate = async (req, res, next) => {
  try {
    let userId = req.body.userId;
    const template = await Template.findOne({ userId: userId });
    if (template) {
      const updatedTemplate = {
        userId: req.body.userId,
        eventDetails: {
          brideName: req.body.eventDetails.brideName,
          groomName: req.body.eventDetails.groomName,
          weddingDate: req.body.eventDetails.weddingDate,
          weddingTime: req.body.eventDetails.weddingTime,
          weddingVenue: req.body.eventDetails.weddingVenue,
          yourStory: req.body.eventDetails.yourStory,
        },
        guestList: req.body.guestList,
        photoGallery: req.body.photoGallery,
        mapAndDirections: {
          link: req.body.mapAndDirections.link,
          directions: req.body.mapAndDirections.directions,
        },
        travelAndAccommodation: {
          travelInfo: req.body.travelAndAccommodation.travelInfo,
          accommodationsInfo: req.body.travelAndAccommodation.accommodationsInfo,
        },
        colorManagement: req.body.colorManagement,
      };
      const result = await Template.findOneAndUpdate({ userId: userId }, updatedTemplate);
      res.json({ template: result });
    } else {
      const newTemplate = new Template({
        userId: req.body.userId,
        eventDetails: {
          brideName: req.body.eventDetails.brideName,
          groomName: req.body.eventDetails.groomName,
          weddingDate: req.body.eventDetails.weddingDate,
          weddingTime: req.body.eventDetails.weddingTime,
          weddingVenue: req.body.eventDetails.weddingVenue,
          yourStory: req.body.eventDetails.yourStory,
        },
        guestList: req.body.guestList,
        photoGallery: req.body.photoGallery,
        mapAndDirections: {
          link: req.body.mapAndDirections.link,
          directions: req.body.mapAndDirections.directions,
        },
        travelAndAccommodation: {
          travelInfo: req.body.travelAndAccommodation.travelInfo,
          accommodationsInfo: req.body.travelAndAccommodation.accommodationsInfo,
        },
        colorManagement: req.body.colorManagement,
      });

      const response = await newTemplate.save();
      res.json({ template: response });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

const getTemplatesByUserId = async (req, res, next) => {
  let userId = req.params.id;
  try {
    const templates = await Template.find({ userId: userId }).exec();
    res.json(templates);
  } catch (error) {
    res.status(error).json(error.message);
  }
};

const getTemplateById = async (req, res, next) => {
  let templateId = req.params.id;
  console.log(templateId);
  try {
    const template = await Template.find({ _id: templateId }).exec();
    if (template.length === 0) {
      res.json({ message: "template not found for the Id", templateId });
    } else {
      res.json(...template);
    }
  } catch (error) {
    res.status(error).json(error.message);
  }
};

const getAllTemplates = async (req, res, next) => {
  try {
    const templates = await Template.find({}).exec();

    res.json({ allTemplates: templates });
  } catch (error) {
    res.status(error).json(error.message);
  }
};

exports.createTemplate = createTemplate;
exports.getTemplatesByUserId = getTemplatesByUserId;
exports.getTemplateById = getTemplateById;
exports.getAllTemplates = getAllTemplates;
