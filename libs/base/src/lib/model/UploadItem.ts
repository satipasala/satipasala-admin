import {FileItem} from 'ng2-file-upload';

export class UploadItem {
  constructor(private _item: FileItem, private _url: string | ArrayBuffer | null) {}

  /**
   * Gets FileItem instance of uploaded file
   */
  get item(): FileItem {
    return this._item;
  }

  /**
   * Gets data url of uploaded fle. Previews image files
   */
  get url(): string | ArrayBuffer | null {
    return this._url;
  }

  /**
   * Calculates the file size of uploaded file
   */
  get size(): string {
    const file = this._item.file;
    const si = file.size / (1024 * 1024);
    return (si > 1) ? si.toFixed(2) + ' MB' : (si * 1024).toFixed(2) + ' KB';
  }
}
