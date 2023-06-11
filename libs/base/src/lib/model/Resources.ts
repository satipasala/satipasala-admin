export class MediaFiles {
  defaultMedia:{type:string,link:string}
  media:[]; // array of {type:string,link:string}
}


export interface RitchMedia {
  mediaFiles?:MediaFiles
}
