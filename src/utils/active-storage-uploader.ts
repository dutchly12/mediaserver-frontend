import { ACTIVE_STORAGE_DIRECT_UPLOAD_URI } from '@/utils/constants.ts';
import { DirectUpload, type DirectUploadDelegate } from '@rails/activestorage';

export interface ProgressHandlerEvent {
  total: number;
  loaded: number;
  progress: number;
}

export type ProgressHandler = (event: ProgressHandlerEvent) => void;

export class ActiveStorageUploader implements DirectUploadDelegate {
  private readonly uploader: DirectUpload;
  private readonly progressHandler: ProgressHandler;

  constructor(file: File, progressHandler: ProgressHandler) {
    this.uploader = new DirectUpload(file, this.uploadUrl, this);
    this.progressHandler = progressHandler;
  }

  public upload(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.uploader.create((error, blob) => {
        if (error) {
          reject(error);
        } else {
          resolve(blob.signed_id);
        }
      });
    });
  }

  public directUploadWillStoreFileWithXHR(request: XMLHttpRequest) {
    request.upload.addEventListener('progress', (event) => this.directUploadDidProgress(event));
  }

  private directUploadDidProgress(event: ProgressEvent<XMLHttpRequestEventTarget>) {
    const { total, loaded } = event;
    const progress = loaded / total;

    this.progressHandler({
      total,
      loaded,
      progress,
    });
  }

  private get uploadUrl() {
    return `${import.meta.env.VITE_BASE_API_URL}${ACTIVE_STORAGE_DIRECT_UPLOAD_URI}`;
  }
}
