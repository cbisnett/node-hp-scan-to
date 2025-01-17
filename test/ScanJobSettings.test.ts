import { describe } from "mocha";
import { expect } from "chai";
import ScanJobSettings from "../src/ScanJobSettings";
import path from "path";
import * as fs from "fs/promises";

describe("ScanJobSettings", () => {
  describe("toXML",  () => {
    it("Allows to describe an ADF two side", async () => {
      const scanJobSettings = new ScanJobSettings("Adf", "Document", 200, true);

      const content: string = await fs.readFile(
        path.resolve(__dirname, "./asset/adf_duplex_job.xml"), {encoding:'utf8' }
      );
      expect((await scanJobSettings.toXML()).trimEnd()).to.be.eq(content.trimEnd().replace(/\r\n/g, "\n"));
    });

    it("Allows to describe an ADF single side", async () => {
      const scanJobSettings = new ScanJobSettings("Adf", "Document", 200, false);

      const content: string = await fs.readFile(
        path.resolve(__dirname, "./asset/adf_simplex_job.xml"), {encoding:'utf8' }
      );
      expect((await scanJobSettings.toXML()).trimEnd()).to.be.eq(content.trimEnd().replace(/\r\n/g, "\n"));
    });

    it("Allows to describe dpi of 300", async () => {
      const scanJobSettings = new ScanJobSettings("Adf", "Document", 300, false);

      const content: string = await fs.readFile(
        path.resolve(__dirname, "./asset/300_dpi_job.xml"), {encoding:'utf8' }
      );
      expect((await scanJobSettings.toXML()).trimEnd()).to.be.eq(content.trimEnd().replace(/\r\n/g, "\n"));
    });
  });
});
