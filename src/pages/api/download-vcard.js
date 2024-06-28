import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const vcfFilePath = path.join(process.cwd(), "public", "contact.vcf");

  fs.readFile(vcfFilePath, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading the vCard file" });
      return;
    }

    res.setHeader("Content-Type", "text/vcard");
    res.setHeader("Content-Disposition", "attachment; filename=contact.vcf");
    res.send(data);
  });
}
