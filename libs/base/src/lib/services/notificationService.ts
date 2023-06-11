import { Injectable } from '@angular/core';
import { LoadingIndicatorService } from "../services/loadingIndicator.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {SpinnerOverlayService} from "./spinner/spinner-overlay/spinner-overlay.service";
@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar, private loadingService: LoadingIndicatorService, private overlayService:SpinnerOverlayService) {

  }

  public startLoadingIndicator(message?:string){
    this.overlayService.show(message)
  }


  /**
   * Log the error to console and show error message
   *
   * @param {string} message
   */
  public showErrorNotification(message: string, log?: string) {
    this.showNotification(false, message, log);
  }

  /**
   * Log the error to console and show error message
   *
   * @param {string} message
   * @param error
   */
  public showErrorNotificationWithLogging(message: string, error: any) {
    if (error) {
      console.error("Error: " + message);
      console.error(error);
    }
    this.showNotification(false, message);
  }

  /**
   * Show success message
   *
   * @param {string} message
   */
  public showSuccessNotification(message: string, log?: string) {
    this.showNotification(true, message, log);
  }

  public showInfoNotification(message: string){
    if (this.loadingService) {
      this.loadingService.stop();
    }
    this.overlayService.hide();

    this.snackBar.open(message, 'Info',{
      duration:3000,
      panelClass: 'green-snackBar'
    });
  }


  private showNotification(isSuccess: boolean, message: string, log?: string) {
    if (this.loadingService) {
      this.loadingService.stop();
    }

    this.overlayService.hide();

    this.snackBar.open(message, isSuccess ? "Success" : "Failed!!!", {
      duration: isSuccess ? 3000 : 5000,
      panelClass: [isSuccess ? 'green-snackBar' : 'red-snackBar']
    });
    if (log) {
      if (isSuccess) {
        console.log(log)
      } else {
        console.error('ERROR => ', log)
      }
    }
  }

}
