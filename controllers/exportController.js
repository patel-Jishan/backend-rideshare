const Ride = require("../models/Ride");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

exports.exportCSV = async (req, res) => {
  const rides = await Ride.find();

  const parser = new Parser();
  const csv = parser.parse(rides);

  res.header("Content-Type", "text/csv");
  res.attachment("rides.csv");
  res.send(csv);
};

exports.exportPDF = async (req, res) => {
  const rides = await Ride.find();

  const doc = new PDFDocument();

  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);

  rides.forEach((ride) => {
    doc.text(`Ride: ${ride.pickup} -> ${ride.drop} Fare: ${ride.fare}`);
  });

  doc.end();
};