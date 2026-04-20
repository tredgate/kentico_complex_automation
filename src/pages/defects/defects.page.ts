import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base_page.page.ts";
import { Defect } from "../../test-data/types.ts";
import { DataTableComponent } from "../components/data_table.comp.ts";
import { DefectBasicInfoPage } from "./create-defect/defect_basic_info.page.ts";

export class DefectsPage extends BasePage {
  private readonly createDefectButton: Locator;
  private readonly rowTrSelector = '[data-testid="defect-list-row-{{index}}"]';
  private readonly idTdSelector = "td[defect-list-cell-id-{{index}}]";
  private readonly titleTdSelector = "td[defect-list-cell-title-{{index}}]";
  private readonly projectTdSelector = "td[defect-list-cell-project-{{index}}]";
  private readonly severityTdSelector =
    "td[defect-list-cell-severity-{{index}}]";
  dataTableComponent: DataTableComponent<this>;

  constructor(page: Page) {
    super(page);
    this.dataTableComponent = new DataTableComponent(
      this.page,
      this,
      "defect-list",
    );
    this.createDefectButton = page.locator(
      '[data-testid="defect-list-btn-new"]',
    );
  }

  async assertDefectContent(defectContent: Defect, rowIndex: number) {
    const idTd = await this.page.locator(
      this.idTdSelector.replace("{{index}}", rowIndex.toString()),
    );
    const titleTd = await this.page.locator(
      this.titleTdSelector.replace("{{index}}", rowIndex.toString()),
    );
    const projectTd = await this.page.locator(
      this.projectTdSelector.replace("{{index}}", rowIndex.toString()),
    );
    const severityTd = await this.page.locator(
      this.severityTdSelector.replace("{{index}}", rowIndex.toString()),
    );

    await expect(idTd, "Defect ID is visible").toBeVisible();
    await expect(titleTd, "Defect title has correct value").toHaveText(
      defectContent.title,
    );
    await expect(projectTd, "Defect project has correct value").toHaveText(
      defectContent.project.name,
    );
    await expect(severityTd, "Defect severity has correct value").toHaveText(
      defectContent.severity,
    );
    return this;
  }

  async assertRowVisible(rowIndex: number) {
    const row = await this.page.locator(
      this.rowTrSelector.replace("{{index}}", rowIndex.toString()),
    );
    await expect(row, `Row with index ${rowIndex} is visible`).toBeVisible();
    return this;
  }

  async searchDefectByTitle(title: string) {
    await this.dataTableComponent.search(title);
    await this.assertRowVisible(0);
    await expect(
      this.page.locator(this.titleTdSelector.replace("{{index}}", "0")),
      "First row title contains search text",
    ).toContainText(title);
    return this;
  }

  async clickCreateDefect() {
    await this.createDefectButton.click();
    return new DefectBasicInfoPage(this.page);
  }
}
