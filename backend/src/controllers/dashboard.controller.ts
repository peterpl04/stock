import { Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";

export const dashboardController = {
  async summary(_req: Request, res: Response) {
    const result = await dashboardService.getSummary();
    return res.status(200).json(result);
  }
};
