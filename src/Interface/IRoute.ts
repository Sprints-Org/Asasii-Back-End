import {Application} from "express";

export interface IRoute {
    inject(): void;

    routePath(): string;

    filePath(): string;

    getApp(): Application;
}