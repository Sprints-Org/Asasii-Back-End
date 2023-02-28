import {Application} from "express";

export interface IRoute {
    inject(): void;

    routePath(): string;

    getApp(): Application;
}