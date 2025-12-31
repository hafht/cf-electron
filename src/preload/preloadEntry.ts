import { contextBridge } from 'electron';
import { api } from './preloadApi';

contextBridge.exposeInMainWorld('api', api);
