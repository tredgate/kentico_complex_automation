import { Locator, Page } from "@playwright/test";
import { Component } from "./component.ts";

type PageSizeOption = "5" | "10" | "25" | "50";

export class DataTableComponent<TParent> extends Component<TParent> {
  // for example project-list, element e.g. project-list-input-table
  private readonly tablePrefix: string;
  private readonly searchInput: Locator;
  private readonly pageSizeSelect: Locator;
  private readonly previousPageButton: Locator;
  private readonly nextPageButton: Locator;

  constructor(page: Page, parent: TParent, tablePrefix: string) {
    super(page, parent);
    this.tablePrefix = tablePrefix;
    this.searchInput = page.locator(
      `[data-testid="${tablePrefix}-input-search"]`,
    );
    this.pageSizeSelect = page.locator(
      `[data-testid="${tablePrefix}-select-page-size"]`,
    );
    this.previousPageButton = page.locator(
      `[data-testid="${tablePrefix}-btn-page-prev"]`,
    );
    this.nextPageButton = page.locator(
      `[data-testid="${tablePrefix}-btn-page-next"]`,
    );
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    return this;
  }

  async setPageSize(size: PageSizeOption) {
    await this.pageSizeSelect.selectOption(size);
    return this;
  }

  async clickPreviousPage() {
    await this.previousPageButton.click();
    return this;
  }

  async clickNextPage() {
    await this.nextPageButton.click();
    return this;
  }

  async getRow(rowIndex: number): Promise<Locator> {
    return this.page.locator(`${this.tablePrefix}-table-row-${rowIndex}`);
  }

  async getCell(columnName: string, rowIndex: number): Promise<Locator> {
    return this.page.locator(
      `${this.tablePrefix}-cell-${columnName}-${rowIndex}`,
    );
  }
}
