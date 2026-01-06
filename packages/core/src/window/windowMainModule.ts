import { BrowserWindow } from 'electron';
import type { AppModule, AppContainer } from '../core/coreTypes';
import type { WindowOptions } from './windowTypes';
import { Disposable, toDisposable } from '../common/lifecycle'; // Import toDisposable

export class WindowMainModule extends Disposable implements AppModule {
  private mainWindow?: BrowserWindow;

  constructor(private readonly options: WindowOptions) {
    super();
  }

  register(_container: AppContainer) {
    // [Future] Nên register IWindowService ở đây để module khác gọi được window
  }

  async start() {
    const {
      preloadPath,
      load,
      browserWindow = {}
    } = this.options;

    console.log('[window] starting window', this.options);

    // 1. Tách webPreferences từ option truyền vào để merge an toàn
    const { webPreferences: userWebPreferences = {}, ...otherOptions } = browserWindow;

    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      show: false,
      ...otherOptions, // Spread các option khác (width, height, title...)
      webPreferences: {
        ...userWebPreferences, // Merge option của user
        preload: preloadPath,  // BẮT BUỘC: Override preload từ framework
        contextIsolation: true, // BẮT BUỘC: Luôn true
        nodeIntegration: false, // BẮT BUỘC: Luôn false
        sandbox: true,          // BẮT BUỘC: Luôn true
      },
    });

    // 2. Đăng ký việc dọn dẹp ngay khi tạo
    // Khi module.dispose() được gọi, nó sẽ chạy hàm này tự động
    this._register(toDisposable(() => {
      if (this.mainWindow && !this.mainWindow.isDestroyed()) {
        console.log('[window] Destroying BrowserWindow');
        this.mainWindow.destroy();
      }
    }));

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });

    // Handle load URL
    if (load.devUrl) {
      await this.mainWindow.loadURL(load.devUrl);
    } else if (load.prodFile) {
      await this.mainWindow.loadFile(load.prodFile);
    } else {
      throw new Error('[window] No renderer entry provided');
    }
  }

  async stop() {
    this.dispose(); // Kích hoạt cơ chế Disposable của class cha
  }
  
  // [Review] Xóa hàm dispose() override thủ công đi, để class cha tự lo
}