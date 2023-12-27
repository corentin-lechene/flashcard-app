import {toastController} from "@ionic/vue";
import {alert, checkmark, close} from "ionicons/icons";

interface ToastOptions {
    message: string;
    duration?: number;
}

export class ToastService {
    static async success(message: string, options?: ToastOptions) {
        const toast = await toastController.create({
            icon: checkmark,
            duration: options?.duration || 3000,
            message: message,
            color: "success",
            position: 'top',
            animated: true,
            cssClass: []
        });
        await toast.present();
    }

    static async warning(message: string, options?: ToastOptions) {
        const toast = await toastController.create({
            icon: alert,
            duration: options?.duration || 3000,
            message: message,
            color: "warning",
            position: 'top',
            animated: true,
            cssClass: []
        });
        await toast.present();
    }

    static async error(message: string, options?: ToastOptions) {
        const toast = await toastController.create({
            icon: close,
            duration: options?.duration || 3000,
            message: message,
            color: "danger",
            position: 'top',
            animated: true,
            cssClass: []
        });
        await toast.present();
    }
}