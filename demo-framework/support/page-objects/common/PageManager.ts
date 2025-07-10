import { Page } from "@playwright/test";
import LoginPage from "../auth/LoginPage";
import FeatureMenu from "./FeatureMenu";
import Datepicker from "../forms/Datepicker";
import FormLayoutsPage from "../forms/FormLayoutsPage";
import PopoverPage from "../modal_and_overlays/PopoverPage";
import SmartTablePage from "../tables_and_data/SmartTablePage";
import Header from "./Header";

export class PageManager {

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly featureMenu: FeatureMenu
    private readonly header: Header
    private readonly datePicker: Datepicker
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly popoverPage: PopoverPage
    private readonly smartTablePage: SmartTablePage

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.featureMenu = new FeatureMenu(this.page)
        this.header = new Header(this.page)
        this.datePicker = new Datepicker(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.popoverPage = new PopoverPage(this.page)
        this.smartTablePage = new SmartTablePage(this.page)
    }

    onLoginPage() {
        return this.loginPage
    }

    onFeatureMenu() {
        return this.featureMenu
    }

    onHeader() {
        return this.header
    }

    onDatePicker() {
        return this.datePicker
    }

    onFormsLayoutsPage() {
        return this.formLayoutsPage
    }

    onPopoverPage() {
        return this.popoverPage
    }

    onSmartTablePage() {
        return this.smartTablePage
    }
}